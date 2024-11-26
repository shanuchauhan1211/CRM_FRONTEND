import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import NewEnquiresTitle from "../components/NewEnquiresTitle";
import NewEnquiresTable from "../components/NewEnquiresTable";
import TableData from "../TableData/TableData.json";
import axios from "axios";

export default function NewEnquires({ toggle, setToggle }) {
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    try {
      const response = await axios.get(
        "https://cr-mbackend-eosin.vercel.app/table/all"
      );
      setData(response.data.reverse());
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1 overflow-x-hidden tablescrollbar">
          <Navbar />
          <div className="ml-[270px] mt-20 h-screen w-[81vw]  right-7 ">
            <Search data={data} setResults={setResults} />

            <div className="bg-[#ffff] rounded-lg shadow-lg ml-3 mt-8 ">
              <NewEnquiresTitle  data={data} />
              <NewEnquiresTable
                data={data}
                rowsPerPage={20}
                results={results}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
