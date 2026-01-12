import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const images = [
  "https://img.freepik.com/premium-vector/world-blood-day-concept-vector-flat-illustrations_199064-821.jpg?w=740&q=80",
  "https://img.freepik.com/free-vector/realistic-world-blood-donor-day-illustration_52683-62566.jpg?t=st=1766216810~exp=1766220410~hmac=86dcc50c04a0b2b62c068ff33634660d1c8a8ec727404c43690f58bbb428b095&w=1480",
  "https://img.freepik.com/free-vector/june-blood-donor-day-text-icon_1308-110933.jpg?uid=R150327528&ga=GA1.1.831263510.1760181755&semt=ais_hybrid&w=740&q=80",
];

const Banner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen md:min-h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse top-10 -left-20" />
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse bottom-10 -right-20 animation-delay-2000" />
        <div className="absolute w-64 h-64 bg-red-400/5 rounded-full blur-2xl animate-pulse top-1/2 left-1/3 animation-delay-4000" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Slider */}
          <div className={`flex justify-center transition-all duration-1000 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded-2xl blur-2xl -z-10" />

              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                slidesPerView={1}
                className="w-full rounded-2xl overflow-hidden shadow-2xl"
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Blood donation campaign slide ${idx + 1}`}
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="absolute inset-0 rounded-2xl border-2 border-red-500/30 pointer-events-none" />
            </div>
          </div>

          {/* Text content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            <div className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <p className="text-sm font-semibold tracking-widest text-red-400 uppercase">✦ Save Lives Today</p>
            </div>

            <div className={`transition-all duration-700 delay-100 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Join the{" "}
                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Life-Saving
                </span>{" "}
                Community
              </h1>
            </div>

            <div className={`transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Every donation is a gift of life. Be the hero your community needs and save up to three lives with a single donation.
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <button className="px-8 py-3 md:px-10 md:py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 group">
                <span className="flex items-center justify-center gap-2">
                  Join as a Donor
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              <button className="px-8 py-3 md:px-10 md:py-4 border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 group">
                <span className="flex items-center justify-center gap-2">
                  Search Donors
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </button>
            </div>

            <div className={`flex gap-6 md:gap-8 text-sm transition-all duration-700 delay-400 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-slate-400">1000+ Active Donors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-slate-400">Lives Saved Daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-10 w-20 h-20 bg-red-500/10 rounded-lg transform rotate-45 animate-bounce" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-blue-500/10 rounded-lg transform rotate-45 animate-bounce" style={{ animationDelay: "0.5s" }} />
    </section>
  );
};

export default Banner;
