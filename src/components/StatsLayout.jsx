import React from "react";
import Card2 from "./Card2";
import data from "./data.json";
import Dough from "./Dough";
import BarCharts from "./BarCharts";
import Tab from "./Tab";


export default function StatsLayout({ActualData,counsellorData}) {
  return (
    <>
      <div className="flex justify-between">
        {data.map((item, index) => {
          return (
            <div key={index}>
              <Card2 data={item} />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between py-4 gap-3">
        <div className="flex flex-col gap-4 w-[75vw] ">
          <div><Dough  ActualData={ActualData} counsellorData={counsellorData}/></div>
          <div><BarCharts ActualData={ActualData} counsellorData={counsellorData}/></div>
        </div>
        <div><Tab/></div>
      </div>
    </>
  );
}
