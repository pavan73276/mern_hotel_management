import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Example data for the slider
const features = [
  {
    id: 1,
    title: "Free Wi-Fi",
    description: "Stay connected throughout your stay.",
    image: "/path/to/your/image1.jpg", // Replace with actual image paths
  },
  {
    id: 2,
    title: "Pool",
    description: "Enjoy our outdoor swimming pool.",
    image: "/path/to/your/image2.jpg",
  },
  // Add more features if needed
];

// Custom Arrow components for better control
const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slick-prev`}
      style={{
        ...style,
        display: "block",
        background: "rgba(0, 0, 0, 0.6)", // Dark background for visibility
        borderRadius: "50%", // Round shape
        width: "40px", // Increase arrow size
        height: "40px",
        fontSize: "20px",
        color: "white",
        left: "-60px",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    />
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slick-next`}
      style={{
        ...style,
        display: "block",
        background: "rgba(0, 0, 0, 0.6)", // Dark background for visibility
        borderRadius: "50%", // Round shape
        width: "40px", // Increase arrow size
        height: "40px",
        fontSize: "20px",
        color: "white",
        right: "-60px",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    />
  );
};

const FeaturesSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gray-300 py-16"> {/* Darker gray background */}
      <h2 className="text-center text-3xl font-bold mb-8">Hotel Features</h2>
      <div className="max-w-screen-xl mx-auto px-4">
        <Slider {...settings}>
          {features.map((feature) => (
            <div key={feature.id} className="p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
                <p className="mt-2 text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturesSlider;
