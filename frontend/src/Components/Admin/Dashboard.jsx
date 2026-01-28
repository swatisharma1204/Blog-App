import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaPenNib } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalAdmins: 0,
    totalComments: 0,
    publishedBlogs: 0,
    draft: 0,
  });

  const data = [
    { name: "Admin1", blogs: 5 },
    { name: "Admin2", blogs: 3 },
    { name: "Admin3", blogs: 8 },
    { name: "Admin4", blogs: 1 },
  ];

  const pieChartData = [
    { name: "Published", value: stats.publishedBlogs },
    { name: "Unpublished", value: stats.draft },
  ];

  const blogs = [
    {
      id: 1,
      title: "First Blog",
      author: "Admin 1",
      status: "Published",
      date: "2026-01-03",
    },
    {
      id: 2,
      title: "Second Blog",
      author: "Admin 2",
      status: "Draft",
      date: "2026-04-03",
    },
    {
      id: 3,
      title: "Second Blog",
      author: "Admin 2",
      status: "Draft",
      date: "2026-04-03",
    },
    {
      id: 4,
      title: "Second Blog",
      author: "Admin 2",
      status: "Draft",
      date: "2026-04-03",
    },
  ];

  const COLORS = ["#8884d8", "#ADA5FF"];

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get("http://localhost:5000/getStats");
      if (response.data.status) {
        setStats(response.data.data);
      }
    };
    fetchStats();
  }, []);
  return (
    <>
      <div className="bg-[#f9fafb] py-12">
        {/* CARD */}
        <div className="flex  items-center justify-center pt-4 gap-20">
          <div className="flex flex-col gap-8 blog-color w-[300px] h-44 px-6 py-8 rounded-2xl  border shadow-md bg-[#e1defb]">
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-blue-900 font-semibold">
                Total blogs{" "}
              </h1>
              <div className="bg-[#f2f4f7] p-3 text-xl rounded-lg flex items-center justify-center">
                <FaPenNib className="inline text-blue-900" />
              </div>
            </div>
            <p className="font-bold text-4xl text-slate-900">
              {stats.totalBlogs}
            </p>
          </div>
          <div className="flex flex-col gap-8 blog-color2 w-[300px] h-44 px-6 py-8 rounded-2xl border shadow-md bg-[#e1defb]">
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-blue-900 font-semibold">
                Total Comments{" "}
              </h1>
              <div className="bg-[#f2f4f7] p-3 text-xl rounded-lg flex items-center justify-center">
                <FaRegComments className="inline text-blue-900" />
              </div>
            </div>
            <p className="font-bold text-4xl text-slate-900">
              {stats.totalComments}
            </p>
          </div>
          <div className="flex flex-col gap-8 blog-color3 w-[300px] h-44 px-6 py-8 rounded-2xl border shadow-md bg-[#e1defb]">
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-blue-900 font-semibold">
                Total Admins{" "}
              </h1>
              <div className="bg-[#f2f4f7] p-3 text-xl rounded-lg flex items-center justify-center">
                <FaRegUser className="inline text-blue-900" />
              </div>
            </div>
            <p className="font-bold text-4xl text-slate-900">
              {stats.totalAdmins}
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center justify-center mt-12">
          {/* BAR CHART */}
          <div className="p-4 pt-3 border w-[500px] bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold pb-1">Blogs by Admin</h2>
            <BarChart width={400} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar fill="#8884d8" dataKey="blogs" />
            </BarChart>
          </div>

          {/* PIE CHART */}
          <div className="bg-white border rounded-lg w-[500px] p-4 shadow-md">
            <h2 className="text-lg font-semibold">Blog status</h2>
            <PieChart width={350} height={300}>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <div className="flex gap-4 m-8">
          <div className="flex flex-col gap-2">
            <div className="w-[300px] h-40 bg-white shadow-lg p-4 rounded-lg border">
              <h2 className="text-lg font-semibold mb-4">Recent Blogs</h2>
              <p>126</p>
              <p>+12 this month</p>
            </div>
            <div className="w-[300px] h-40 bg-[#7267ef] shadow-lg rounded-lg p-4 border text-white">
              <h2 className="text-lg font-semibold mb-4">Recent Updates</h2>
              <p>126</p>
              <p>+12 this month</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-[300px] h-40 bg-[#7267ef] shadow-lg rounded-lg p-4 border text-white">
              <h2 className="text-lg font-semibold mb-4">Recent Comments</h2>
              <p>126</p>
              <p>+12 this month</p>
            </div>
            <div className="w-[300px] h-40 bg-white shadow-lg rounded-lg p-4 border">
              <h2 className="text-lg font-semibold mb-4">
                Recent Activity Panel
              </h2>
              <p>126</p>
              <p>+12 this month</p>
            </div>
          </div>
          <div className="border shadow-lg w-full rounded-lg p-4 bg-white">
            <h2 className="text-lg mb-5 p-1">Recent blogs</h2>
            <table className="w-full border-collapse">
              <thead className="">
                <tr className="text-slate-500 text-[12px] border-b border-t">
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Author</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((item) => (
                  <tr key={item.id} className="text-[13px]">
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{item.author}</td>
                    <td className="p-3">
                      <span
                        className={`rounded-full text-[12px] px-3 py-1 ${
                          item.status == "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>{item.date}</td>
                    <td className="flex gap-3 p-3 ">
                      <button className="text-blue-600 hover:underline">
                        edit
                      </button>
                      <button className="text-red-600 hover:underline">
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
