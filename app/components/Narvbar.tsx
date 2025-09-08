import React from "react";
import { Link } from "react-router";

const Narvbar = () => {
  return (
    <nav className="narvbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">RESUMIND</p>
      </Link>
      <Link to="/upload" className="primary-button w-fit">
        Upload Resume
      </Link>
    </nav>
  );
};

export default Narvbar;
