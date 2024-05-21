import React from "react";
import logo from "../../assets/share.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="w-10 h-10 p-1 relative z-10 bg-gray-100 rounded-lg">
      <Link to={"/"}>
        <img src={logo} alt="Uniben Store" className="w-full h-full" />
      </Link>
    </div>
  );
};

export default Logo;
