import React from "react";
import { motion } from "framer-motion";

const Header = (props) => {
  const { url, name } = props;
  return (
    <header className="w-full p-16 shadow-2xl bg-slate-900 relative overflow-hidden">
      {/* Animated Glowing Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-slate-900 to-black opacity-60 blur-lg"></div>

      {/* Title Wrapper */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Main Title with Neon Effect */}
        <motion.a
          href={url}
          target="_blank"  // เปิดในแท็บใหม่
          rel="noopener noreferrer"  // เพิ่มความปลอดภัย
          className="text-4xl sm:text-8xl font-extrabold font-mono text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]"
          whileHover={{
            scale: 1.1,
            textShadow: "0px 0px 20px rgba(255,255,255,1)",
          }}
        >
          {name}
        </motion.a>
      </motion.div>
    </header>
  );
};

export default Header;
