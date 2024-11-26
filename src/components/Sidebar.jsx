import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const [isadmin, setIsadmin] = useState(false);
  useEffect(() => {
    const token_object = JSON.parse(localStorage.getItem("authToken"));

    setIsadmin(token_object.user.isadmin);
  }, []);

 
  const initial = {
    l1: false,
    l2: false,
    l3: false,
    l4:false,
    l5:false,
    l6:false,  
  };

 
  const [list, setList] = useState(initial);
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const updatedList = { ...initial }; // Reset all to false

    if (pathname === "/") {
      updatedList.l1 = true;
    } else if (pathname === "/NewEnquires") {
      updatedList.l2 = true;
    } else if (pathname === "/conTable") {
      updatedList.l3 = true;
    } else if (pathname === "/Man") {
      updatedList.l4 = true;
    } else if (pathname === "/Schools") {
      updatedList.l5 = true;
    }
    else if (pathname === "/report") {
      updatedList.l6 = true;
    }


    setList(updatedList);
  }, [location.pathname]);

  function handleList(number) {
    setList({ ...list, [number]: true });
  }

  const navigate = useNavigate();

  function handlelogout() {
    localStorage.removeItem("authToken");
    logout();
    alert("user is logged out");
    navigate("/User");
  }

  return (
    <>
      <div className="flex flex-col bg-white h-[100%]  w-[15.5%]  fixed z-10 top-0 left-0 overflow-hidden pt-[20px] bg-black  text-white py-[20px] px-[15px] justify-between shadow-[0_3px_5px_0.5px_rgba(0,0,0,0.2)] ">
        <div className="flex flex-col justify-between h-[316px] bg-white text-black gap-20">
          <div className="text-[#000] mx-auto">
            <img
              className="h-[50px] w-[63px]"
              src="./edu123.png"
              alt="edu123"
            />
          </div>
          <div>
            <ul className="flex flex-col  pb-[5px] font-normal text-theme-primary ">
              <Link to="/" onClick={()=>handleList('l1')} className={`${isadmin ? `block` : `hidden`}`}>
                <li className={`flex gap-2 px-1 h-[40px] py-2 ${list.l1?`bg-theme-primary text-white`:`bg-white text-theme-primary`} hover:bg-theme-primary hover:text-white rounded hover:shadow-md `}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 16H5V5h14zM9 17H7v-5h2zm4 0h-2V7h2zm4 0h-2v-7h2z"
                    />
                  </svg>
                  Analystics and Stats
                </li>
              </Link>

              <Link to="/NewEnquires">
                <li
                   onClick={()=>handleList('l2')}
                  className={` flex gap-2 px-1 h-[40px] py-2 ${list.l2?`bg-theme-primary text-white`:`bg-white text-theme-primary`} hover:bg-theme-primary hover:text-white rounded hover:shadow-md`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m17 21l1.8 1.77c.5.5 1.2.1 1.2-.49V18l2.8-3.4A1 1 0 0 0 22 13h-7c-.8 0-1.3 1-.8 1.6L17 18zm-2-1H2v-3c0-2.7 5.3-4 8-4c.6 0 1.3.1 2.1.2c-.2.6-.1 1.3.1 1.9c-.7-.1-1.5-.2-2.2-.2c-3 0-6.1 1.5-6.1 2.1v1.1h10.6l.5.6zM10 4C7.8 4 6 5.8 6 8s1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4m0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2"
                    />
                  </svg>
                  New Enquires{" "}
                </li>
              </Link>
              <Link to="/conTable">
                {" "}
                <li
                  onClick={()=>handleList('l3')}
                  className={`flex gap-2 px-1  h-[40px] py-2 ${list.l3?`bg-theme-primary text-white`:`bg-white text-theme-primary`} hover:bg-theme-primary hover:text-white rounded hover:shadow-md`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        d="m13.5 7l3.5 3.5m-10 3l3.5 3.5m0-10L7 10.5m10 3L13.5 17"
                      />
                      <circle cx="12" cy="5.5" r="2" />
                      <circle cx="12" cy="18.5" r="2" />
                      <circle cx="5.5" cy="12" r="2" />
                      <circle cx="18.5" cy="12" r="2" />
                    </g>
                  </svg>
                  Ongoing Enquires
                </li>
              </Link>
              <Link to="/Man"  onClick={()=>handleList('l4')} className={`${isadmin ? `block` : `hidden`}`}>
                {" "}
                <li className={`flex gap-2 px-1 h-[40px] py-2 ${list.l4?`bg-theme-primary text-white`:`bg-white text-theme-primary`} hover:bg-theme-primary hover:text-white rounded hover:shadow-md`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 5a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 12 12a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 5m0 2a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 10a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 7M5.5 8A2.5 2.5 0 0 0 3 10.5c0 .94.53 1.75 1.29 2.18c.36.2.77.32 1.21.32c.44 0 .85-.12 1.21-.32c.37-.21.68-.51.91-.87A5.42 5.42 0 0 1 6.5 8.5v-.28c-.3-.14-.64-.22-1-.22m13 0c-.36 0-.7.08-1 .22v.28c0 1.2-.39 2.36-1.12 3.31c.12.19.25.34.4.49a2.482 2.482 0 0 0 1.72.7c.44 0 .85-.12 1.21-.32c.76-.43 1.29-1.24 1.29-2.18A2.5 2.5 0 0 0 18.5 8M12 14c-2.34 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.66-3.5-7-3.5m-7.29.55C2.78 14.78 0 15.76 0 17.5V19h3v-1.93c0-1.01.69-1.85 1.71-2.52m14.58 0c1.02.67 1.71 1.51 1.71 2.52V19h3v-1.5c0-1.74-2.78-2.72-4.71-2.95M12 16c1.53 0 3.24.5 4.23 1H7.77c.99-.5 2.7-1 4.23-1"
                    />
                  </svg>
                  Manage Counsellors
                </li>
              </Link>
              <Link to="/Schools"  onClick={()=>handleList('l5')} className={`${isadmin ? `block` : `hidden`}`}>
                {" "}
                <li className={`flex gap-2 px-1 h-[40px] py-2 ${list.l5?`bg-theme-primary text-white`:`bg-white text-theme-primary`} hover:bg-theme-primary hover:text-white rounded hover:shadow-md`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 5a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 12 12a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 5m0 2a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 10a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 7M5.5 8A2.5 2.5 0 0 0 3 10.5c0 .94.53 1.75 1.29 2.18c.36.2.77.32 1.21.32c.44 0 .85-.12 1.21-.32c.37-.21.68-.51.91-.87A5.42 5.42 0 0 1 6.5 8.5v-.28c-.3-.14-.64-.22-1-.22m13 0c-.36 0-.7.08-1 .22v.28c0 1.2-.39 2.36-1.12 3.31c.12.19.25.34.4.49a2.482 2.482 0 0 0 1.72.7c.44 0 .85-.12 1.21-.32c.76-.43 1.29-1.24 1.29-2.18A2.5 2.5 0 0 0 18.5 8M12 14c-2.34 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.66-3.5-7-3.5m-7.29.55C2.78 14.78 0 15.76 0 17.5V19h3v-1.93c0-1.01.69-1.85 1.71-2.52m14.58 0c1.02.67 1.71 1.51 1.71 2.52V19h3v-1.5c0-1.74-2.78-2.72-4.71-2.95M12 16c1.53 0 3.24.5 4.23 1H7.77c.99-.5 2.7-1 4.23-1"
                    />
                  </svg>
                  Schools
                </li>
              </Link>
              <Link to="/report"  onClick={()=>handleList('l6')} className={`${isadmin ? `block` : `hidden`}`}>
                {" "}
                <li className={`flex gap-2 px-1 h-[40px] py-2 ${list.l6?`bg-theme-primary text-white`:`bg-white text-theme-primary`} hover:bg-theme-primary hover:text-white rounded hover:shadow-md`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 5a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 12 12a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 5m0 2a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 10a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 7M5.5 8A2.5 2.5 0 0 0 3 10.5c0 .94.53 1.75 1.29 2.18c.36.2.77.32 1.21.32c.44 0 .85-.12 1.21-.32c.37-.21.68-.51.91-.87A5.42 5.42 0 0 1 6.5 8.5v-.28c-.3-.14-.64-.22-1-.22m13 0c-.36 0-.7.08-1 .22v.28c0 1.2-.39 2.36-1.12 3.31c.12.19.25.34.4.49a2.482 2.482 0 0 0 1.72.7c.44 0 .85-.12 1.21-.32c.76-.43 1.29-1.24 1.29-2.18A2.5 2.5 0 0 0 18.5 8M12 14c-2.34 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.66-3.5-7-3.5m-7.29.55C2.78 14.78 0 15.76 0 17.5V19h3v-1.93c0-1.01.69-1.85 1.71-2.52m14.58 0c1.02.67 1.71 1.51 1.71 2.52V19h3v-1.5c0-1.74-2.78-2.72-4.71-2.95M12 16c1.53 0 3.24.5 4.23 1H7.77c.99-.5 2.7-1 4.23-1"
                    />
                  </svg>
                  Report
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="bg-white flex  h-[2rem]  gap-2 px-1 items-center text-theme-primary  hover:bg-theme-primary hover:text-white rounded hover:shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 48 48"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="4"
            >
              <path d="M18.284 43.171a19.995 19.995 0 0 1-8.696-5.304a6 6 0 0 0-5.182-9.838A20.09 20.09 0 0 1 4 24c0-2.09.32-4.106.916-6H5a6 6 0 0 0 5.385-8.65a19.968 19.968 0 0 1 8.267-4.627A6 6 0 0 0 24 8a6 6 0 0 0 5.348-3.277a19.968 19.968 0 0 1 8.267 4.627A6 6 0 0 0 43.084 18A19.99 19.99 0 0 1 44 24c0 1.38-.14 2.728-.406 4.03a6 6 0 0 0-5.182 9.838a19.995 19.995 0 0 1-8.696 5.303a6.003 6.003 0 0 0-11.432 0Z" />
              <path d="M24 31a7 7 0 1 0 0-14a7 7 0 0 0 0 14Z" />
            </g>
          </svg>
          <button onClick={handlelogout}>
            <strong>Logout </strong>
          </button>
        </div>
      </div>
    </>
  );
}
