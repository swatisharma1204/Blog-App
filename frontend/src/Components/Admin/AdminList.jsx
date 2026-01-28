import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminList() {
    const [allAdmin, setAllAdmin] = useState([]);

    const getAdminData = async() => {
        const response = await axios.get("http://localhost:5000/getAdminData");
        if (response.data.status) {
          setAllAdmin(response.data.admin);
          console.log(response.data.admin)
        }
      };
    useEffect(() => {
      
      getAdminData();
    }, []);
    

    
    
  return (
    <>
      <div className="bg-white shadow-md rounded-xl p-4">
        <div className="p-2 font-semibold">Blogs</div>
        <table className="w-full border-collapse">
          <thead className="">
            <tr className="bg-slate-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allAdmin.map((item) => (
              <tr key={item.id}>
                <td className="p-3 w-64">{item.fullName}</td>
                <td className="p-3 w-64">{item.email}</td>
                <td className="p-3 w-64">{item.role}</td>
                
                
                
                
                
                <td className="gap-3 p-3 ">
                  <button className="text-blue-600 hover:underline pr-4">
                    edit
                  </button>
                  <button
                    
                    className="text-red-600 hover:underline"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default AdminList;
