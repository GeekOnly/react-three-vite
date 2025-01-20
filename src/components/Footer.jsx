import React from 'react';

const Footer = () => {
  return (
    <footer className="footer text-white py-4">
      <div className="container mx-auto text-center">
        <div className="mt-4">
          <a href="https://github.com/GeekOnly" target="_blank" rel="noopener noreferrer" className="text-white mx-2 hover:text-gray-400">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/sanphet-somjit-197bb3142/" target="_blank" rel="noopener noreferrer" className="text-white mx-2 hover:text-gray-400">
            LinkedIn
          </a>
          <a href="mailto:sanphetsomjit@gmail.com" className="text-white mx-2 hover:text-gray-400">
            Email
          </a>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Sanphet Somjit. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
