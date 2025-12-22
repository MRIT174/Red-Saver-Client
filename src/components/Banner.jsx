import React from "react";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const images = [
  "https://img.freepik.com/premium-vector/world-blood-day-concept-vector-flat-illustrations_199064-821.jpg?w=740&q=80",
  "https://img.freepik.com/free-vector/realistic-world-blood-donor-day-illustration_52683-62566.jpg?t=st=1766216810~exp=1766220410~hmac=86dcc50c04a0b2b62c068ff33634660d1c8a8ec727404c43690f58bbb428b095&w=1480",
  "https://img.freepik.com/free-vector/june-blood-donor-day-text-icon_1308-110933.jpg?uid=R150327528&ga=GA1.1.831263510.1760181755&semt=ais_hybrid&w=740&q=80",
];

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-red-500 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center md:justify-end">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            className="w-56 sm:w-64 md:w-72 lg:w-80 rounded-lg shadow-lg"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-center md:text-left md:mr-28">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Join the Life Saving Community
          </h1>

          <p className="mb-6 text-base md:text-xl">
            Donate blood, save lives. Be a hero today.
          </p>

          <div className="flex justify-center md:justify-start gap-3 flex-wrap">
            <button
              className="btn btn-primary btn-md md:btn-lg"
              onClick={() => navigate("/register")}
            >
              Join as a Donor
            </button>

            <button
              className="btn btn-outline btn-md md:btn-lg text-white border-white hover:bg-white hover:text-red-500"
              onClick={() => navigate("/search-donors")}
            >
              Search Donors
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
