import React from "react";
import Banner from "../components/Banner";
import Featured from "../components/Featured";
import ContactUs from "../components/ContactUs";
import Testimonials from "../components/Testimonials";
import Blogs from "../components/Blogs";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <Banner />
      <Featured />
      <Testimonials />
      <Blogs/>
      <Newsletter />
      <ContactUs />
    </>
  );
};

export default Home;
