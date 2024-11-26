import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx"

export default function NewEnquiresTitle({data}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddLeadsClick = () => {
    setIsDrawerOpen(true);
  };




  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const downloadAsExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };
  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const modifiedData = jsonData.map((entry) => {
          return {
            name: entry.full_name || entry.name,
            phone: entry.phone_number || entry.phone,
            mail: entry.email,
            city: entry.city,
            date: Date.now(),
          };
        });
        // Send modified data to the backend
        modifiedData.forEach((entry) => {
          // Assuming you're using Axios for making HTTP requests
          axios
            .post(
              "https://cr-mbackend-eosin.vercel.app/table/table",
              entry
            )
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error("Error uploading lead:", error);
            });
        });
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        console.error("No file selected");
      }
    };









  return (
    <div>
      <div className="h-[63px] flex justify-between items-center  pr-5 pl-3">
        <p className="text-2xl font-medium text-theme-primary">Enquries</p>
        <div className="flex  gap-10">
          {/* File input for Excel file */}
          <button  className="w-[150px] h-[39px] bg-gradient-to-br  from-theme-primary to-[#DE0202] hover:bg-gradient-to-tl (from-theme-primary to-[#DE0202]) text-[#FFFFFF] rounded-lg font-semibold"
            onClick={() => downloadAsExcel(data, "data")}>
            Download Excel
          </button>
          <input
            className="w-[200px] text-theme-primary"
            type="file"
            onChange={handleFileChange}
            accept=".xls"
          />
          <button
            className="w-[110px] h-[39px] bg-gradient-to-br  from-theme-primary to-[#DE0202] hover:bg-gradient-to-tl (from-theme-primary to-[#DE0202]) text-[#FFFFFF] rounded-lg font-semibold"
            onClick={handleUpload}
          >
            Upload
          </button>
          
          <div className="">
          <button
            className="w-[110px] h-[39px] bg-gradient-to-br  from-theme-primary to-[#de0202] hover:bg-gradient-to-tl (from-theme-primary to-[#de0202]) text-[#ffffff] rounded-lg font-semibold"
            onClick={handleAddLeadsClick}
          >
            Add Leads
          </button>
        </div>
        </div>
       
      </div>
      {isDrawerOpen && (
        <Drawer
          onClose={() => {
            setIsDrawerOpen(false);
            // document.body.style.overflow = "auto";
          }}
        />
      )}
    </div>
  );
}

