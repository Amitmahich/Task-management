import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  if (isLoggedIn === true) {
    history("/");
  }

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/log-in",
          Data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-6 w-5/6 md:w-4/6 lg:w-2/6 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
        <div className="text-3xl font-bold text-center text-blue-400 mb-6">Log In</div>
        
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-700 px-4 py-2 my-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-white"
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-700 px-4 py-2 my-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-white"
          name="password"
          value={Data.password}
          onChange={change}
        />
        
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={submit}
          >
            Log In
          </button>
          <Link to="/signup" className="text-gray-400 hover:text-gray-200 mt-3 lg:mt-0 lg:ml-4 transition duration-300">
            Not having an account? Sign Up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
