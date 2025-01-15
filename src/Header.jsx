import React from "react";

const Header = (props) => {
  return (
    <header className="w-full p-8 shadow-lg bg-black relative overflow-hidden">
      {/* Animated Glowing Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-black animate-gradient-x opacity-75 blur-lg"></div>

      {/* Title Wrapper */}
      <div className="relative z-10 text-center">
        {/* Main Title with Neon Effect */}
        <h1 className="text-6xl sm:text-8xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 animate-flicker">
          {props.name}
        </h1>

        {/* Subtitle with Cool Glow */}
        <p className="text-lg sm:text-2xl text-gray-300 mt-4 tracking-widest">
          The Future of Game Development
        </p>
      </div>

      {/* Moving Underline */}
      <div className="relative mt-6 flex justify-center">
        <div className="w-48 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 relative">
          <div className="absolute top-0 left-0 w-8 h-1 bg-white animate-slide-x"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
