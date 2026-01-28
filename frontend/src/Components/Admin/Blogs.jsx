import React, { useEffect, useState } from "react";
import axios from "axios";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("http://localhost:5000/getBlog");
    if (response.data.status) {
      setBlogs(response.data.data);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    const deletedBy = JSON.parse(localStorage.getItem("user"));

    const response = await axios.post("http://localhost:5000/deleteBlog", {
      blogId,
      deletedBy: deletedBy._id,
    });

    if (response.data.status) {
      fetchBlogs();
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-xl p-4">
        <div className="p-2 font-semibold">Blogs</div>
        <table className="w-full border-collapse">
          <thead className="">
            <tr className="bg-slate-100">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Blog Content</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item) => (
              <tr key={item.id}>
                <td className="p-3 w-64">{item.title}</td>
                <td className="p-3 w-80">
                  <div className="h-60 overflow-auto break-words flex items-center justify-center">
                    {item.blogContent}
                  </div>
                </td>
                <td className="p-3">{item.createdBy?.adminName}</td>
                <td className="p-3">
                  <span
                    className={`rounded-full text-sm px-3 py-1 ${
                      item.blogStatus == "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.blogStatus}
                  </span>
                </td>
                <td className="p-3 ">{item.category}</td>
                <td className="p-3">
                  {new Date(item.createdDate).toLocaleDateString()}
                </td>
                <td className="gap-3 p-3 ">
                  <button className="text-blue-600 hover:underline pr-4">
                    edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
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

export default Blogs;
