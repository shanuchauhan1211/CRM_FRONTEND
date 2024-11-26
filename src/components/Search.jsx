import React from "react";
import { useState } from "react";

export default function Search({ data, setResults }) {
  const [input, setInput] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [active, setActive] = useState(false);
  const handleStartDate = (startDate) => {
    setStartDate(startDate);
    filterData(input, startDate, endDate);
  };

  function handleActive() {
    setActive(!active);
  }
  const handleEndDate = (endDate) => {
    setEndDate(endDate);
    filterData(input, startDate, endDate);
  };
  const handleChange = (value) => {
    setInput(value);
    filterData(value, startDate, endDate);
  };
  const filterData = (value, startDate, endDate) => {
    const results = data.filter((user) => {
      const isIncluded =
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.city.toLowerCase().includes(value.toLowerCase()) ||
        user.mail.toLowerCase().includes(value.toLowerCase())||
        user.phone.includes(value);

      const isWithinDateRange =
        (!startDate || new Date(user.date) >= new Date(startDate)) &&
        (!endDate || new Date(user.date) <= new Date(endDate));
      return isIncluded && isWithinDateRange;
    });
    setResults(results);
  };
  return (
    <div className="w-[100%] bg-[#F8F8F8] h-[84px] flex items-center px-[20px] justify-between overflow-hidden">
      <div className="flex gap-5">
        <div className="w-[600px] bg-loginGradient1 h-[34px] flex items-center gap-2  text-theme-primary px-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26px"
            height="26px"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            className="font-jost text-base font-light text-theme-primary bg-loginGradient1 px-2 outline-none w-[550px]"
          ></input>
        </div>
        <form className="">
          <div className="flex flex-col text-center ">
            <label
              onClick={handleActive}
              className="bg-[#025498] py-2 text-[white]  h-[40px] w-[100px]  rounded-lg font-semibold  px-3 shadow-md border "
            >
              From
            </label>
            <input
              onChange={(e) => handleStartDate(e.target.value)}
              className={`duration-300 w-[100px] mt-2 ${
                active ? `block ` : `hidden`
              } rounded text-sm`}
              type="date"
            ></input>
          </div>
        </form>
        <form className="">
          <div className="flex flex-col text-center ">
            <label
              onClick={handleActive}
              className="bg-[#025498] py-2 text-[white]  h-[40px] w-[100px]  rounded-lg font-semibold  px-3 shadow-md border "
            >
              To
            </label>
            <input
              onChange={(e) => handleEndDate(e.target.value)}
              className={`duration-300 w-[100px] mt-2 ${
                active ? `block ` : `hidden`
              } rounded text-sm`}
              type="date"
            ></input>
          </div>
        </form>
        {/* <form className="">
          <select className="bg-[#025498] text-[white]  h-[40px] w-[105px] rounded-lg font-semibold  px-3 shadow-md border ">
            <option value="1">School</option>
            <option value="2">DropDown1</option>
            <option value="3">DropDown2</option>
            <option value="4">DropDown3</option>
            <option value="5">DropDown4</option>
          </select>
        </form> */}
      </div>
      {/* <button className="items-center text-theme-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 3h16a1 1 0 0 1 1 1v1.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707v6.305a1 1 0 0 1-1.243.97l-2-.5a1 1 0 0 1-.757-.97v-5.805a1 1 0 0 0-.293-.707L3.293 6.293A1 1 0 0 1 3 5.586V4a1 1 0 0 1 1-1"
          />
        </svg>
      </button> */}
    </div>
  );
}
