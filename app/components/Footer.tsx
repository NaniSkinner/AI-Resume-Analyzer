import React from "react";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content flex flex-col items-center justify-center">
        <div className="footer-signature flex flex-row items-center justify-center font-semibold gap-2 text-neutral-600">
          <span>Created by</span>
          <img
            src="/images/m3.png"
            alt="Minds Matcha and Machines Logo"
            style={{
              width: "70px",
              height: "70px",
              maxWidth: "70px",
              maxHeight: "70px",
              objectFit: "contain",
            }}
          />
          <span>Minds, Matcha & Machines</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
