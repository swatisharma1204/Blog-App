import React from "react";
import { useState, useEffect } from "react";
import techImg from "../assets/tech-sec1.webp";
import axios from "axios";
import { useParams } from "react-router-dom";

function BlogList() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [blog, setBlog] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(
        `http://localhost:5000/getBlogById/${id}`
      );
      if (response.data.status) {
        setBlog(response.data.data);
        console.log("Blog data including image: ", response.data.data);
        setAuthorName(response.data.data.createdBy.adminName);
        setCreatedDate(response.data.data.createdDate);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get("http://localhost:5000/getComments");
      if (response.data.status) {
        setComments(response.data.data);
      }
    };
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (!name.trim()) return;
    const blog = JSON.parse(localStorage.getItem("blog"));
    console.log(blog);

    const response = await axios.post("http://localhost:5000/setComment", {
      userName: name,
      text,
      blogId: blog._id,
      blogTitle: blog.title,
    });
    console.log(response);
    const newComment = {
      id: Date.now(),
      name,
      text,
      date: new Date().toLocaleString(),
    };

    setComments([newComment, ...comments]);
    setName("");
    setText("");
  };

  return (
    <>
      <div class="min-h-screen flex flex-col mt-4">
        <div class="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-10 py-6">
          {/* <!-- BLOG CONTENT --> */}
          <div class="flex-1 lg:w-[600px]">
            <div class="text-xl lg:text-3xl font-bold mb-4">{blog?.title}</div>

            <div class="w-full h-72 rounded-xl overflow-hidden mb-6">
              <img src={blog?.image} class="w-full h-full object-cover" />
            </div>

            <div class="space-y-5 leading-7 text-gray-700 whitespace-pre-line">
              <p>{blog?.blogContent}</p>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-gray-600">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                {authorName?.charAt(0)}
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-xs uppe
                rcase tracking-wide text-gray-400">
                  Written by
                </span>
                <span className="font-medium text-gray-900">
                  {authorName}
                  <span className="mx-2 text-gray-300">•</span>
                  {new Date(createdDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-12 border-t pt-8">
              <div className="text-xl font-semibold mb-4">Comments</div>

              {/* Input area */}
              <div className="flex flex-col gap-4 p-4 rounded-2xl border bg-gray-50">
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium">Your Name *</div>
                  <input
                    className="border rounded-xl px-4 py-2 outline-none focus:ring w-full"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium">Your Comment</div>
                  <textarea
                    className="border rounded-xl px-4 py-2 outline-none focus:ring w-full min-h-[100px]"
                    placeholder="Write a comment…"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                <div>
                  <button
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50"
                    disabled={!name.trim()}
                    onClick={handleAddComment}
                  >
                    Post Comment
                  </button>
                </div>
              </div>

              {/* Comment list */}
              <div className="mt-6 flex flex-col gap-4">
                {comments.map((c) => (
                  <div key={c.id} className="border rounded-2xl p-4 bg-white">
                    <div className="font-semibold">{c.userName}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(c.createdDate).toLocaleDateString()}
                    </div>
                    <div className="mt-2">{c.text}</div>
                  </div>
                ))}

                {comments.length === 0 && (
                  <div className="text-gray-500 text-sm">
                    No comments yet — be the first!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <!-- SIDEBAR --> */}
          <div class="w-full lg:w-80 flex flex-col gap-6">
            <div class="border rounded-xl p-5">
              <div class="font-semibold mb-3">Categories</div>
              <div class="flex flex-col gap-2 text-sm text-gray-600">
                <span>Technology</span>
                <span>Startup</span>
                <span>Lifestyle</span>
                <span>Tourism</span>
              </div>
            </div>

            <div class="border rounded-xl p-5">
              <div class="font-semibold mb-3">Recent Posts</div>
              <div class="flex flex-col gap-2 text-sm text-gray-600">
                <span>Top 10 </span>
                <span>Travel Guide to the Himalayas</span>
                <span>Getting Started With AWS</span>
              </div>
            </div>

            <div class="border rounded-xl p-5">
              <div class="font-semibold mb-3">Subscribe</div>
              <div class="text-sm text-gray-600 mb-3">
                Get the latest posts delivered to your inbox.
              </div>
              <input
                class="w-full border rounded-lg p-2 mb-3 text-sm"
                placeholder="Enter your email"
              />
              <button class="w-full bg-blue-600 text-white rounded-lg py-2 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BlogList;
