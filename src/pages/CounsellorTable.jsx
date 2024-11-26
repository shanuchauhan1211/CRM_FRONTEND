import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import NewEnquiresTitle from "../components/NewEnquiresTitle";
import NewEnquiresTable from "../components/NewEnquiresTable";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function CounsellorTable() {
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  const [counsellorId , setCounsellorId] = useState();
  const [toggle,setToggle]=useState(false);
  useEffect(()=>{const token_object=JSON.parse(localStorage.getItem("authToken"));
  //console.log(token_object);
    setCounsellorId(token_object.user.id);
  },[]);
  const location = useLocation();
  useEffect(() => {
    if (counsellorId && location.pathname === '/conTable') {
      fetchDatas();
    }
  }, [counsellorId, toggle, location.pathname]);
  
 


  useEffect(() => {
 //console.log(data);
    const interval= setInterval(async() => {
              data?.forEach((item)=>{
                item?.reminders.forEach(reminder => {
                     const reminderDateTime = new Date(reminder?.datetime);
                     const presentDateTime = new Date();
                     if (
                         reminderDateTime.getFullYear() === presentDateTime.getFullYear() &&
                         reminderDateTime.getMonth() === presentDateTime.getMonth() &&
                         reminderDateTime.getDate() === presentDateTime.getDate() &&
                         reminderDateTime.getHours() === presentDateTime.getHours() &&
                         reminderDateTime.getMinutes() === presentDateTime.getMinutes()
                     ) {
                   
                         showAlert(reminder?.message, reminderDateTime.toLocaleString());
                     }
                   
                 });
              })
              
           
           }, 60000);
           
           // Cleanup function
           return () => {
               clearInterval(interval);
           };
                 },[data] );
                 const showAlert = (text, dateTime) => {
                  alert(`Reminder: ${text} - Time: ${dateTime}`);
              };
  

  const fetchDatas = async () => {
    try {
      //console.log(counsellorId);
      // Make a GET request to your backend API endpoint
      const response = await axios.get(`https://cr-mbackend-eosin.vercel.app/table/myLeads/${counsellorId}`);
      // Once data is retrieved, set it in the state
      setData(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
 

  //console.log(setResults);
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1 overflow-x-hidden">
          <Navbar />
          <div className="ml-[270px] mt-20 h-screen w-[82vw]  right-7  ">
            <Search data={data} setResults={setResults} />
            <div className="bg-[#ffff] rounded-lg shadow-lg ml-3 mt-8">
              <NewEnquiresTitle  title={'Ongoing Enquires'}/>
              {/* <button className=" flex gap-2 bg-[#025498] py-2 mx-2 text-[white]  h-[40px] w-[50px]  rounded-lg font-semibold  px-3 shadow-md border" onClick={fetchDatas}><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M12.079 3v-.75zm-8.4 8.333h-.75zm0 1.667l-.527.532a.75.75 0 0 0 1.056 0zm2.209-1.134A.75.75 0 1 0 4.83 10.8zM2.528 10.8a.75.75 0 0 0-1.056 1.065zm16.088-3.408a.75.75 0 1 0 1.277-.786zM12.079 2.25c-5.047 0-9.15 4.061-9.15 9.083h1.5c0-4.182 3.42-7.583 7.65-7.583zm-9.15 9.083V13h1.5v-1.667zm1.28 2.2l1.679-1.667L4.83 10.8l-1.68 1.667zm0-1.065L2.528 10.8l-1.057 1.065l1.68 1.666zm15.684-5.86A9.158 9.158 0 0 0 12.08 2.25v1.5a7.658 7.658 0 0 1 6.537 3.643z"/><path fill="currentColor" d="M11.883 21v.75zm8.43-8.333h.75zm0-1.667l.528-.533a.75.75 0 0 0-1.055 0zM18.1 12.133a.75.75 0 1 0 1.055 1.067zm3.373 1.067a.75.75 0 1 0 1.054-1.067zM5.318 16.606a.75.75 0 1 0-1.277.788zm6.565 5.144c5.062 0 9.18-4.058 9.18-9.083h-1.5c0 4.18-3.43 7.583-7.68 7.583zm9.18-9.083V11h-1.5v1.667zm-1.277-2.2L18.1 12.133l1.055 1.067l1.686-1.667zm0 1.066l1.687 1.667l1.054-1.067l-1.686-1.666zm-15.745 5.86a9.197 9.197 0 0 0 7.842 4.357v-1.5a7.697 7.697 0 0 1-6.565-3.644z" opacity="0.5"/></svg></button> */}
              <NewEnquiresTable
              showremark={"ongoing"}
              showreminder={"ongoing"}
                data={data}
                setToggle={setToggle}
                toggle={toggle}
                rowsPerPage={20}
                results={results}
                fetchDatas={fetchDatas}
              />
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
