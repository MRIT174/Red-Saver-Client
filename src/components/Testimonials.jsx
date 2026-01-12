import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Donor",
      location: "New York, NY",
      content:
        "Donating blood through RedSaver has been one of the most fulfilling experiences. Knowing that my donation can save up to three lives is incredibly rewarding. The whole process is seamless and the staff is so professional.",
      rating: 5,
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
      delay: 0,
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "First-Time Donor",
      location: "San Francisco, CA",
      content:
        "I was nervous about donating for the first time, but the RedSaver app made everything so easy. The step-by-step guidance and supportive community gave me confidence. I'm proud to be a lifesaver now!",
      rating: 5,
      avatar: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80",
      delay: 100,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Platinum Donor",
      location: "Austin, TX",
      content:
        "I've been donating for over 5 years now, and RedSaver has made it so convenient. The health benefits are real, and the community events are amazing. This is how technology should serve humanity.",
      rating: 5,
      avatar: "https://static.vecteezy.com/ti/vecteur-libre/p1/10967316-avatar-homme-barbu-gratuit-vectoriel.jpg",
      delay: 200,
    },
  ];

  const handlePrev = () => {
    setAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 ">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse -top-20 -right-32" />
        <div className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse -bottom-20 -left-32" />
        <div className="absolute w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl animate-pulse top-1/3 right-1/4" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none max-w-7xl mx-auto">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="testimonials-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonials-grid)" />
        </svg>
      </div>

      <div className="container px-4 md:px-8 relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <p className="text-sm font-semibold tracking-widest text-red-400 uppercase mb-3">✦ Donor Stories</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
            Real Stories from{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Life Savers</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed">
            Hear from our community of donors who are making a difference every day.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative group">
            {/* Active Testimonial */}
            <div className={`transition-all duration-700 transform ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="relative bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-xl border border-border/30 rounded-2xl p-8 md:p-12 hover:border-border/60 transition-all duration-500 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-blue-500/5 rounded-2xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="mb-8 inline-block">
                    <div className="p-3 bg-gradient-to-br from-red-600 to-red-500 rounded-lg group-hover:shadow-lg group-hover:shadow-red-500/30 transition-all duration-500">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-8 group-hover:text-white transition-colors duration-300">
                    "{testimonials[activeIndex].content}"
                  </p>

                  <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mb-8" />

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[activeIndex].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-500/50 group-hover:border-red-500 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-red-500/30"
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-slate-400 text-sm">{testimonials[activeIndex].role}</p>
                      <p className="text-slate-500 text-xs">{testimonials[activeIndex].location}</p>
                    </div>

                    <div className="flex gap-1 ml-auto">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="absolute -left-16 md:-left-20 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-110 group/nav opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="absolute -right-16 md:-right-20 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 group/nav opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-3 justify-center mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoPlay(false);
                  setActiveIndex(index);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? "w-8 h-3 bg-gradient-to-r from-red-500 to-red-600"
                    : "w-3 h-3 bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { number: "10K+", label: "Active Donors", icon: "👥" },
            { number: "25K+", label: "Lives Saved", icon: "❤️" },
            { number: "4.9/5", label: "Average Rating", icon: "⭐" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 transform ${
                isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
              }`}
              style={{ transitionDelay: isLoaded ? `${index * 100 + 600}ms` : "0ms" }}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-slate-400 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;