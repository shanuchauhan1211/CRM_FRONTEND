import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { months } from "../scripts/Utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

export default function BarCharts({ ActualData, counsellorData }) {
  const initial = {
    Data1: [],
    Data2: [],
    Data3: [],
    Data4: [],
    Data5: []
  };
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);
  const dates = new Date();
  const currentMonth = dates.getMonth();
  const currentYear = dates.getFullYear();
  const [period, setPeriod] = useState("");
  const [labels, setLabels] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [arrayOfDataset, setArrayOfDataset] = useState([]);
  const [numberofleadsyearly,setNumberofleadsyearly]=useState();

  const numberOfCounsellors = counsellorData.length;
  const counsellors = counsellorData.map(c => c._id);
  const years=[2024,2023,2022,2021,2020]

  const data = ActualData.filter((data) => data.assignedTo !== "");

  const counsellorNames = counsellorData.map(c => {
    let arr = c.name.split(" ");
    if (arr.length > 1) {
      let first = Array.from(arr[0]);
      let last = Array.from(arr[arr.length - 1]);
      return first[0] + last[0];
    } else {
      return arr[0];
    }
  });

  

  useEffect(() => {
    if (period === "Mon") {
      handlePeriod(period);
    }
  }, [period, selectedYear]);

function handleAssignedleadsnumber(){
  const assignedDatathisYear= data.filter((d)=>{ 
    let date = new Date(d.date);
    let yearOfData = date.getUTCFullYear();
    return  yearOfData === parseInt(selectedYear);
  }
 )
 setNumberofleadsyearly(assignedDatathisYear.length);
}

  function handleYearChange(e) {
    setSelectedYear(e.target.value);
   
  }


  

  function handlePeriod(pe) {
    setPeriod(pe);
    handleAssignedleadsnumber();
    if (pe === "Mon") {
      setLabels(months({ count: 12 }));

      let newArrayOfDataset = [];

      for (let j = 0; j < numberOfCounsellors; j++) {
        let arrrayyy = [];
        for (let i = 0; i <= 11; i++) {
          let response = data.filter((d) => {
            let date = new Date(d.date);
            let month = date.getUTCMonth();
            let yearOfData = date.getUTCFullYear();
            return d.assignedTo === counsellors[j] && month === i && yearOfData === parseInt(selectedYear);
          });

          arrrayyy[i] = response.length;
        }

        newArrayOfDataset.push({
          label: counsellorNames[j],
          data: [...arrrayyy],
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
          borderRadius: 10
        });
      }

      setArrayOfDataset(newArrayOfDataset);
    }
    else if (pe ==='Yea')
    {
    
 
    let newArrayOfDataset = [];

    for (let j = 0; j < numberOfCounsellors; j++) {
      let arrrayyy = [];
      for (let i = 0; i <5; i++) {
        let response = data.filter((d) => {
          let date = new Date(d.date);
          let yearOfData = date.getUTCFullYear();
          return d.assignedTo === counsellors[j] && yearOfData === parseInt(currentYear-i);
        });

        arrrayyy[i] = response.length;
      //  console.log(response);
      }
      
      
      newArrayOfDataset.push({
        label: counsellorNames[j],
        data: [...arrrayyy],
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
        borderRadius: 10
      });
    }

    setArrayOfDataset(newArrayOfDataset);
      setLabels(years);
    }
  }

  return (
    <>
      <div className="chart border border-black h-[420px] rounded-[8px] ">
        <div className="flex justify-between p-[20px] ">
          <div className="text-[20px] text-theme-primary font-semibold ">
            No. of Assigned Leads: {period==''?'------':numberofleadsyearly}
          </div>
          <div className="flex justify-between items-center gap-6">
            {period === 'Mon' && (
              <div>
                <select onChange={handleYearChange} className="bg-[#025498] text-[white] rounded-[8px] w-[120px] px-[4px] py-[4px] text-center">
                  <option value={currentYear}>{currentYear}</option>
                  <option value={currentYear - 1}>{currentYear - 1}</option>
                  <option value={currentYear - 2}>{currentYear - 2}</option>
                  <option value={currentYear - 3}>{currentYear - 3}</option>
                  <option value={currentYear - 4}>{currentYear - 4}</option>
                </select>
              </div>
            )}
            <div>
              <select onChange={(e) => handlePeriod(e.target.value)} className="bg-[#025498] text-[white] rounded-[8px] w-[120px] px-[4px] py-[4px] text-center">
                <option value=''>Select</option>
                <option value="Mon">Monthly</option>
                <option value="Yea">Yearly</option>
              </select>
            </div>
          </div>
        </div>
        <div className="">
          <div className="h-[306px] w-full flex justify-center">
            {period === '' ? (
              <iframe className="h-full w-full" src="https://lottie.host/embed/cf2a2cee-4a25-4f74-8ae1-5cb9e8b4057a/k2x3W7DsnY.json"></iframe>
            ) : (
              <Bar className="text-2xl font-semibold"
                data={{
                  labels: labels,
                  datasets:arrayOfDataset
                }}
                options={{
                  scales: {
                    x: {
                      stacked: true
                    },
                    y: {
                      stacked: true
                    },
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
