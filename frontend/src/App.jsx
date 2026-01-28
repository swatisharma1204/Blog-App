import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import AdminLayout from "./Components/Admin/AdminLayout";
import Dashboard from "./Components/Admin/Dashboard";
import BlogList from "./Components/blogList";
import CreateBlog from "./Components/Admin/CreateBlog";
import Blogs from "./Components/Admin/Blogs";
import EditProfile from "./Components/Admin/EditProfile";
import Comments from "./Components/Admin/Comments";
import { useLocation } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import CreateAdmin from "./Components/Admin/CreateAdmin";
import AdminList from "./Components/Admin/AdminList";

function App() {
  const location = useLocation();

  const isLayoutHidden  =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/addAdmin") ||
    location.pathname.startsWith("/adminList") ||
    location.pathname.startsWith("/createBlog") ||
    location.pathname.startsWith("/blogs") ||
    location.pathname.startsWith("/editProfile") ||
    location.pathname.startsWith("/comments") ||
    location.pathname.startsWith("/login")
  return (
    <>
      {!isLayoutHidden  && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogList/:id" element={<BlogList />} />

        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="addAdmin" element={<ProtectedRoute><CreateAdmin /></ProtectedRoute>} />
          <Route path="adminList" element={<ProtectedRoute><AdminList /></ProtectedRoute>} />
          <Route path="createBlog" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
          <Route path="blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
          <Route path="editProfile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="comments" element={<ProtectedRoute><Comments /></ProtectedRoute>} />
        </Route>
      </Routes>
      {!isLayoutHidden  && <Footer />}
    </>
  );
}

export default App;