function Drawer({ onClose }) {
  const [addSibling, setAddSibling] = useState(false);
  const [siblingsData, setSiblingsData] = useState([]);
  const [shivam, setShivam] = useState({ name: "", grade: "" });

  const initial = {
    name: "",
    grade: "",
    city: "",
    email: "",
    parent: "",
    school_name: "",
    phone: "",
    siblings: [],
    deposition: "",
    // remark: [],
  };

  const [credential, setcredential] = useState(initial);

  const handleAddSibling = () => {
    setAddSibling(true);
  };

  const handleSub = (name) => {
    setSiblingsData([...siblingsData, name]);
    setShivam({});
    setAddSibling(false);
  };

  const handleSubmit = async (e) => {
    console.log(credential)
    e.preventDefault();
    try {
      const response = await axios.post("https://cr-mbackend-eosin.vercel.app/table/table", {
        name: credential.name,
        date: credential.date,
        grade: credential.grade,
        city: credential.city,
        mail: credential.email,
        parent: credential.parent,
        school_name: credential.school_name,
        phone: credential.phone,
        siblings: siblingsData,
        remark:[]
      });

      setcredential(initial);
      setSiblingsData([]);
      alert("user created");
    } catch (error) {
      console.log(credential);

      alert("invalid credential");
    }
  };

  const onChange = (event) => {
    setcredential({ ...credential, [event.target.name]: event.target.value });
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...siblingsData];
    updatedItems.splice(index, 1);
    setSiblingsData(updatedItems);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-x-hidden">
      <div
        className="absolute inset-0 bg-gray-800 bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      <div className="fixed inset-y-0 right-1 mt-24 2xl:max-w-[84vw] xl:max-w-[80vw] rounded-lg w-full max-h-[620px] bg-white shadow-lg shadow-[#e3afaf] overflow-y-auto transition-transform transform">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Add Leads</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
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
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-3 ">
            <div className="flex flex-col m-4">
              <label className="text-[#6F0000]">Student Name</label>
              <input
                className="rounded-[10px] bg-background-secondary xl-w-[300px] 2xl-w-[380px]  p-2"
                type="text"
                name="name"
                value={credential.name}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col m-4">
              <label className="text-[#6F0000]">Parent Name</label>
              <input
                className="rounded-[10px] bg-background-secondary xl-w-[300px] 2xl-w-[380px]  p-2"
                type="text"
                name="parent"
                value={credential.parent}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col m-4">
              <label className="text-[#6F0000]">Grade</label>
              <input
                className="rounded-[10px] bg-background-secondary xl-w-[300px] 2xl-w-[380px]  p-2"
                type="text"
                name="grade"
                value={credential.grade}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col m-4">
              <label className="text-[#6F0000]">Email</label>
              <input
                className="rounded-[10px] bg-background-secondary xl-w-[300px] 2xl-w-[380px]  p-2"
                type="text"
                name="email"
                value={credential.email}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col m-4">
              <label className="text-[#6F0000]">Contact</label>
              <input
                className="rounded-[10px] bg-background-secondary xl-w-[300px] 2xl-w-[380px]  p-2"
                type="text"
                name="phone"
                value={credential.phone}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col m-4">
              <label className="text-[#6F0000]">City</label>
              <input
                className="rounded-[10px] bg-background-secondary xl-w-[300px] 2xl-w-[380px]  p-2"
                type="text"
                name="city"
                value={credential.city}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col m-4">
              <label className="text-[#6F0000]">School Name</label>
              <input
                className="rounded-[10px] bg-background-secondary xl-w-[300px] 2xl-w-[380px] p-2"
                type="text"
                name="school_name"
                value={credential.school_name}
                onChange={onChange}
              />
            </div>

            <button
              type="button"
              className=" w-[150px] h-[50px] bg-gradient-to-r bg-[#6F0000] text-[16px] ml-5 mt-9  text-white rounded-[10px]"
              onClick={handleAddSibling}
            >
              Add siblings
            </button>
            <div className="mt-5">
              {siblingsData.map((item, index) => {
                return (
                  <div className="flex ">
                    <div>
                      <ul className="text-[20px] text-[#6F0000] ml-7 list-disc">
                        <li className="">
                          {item.name} || {item.grade}
                        </li>
                      </ul>
                    </div>
                    <div className="mt-2">
                      <button
                        className="text-gray-600 hover:text-gray-800 ml-6 "
                        type="button"
                        onClick={() => handleDeleteItem(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {addSibling && (
            <div className="flex w-[80vw] gap-6">
              <div className="flex flex-col m-4">
                <label className="text-[#6F0000]">Sibling Name</label>
                <input
                  className="rounded-[10px] bg-background-secondary w-[300px] 2xl-w-[380px] p-2"
                  type="text"
                  name="name"
                  value={shivam.name}
                  onChange={(e) => {
                    setShivam({ name: e.target.value, grade: shivam.grade });
                  }}
                />
              </div>
              <div className="flex flex-col m-4">
                <label className="text-[#6F0000]">Sibling Grade</label>
                <input
                  className="rounded-[10px] bg-background-secondary w-[300px] 2xl-w-[380px] p-2"
                  type="text"
                  name="grade"
                  value={shivam.grade}
                  onChange={(e) => {
                    setShivam({ name: shivam.name, grade: e.target.value });
                  }}
                />
              </div>
              <div className="mt-8">
                <button
                  type="button"
                  className="bg-gradient-to-r bg-[#6F0000] text-[16px] px-6 py-3 text-white rounded-md"
                  onClick={() => {
                    handleSub(shivam);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          <div className="mt-4">
            <button
              type="submit"
              className=" w-[150px] h-[50px] ml-5 bg-gradient-to-r bg-[#6F0000] px-6 py-2 text-[16px] mb-8  text-white rounded-[10px]"
            >
              Add Leads
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
