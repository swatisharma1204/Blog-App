import React from "react";

function EditProfile() {
  return (
    <>
      <div className="p-6 w-2/4">
        <h2 className="font-semibold text-2xl mb-4">Edit Profile</h2>
        <form className="space-y-4">
          <div className="">
            <label className="block mb-1">Name</label>
            <input type="text" className="border p-2 w-full" placeholder="name" />
          </div>
          <div className="">
            <label className="block mb-1">Email</label>
            <input type="text" className="border p-2 w-full" placeholder="email" />
          </div>
          <div className="">
            <label className="block mb-1">Password</label>
            <input type="password" className="border p-2 w-full" placeholder="password" />
          </div>
          <div className="">
            <label className="block mb-1">Upload Image</label>
            <input
              type="file"
              className="border p-2 w-full"
              placeholder="profile"
            />
          </div>
          <div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default EditProfile;
