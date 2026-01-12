import { useEffect, useState } from "react";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const footerSections = [
    {
      title: "RedSaver",
      links: [
        { label: "About Us", href: "#" },
        { label: "Our Mission", href: "#" },
        { label: "Impact Story", href: "#" },
        { label: "Careers", href: "#" },
      ],
      delay: 0,
    },
    {
      title: "Quick Links",
      links: [
        { label: "Search Donors", href: "#" },
        { label: "Donation Requests", href: "#" },
        { label: "Blog", href: "#" },
        { label: "FAQ", href: "#" },
      ],
      delay: 100,
    },
    {
      title: "Resources",
      links: [
        { label: "Health Tips", href: "#" },
        { label: "Blood Types", href: "#" },
        { label: "Safety Guide", href: "#" },
        { label: "Documentation", href: "#" },
      ],
      delay: 200,
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Contact Support", href: "#" },
      ],
      delay: 300,
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse -top-20 -left-32" />
        <div className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse -bottom-20 -right-32" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.005] pointer-events-none max-w-7xl mx-auto">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="border-b border-gray-700/20 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Brand Info */}
              <div
                className={`transition-all duration-1000 ${
                  isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="flex items-center gap-3 mb-6 group cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-red-600 rounded-lg p-2">
                      <Heart className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    RedSaver
                  </span>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                  Every donation saves lives. Join our community of heroes dedicated to making a difference.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors duration-300 cursor-pointer group">
                    <Phone className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>+880 1234 567890</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors duration-300 cursor-pointer group">
                    <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>support@redsaver.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors duration-300 cursor-pointer group">
                    <MapPin className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>

              {/* Social & Newsletter */}
              <div
                className={`transition-all duration-1000 delay-200 ${
                  isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                <h3 className="text-lg font-semibold text-white mb-6">Follow Our Journey</h3>
                <div className="flex gap-4 flex-wrap mb-8">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="group relative w-12 h-12 flex items-center justify-center rounded-lg bg-gray-800/40 backdrop-blur-md border border-gray-700/30 hover:border-gray-500/50 hover:bg-gray-700/60 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/20"
                        style={{ transitionDelay: isLoaded ? `${index * 75}ms` : "0ms" }}
                      >
                        <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-red-400 transition-colors duration-300" />
                      </a>
                    );
                  })}
                </div>
                <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/30 rounded-xl p-6 hover:border-gray-500/50 hover:bg-gray-700/60 transition-all duration-300">
                  <p className="text-sm font-semibold text-white mb-3">Subscribe for Updates</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-400/50 transition-colors duration-300"
                    />
                    <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-105">
                      Go
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="border-b border-gray-700/20 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {footerSections.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  className={`transition-all duration-700 transform ${
                    isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
                  }`}
                  style={{ transitionDelay: isLoaded ? `${section.delay}ms` : "0ms" }}
                >
                  <h3 className="text-lg font-semibold text-white mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-slate-400 hover:text-red-400 transition-colors duration-300"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-8 md:py-12 border-t border-gray-700/20">
          <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} RedSaver Blood Donation Platform. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-red-400 transition-colors duration-300">Terms & Conditions</a>
              <span className="text-slate-700">•</span>
              <a href="#" className="text-slate-500 hover:text-red-400 transition-colors duration-300">Privacy Policy</a>
              <span className="text-slate-700">•</span>
              <a href="#" className="text-slate-500 hover:text-red-400 transition-colors duration-300">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
