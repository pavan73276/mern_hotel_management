import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-800 text-white">
      <div className="max-w-screen-xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Our Hotel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
