import axios from "axios";
import React, { useState } from "react";
import { render } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const initial = { username: "", password: "" };
  const [credential, setcredential] = useState(initial);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://cr-mbackend-eosin.vercel.app/signup/Admin", {
        username: credential.username,
        password: credential.password,
      });
      // const json = await response.json()
      // //console.log(json);
      if (response.data.success === true) {
        //console.log(response.data);
      }
      setcredential(initial);
      alert("Welcome you are Logged In !!");
      navigate("/");
    } catch (error) {
      //console.log(error);

    }
  };

  const onchange = (event) => {
    setcredential({ ...credential, [event.target.name]: event.target.value });
  };

  return (
    <div className="bg-gradient-to-r h-screen from-[#E9EBFD] to-[#F8B3E5] p-[100px]">
      <div className="flex justify-evenly p-2  text-theme-primary">
        <div className="px-[40px] mt-[150px] space-y-2 ">
          <img className="h-[100px] w-[120px]" src="edu123.png" alt="" />
          <p className="text-[36px]  ">Customer Relationship Management</p>
          <p className="text-[48px] font-medium  "> Dashboard</p>
        </div>

        <div className="bg-white rounded-[20px] py-[80px] px-[40px] space-y-3 shadow-md shadow-[#00000056]">
          <div>
            <img src="Vactor.svg" alt="" />
            <p className=" text-[36px] py-3">Admin Login</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col ">
              <label htmlFor="" className=" text-[20px] py-2">
                Username
              </label>
              <input
                type="text"
                className="h-[40px] w-[400px] rounded-[10px] bg-background-secondary p-2"
                name="username"
                value={credential.username}
                onChange={onchange}
              />
            </div>

            <div className="flex flex-col ">
              <label htmlFor="" className=" text-[20px] py-2">
                Password
              </label>
              <input
                type="password"
                className="h-[40px] w-[400px] rounded-[10px] bg-background-secondary p-2"
                name="password"
                value={credential.password}
                onChange={onchange}
              />
            </div>
            <div className="pt-8">
              <button
                type="submit"
                className="gap-5 bg-gradient-to-r  from-[#6C4000] to-[#E10000] h-[40px] w-[200px] text-[16px]  text-white rounded-[10px]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
