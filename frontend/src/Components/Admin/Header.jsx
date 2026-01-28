import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoIosLogOut } from "react-icons/io";
import { TbLogs } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import Backdrop from "@mui/material/Backdrop";
import { CiUser } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function Header() {
  const [open, setOpen] = React.useState(false);
  const [adminName, setAdminName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "28%",
    left: "91%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    p: 2,
  };

  // useEffect(() => {
  //   const adminData = (localStorage.getItem("user"));
  //   console.log("admin name",adminData.fullName)
  // }, [adminName])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login")
  }

  return (
    <>
      <div className="flex w-full h-full p-3  shadow-md items-center justify-between border">
        <div className="border p-2 rounded-md ml-2">
          <RxHamburgerMenu />
        </div>
        <div className="flex gap-4 mr-4">
          <div>
            <LuBellRing />
          </div>
          <div className="cursor-pointer">
            <FaUserAlt onClick={handleOpen}/>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              slots={{backdrop: Backdrop}}
              slotProps={{
                backdrop: {
                  sx: {
                    backgroundColor: "rgba(0,0,0,0)",
                  },
                },
              }}
            >
              <Box sx={style} className="shadow-sm shadow-slate-400">
                <Typography id="modal-modal-title" variant="h6" component="h2" >
                  <div className="flex flex-col items-center">
                    <FaUserAlt className="text-3xl border rounded-full border-gray-950 p-1"/>
                    <p className="text-[12px] font-semibold mt-3">Admin Name</p>
                    <div className="border border-slate-300 w-full"></div>
                  </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className="flex flex-col gap-3 items-start justify-center">
                    <div><CiUser className="inline mr-2"/><span className="text-[12.8px] font-medium text-slate-600">Profile</span></div>
                    <div><RxDashboard className="inline mr-2"/><span className="text-[12.8px] font-medium text-slate-600">Dashboard</span></div>
                    <div><CiSettings className="inline mr-2"/><span className="text-[12.8px] font-medium text-slate-600">Settings</span></div>
                    <div><TbLogs className="inline mr-2"/><span className="text-[12.8px] font-medium text-slate-600">Blogs</span></div>
                    <div onClick={() => handleLogout()} className="cursor-pointer"><IoIosLogOut className="inline mr-2"/><span className="text-[12.8px] font-medium text-slate-600">Logout</span></div>
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
