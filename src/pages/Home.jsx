import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsLayout from "../components/StatsLayout";
import { ToastContainer } from "react-toastify";
import axios from "axios";



export default function Home() {

  const [Actualdata, setActualdata] = useState([]);
  const [counsellorData,setCounsellorData]=useState([]);
  useEffect(() => {
    fetchDatas();
    fetchCounsellorDatas();
  }, []);

  const fetchDatas = async () => {
    try {
      const response = await axios.get(
        "https://cr-mbackend-eosin.vercel.app/table/all"
      );
      setActualdata(response.data);
     // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCounsellorDatas = async () => {
    try {
      const response = await axios.get(
        "https://cr-mbackend-eosin.vercel.app/Addcon"
      );
      setCounsellorData(response.data);
     // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
          <ToastContainer/>

      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1">
          <Navbar />
          <div className="w-[80vw] ml-[280px] mt-28">
            <StatsLayout ActualData={Actualdata} counsellorData={counsellorData} />
          </div>
        </div>
      </div>
    </div>
  );
}

