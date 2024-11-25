import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-orange-50 p-6 mt-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-gray-800 mb-2">Company</h3>
          <ul className="space-y-1">
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Explore</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Team</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">About us</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Activity</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-2">Resources</h3>
          <ul className="space-y-1">
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Blog</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Use Cases</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Testimonials</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Insights</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-4">Green Mart is your go-to marketplace for sustainable, organic products. Explore our wide range of eco-friendly items and join our community of ethical goods. Join our community and shop for a healthier you and a greener planet!</p>
          <form className="flex">
            <input type="email" placeholder="Your Email" className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition duration-300">Subscribe</button>
          </form>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
