import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function Comments() {
  const [blogComments, setBlogComments] = useState([]);

  const fetchComments = async () => {
    const response = await axios.get("http://localhost:5000/getComments");
    if (response.data.status) {
      setBlogComments(response.data.data);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (commentId) => {
    const response = await axios.post(
      `http://localhost:5000/deleteComment/${commentId}`
    );
    if (response.data.status) {
      fetchComments();
    }
  };

  return (
    <>
      <div className="shadow-md rounded-xl p-4">
        <h2 className="text-2xl mb-4 font-semibold">Comments</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-300">
              <th className="p-3 text-left">Blog title</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Comment</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogComments.map((item, index) => (
              <tr>
                <td className="p-3">{item.blogTitle}</td>
                <td className="p-3">{item.userName}</td>
                <td className="p-3">{item.text}</td>
                <td className="p-3">
                  {new Date(item.createdDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
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
export default Comments;
