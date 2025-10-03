import React, { useState } from "react";
import { AiOutlineMail, AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import emailjs from "emailjs-com";

import { socialLinks } from "./info/icons";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_x2u1dcm",      // <-- Service ID as string
        "template_x1ctz1j",     // <-- Template ID as string
        formData,
        "Iy7-YIKbu8CNfrs6I"     // <-- Public Key as string
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (err) => {
          console.log("FAILED...", err);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <section
      id="contact"
      className="overflow-x-hidden py-16 px-6 bg-gray-50 max-w-6xl mx-auto"
    >
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Let’s Work Together
      </h2>
      <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Help me bring your ideas to life!
        </p>        
      <div className="grid md:grid-cols-2 gap-8">
        {/* Get in Touch Column */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start gap-6 w-full">
          <h3 className="text-2xl font-semibold text-gray-600">Get in Touch</h3>
            <p className="font-semibold text-gray-600">Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
               target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
               rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-all duration-200 ease-in-out w-full"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 shadow-md transition-all duration-200 ease-in-out group-hover:scale-110">
                <link.icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Contact Form Column */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">Send a Message</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition w-full md:w-auto"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
