import React from "react";
import { NavLink } from "react-router-dom";
type NavBarProps = {
  open: boolean;
};
export const NavBar = ({ open }: NavBarProps) => {
  return (
    <ul className={`navbar ${open && "open"}`}>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About</NavLink>
      </li>
      <li>
        <NavLink to={"/books"}>Books</NavLink>
      </li>
    </ul>
  );
};
