import React, { useState, useNavigate, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";
import DrawerContent from "../components/LeadDrawer";

export default function Mancoun({ setToggle, toggle }) {
  const [data, setData] = useState([]);
  const [indexx, setIndexx] = useState(null);
  const [lead, setLead] = useState([]);
  const initialstate = {
    name: "",
    email: "",
    password: "",
    started: "",
    leads: "",
    total: "",
    hot: "",
    warm: "",
    cool: "",
    cold: "",
  };

  const [details, setdetails] = useState(initialstate);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchlead();
  }, []);

  // lead button start

  const [isDrawerlead, setIsDrawerlead] = useState(false);

  const togglelead = (id, index) => {
    setIndexx(index);
    setIsDrawerlead(!isDrawerlead);
    const counselorlead = data.find((counselor) => counselor._id === id);
    setdetails(counselorlead);
    fetchlead(counselorlead._id);
  };
  const [isOpen, setIsOpen] = useState({
    toggle: false,
    i: null,
  });

  const togglealot = (sNo) => {
    //console.log(sNo);
    // document.body.style.overflow = "hidden";
    setIsOpen({ ...isOpen, toggle: true, i: sNo });
  };
  const closeDrawer = () => {
    // document.body.style.overflow = "auto";
    setIsOpen({ ...isOpen, toggle: false });
  };

  const fetchlead = async (id) => {
    try {
      //console.log(id);
      const response = await axios.get(
        `https://cr-mbackend-eosin.vercel.app/table/myLeads/${id}`
      );
      setLead(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://cr-mbackend-eosin.vercel.app/Addcon");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDatas = async () => {
    try {
      // Make a GET request to your backend API endpoint
      const response = await axios.get("https://cr-mbackend-eosin.vercel.app/table/all");
      // Once data is retrieved, set it in the state
      setData(response.data.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const removeData = async (id) => {
    try {
      await axios.delete(`https://cr-mbackend-eosin.vercel.app/Addcon/${id}`);
      fetchData();
      toast.success("Data removed successfully");
    } catch (error) {
      console.error("Error removing data:", error);
      toast.error("Failed to remove data");
    }
  };

  const [isDrawerupdate, setIsDrawerupdate] = useState(false);
  const toggleupdate = (id) => {
    // Find the counselor data by ID
    const counselorToUpdate = data.find((counselor) => counselor._id === id);
    // Set the details state with the counselor data
    setdetails(counselorToUpdate);
    // Open the update form drawer
    setIsDrawerupdate(true);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://cr-mbackend-eosin.vercel.app/Addcon/Addcon", {
        name: details.name,
        email: details.email,
        password: details.password,
        started: details.started,
        total: details.total,
        hot: details.hot,
        warm: details.warm,
        cool: details.cool,
        cold: details.cold,
      });
      //console.log(response);
      toast.success("added successfuly");
      setdetails(initialstate);
      //   navigate("/")
    } catch (error) {
      //console.log(error);
      toast.error("invalid details");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://cr-mbackend-eosin.vercel.app/Addcon/${details._id}`,
        {
          name: details.name,
          email: details.email,
        }
      );

      if (response.status === 200) {
        setdetails(initialstate);
        toast.success("Counselor updated successfully");
        setIsDrawerupdate(false);
        fetchData();
      } else {
        toast.error("Failed to update counselor");
      }
    } catch (error) {
      console.error("Error updating counselor:", error);
      toast.error("Failed to update counselor");
    }
  };

  const onChange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <ToastContainer />

      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1">
          <Navbar />

          {/* search bar start */}
          {/* <div className="w-[80vw] ml-[280px] mt-28">
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
                  className="font-jost text-base font-light text-theme-primary bg-loginGradient1 px-2 outline-none w-[550px]"
                ></input>
              </div>

              <form className="">
                <select className="bg-[#025498] text-[white]  h-[40px] w-[135px] rounded-lg font-semibold  px-3 shadow-md border ">
                  <option value="1">desposition</option>
                  <option value="2">DropDown1</option>
                  <option value="3">DropDown2</option>
                  <option value="4">DropDown3</option>
                  <option value="5">DropDown4</option>
                </select>
              </form>

              <form className="">
                <select className="bg-[#025498] text-[white]  h-[40px] w-[90px] rounded-lg font-semibold  px-3 shadow-md border ">
                  <option value="1">from</option>
                  <option value="2">DropDown1</option>
                  <option value="3">DropDown2</option>
                  <option value="4">DropDown3</option>
                  <option value="5">DropDown4</option>
                </select>
              </form>

              <form className="">
                <select className="bg-[#025498] text-[white]  h-[40px] w-[70px] rounded-lg font-semibold  px-3 shadow-md border ">
                  <option value="1">to</option>
                  <option value="2">DropDown1</option>
                  <option value="3">DropDown2</option>
                  <option value="4">DropDown3</option>
                  <option value="5">DropDown4</option>
                </select>
              </form>

              <form className="">
                <select className="bg-[#025498] text-[white]  h-[40px] w-[125px] rounded-lg font-semibold  px-3 shadow-md border ">
                  <option value="1">prospects</option>
                  <option value="2">DropDown1</option>
                  <option value="3">DropDown2</option>
                  <option value="4">DropDown3</option>
                  <option value="5">DropDown4</option>
                </select>
              </form>
            </div>
          </div> */}
          {/* search bar end */}

          <div className="w-[80vw] ml-[280px] mt-28 bg-white p-3">
            {/* addcon  and drawer start*/}
            <div className="h-[63px] flex justify-between items-center  pr-5 pl-3 ">
              <p className="text-2xl font-medium text-theme-primary">
                Counsellors
              </p>
              <div className="flex  gap-6">
                {/* <form className="">
                  <select className="bg-[#025498] text-[white]  h-[40px] w-[119px] rounded-lg font-semibold items-center px-4 shadow-md border ">
                    <option value="1">Columns</option>
                    <option value="2">DropDown1</option>
                    <option value="3">DropDown2</option>
                    <option value="4">DropDown3</option>
                    <option value="5">DropDown4</option>
                  </select>
                </form> */}

                <button
                  className="w-[150px] h-[39px] bg-gradient-to-br  from-theme-primary to-[#de0202] hover:bg-gradient-to-tl (from-theme-primary to-[#de0202]) text-[#ffffff] rounded-lg font-semibold"
                  onClick={toggleDrawer}
                >
                  New Counsellors
                </button>
                {isDrawerOpen && (
                  <div className=" fixed inset-y-0  right-1 mt-24 2xl:max-w-[34vw] xl:max-w-[30vw] rounded-lg w-full max-h-[600px] bg-white shadow-xl overflow-y-auto transition-transform transform">
                    <div className="bg-white p-8 rounded-lg">
                      <button
                        onClick={() => setIsDrawerOpen(false)}
                        className="absolute top-2 right-2 text-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <form onSubmit={handleSubmit}>
                        <div className=" p-4">
                          <div className="flex flex-col m-4">
                            <label className="text-[#6F0000]">Name</label>
                            <input
                              className="rounded-[10px] bg-background-secondary w-[380px]  p-2"
                              type="text"
                              name="name"
                              value={details.name}
                              onChange={onChange}
                            />
                          </div>
                          <div className="flex flex-col m-4">
                            <label className="text-[#6F0000]">email </label>
                            <input
                              className="rounded-[10px] bg-background-secondary w-[380px]  p-2"
                              type="text"
                              name="email"
                              value={details.email}
                              onChange={onChange}
                            />
                          </div>
                          <div className="flex flex-col m-4">
                            <label className="text-[#6F0000]">password </label>
                            <input
                              className="rounded-[10px] bg-background-secondary w-[380px]  p-2"
                              type="password"
                              name="password"
                              value={details.password}
                              onChange={onChange}
                            />
                          </div>

                          <div className="flex flex-col m-4">
                            <label className="text-[#6F0000]">Started on</label>
                            <input
                              className="rounded-[10px] bg-background-secondary w-[380px]  p-2"
                              type="date"
                              name="started"
                              value={details.started}
                              onChange={onChange}
                            />
                          </div>
                        </div>
                        <div className="mt-20">
                          <button
                            type="submit"
                            className="ml-8 bg-gradient-to-r bg-[#6F0000] px-6 py-2 text-[16px]  text-white rounded-[10px]"
                          >
                            Add Counsellor
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* addcon and drawer start*/}

            {/* table start */}
            <div className="table pt-10">
              <div className="flex flex-col w-[78vw]">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden sm:rounded-lg">
                      <table className="min-w-full text-theme-primary text-[16px]">
                        <thead className="font-semibold text-xl">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                              Started on
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                              Leads
                            </th>

                            <th scope="col" className="px-6 py-3 text-left">
                              Edit Access
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                              Update
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white text-base font-medium">
                          {data.map((item, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {/* <div className="owl bg-[#ff3ed5] w-6 h-6 flex items-center justify-center rounded-full mr-2">
                                    <div className="text-white font-bold">
                                      P
                                    </div>
                                  </div> */}
                                  <span>{item.name}</span>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                {/* {format(new Date(item.started), "dd-MM-yyyy")} */}
                                {item.started}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap relative">
                                <button
                                  onClick={() => togglelead(item._id, index)}
                                  className="w-[100px] h-[31px] rounded-md text-white bg-gradient-to-br from-theme-primary to-[#de0202] hover:bg-gradient-to-tl"
                                >
                                  Leads
                                </button>
                                {isDrawerlead && indexx === index && (
                                  <div className=" fixed inset-y-0  right-1 mt-28 2xl:max-w-[80vw] xl:max-w-[80vw] rounded-lg w-full max-h-[700px] bg-white shadow-[10px_0_60px_-15px_rgba(0,0,0,0.5)] overflow-y-auto transition-transform transform z-40">
                                    <div className="flex justify-end items-center px-4 py-2">
                                      <button
                                        onClick={() => setIsDrawerlead(false)}
                                        className="text-gray-600 hover:text-gray-800 focus:outline-none "
                                      >
                                        <div>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-7 w-7 "
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M5.293 6.707a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 11-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z"
                                              clipRule="evenodd"
                                            />
                                          </svg>{" "}
                                        </div>
                                      </button>
                                    </div>
                                    <div>
                                      <table className="text-theme-primary text-[16px]">
                                        <thead className="font-semibold text-xl">
                                          <tr>
                                            <th className="px-6 py-3 text-left">
                                              S.no
                                            </th>
                                            <th className="px-6 py-3 text-left">
                                              Name
                                            </th>
                                            <th className="px-6 py-3 text-left">
                                              Email
                                            </th>
                                            <th className="px-6 py-3 text-left">
                                              Date
                                            </th>
                                            <th className="px-6 py-3 text-left">
                                              Contact
                                            </th>
                                            <th>Details</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {lead.map((leads, i) => {
                                            return (
                                              <tr key={i}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                  {i + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                  {leads.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                  {leads.mail}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                  {format(
                                                    new Date(leads.date),
                                                    "dd-MM-yyyy"
                                                  )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                  {leads.phone}
                                                </td>
                                                <td>
                                                  <button
                                                    className="w-[81px] h-[31px] rounded-md text-[#ffff] bg-gradient-to-br from-theme-primary to-[#de0202] hover:bg-gradient-to-tl (from-theme-primary to-gradient2)"
                                                    onClick={() =>
                                                      togglealot(leads._id)
                                                    }
                                                  >
                                                    Details
                                                  </button>
                                                  <DrawerContent 
                                                  styles={"managecc"}
                                                    isOpen={
                                                      isOpen.i === leads._id &&
                                                      isOpen.toggle
                                                    }
                                                    closeDrawer={closeDrawer}
                                                    item={leads}
                                                    fetchDatas={fetchDatas}
                                                    setToggle={setToggle}
                                                    toggle={toggle}
                                                  />
                                                </td>
                                              </tr>
                                            );
                                          })}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  className=" w-[120px] h-[31px] rounded-md text-[#ffff]  bg-gradient-to-br  from-theme-primary to-[#de0202] hover:bg-gradient-to-tl (from-theme-primary to-gradient2)"
                                  onClick={() => removeData(item._id)}
                                >
                                  Remove Access
                                </button>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  className=" w-[110px] h-[31px] rounded-md text-[#ffff]  bg-gradient-to-br  from-theme-primary to-[#de0202] hover:bg-gradient-to-tl (from-theme-primary to-gradient2)"
                                  onClick={() => toggleupdate(item._id)}
                                >
                                  Update
                                </button>

                                {isDrawerupdate && (
                                  <div className=" fixed inset-y-0  right-1 mt-24 2xl:max-w-[34vw] xl:max-w-[30vw] rounded-lg w-full max-h-[600px] bg-white shadow-xl overflow-y-auto transition-transform transform">
                                    <div className="bg-white p-8 rounded-lg">
                                      <button
                                        onClick={() => setIsDrawerupdate(false)}
                                        className="absolute top-2 right-2 text-gray-600"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>
                                      </button>
                                      <form onSubmit={handleUpdateSubmit}>
                                        <div className=" p-4">
                                          {/* <div>{details._id}</div> */}
                                          <div className="flex flex-col m-4">
                                            <label className="text-[#6F0000]">
                                              Name
                                            </label>
                                            <input
                                              className="rounded-[10px] bg-background-secondary w-[380px]  p-2"
                                              type="text"
                                              name="name"
                                              value={details.name}
                                              onChange={onChange}
                                            />
                                          </div>
                                          <div className="flex flex-col m-4">
                                            <label className="text-[#6F0000]">
                                              email{" "}
                                            </label>
                                            <input
                                              className="rounded-[10px] bg-background-secondary w-[380px]  p-2"
                                              type="text"
                                              name="email"
                                              value={details.email}
                                              onChange={onChange}
                                            />
                                          </div>
                                        </div>
                                        <div className="mt-20">
                                          <button
                                            type="submit"
                                            className="ml-8 bg-gradient-to-r bg-[#6F0000] px-6 py-2 text-[16px]  text-white rounded-[10px]"
                                          >
                                            Update Counsellor
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
