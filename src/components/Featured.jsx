import React, { useEffect, useState } from "react";
import { Heart, Users, Activity } from "lucide-react";

const Featured = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      title: "Save Lives",
      description: "Every donation can help multiple patients in need.",
      icon: Heart,
      delay: 0,
      gradient: "from-red-600 to-red-500",
      bgGradient: "from-red-600/10 to-red-500/5",
    },
    {
      title: "Community Impact",
      description: "Be a part of a compassionate and lifesaving community.",
      icon: Users,
      delay: 100,
      gradient: "from-blue-600 to-blue-500",
      bgGradient: "from-blue-600/10 to-blue-500/5",
    },
    {
      title: "Health Benefits",
      description: "Regular donation is healthy and rewarding.",
      icon: Activity,
      delay: 200,
      gradient: "from-emerald-600 to-emerald-500",
      bgGradient: "from-emerald-600/10 to-emerald-500/5",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 ">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse -top-20 -left-32" />
        <div className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse -bottom-20 -right-32" />
        <div className="absolute w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl animate-pulse top-1/2 right-1/4" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none max-w-7xl mx-auto">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="featured-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#featured-grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <p className="text-sm font-semibold tracking-widest text-red-400 uppercase mb-3">✦ Our Impact</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
            Why{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Donate Blood?
            </span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed">
            Your donation is a gift of life. Join thousands of heroes saving lives in our community.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 transform ${
                  isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
                }`}
                style={{ transitionDelay: isLoaded ? `${feature.delay}ms` : "0ms" }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-2xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative h-full bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl p-8 hover:border-border/60 hover:bg-card/60 transition-all duration-500 overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}
                    style={{ width: "0%", animation: isLoaded ? `slideRight 1s ease-out forwards` : "none", animationDelay: `${feature.delay + 300}ms` }}
                  />

                  <div className="mb-6 relative inline-block">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl blur opacity-0 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500`}
                    />
                    <div
                      className={`relative bg-gradient-to-r ${feature.gradient} rounded-xl p-4 transform group-hover:scale-110 transition-transform duration-500`}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-500">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm text-primary font-medium">Learn more</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA button */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm mb-6">Join thousands of lifesavers</p>
          <button className="px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 inline-flex items-center gap-2 group">
            Start Donating
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideRight {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Featured;
