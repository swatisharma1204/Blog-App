import React, { useState } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function CreateBlog() {
  // const [title, setTitle] = useState("");
  // const [blogContent, setBlogContent] = useState("");
  // const [blogStatus, setBlogStatus] = useState("");
  // const [allBlogs, setAllBlogs] = useState([]);
  // const [category, setCategory] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  
  const [blogData, setBlogData] = useState({
    title: "",
    blogContent: "",
    image: null,
    blogStatus: "",
    category: "",
    userId: user._id,
  });

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", blogData.image);
    formData.append("upload_preset", "blog_images");
    formData.append("cloud_name", "dzcaeu9ht");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dzcaeu9ht/image/upload",
      formData
    );
    return response.data.secure_url;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blogData.title || !blogData.image) {
      alert("Title and image required");
      return;
    }
    const token = localStorage.getItem("token");
    const imageUrl = await uploadImageToCloudinary();

    const response = await axios.post(
      "http://localhost:5000/createBlog",
      {...blogData, image: imageUrl},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status) {
      alert("Blog added successfully!");
      const blog = {
        _id: response.data.response._id,
        title: response.data.response.title,
      };
      localStorage.setItem("blog", JSON.stringify(blog));
      console.log("blog response", response);
    }

    // const response = await axios.post("http://localhost:5000/createBlog", {
    //   // title:blogData.title,
    //   // blogContent: blogData.blogContent,
    //   // blogStatus: blogData.blogStatus,
    //   // category: blogData.category,
    //   ...blogData,
    //   // createdBy: {
    //   //   _id: user._id,
    //   //   adminName: user.userName,
    //   // },
    //   userId: user._id,
    // });
  };
  return (
    <>
      <div className="p-6 shadow-md rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Add Blogs</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              value={blogData.title}
              onChange={(e) => {
                setBlogData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
                // setBlogData({
                //   title: e.target.value,
                //   blogContent: blogData.blogContent,
                //   blogStatus: blogData.blogStatus,
                //   category:  blogData.category
                // }) 
              }}
              className="w-full border rounded-md p-2"
              placeholder="Enter blog title"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Content</label>
            <textarea
              className="w-full border rounded-md p-2 h-32"
              placeholder="Content"
              value={blogData.blogContent}
              onChange={(e) =>
                setBlogData({
                  title: blogData.title,
                  blogContent: e.target.value,
                  image: blogData.image,
                  blogStatus: blogData.blogStatus,
                  userId: user._id,
                  category: blogData.category,
                })
              }
            />
          </div>

          {/* Image upload section */}
          <div>
            <label className="block text-sm mb-1">Image Upload</label>
            <input 
              type="file"
              accept="image/*"
              onChange={(e) => 
                setBlogData({
                  title: blogData.title,
                  blogContent: blogData.blogContent,
                  image: e.target.files[0],
                  blogStatus: blogData.blogStatus,
                  userId: user._id,
                  category: blogData.category,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              value={blogData.blogStatus}
              onChange={(e) =>
                setBlogData({
                  title: blogData.title,
                  blogContent: blogData.blogContent,
                  image: blogData.image,
                  blogStatus: e.target.value,
                  category: blogData.category,
                })
              }
              className="bg-slate-200 rounded "
            >
              <option value="">Select status</option>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
          <div>
            <Autocomplete
              disablePortal
              options={["Technology", "Startup", "Lifestyle", "Tourism"]}
              sx={{ width: 300 }}
              value={blogData.category} 
              onChange={(e, val) => {
                setBlogData({
                  title: blogData.title,
                  blogContent: blogData.blogContent,
                  image: blogData.image,
                  blogStatus: blogData.blogStatus,
                  userId: user._id,
                  category: val,
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
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
export default CreateBlog;
