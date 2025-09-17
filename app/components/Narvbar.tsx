import React from "react";
import { Link } from "react-router";

const Narvbar = () => {
  return (
    <div className="w-full">
      <nav className="matcha-navbar">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="flex-shrink-0">
            <h1 className="matcha-logo">
              <span className="matcha-text">MATCHA</span>
              <span className="resume-text">RESUME</span>
            </h1>
          </Link>
          <Link to="/upload" className="primary-button ml-8">
            Upload Resume
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Narvbar;
