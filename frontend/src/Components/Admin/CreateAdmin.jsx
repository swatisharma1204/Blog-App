import React, { useState } from "react";
import axios from "axios";

function CreateAdmin() {
  const [adminData, setAdminData] = useState({
    email: "",
    fullName: "",
    password: "",
    role: "Admin",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/createAdmin",
      adminData
    );

    console.log("Admin api call result: ", response);
  };
  return (
    <>
      <div className="p-6  w-2/4">
        <h2 className="font-semibold text-2xl mb-4">Create admin</h2>
        <form className="space-y-4">
          <div className="">
            <label className="block mb-1">Name</label>
            <input
              className="border p-2 w-full"
              placeholder="name"
              value={adminData.fullName}
              onChange={(e) => {
                setAdminData((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }));
              }}
            />
          </div>
          <div className="">
            <label className="block mb-1">Email</label>
            <input
              className="border p-2 w-full"
              placeholder="email"
              value={adminData.email}
              onChange={(e) => {
                setAdminData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
          </div>
          <div className="">
            <label className="block mb-1">Password</label>
            <input
              className="border p-2 w-full"
              placeholder="password"
              value={adminData.password}
              onChange={(e) =>
                setAdminData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <div className="">
            <label className="block mb-1">Role</label>
            <input
              className="border p-2 w-full"
              placeholder="password"
              value={adminData.role}
            />
          </div>

          <div>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
              onClick={handleClick}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateAdmin;
