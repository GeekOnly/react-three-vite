import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Name. All Rights Reserved.
        </p>
        <div className="mt-4">
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="text-white mx-2 hover:text-gray-400">
            GitHub
          </a>
          <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="text-white mx-2 hover:text-gray-400">
            LinkedIn
          </a>
          <a href="mailto:your-email@example.com" className="text-white mx-2 hover:text-gray-400">
            Email
          </a>
        </div>
        <div className="mt-4 text-sm">
          <a href="/privacy-policy" className="text-white hover:text-gray-400 mx-2">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="text-white hover:text-gray-400 mx-2">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
