import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

function AdminLayout() {
  return (
    <>
      <div className="min-h-screen flex">
        <div><SideBar/></div>
        <div className="flex flex-col flex-1">
          <div><Header/></div>
          <div className="flex-1 "><Outlet/></div>
        </div>
      </div>
    </>
  );
}
export default AdminLayout;
