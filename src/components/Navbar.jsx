import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" w-full h-[60px] flex flex-row gap-4 text-center justify-center p-4 bg-gray-500 text-xl">
      <button className="gap-2 flex flex-row border rounded-sm">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/notes">Notes</NavLink>
      </button>
    </div>
  );
};

export default Navbar;
/*
<div className="w-full h-[45px] flex justify-center items-center p-4 bg-gray-800 gap-x-5">
      {NavbarData.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.path}
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold text-xl"
              : "text-white font-medium text-xl"
          }
        >
          {link.title}
        </NavLink>
      ))}
    </div>
    */