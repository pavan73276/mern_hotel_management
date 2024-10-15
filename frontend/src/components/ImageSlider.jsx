import React, { useState, useEffect } from "react";

const ImageSlider = ({ slides, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(slideInterval);
  }, [slides.length, interval]);

  return (
    <div>
        <div style={{ backgroundColor: "#AD8B3A" }} className="p-4 mb-8 max-w-screen-xl mx-auto">
            <h2 className="text-left text-3xl font-bold text-white">Exclusively For You</h2>
        </div>
        <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
        {/* Blurred Background Image */}
        <div className="absolute inset-0 z-0">
            <img
            src={slides[currentIndex].image}  // Background matches current slide
            alt="Background"
            className="w-full h-full object-cover blur-md opacity-70" // Blur and opacity for background
            />
        </div>

        {/* Dynamic Title for Each Slide */}
        <div className="absolute top-16 left-0 right-0 z-20 flex flex-col justify-center items-center px-8 md:px-16 text-center">
            {/* Slide Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {slides[currentIndex].title}
            </h1>
        </div>

        {/* Card-like Slider */}
        <div className="relative z-10 w-3/4 h-[500px] bg-white shadow-lg rounded-lg overflow-hidden flex items-center justify-center">
            <div
            className="flex transition-transform duration-1000"
            style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${slides.length * 100}%`,
            }}
            >
            {slides.map((slide, index) => (
                <div
                key={index}
                className="w-full h-full flex-shrink-0 flex justify-center items-center"
                >
                <img
                    src={slide.image}
                    alt={`Slide ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                />
                </div>
            ))}
            </div>
        </div>

        {/* Dynamic Description below the card */}
        <div className="absolute bottom-16 left-0 right-0 z-20 flex justify-center px-8 md:px-16">
            <p className="text-lg md:text-xl text-white text-center max-w-3xl">
            {slides[currentIndex].description}
            </p>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {slides.map((_, index) => (
            <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(index)}
            ></div>
            ))}
        </div>

        {/* Previous Button */}
        <button
            className="absolute left-12 top-1/2 transform -translate-y-1/2 z-20 text-white bg-black bg-opacity-50 p-4 rounded-full focus:outline-none hover:bg-opacity-75 transition"
            onClick={() =>
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? slides.length - 1 : prevIndex - 1
            )
            }
        >
            &#10094;
        </button>

        {/* Next Button */}
        <button
            className="absolute right-12 top-1/2 transform -translate-y-1/2 z-20 text-white bg-black bg-opacity-50 p-4 rounded-full focus:outline-none hover:bg-opacity-75 transition"
            onClick={() =>
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            )
            }
        >
            &#10095;
        </button>
        </div>
    </div>
  );
};

export default ImageSlider;
