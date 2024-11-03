import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Home/Loader";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const [Message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!Data.username || !Data.email || !Data.password) {
        alert("All fields are required");
      } else {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-in",
          Data
        );
        setData({ username: "", email: "", password: "" });
        setLoading(false);
        setMessage(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {Loading && (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      )}
      {Message && !Loading && (
        <div className="flex h-screen items-center justify-center">
          <div className="text-yellow-500 text-xl bg-zinc-800 border border-yellow-500 font-semibold rounded-lg px-6 py-4 shadow-lg">
            {Message}
          </div>
        </div>
      )}
      {!Message && !Loading && (
        <div className="flex flex-col w-full max-w-md px-8 py-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 mb-4 text-gray-200 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="username"
            value={Data.username}
            onChange={change}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 text-gray-200 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="email"
            value={Data.email}
            onChange={change}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 text-gray-200 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="password"
            value={Data.password}
            onChange={change}
          />
          <button
            onClick={submit}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
          >
            Sign Up
          </button>
          <div className="text-center mt-4">
            <Link to="/login" className="text-gray-400 hover:text-gray-200">
              Already have an account? Log in here
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
