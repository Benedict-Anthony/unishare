import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { NavBar } from "./NavBar";
import Auth from "./Auth";
import Hambugger from "./Hambugger";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.querySelector(".navbar")?.classList.remove("open");
    setOpen(false);
  }, [location.pathname]);
  return (
    <header className="py-1 px-1 shadow relative">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <NavBar open={open} />
        <Auth />
        <Hambugger open={open} onClick={() => setOpen(!open)} />
      </div>
    </header>
  );
};

export default Header;
