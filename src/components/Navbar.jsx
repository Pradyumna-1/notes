import { NavLink } from "react-router-dom";
import { NavbarData } from "../data/Navbar";


const Navbar = () => {
  return (
    <div className=" w-full h-[60px] flex flex-row gap-4 text-center justify-center p-4 bg-gray-800 gap-x-5">
      {NavbarData.map((link, ind) => (
        <NavLink
          key={ind}
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
  );
};

export default Navbar;



