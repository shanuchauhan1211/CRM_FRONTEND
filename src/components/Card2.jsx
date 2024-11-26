import React from "react";

export default function Card2({ data }) {
  return (
    <div>
      <div className=" ">
        <div className=" maincards bg-background-primary py-4  text-theme-primary  z-10">
          <div className=" carder space-y-1  p-[20px] w-[280px] md:w-[18vw] h-[150px] rounded-[8px] shadow-md shadow-[#00000056] bg-[white]">
            <div className="flex items-end justify-between px-[2px] ">
              <div className=" text-[16px]">{data.Tittle}</div>
              <div className=" w-[26px] h-[26px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18 7.05a1 1 0 0 0-1-1L9 6a1 1 0 0 0 0 2h5.56l-8.27 8.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L16 9.42V15a1 1 0 0 0 1 1a1 1 0 0 0 1-1Z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-[24px] font-semibold ">{data.Num}</div>
            <div className="">
              <p className="text-base ">
                <span className="font-semibold">+{data.Per}% </span>
                {data.about}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
