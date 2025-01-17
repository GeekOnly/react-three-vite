import React from 'react';

export default function CreditPage() {
  return (
      <div className="credit-page flex flex-col justify-center items-center bg-slate-800 p-8 text-center font-inter max-h-screen">
      {/* SubHeader Section */}
      <div className="flex  w-full mb-8">
        <h2 className="text-2xl font-semibold text-gray-600 flex-1">Developed by:</h2>
        <h2 className="text-2xl font-semibold text-gray-600 flex-1">Tools & Technologies:</h2>
        <h2 className="text-2xl font-semibold text-gray-600 flex-1">Special Thanks to:</h2>
      </div>

      {/* Credit List */}
      <div className="flex justify-between w-full mb-8">
        <ul className="list-none p-0 m-0 text-xl text-gray-600 w-1/3">
          <li>Sanphet Somjit</li>
        </ul>

        <ul className="list-none p-0 m-0 text-xl text-gray-600 w-1/3">
          <li>React.js</li>
          <li>styled-components</li>
          <li>Font Awesome</li>
          <li>React Scroll</li>
        </ul>

        <ul className="list-none p-0 m-0 text-xl text-gray-600 w-1/3">
          <li>
            <a href="https://www.example.com" target="_blank" className="text-orange-500 hover:text-red-600 transition-all duration-300 ease-in-out transform hover:scale-105">
              Open Source Contributions
            </a>
          </li>
          <li>Community Support</li>
        </ul>
      </div>

    </div>
  );
}
