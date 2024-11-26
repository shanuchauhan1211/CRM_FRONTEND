// DrawerContent.js
import React from "react";
import { format, set } from "date-fns";
import axios, { Axios } from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import LeadModifyPopup from "./LeadModifyPopup";

const DrawerContent = ({
  isOpen,
  closeDrawer,
  item,
  setToggle,
  toggle,
  styles,
  showreminder,
  showremark,
  fetchDatas,
}) => {
  if (!isOpen) return null;
  document.body.style.overflow = "auto";
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [remarktoggle, setRemarktoggle] = useState(false);

  const initialdata = {
    datetime: "",
    message: "",
  };

  const initialremarkdata = { remarkmessage: "" };
  const [remarkdata, setRemarkdata] = useState(initialremarkdata);

  const [data1, setData1] = useState(initialdata);
  const [isadmin, setIsadmin] = useState(false);
  const [counsellorId, setCounsellorId] = useState("");
  const [counsellorname, setCounsellorname] = useState("");
  const [counsellor, setCounsellor] = useState("");
  const [assignname, setAssignName] = useState("");
  useEffect(() => {
    const token_object = JSON.parse(localStorage.getItem("authToken"));
    setIsadmin(token_object.user.isadmin);
    setCounsellorId(token_object.user.id);
    setCounsellorname(token_object?.data?.user?.name);
  }, []);

  async function handleadd(e) {
    if (data1.message !== "" && data1.datetime !== "") {
      try {
        const response = await axios.put(
          `https://cr-mbackend-eosin.vercel.app/table/reminder/${item?._id}`,
          data1
        );
        setData1({ datetime: "", message: "" });
        setToggle(!toggle);
        setToggle2(false); // This will close the reminder section
        fetchDatas();
      } catch (error) {
        console.error("Error adding reminder:", error);
      }
    }
  }
  

  async function handleaddremark(e) {
    if (remarkdata.remarkmessage !== "") {
      try {
        const response = await axios.put(
          `https://cr-mbackend-eosin.vercel.app/table/remarks/${item?._id}`,
          remarkdata
        );
        console.log(response);
        setRemarkdata({ remarkmessage: "" });
        setRemarktoggle(!remarktoggle);
        fetchDatas();
        //location.reload();
      } catch (error) {
        console.error("Error adding remark:", error);
      }
    }
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleAssignClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    const selectedCounselorObject = data.find(
      (item) => item.name === selectedOption
    );
    setCounsellor(selectedCounselorObject._id);
    setAssignName(selectedCounselorObject?.name);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://cr-mbackend-eosin.vercel.app/Addcon"
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const removeData = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`https://cr-mbackend-eosin.vercel.app/table/${id}`);
        alert("Data removed successfully");
      } catch (error) {
        console.error("Error removing data:", error);
        alert("Failed to remove data");
      }
    }
  };

  const initial = {
    name: "",
    date: "",
    grade: "",
    city: "",
    mail: "",
    parent: "",
    school_name: "",
    phone: "",
    siblings: [],
    deposition: "",
  };
  const [credential, setcredential] = useState(initial);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://cr-mbackend-eosin.vercel.app/signup/Admin",
        {
          name: credential.name,
          date: credential.date,
          grade: credential.grade,
          city: credential.city,
          mail: credential.mail,
          parent: credential.parent,
          school_name: credential.school_name,
          phone: credential.phone,
          siblings: credential.siblings,
          deposition: credential.deposition,
        }
      );

      if (response.data.success === true) {
        setcredential(initial);
        alert("Details updated successfully");
        navigate("/table");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onchange = (event) => {
    setcredential({ ...credential, [event.target.name]: event.target.value });
  };

  const assignLeadToMe = (leadId, counsellorId) => {
    axios
      .patch(`https://cr-mbackend-eosin.vercel.app/table/assign`, {
        leadId: leadId,
        counsellorId: counsellorId,
        assignedName: counsellorname,
      })
      .then((res) => console.log(res));
  };
  const assignLead = (leadId, counsellor) => {
    axios
      .patch(`https://cr-mbackend-eosin.vercel.app/table/assign`, {
        leadId: leadId,
        counsellorId: counsellor,
        assignedName: assignname,
      })
      .then((res) => console.log(res));
  };

 

  console.log(item);

  return (
    <div>
      <div
        className={` ${
          styles === "managecc" ? "mt-0 px-4   " : null
        } w-[70vw] h-[95vh] bg-[#ffff] fixed right-2 top-4 z-50 transition duration-500 ease-in-out transform translate-x-full border border-black  shadow-xl shadow-[#e3afaf] rounded-md`}
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <form onSubmit={handleSubmit} className="p-4 ">
          <div className="flex  justify-between">
            <p className="text-lg font-semibold capitalize">{item.name}</p>
            <div className="flex gap-8">
              <div className="flex items-center">
                {showreminder == "ongoing" ? (
                  <>
                    <button
                      type="button p-4"
                      onClick={() => setToggle2(!toggle2)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-width="1.5"
                        >
                          <path
                            stroke-linejoin="round"
                            d="M12 9v4l2.5 2.5m-11-11l4-2.5m13 2.5l-4-2.5"
                          />
                          <path d="M7.5 5.204A9 9 0 1 1 4.204 8.5" />
                        </g>
                      </svg>
                    </button>

                    {toggle2 && (
                      <div className="relative">
                        <div
                          className={` absolute  right-8 top-10 w-[590px] flex flex-col p-4 rounded-md shadow-xl shadow-[#e3afaf]  gap-2 bg-background-primary`}
                        >
                          <h1 className=" text-lg font-semibold">
                            Add Reminder :
                          </h1>

                          <div>
                            <label htmlFor="">DateTime:</label>
                            <input
                              type="datetime-local"
                              onChange={(e) =>
                                setData1({ ...data1, datetime: e.target.value })
                              }
                              className=" "
                            />
                          </div>
                          <div>
                            <label htmlFor="">Message:</label>
                            <input
                              type="text"
                              onChange={(e) =>
                                setData1({ ...data1, message: e.target.value })
                              }
                              className="rounded-lg bg-[#F4F4F4] "
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleadd}
                            className=" w-[80px] h-[25px] bg-gradient-to-br  from-theme-primary to-[#de0202] hover:bg-gradient-to-tl (from-theme-primary to-[#de0202]) text-[#ffffff] rounded-lg font-semibold  "
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>

              {/* dfadsasda */}
              <div className="flex items-center">
                {showremark === "ongoing" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setRemarktoggle(!remarktoggle)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#561f1f"
                          d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1zm-.692-2H20V5H4v13.385zM11 10h2v2h-2zm-4 0h2v2H7zm8 0h2v2h-2z"
                        />
                      </svg>
                    </button>

                    {remarktoggle && (
                      <div className="relative">
                        <div className="absolute right-8 top-10 w-[590px] flex flex-col p-4 rounded-md shadow-xl shadow-[#e3afaf] gap-2 bg-background-primary">
                          <h1 className="text-lg font-semibold">
                            Add Remark :
                          </h1>
                          <div>
                            <label htmlFor="">Message:</label>
                            <input
                              type="text"
                              onChange={(e) =>
                                setRemarkdata({ remarkmessage: e.target.value })
                              }
                              className="rounded-lg bg-[#F4F4F4]"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleaddremark}
                            className="w-[80px] h-[25px] bg-gradient-to-br from-theme-primary to-[#de0202] hover:bg-gradient-to-tl text-[#ffffff] rounded-lg font-semibold"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* asdsdasda */}

              <button type="button" onClick={() => setToggle1(!toggle1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"
                  />
                </svg>
              </button>
              <LeadModifyPopup
                setToggle1={setToggle1}
                toggle1={toggle1}
                item1={item}
              />
              <button
                onClick={closeDrawer}
                className=" hover:text-gray-800 p-2"
              >
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold pb-4">{item.city}</p>
            <div className="flex gap-4">
              <p className="text-xl font-semibold ">
                {format(new Date(item.date), "dd-MM-yyyy")}
              </p>
              <p>||</p>
              <p className="text-lg font-semibold">11:59 AM</p>
            </div>
          </div>
          <div className="flex gap-40 ">
            <div className="text-[#0d0c0c] text-lg font-semibold space-y-3">
              <div className="flex">
                <p className="w-[140px]">Email</p>
                <p className="font-medium">{item.mail}</p>
              </div>
              <div className="flex">
                <p className="w-[140px]">Contact No. </p>
                <p className="font-medium">{item.phone}</p>
              </div>
              <div className="flex">
                <p className="w-[140px]">Grade</p>
                <p className="font-medium">{item.grade}</p>
              </div>
              <div className="flex">
                <p className="w-[140px]">School Name</p>
                <p className="font-medium">{item.school_name}</p>
              </div>
              <div className="flex">
                <p className="w-[140px]">Parent Name</p>
                <p className="font-medium">{item.parent}</p>
              </div>
              <div className=" space-y-2">
                <p>Sibling Details : </p>
                {item.siblings.map((value, index) => (
                  <div key={index} className="flex gap-6 text-base">
                    <div className="flex">
                      <p className="w-[140px] font-semibold">Name</p>
                      <p className="font-medium">{value.name}</p>
                    </div>
                    <div className="flex">
                      <p className="w-[140px] font-semibold">Grade</p>
                      <p className="font-medium">{value.grade}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex">
                <p className="w-[140px]">Assigned To </p>
                <p className="font-medium">{item.assignedName}</p>
              </div>

              <div>
                <form>
                  <div className="flex">
                    <p className="w-[140px]">Deposition</p>
                    <p className="font-medium capitalize">{item.deposition}</p>
                  </div>
                </form>

                <div className="mt-28 flex">
                  <Link to="/ConTable">
                    {" "}
                    <button
                      onClick={() => assignLeadToMe(item._id, counsellorId)}
                      className=" w-[150px] h-[39px] bg-gradient-to-br  from-theme-primary to-[#de0202] hover:bg-gradient-to-tl (from-theme-primary to-[#de0202]) text-[#ffffff] rounded-lg font-semibold"
                    >
                      Add to my leads
                    </button>
                  </Link>
                  <div>
                    <button
                      type="button"
                      className={` ${isadmin ? `block` : `hidden`} 
                        
                      w-[90px] h-[39px] ml-4 bg-gradient-to-br from-theme-primary to-[#de0202] hover:bg-gradient-to-tl (from-theme-primary to-[#de0202]) text-[#ffffff] rounded-lg font-semibold`}
                      onClick={handleAssignClick}
                    >
                      Assign
                    </button>
                    {isDropdownOpen && (
                      <div className=" dropdown-menu  -mt-32 -ml-[154px] w-30 flex  space-x-10 ">
                        <select
                          onChange={(e) => {
                            handleSelectChange(e);
                          }}
                        >
                          <option>Counsellor</option>
                          {data.map(
                            (item, index) =>
                              item?.name !== counsellorname && (
                                <option key={index}>{item.name}</option>
                              )
                          )}
                        </select>
                        <button
                          type="button"
                          className="  w-[90px] h-[30px]  bg-gradient-to-br from-theme-primary to-[#de0202] hover:bg-gradient-to-tl (from-theme-primary to-[#de0202]) text-[#ffffff] rounded-lg font-semibold"
                          onClick={() => assignLead(item._id, counsellor)}
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className={`ml-4 ${isadmin ? `block` : `hidden`} `}
                      onClick={() => removeData(item._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
            <div>
  {item.reminders != 0 ? (
    <div className="flex flex-col flex-1 h-[270px] overflow-y-auto">
      <label className="font-semibold text-[black] text-lg">Reminder :</label>
      <div className="h-[70vh] space-y-2 py-3 mt-2 overflow-y-scroll tablescrollbar">
        {item?.reminders.length > 0 && (
          <>
            <div className="p-2 border border-[black] rounded-md w-[30vw] text-wrap">
              <div className="flex gap-2">
                <label htmlFor="">Datetime:</label>
                <span>{item.reminders[item.reminders.length - 1]?.datetime}</span>
              </div>
              <div className="flex gap-2">
                <label>Message:</label>
                <span>{item.reminders[item.reminders.length - 1]?.message}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    <></>
  )}
</div>

<div>
  {item.remark.length > 0 ? (
    <div className="flex flex-col flex-1 h-[270px] overflow-y-auto">
      <label className="font-semibold text-[black] text-lg">Remarks:</label>
      <div className="h-[70vh] space-y-2 py-3 mt-2 overflow-y-scroll tablescrollbar">
        {item.remark
          .slice() // create a shallow copy of the array
          .reverse() // reverse the array to show the latest remarks first
          .map((value, index) => (
            <div
              key={index}
              className="p-2 border border-[black] rounded-md w-[30vw] text-wrap"
            >
              <div className="flex gap-2">
                <label>Message:</label>
                <span>{value?.remarkmessage}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  ) : (
    <></>
  )}
</div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DrawerContent;
