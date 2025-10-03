import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

// ChatBubble for portfolio
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me anything about this portfolio. What would you like to know?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
const [isLoading, setIsLoading] = useState(false);
  // Handle sending user message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    try {
      // Send message to backend
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage })
      });

      const data = await res.json();
      const aiResponse = { role: "assistant", content: data.aiMessage };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't get a response. Try again later." }
      ]);
    }
 finally{
        setIsLoading(false);
  }}

  return (
    <>
      {/* Floating Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full !bg-[#00FF84] hover:!bg-[#00FF84]/90 text-black shadow-lg flex items-center justify-center transition-transform hover:scale-110 group relative"
            title="Ask me about my portfolio"
          >
            <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-2 -left-36 bg-black text-[#00FF84] px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
              Ask me about my portfolio
            </div>
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="w-[380px] h-[500px] shadow-2xl border-2 border-black rounded-xl flex flex-col bg-white">
            {/* Header */}
            <div className="bg-black text-[#00FF84] px-4 py-3 flex justify-between items-center rounded-t-xl">
              <div className="flex items-center gap-2 font-bold text-lg">
                <MessageCircle className="w-5 h-5" /> Portfolio Assistant
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 flex flex-col p-0 overflow-hidden">
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "user" ? "bg-black text-[#00FF84]" : "bg-[#0A3D62] text-[#E0E0E0]"
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                  {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#0A3D62] text-[#E0E0E0] rounded-2xl px-4 py-2">
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Input */}
              <div className="p-4 border-t-2 border-black flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white"
                />
                <button
                  onClick={handleSendMessage}
                  className="!bg-black text-[#00FF84] px-4 py-2 rounded-lg flex-shrink-0 hover:opacity-80"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBot;
