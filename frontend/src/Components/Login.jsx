import React from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    if (response.data.status) {
      navigate("/dashboard");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.response));
    }
    console.log("Data: ", response.data.response);
  };

  return (
    <>
      <div className="max-h-screen bg-blue-50 w-full flex items-center justify-center p-12 pt-24 pb-24">
        <div className="flex flex-col gap-6 bg-white rounded-md w-[24rem] h-[33rem] shadow-xl p-8">
          <p className="text-sm text-slate-400">Please enter your details</p>
          <h1 className=" text-3xl font-semibold mb-8">Admin Login</h1>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
          type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <p>
            <Checkbox className="inline" />
            Show password
          </p>
          <button
            onClick={handleSubmit}
            className="bg-purple-400 hover:bg-purple-500 rounded py-3 "
          >
            Submit
          </button>
          <p className="text-center">Forgot password?</p>
        </div>
      </div>
    </>
  );
}

export default Login;
