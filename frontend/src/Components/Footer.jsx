import React from "react";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="bg-purple-100 w-full p-12 items-center justify-center">
        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-44 lg:px-24 ">
          <div className="lg:w-80">
            <img src={logo} alt="logo" className="text-center w-auto h-24" />
            <p className="lg:ml-5">
              A platform to share insightful articles on technology, startups, lifestyle, and travel.
              We aim to inform, inspire, and encourage meaningful conversations through quality content.
            </p>
          </div>
          <div>
            <h1 className="font-bold mb-4">Quick Links</h1>
            <div className="flex flex-col gap-3">
                <Link to="#">Home</Link>
                <Link to="#">Help</Link>
                <Link to="#">Contact Us</Link>
                <Link to="#">FAQs</Link>
            </div>
          </div>
          <div>
            <h1 className="font-bold mb-4">Social media</h1>
            <div className="flex flex-col gap-3">
                <Link to="#">Instagram</Link>
                <Link to="#">Facebook</Link>
                <Link to="#">Twitter</Link>
                <Link to="#">Youtube</Link>
            </div>
          </div>
          
        </div>
        
        <div className="text-center mt-24 text-[14px] text-slate-600">Copyright © 2026 .Blog. All rights reserved.</div>
      </div>
    </>
  );
}
export default Footer;
