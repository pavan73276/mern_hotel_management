import React from "react";

const testimonials = [
  { 
    id: 1, 
    text: "I had an incredible experience at the hotel. The staff was friendly and attentive, ensuring that all my needs were met. The room was immaculate and offered stunning views. I particularly enjoyed the complimentary breakfast, which had a great variety of options. I highly recommend this place to anyone looking for a relaxing getaway!",
    author: "Mr. Himanshu Sharma", 
    image: "src/assets/testimonials/Pavan.jpeg",
  },
  { 
    id: 2, 
    author: "Mr. Rishi Mishra", 
    image: "src/assets/testimonials/Pavan.jpeg",
    text: "From the moment I arrived, I was impressed by the elegant ambiance of the hotel. The décor was beautiful, and the atmosphere was welcoming. The service was top-notch; the staff went above and beyond to ensure my stay was comfortable. I loved spending my evenings at the rooftop bar, soaking in the beautiful sunset. It was truly a memorable stay!"
  },
  { 
    id: 3, 
    author: "Mr. Pavan Kumar", 
    image: "src/assets/testimonials/Pavan.jpeg",
    text: "This hotel is perfectly located near all the major attractions. I was able to explore the city easily and return to a comfortable haven. The staff was incredibly friendly and provided great recommendations for local dining and activities. My room was spacious, clean, and well-appointed. I can't wait to return!"
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div style={{ backgroundColor: "#AD8B3A" }} className="p-4 mb-8 max-w-screen-xl mx-auto">
        <h2 className="text-left text-3xl font-bold text-white">Testimonials</h2>
      </div>
      <div className="max-w-screen-xl mx-auto px-4">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id} 
            className={`flex items-center mb-8 transition duration-300 ease-in-out transform hover:scale-105 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} hover:bg-gray-300 p-4 rounded-lg shadow-lg`}
          >
            <div className="w-1/2">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="w-full h-50 object-cover rounded-lg" // Fixed height for all images
              />
            </div>
            <div className="w-1/2 p-4">
              <p className="text-gray-700 italic">{testimonial.text}</p>
              <p className="mt-2 text-gray-900 font-semibold">{testimonial.author}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
