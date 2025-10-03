import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// --------------------
// Debug: Check API key
// --------------------
if (!process.env.HF_API_KEY) {
  console.error("❌ Hugging Face API key missing in .env!");
} else {
  console.log("✅ Hugging Face API key loaded");
}

// --------------------
// Portfolio data
// --------------------
const portfolioData = {
  about:
    "I am a front-end developer passionate about React, Tailwind, and creating interactive web experiences.",
  projects:
    "I have built multiple projects including a portfolio site, a 3D chess trainer, and more.",
  skills: "Skills: React, Tailwind CSS, Node.js, JavaScript, HTML, CSS, AI integration.",
  contact:
    "You can reach me via email: powelljean16@gmail.com or on LinkedIn/GitHub from the Contact section.",
};

// --------------------
// Hugging Face model - Llama 3.2 1B (Best for reliability)
// --------------------
const HF_MODEL_URL =
  "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct";

// --------------------
// Chat endpoint
// --------------------
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  console.log("📩 Received message:", message);

  if (!message) return res.status(400).json({ error: "No message provided" });
  if (!process.env.HF_API_KEY)
    return res
      .status(500)
      .json({ error: "Server misconfigured: HF API key missing" });

  // Compose prompt (optimized for Llama format)
  const prompt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>
You are a helpful portfolio assistant. Answer questions concisely about this portfolio only.

Portfolio Information:
About: ${portfolioData.about}
Projects: ${portfolioData.projects}
Skills: ${portfolioData.skills}
Contact: ${portfolioData.contact}<|eot_id|><|start_header_id|>user<|end_header_id|>
${message}<|eot_id|><|start_header_id|>assistant<|end_header_id|>
`;

  try {
    console.log("📝 Sending prompt to Hugging Face (Llama 3.2)...");

    const response = await fetch(HF_MODEL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false,
        },
      }),
    });

    // Check if response is OK
    if (!response.ok) {
      const text = await response.text();
      console.error("❌ HF API returned error:", text);

      // Check if it's a model loading error
      if (text.includes("loading") || text.includes("currently loading")) {
        return res.json({
          aiMessage: "The AI is waking up... Please try again in a few seconds!",
        });
      }

      return res
        .status(response.status)
        .json({ error: `HF API Error: ${text}` });
    }

    // Safely parse JSON
    let data;
    try {
      data = await response.json();
    } catch (err) {
      const text = await response.text();
      console.error("❌ Response not JSON:", text);
      return res
        .status(500)
        .json({ error: "HF API returned non-JSON response", raw: text });
    }

    console.log("🤖 HF raw response:", data);

    // Parse AI message (handle different HF response formats)
    let aiMessage =
      data[0]?.generated_text?.trim() ||
      data.generated_text?.trim() ||
      "Sorry, I couldn't generate a response.";

    // Clean up the response (remove any prompt echoes)
    aiMessage = aiMessage
      .replace(prompt, "")
      .replace(/<\|.*?\|>/g, "")
      .trim();

    console.log("💬 Parsed AI message:", aiMessage);

    res.json({ aiMessage });
  } catch (error) {
    console.error("❌ Error calling Hugging Face API:", error);
    res.status(500).json({ error: "Internal server error. See server logs." });
  }
});

// --------------------
// Test route
// --------------------
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// --------------------
// Start server
// --------------------
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});