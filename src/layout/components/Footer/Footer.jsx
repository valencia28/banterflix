import React from "react";
import "./Footer.style.css";
import banterflixLogo from "../../../images/banterflix_logo.png";

const Footer = () => {
  return (
    <div className="footer-area">
      <img src={banterflixLogo} alt="Banterflix logo" />
      <div className="footer-main-content">
        Banterflix is a website created for personal portfolio purposes. It is
        not intended for commercial use.
      </div>
      <div>Thank you.</div>
    </div>
  );
};

export default Footer;
