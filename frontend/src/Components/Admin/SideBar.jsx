import React from "react";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegComments } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";

function SideBar() {
  return (
    <>
      <div className="h-full w-64 border-r-2">
        <div>
          <h1 className="font-bold text-2xl p-5 mb-3 ml-4">.BLOG</h1>
          <div className="pl-4 text-slate-400 text-[12px] font-semibold">MENU</div>
          <div className="flex lg:flex-col gap-5 p-4 ">
            <NavLink to="/dashboard">
              <div className="p-2 flex items-center  gap-3 rounded-xl text-blue-600 bg-[#ecf3ff]"><IoHomeOutline className="text-blue-600 text-xl inline"/>Dashboard</div>
            </NavLink>
            <NavLink to="/addAdmin">
              <div className="p-2 flex items-center gap-3"><IoPersonAddSharp className="text-xl inline text-slate-500"/>Add admin</div>
            </NavLink>
            <NavLink to="/adminList">
              <div className="p-2 flex items-center gap-3"><FaListUl className="text-xl inline text-slate-500"/>Admin List</div>
            </NavLink>
            <NavLink to="/createBlog">
              <div className="p-2 flex items-center gap-3"><FaRegPenToSquare className="text-xl inline text-slate-500"/>Add blogs</div>
            </NavLink>
            <NavLink to="/blogs">
              <div className="p-2 flex items-center gap-3"><FaListUl className="text-xl inline text-slate-500"/>Blog List</div>
            </NavLink>
            <NavLink to="/editProfile">
              <div className="p-2 flex items-center gap-3"><FaRegCircleUser className="text-xl inline text-slate-500"/>Edit Profile</div>
            </NavLink>
            <NavLink to="/comments">
              <div className="p-2 flex items-center gap-3"><FaRegComments className="text-xl inline text-slate-500"/>Comments</div>
            </NavLink>
            <NavLink to="/settings">
              <div className="p-2 flex items-center gap-3"><IoSettingsOutline className="text-xl inline text-slate-500"/>Settings</div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;