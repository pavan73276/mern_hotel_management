import React from "react";

const VideoSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        src="src/assets/video/hotel_video.mp4" // Replace with your video path
        type="video/mp4"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <h1 className="text-white text-4xl md:text-6xl">Welcome to Our Hotel</h1>
      </div>
    </div>
  );
};

export default VideoSection;
