import React from 'react';
import { User } from 'lucide-react'; // Assuming you're using lucide-react for the icons

const Header = () => {
  return (
    <div className=" bg-orange-50 font-sans">
      <header className="bg-orange-50 p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/api/placeholder/40/40" alt="Green Mart Logo" className="w-10 h-10" />
            <h1 className="text-xl items-center font-semibold text-green-800">Green Mart</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Dashboard</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Materials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Orders</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">History</a></li>
            </ul>
          </nav>
          <div className="flex items-center">
            <User className="w-8 h-8 text-pink-500 bg-pink-100 rounded-full p-1" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
