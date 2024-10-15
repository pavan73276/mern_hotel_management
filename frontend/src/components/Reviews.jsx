import React from "react";

const reviews = [
  { id: 1, text: "Best experience ever!", rating: 5 },
  { id: 2, text: "Great value for money.", rating: 4 },
  // Add more reviews as needed
];

const Reviews = () => {
  return (
    <section className="py-16 bg-gray-200">
      <h2 className="text-center text-3xl font-bold">Customer Reviews</h2>
      <div className="max-w-screen-xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded shadow">
            <p className="text-gray-700">{review.text}</p>
            <p className="mt-2 text-gray-900 font-semibold">Rating: {review.rating} ★</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
