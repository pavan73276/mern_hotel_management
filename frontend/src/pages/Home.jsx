import React from "react";

import Navbar from "../components/Navbar.jsx";
import VideoSection from "../components/VideoSection.jsx";
import Testimonials from "../components/Testimonials.jsx";
import ImageSlider from "../components/ImageSlider.jsx";
import Features from "../components/Features.jsx";
import Reviews from "../components/Reviews.jsx";
import Footer from "../components/Footer.jsx";

const HomePage = () => {
  const slides = [
    {
      image: "src/assets/autoslider/h1.jpeg",
      title: "Magical Maldives",
      description: "Experience the pristine beauty of the Maldives.",
    },
    {
      image: "src/assets/autoslider/h2.jpg",
      title: "India with Taj",
      description: "Immerse yourself in cultural diversity with Taj Hotels.",
    },
    {
      image: "src/assets/autoslider/h3.jpeg",
      title: "Festivals of India",
      description: "Celebrate the vibrant festivals with Taj's luxury.",
    },
    {
      image: "src/assets/autoslider/h4.jpeg",
      title: "Magical Maldives",
      description: "Experience the pristine beauty of the Maldives.",
    },
    {
      image: "src/assets/autoslider/h5.jpg",
      title: "India with Taj",
      description: "Immerse yourself in cultural diversity with Taj Hotels.",
    },
    {
      image: "src/assets/autoslider/h6.webp",
      title: "Festivals of India",
      description: "Celebrate the vibrant festivals with Taj's luxury.",
    },
  ];

  return (
    <div>
      <Navbar />
      <VideoSection />
      <Testimonials />
      <ImageSlider slides={slides} interval={4000} />
      <Features />
      {/* <Reviews /> */}
    </div>
  );
};

export default HomePage;
