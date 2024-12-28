import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-4 text-center place-content-center">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/notes">Notes</NavLink>
    </div>
  );
};

export default Navbar;
