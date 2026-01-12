import React, { useEffect, useState } from "react";
import { Mail, Send, Check } from "lucide-react";

const Newsletter = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle newsletter form submission
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setSelectedOptions([]);
        setIsSubmitted(false);
      }, 3000);
    }
  };

  // Toggle content preferences
  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const contentOptions = [
    { id: "tips", label: "Donation Tips" },
    { id: "health", label: "Health Benefits" },
    { id: "stories", label: "Donor Stories" },
    { id: "events", label: "Blood Drives" },
  ];

  const badges = [
    { icon: "📬", label: "No Spam" },
    { icon: "🔒", label: "Secure" },
    { icon: "❤️", label: "Free" },
    { icon: "⚡", label: "Instant" },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse -bottom-32 -left-20" />
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse -top-32 -right-20" />
        <div className="absolute w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl animate-pulse top-1/2 left-1/2" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="newsletter-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#newsletter-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Small top label */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-card/40 backdrop-blur-md border border-border/30 rounded-full">
              <Mail className="w-4 h-4 text-red-400" /> {/* Red icon */}
              <p className="text-sm font-semibold tracking-widest text-red-400 uppercase">
                Stay Informed
              </p> {/* Red text */}
            </div>

            {/* Main heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-4">
              Your Source for{" "}
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Blood Donation News
              </span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Get exclusive insights, donor stories, health tips, and updates about blood drives directly
              to your inbox. Join our community of lifesavers.
            </p>
          </div>

          {/* Newsletter Form Card */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-blue-600/10 rounded-2xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl border border-border/30 rounded-2xl p-8 md:p-12 hover:border-border/60 transition-all duration-500 overflow-hidden">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-blue-500 w-full" />

                <form onSubmit={handleSubscribe} className="space-y-8">
                  {/* Email Input */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-300">
                      Your Email Address
                    </label>
                    <div className="relative group/input">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-blue-600/20 rounded-lg blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex items-center gap-3 px-6 py-4 bg-card/50 backdrop-blur-md border border-border/30 rounded-lg group-hover/input:border-border/60 group-focus-within/input:border-border/60 transition-all duration-300">
                        <Mail className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-transparent w-full text-white placeholder-slate-500 focus:outline-none text-base"
                          required
                        />
                      </div>
                    </div>
                  </div>


                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitted}
                      className={`w-full group/btn px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                        isSubmitted ? "bg-gradient-to-r from-emerald-600 to-emerald-500" : ""
                      }`}
                    >
                      {isSubmitted ? (
                        <>
                          <Check className="w-5 h-5 animate-bounce" />
                          <span>Subscribed!</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe Now</span>
                          <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy Notice */}
                  <p className="text-xs text-slate-500 text-center">
                    We respect your privacy. Unsubscribe at any time. By subscribing, you agree to receive updates from
                    RedSaver Blood Donation.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div
            className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {badges.map((badge, index) => (
              <div
                key={index}
                className="text-center p-4 bg-card/30 backdrop-blur-md border border-border/30 rounded-lg hover:border-border/60 hover:bg-card/40 transition-all duration-300 transform hover:scale-105"
                style={{ transitionDelay: isLoaded ? `${index * 50 + 400}ms` : "0ms" }}
              >
                <div className="text-2xl mb-2">{badge.icon}</div>
                <p className="text-sm font-medium text-slate-300">{badge.label}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div
            className={`mt-16 text-center transition-all duration-1000 delay-600 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <p className="text-slate-500 text-sm mb-4">Trusted by 50K+ blood donors worldwide</p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-slate-950"
                  />
                ))}
              </div>
              <span className="text-slate-400 text-sm ml-2">Join thousands of engaged subscribers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
