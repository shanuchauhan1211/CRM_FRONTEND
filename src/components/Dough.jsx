import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import DailyData from "../DoughnutData/DoughnutDataDaily.json";
import MonthlyData from "../DoughnutData/DoughnutDataMonthy.json";
import WeeklyData from "../DoughnutData/DoughnutDataWeekly.json";
import YearlyData from "../DoughnutData/DoughnutDataYearly.json";
import { months, days, year, weeks } from "../scripts/Utils";

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dough({ ActualData, counsellorData }) {

  const dates = new Date();
  const currentMonth = dates.getMonth();
  const currentYear = dates.getFullYear();


  const [period, setPeriod] = useState("");
  const[Data,setData]=useState([]);
  const[selectedMonth,setSelectedMonth]=useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
const bgcolor=["rgba(255, 28, 8, 0.68)","rgba(8, 28, 255, 0.68)","rgba(54, 44, 86, 0.68)","rgba(77, 191, 68, 0.75)"]
const labels=['hot','cold','DNP','Admission Complete'];
const month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Dec'];
  useEffect(() => {
    handleChange(period);
  }, [period,selectedMonth,selectedYear]);
 
  const filterdata= ActualData.filter((data)=>{
return data.deposition!='';
  })
 // console.log(filterdata);


  function handleMonthChange(e) {
    setSelectedMonth(e.target.value);
   
  }

  function handleYearChange(e) {
    setSelectedYear(e.target.value);
   
  }



// function Calculate(){
//   let array=[];
  
// for(let i=0;i<labels.length;i++)
// {
//   const response= filterdata.filter((data)=>{  let date = new Date(data.date);
// let month=date.getUTCMonth();  
//   let yearOfData = date.getUTCFullYear();
//     return data.deposition===labels[i]&&yearOfData===parseInt(selectedYear)&&month===parseInt(selectedMonth)});
// array.push(response.length);
// console.log(array)
// }
// setData([...array]);

// }

//console.log(Data)
  function handleChange(pe) {
    setPeriod(pe);

    if (pe === "Mon") {
      let array=[];
  
for(let i=0;i<labels.length;i++)
{
  const response= filterdata.filter((data)=>{  let date = new Date(data.date);
let month=date.getUTCMonth();  
  let yearOfData = date.getUTCFullYear();
    return data.deposition===labels[i]&&yearOfData===parseInt(selectedYear)&&month===parseInt(selectedMonth)});
array.push(response.length);
//console.log(array)
}
setData([...array]);
    
    } else if (pe === "Yea") {
     
      let array=[];
      setSelectedMonth(currentMonth);
  
      for(let i=0;i<labels.length;i++)
      {
        const response= filterdata.filter((data)=>{  let date = new Date(data.date);
      let month=date.getUTCMonth();  
        let yearOfData = date.getUTCFullYear();
          return data.deposition===labels[i]&&yearOfData===parseInt(selectedYear)});
      array.push(response.length);
    //  console.log(array)
      }
      setData([...array]);
    }
  }

  return (
    <>
      <div className="bar border border-black h-[420px] rounded-[8px] ">
        <div className="flex justify-between p-[20px]">
          <div className="text-[20px] text-theme-primary font-semibold">
            Enquiry Status
          </div>
          <div className="flex gap-5">

<div> {period === 'Yea' && (
              <div>
                <select onChange={handleYearChange} className="bg-[#025498] text-[white] rounded-[8px] w-[120px] px-[4px] py-[4px] text-center">
                  <option value={currentYear}>{currentYear}</option>
                  <option value={currentYear - 1}>{currentYear - 1}</option>
                  <option value={currentYear - 2}>{currentYear - 2}</option>
                  <option value={currentYear - 3}>{currentYear - 3}</option>
                  <option value={currentYear - 4}>{currentYear - 4}</option>
                </select>
              </div>
            )}</div>


          <div> {period === 'Mon' && (
              <div>
                <select onChange={handleMonthChange} className="bg-[#025498] text-[white] rounded-[8px] w-[120px] px-[4px] py-[4px] text-center">
                  <option value={currentMonth}>{month[currentMonth]}</option>
                  {month.map((item,key)=>{
                    return <option className={`${key===currentMonth?`hidden`:`block`}`} value={key}>{item}</option>
                  })}
                </select>
              </div>
            )}</div>
          <div>
            <select
              onChange={(e) => handleChange(e.target.value)}
              className="bg-[#025498] text-[white] rounded-[8px] w-[120px] px-[4px] py-[4px] text-center"
            >
              <option value="">Select</option>
              <option value="Mon">Monthly</option>
              <option value="Yea">Yearly</option>
              
            </select>
          </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-[320px] w-[370px] pl-10">
            {period === "" ? (
              <iframe
                className="w-full h-full"
                src="https://lottie.host/embed/1a268105-c9fa-43c9-9c9c-b7ed4dfbe01d/vtNp13G6LG.json"
              ></iframe>
            ) : (
              <Doughnut
                data={{
                  labels:labels,
                  datasets: [
                    {
                      label: "Enquiry Status",
                      data: Data,
                      backgroundColor: bgcolor,
                    },
                  ],
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
