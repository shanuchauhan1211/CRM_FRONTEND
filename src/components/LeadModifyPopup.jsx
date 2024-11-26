import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

function LeadModifyPopup({ setToggle1, toggle1, item1 }) {
  const [item, setItem] = useState([]);

  function handle(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }
  function handle1() {
    setItem({ ...item1 });
  }

  async function handlesubmit() {
    try {
      console.log(item)
      const response = await axios.put(
        `https://cr-mbackend-eosin.vercel.app/table/${item?._id}`,
        item
      );
      setToggle1(!toggle1);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Popup
        onOpen={handle1}
        open={toggle1}
        closeOnDocumentClick={false}
        contentStyle={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <div
          onSubmit={handlesubmit}
          className=" w-[30vw] text-theme-primary relative h-[55vh] -mt-36  rounded-md shadow-xl shadow-[#e3afaf]  me-[2vw] bg-background-primary py-6  "
        >
          <button
            className=" absolute  right-5  text-[black]"
            onClick={() => setToggle1(!toggle1)}
          >
            <span className=" font-bold text-[20px]">X</span>
          </button>
          <div className="flex   ">
            <div className=" ml-6 ">
              <p className="text-lg font-semibold pb-4 space-x-2">
                City <span className="font-bold pl-[92px]">:</span>
                <input
                  type="text"
                  className="pl-2 rounded  w-[210px] h-8"
                  value={item?.city}
                  name="city"
                  onChange={handle}
                />
              </p>
              <p className="text-lg font-semibold pb-4 space-x-2">
                Student Name <span className="font-bold pl-2">:</span>
                <input
                  type="text"
                  className="pl-2 rounded w-[210px] h-8"
                  value={item.name}
                  name="name"
                  onChange={handle}
                />
                <p />
              </p>
              <p className="text-lg font-semibold pb-4 space-x-2">
                Grade <span className="font-bold pl-[74px]">:</span>
                <input
                  className="pl-2 rounded w-[210px] h-8"
                  type="text"
                  value={item?.grade}
                  name="grade"
                  onChange={handle}
                />
              </p>
              <p className="text-lg font-semibold pb-6">
                School <span className="pl-[70px] rounded font-bold">:</span>{" "}
                <input
                  className="pl-2 rounded w-[212px] h-8"
                  type="text"
                  value={item?.school_name}
                  name="school_name"
                  onChange={handle}
                />
                <p />
              </p>
              <div className="flex items-center mb-2">
                <p className="font-bold">
                  Contact <span className="ml-4 pl-[54px]">:</span>{" "}
                  <input
                    className="pl-2 rounded w-[212px] h-8"
                    type="text"
                    value={item?.phone}
                    name="phone"
                    onChange={handle}
                  />
                </p>
              </div>
              <div>
                <div className="mt-4">
                  <label className=" text-lg font-semibold">Desposition</label>
                  <span className="ml-4 pl-[20px] mr-1 font-bold">:</span>
                  <select
                    name="deposition"
                    className="rounded px-4"
                    onChange={handle}
                    value={item?.deposition}
                  >
                    <option value="hot">Hot</option>
                    <option value="warm">Warm</option>
                    <option value="call back">Call back</option>
                    <option value="cold">Cold</option>
                    <option value="dnp">DNP</option>
                    <option value="Registration done">Registration done</option>
                    <option value="Admission fees paid">Admission fees paid</option>
                    <option value="Admission completed">Admission completed</option>
                    <option value="Details shared">Details shared</option>
                    <option value="Planning for next year">Planning for next year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-center mt-3 ">
            <button
              onClick={handlesubmit}
              type="button"
              className="px-6 py-2 bg-gradient-to-br  from-theme-primary to-[#de0202] text-[white] rounded-xl mt-4"
            >
              Submit
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
}

export default LeadModifyPopup;
