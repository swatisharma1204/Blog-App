import React from "react";
import { useState, useEffect } from "react";
import BhutanImg from "../assets/Bhutan.jpg";
import SikkimImg from "../assets/Sikkim.jpg";
import TextField from "@mui/material/TextField";
import { NavLink } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await axios.get("http://localhost:5000/getBlog");

    if (response.data.status) {
      setBlogs(response.data.data);
      setFilteredBlogs(response.data.data);
    }
  };

  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category == "All") {
      setFilteredBlogs(blogs);
      return;
    }
    const filtered = blogs.filter((blog) => blog.category === category);
    setFilteredBlogs(filtered);
  };

  return (
    <>
      <div className="w-full p-8">
        <div className="flex flex-col items-center justify-center py-14">
          <div className="max-w-2xl text-center">
            <h1 className="text-3xl lg:text-5xl font-semibold">
              Discover <span className="text-purple-800">Stories</span> Worth
              Reading
            </h1>
          </div>
          <div className="max-w-3xl text-center mt-8 mb-6 text-slate-500 font-semibold">
            <p>
              Dive into a collection of articles, ideas, and insights across
              topics that matter. Explore, learn, and get inspired — one post at
              a time.
            </p>
          </div>
          <div>
            <input
              placeholder="Search for blogs"
              className="border border-slate-500 p-4"
            />
          </div>
        </div>

        {/* CARD */}
        <div className="flex flex-col gap-16 items-center justify-center">
          <div className="max-w-20 flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-10 ">
            {["All", "Technology", "Startup", "Lifestyle", "Tourism"].map(
              (item) => (
                <div
                  key={item}
                  onClick={() => filterByCategory(item)}
                  className={`cursor-pointer rounded-full px-4 py-1 transition
                    ${activeCategory == item ? "bg-purple-500" : "bg-slate-100"}
                  `}
                >
                  {item}
                </div>
              )
            )}

            {/* <div onClick={() => filterByCategory("All")} className="bg-purple-500 rounded-full px-4 py-1 cursor-pointer">All</div>
            <div onClick={() => filterByCategory("Technology")} className="cursor-pointer">Technology</div>
            <div onClick={() => filterByCategory("Startup")} className="cursor-pointer">Startup</div>
            <div onClick={() => filterByCategory("Lifestyle")} className="cursor-pointer">Lifestyle</div>
            <div onClick={() => filterByCategory("Tourism")} className="cursor-pointer">Tourism</div> */}
          </div>

          <div className="flex flex-wrap gap-8 w-5/6">
            {filteredBlogs.map((blog) => (
              <NavLink
                key={blog._id}
                to={`/blogList/${blog._id}`}
                className="w-full sm:w-[48%] lg:w-[22%]"
              >
                <div className="shadow-2xl rounded-md flex flex-col h-[375px]">
                  <img
                    // src={BhutanImg}
                    src={blog.image}
                    alt=""
                    className="w-full h-40 rounded-t-xl"
                  />
                  <div className="p-4 flex flex-col gap-2">
                    <div className="bg-purple-200 w-24 text-center rounded-full px-2 py-1 text-sm">
                      {blog.category || "General"}
                    </div>

                    <h1 className="font-semibold text-[16px]">{blog.title}</h1>

                    <p className="text-sm text-gray-600 line-clamp-3">
                      {blog.blogContent}
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 mt-16 lg:mt-36 gap-6">
          <h1 className="font-bold text-3xl">Never Miss a Blog!</h1>
          <p>Subscribe to get the latest blog, tech and exclusive news</p>
          <div className="max-lg:flex mt-4">
            <TextField
              id="outlined-basic"
              className="lg:w-96"
              label="Enter your email id"
              variant="outlined"
            />
            <button className="bg-purple-400 p-2 lg:p-4 rounded-r-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage;
