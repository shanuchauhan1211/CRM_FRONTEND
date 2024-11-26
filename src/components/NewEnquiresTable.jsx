import React, { useState } from "react";
import TableData from "../TableData/TableData.json";
import useTable from "../hooks/useTable";
import TableFooter from "./TableFooter";
import { format } from "date-fns";
import DrawerContent from "./LeadDrawer";

export default function NewEnquiresTable({
  data,
  rowsPerPage,
  results,
  fetchDatas,
  setToggle,
  toggle,
  showreminder,
  showremark,

}) {
  function reuseTable(item, index) {
    return (
      <tr
        key={index}
        className={
          index % 2 === 0
            ? "hover:bg-[#e6edfa] h-[50px] text-base font-medium overflow-x-hidden"
            : "hover:bg-[#e6edfa] h-[50px] text-base font-medium bg-[#e2e8f0]"
        }
      >
        <td className="">{index + 1}</td>
        <td className="w-[20%] px-2">{item.name}</td>
        <td className="">{format(new Date(item.date), "dd-MM-yyyy")}</td>
        <td className="">{item.grade}</td>
        <td className="w-[20%] px-2">{item.school_name}</td>
        <td className="w-[20%] px-2">{item.parent}</td>
        <td className="w-fit px-2">{item.phone}</td>
        <td className="">
          <button
            className="h-[31px] rounded-md text-[#ffff]  hover:bg-gradient-to-tl (from-theme-primary to-gradient2)"
            onClick={() => toggleDrawer(item._id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 56 56"><path fill="#6F0000" fill-rule="evenodd" d="M10 36a3 3 0 1 1 0 6a3 3 0 0 1 0-6m35.998 1c1.106 0 2.002.888 2.002 2c0 1.105-.89 2-2.002 2H18.002A1.996 1.996 0 0 1 16 39c0-1.105.89-2 2.002-2zM10 26a3 3 0 1 1 0 6a3 3 0 0 1 0-6m35.998 1c1.106 0 2.002.888 2.002 2c0 1.105-.89 2-2.002 2H18.002A1.996 1.996 0 0 1 16 29c0-1.105.89-2 2.002-2zM10 16a3 3 0 1 1 0 6a3 3 0 0 1 0-6m35.998 1c1.106 0 2.002.888 2.002 2c0 1.105-.89 2-2.002 2H18.002A1.996 1.996 0 0 1 16 19c0-1.105.89-2 2.002-2z"/></svg>
          </button>
          <DrawerContent
          showremark={showremark}
            showreminder={showreminder}
            isOpen={isOpen.i === item._id && isOpen.toggle}
            closeDrawer={closeDrawer}
            item={item}
            fetchDatas={fetchDatas}
            setToggle={setToggle}
            toggle={toggle}
            
          />
        </td>
      </tr>
    );
  }

  const [isOpen, setIsOpen] = useState({
    toggle: false,
    i: null,
  });

  const toggleDrawer = (sNo) => {
    // document.body.style.overflow = "hidden";
    setIsOpen({ ...isOpen, toggle: true, i: sNo });
  };

  const closeDrawer = () => {
    // document.body.style.overflow = "auto";
    setIsOpen({ ...isOpen, toggle: false });
  };

  const head = Object.keys(TableData[0]);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(
    results == "" ? data : results,
    page,
    rowsPerPage
  );

  return (
    <div className="text-theme-primary  mr-5 ml-2 mt-4 pb-3 ">
      <table className=" w-full ml-2 ">
        <thead className="h-[60px]">
          {head.map((users) => {
            return (
              <th className="  text-left text-xl font-semibold" key={users}>
                {users}
              </th>
            );
          })}
        </thead>
        <tbody className="">
          {slice.map((item, index) => reuseTable(item, index))}
        </tbody>
      </table>

      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </div>
  );
}
