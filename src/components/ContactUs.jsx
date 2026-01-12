import React, { useState } from "react";
import { Mail, User, MessageSquare } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse -bottom-32 -left-20" />
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse -top-32 -right-20" />
        <div className="absolute w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl animate-pulse top-1/2 left-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Us</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl">
              Have questions or suggestions? Send us a message and we will get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Form Card */}
          <div className="relative bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl border border-border/30 rounded-2xl p-8 md:p-12 hover:border-border/60 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-blue-500 w-full" />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-blue-600/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-3 px-6 py-4 bg-card/50 backdrop-blur-md border border-border/30 rounded-lg group-focus-within:border-border/60 transition-all duration-300">
                  <User className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-transparent w-full text-white placeholder-slate-400 focus:outline-none text-base"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-blue-600/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-3 px-6 py-4 bg-card/50 backdrop-blur-md border border-border/30 rounded-lg group-focus-within:border-border/60 transition-all duration-300">
                  <Mail className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-transparent w-full text-white placeholder-slate-400 focus:outline-none text-base"
                    required
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-blue-600/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start gap-3 px-6 py-4 bg-card/50 backdrop-blur-md border border-border/30 rounded-lg group-focus-within:border-border/60 transition-all duration-300">
                  <MessageSquare className="w-5 h-5 text-red-400 flex-shrink-0 mt-2" />
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-transparent w-full text-white placeholder-slate-400 focus:outline-none text-base resize-none"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitted}
                className={`w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  isSubmitted ? "bg-gradient-to-r from-emerald-600 to-emerald-500" : ""
                }`}
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-5 h-5 animate-bounce" />
                    <span>Sent!</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 text-center text-slate-400">
              <p>
                Contact Number: <span className="font-semibold text-white">+880 1234 567890</span>
              </p>
              <p>
                Email: <span className="font-semibold text-white">info@blooddonor.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
