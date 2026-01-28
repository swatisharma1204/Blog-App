import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { FaUser } from "react-icons/fa6";

function Header() {
  return (
    <>
      <div className="w-full flex items-center justify-center bg-purple-100 px-6 lg:px-40">
        <div className="flex w-full gap-24 items-center">
          <div className="max-w-24">
            <NavLink to="/">
              <img src={logo} />
            </NavLink>
          </div>
        </div>
        <div className="w-40 h-12 flex gap-2 items-center bg-purple-400 hover:bg-purple-500 rounded-xl px-4 py-0">
          <FaUser />
          <NavLink to="/login">
            <button>Admin login</button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
