import React from "react";
import { Link } from "react-router";

const Narvbar = () => {
  return (
    <div className="w-full flex justify-center p-4">
      <nav className="navbar shadow-lg backdrop-blur-sm bg-white/90">
        <Link to="/">
          <p className="text-2xl font-bold text-gradient">MATCHARESUME</p>
        </Link>
        <Link to="/upload" className="primary-button w-fit">
          Upload Resume
        </Link>
      </nav>
    </div>
  );
};

export default Narvbar;
