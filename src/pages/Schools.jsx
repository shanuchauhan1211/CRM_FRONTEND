import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";

const Schools = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [schools, setSchools] = useState([]);
  const [editingSchool, setEditingSchool] = useState(null);
  const [schoolForm, setSchoolForm] = useState({});

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
            name: String(entry.name || ""), // Name of the school
            location: String(entry.Location || ""), // Location of the school
            slug: String(entry.slug || ""), // Slug
            about_school: String(entry.about_school || ""), // About the school
            contact: String(entry.Contact || ""), // Contact person
            phone: String(entry.Phone || ""), // Phone number
            email: String(entry.email || ""), // Email address
            full_address: String(entry.fullAddress || ""), // Full address of the school
            website: String(entry.website || ""), // Website URL
            fee_from: String(entry.feefrom || ""), // Fee range starting
            fee_to: String(entry.feeto || ""), // Fee range ending
            nursery: String(entry.Nursery || ""), // Nursery details
            kg: String(entry.KG || ""), // Kindergarten details
            class_1: String(entry.Class1 || ""), // Class 1
            class_2: String(entry.Class2 || ""), // Class 2
            class_3: String(entry.Class3 || ""), // Class 3
            class_4: String(entry.Class4 || ""), // Class 4
            class_5: String(entry.Class5 || ""), // Class 5
            class_6: String(entry.Class6 || ""), // Class 6
            class_7: String(entry.Class7 || ""), // Class 7
            class_8: String(entry.Class8 || ""), // Class 8
            class_9: String(entry.Class9 || ""), // Class 9
            class_10: String(entry.Class10 || ""), // Class 10
            class_11: String(entry.Class11 || ""), // Class 11
            class_12: String(entry.Class12 || ""), // Class 12
            class_from: String(entry.classfrom || ""), // Class starting
            class_to: String(entry.classto || ""), // Class ending
            day_schools: String(entry.day_schools || ""), // Day schools
            day_boarding_schools: String(entry.day_boarding_schools || ""), // Day boarding schools
            full_boarding_schools: String(entry.full_boarding_schools || ""), // Full boarding schools
            girls_schools: String(entry.girls_schools || ""), // Girls schools
            boys_schools: String(entry.boys_schools || ""), // Boys schools
            coed_schools: String(entry.coed_schools || ""), // Co-ed schools
            icse_isc_schools: String(entry.icse_isc_schools || ""), // ICSE/ISC board schools
            cbse_schools: String(entry.cbse_schools || ""), // CBSE board schools
            cie_schools: String(entry.cie_schools || ""), // CIE schools
            ib_schools: String(entry.ib_schools || ""), // IB schools
            igcse_schools: String(entry.igcse_schools || ""), // IGCSE schools
            establishment: String(entry.establishment || ""), // Year of establishment
            admission_start: String(entry.admissionstart || ""), // Admission start date
            admission_end: String(entry.admissionend || ""), // Admission end date
            principal: String(entry.principal || ""), // Principal's name
            principal_msg: String(entry.principal_msg || ""), // Principal's message
            director: String(entry.director || ""), // Director's name
            director_msg: String(entry.director_msg || ""), // Director's message
            headmaster: String(entry.headmaster || ""), // Headmaster's name
            headmaster_msg: String(entry.headmaster_msg || ""), // Headmaster's message
            chairman: String(entry.chairman || ""), // Chairman's name
            chairman_msg: String(entry.chairman_msg || ""), // Chairman's message
            cricket: String(entry.Cricket || ""), // Cricket facility
            badminton: String(entry.Badminton || ""), // Badminton facility
            horse_riding: String(entry.Horse_Riding || ""), // Horse riding facility
            basketball: String(entry.Basketball || ""), // Basketball facility
            lawn_tennis: String(entry.Lawn_Tennis || ""), // Lawn tennis facility
            table_tennis: String(entry.Table_Tennis || ""), // Table tennis facility
            squash: String(entry.Squash || ""), // Squash facility
            skating: String(entry.Skating || ""), // Skating facility
            football: String(entry.Football || ""), // Football facility
            shooting: String(entry.Shooting || ""), // Shooting facility
            swimming: String(entry.Swimming || ""), // Swimming facility
            image_code: String(entry.Image_Code || ""), // Image code
            latitude: String(entry.Latitude || ""), // Latitude for location
            longitude: String(entry.Longitude || ""), // Longitude for location
            review_1: String(entry.review1 || ""), // Review 1
            review_2: String(entry.review2 || ""), // Review 2
            review_3: String(entry.review3 || ""), // Review 3
            alumni_1: String(entry.alumni1 || ""), // Alumni 1
            alumni_2: String(entry.alumni2 || ""), // Alumni 2
            alumni_3: String(entry.alumni3 || ""), // Alumni 3
            avg_results: String(entry.Avg_results || ""), // Average results
            infrastructure: String(entry.Infrastructure || ""), // Infrastructure details
            academic_reputation: String(entry.Academic_Reputation || ""), // Academic reputation
            co_curricular_activities: String(
              entry.Co_Curricular_Activities || ""
            ), // Co-curricular activities
            placement: String(entry.Placement || ""), // Placement information
            total_points: String(entry.Total_Points || ""), // Total points
            school_rankings: String(entry.School_Rankings || ""), // School rankings
          };
        });

        console.log(modifiedData);

        // Upload each school entry
        modifiedData.forEach((entry) => {
          axios
            .post("https://cr-mbackend-eosin.vercel.app/schools/schoolsuploadxls", entry)
            .then((response) => {
              console.log(response.data);
              fetchSchools(); // Refresh the school list after upload
            })
            .catch((error) => {
              console.error("Error uploading school:", error);
            });
        });
      };

      reader.readAsArrayBuffer(selectedFile);
    } else {
      console.error("No file selected");
    }
  };

  const fetchSchools = () => {
    axios
      .get("https://cr-mbackend-eosin.vercel.app/schools")
      .then((response) => {
        setSchools(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching schools:", error);
      });
  };

  const handleEditClick = (school) => {
    setEditingSchool(school);
    setSchoolForm(school); // Set form fields to current school data
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this school?");
    if (confirmDelete) {
      axios
        .delete(`https://cr-mbackend-eosin.vercel.app/schools/${id}`)
        .then((response) => {
          console.log(response.data);
          fetchSchools();
        })
        .catch((error) => {
          console.error("Error deleting school:", error);
        });
    } else {
      console.log("Deletion cancelled");
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setSchoolForm({ ...schoolForm, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`https://cr-mbackend-eosin.vercel.app/schools/${editingSchool._id}`, schoolForm)
      .then((response) => {
        setEditingSchool(null); // Clear editing state
        fetchSchools(); // Refresh the school list after updating
      })
      .catch((error) => {
        console.error("Error updating school:", error);
      });
  };

  useEffect(() => {
    fetchSchools(); // Fetch schools on component mount
  }, []);

  return (
    <div className="my-16">
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex-1 overflow-x-hidden tablescrollbar">
          <Navbar />
          <div
            className="ml-[340px] mt-[4%] w-[75vw] bg-[#ffff] p-4 rounded-lg"
            style={{
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h1 className="text-2xl text-theme-primary pb-4 font-bold">
              Manage Schools
            </h1>

            {/* File Upload Section */}
            <input
              type="file"
              onChange={handleFileChange}
              className="px-4 py-2 rounded-lg border-theme-primary border-[2px]"
            />
            <button
              onClick={handleUpload}
              className="px-6 h-[50px] ml-10 bg-gradient-to-br  from-theme-primary to-[#DE0202] hover:bg-gradient-to-tl (from-theme-primary to-[#DE0202]) text-[#FFFFFF] rounded-lg font-semibold"
            >
              Upload Schools
            </button>

            {/* Editing Section */}
            {editingSchool && (
              <div className="bg-white p-4 h-fit absolute inset-0 z-10 ">
                <div className="flex justify-between">
                  <h2 className="text-2xl text-theme-primary font-bold mb-8 ml-20 ">
                    Edit School
                  </h2>
                  <div className="">
                    <button
                      type="button"
                      onClick={() => setEditingSchool(null)}
                      className="px-4 py-2 bg-gradient-to-br  from-theme-primary to-[#DE0202] hover:bg-gradient-to-tl (from-theme-primary to-[#DE0202]) text-[#FFFFFF] rounded-full font-semibold text-lg "
                    >
                      X
                    </button>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 mx-20 text-theme-primary text-[18px]">
                    {/* Basic School Info */}
                    <label className="font-semibold text-[20px]">
                      School Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={schoolForm.name}
                      onChange={handleFormChange}
                      placeholder="School Name"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={schoolForm.location}
                      onChange={handleFormChange}
                      placeholder="Location"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Slug</label>
                    <input
                      type="text"
                      name="slug"
                      value={schoolForm.slug}
                      onChange={handleFormChange}
                      placeholder="Slug"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      About School
                    </label>
                    <input
                      type="text"
                      name="about_school"
                      value={schoolForm.about_school}
                      onChange={handleFormChange}
                      placeholder="About School"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    {/* Contact Info */}
                    <label className="font-semibold text-[20px]">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={schoolForm.contact}
                      onChange={handleFormChange}
                      placeholder="Contact Person"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={schoolForm.phone}
                      onChange={handleFormChange}
                      placeholder="Phone"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={schoolForm.email}
                      onChange={handleFormChange}
                      placeholder="Email"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Full Address
                    </label>
                    <input
                      type="text"
                      name="full_address"
                      value={schoolForm.full_address}
                      onChange={handleFormChange}
                      placeholder="Full Address"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Website</label>
                    <input
                      type="text"
                      name="website"
                      value={schoolForm.website}
                      onChange={handleFormChange}
                      placeholder="Website"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    {/* Fees */}
                    <label className="font-semibold text-[20px]">
                      Fee From
                    </label>
                    <input
                      type="text"
                      name="fee_from"
                      value={schoolForm.fee_from}
                      onChange={handleFormChange}
                      placeholder="Fee From"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Fee To</label>
                    <input
                      type="text"
                      name="fee_to"
                      value={schoolForm.fee_to}
                      onChange={handleFormChange}
                      placeholder="Fee To"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    {/* Classes */}
                    <label className="font-semibold text-[20px]">Nursery</label>
                    <input
                      type="text"
                      name="nursery"
                      value={schoolForm.nursery}
                      onChange={handleFormChange}
                      placeholder="Nursery"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">KG</label>
                    <input
                      type="text"
                      name="kg"
                      value={schoolForm.kg}
                      onChange={handleFormChange}
                      placeholder="KG"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Class 1</label>
                    <input
                      type="text"
                      name="class_1"
                      value={schoolForm.class_1}
                      onChange={handleFormChange}
                      placeholder="Class 1"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Class 2</label>
                    <input
                      type="text"
                      name="class_2"
                      value={schoolForm.class_2}
                      onChange={handleFormChange}
                      placeholder="Class 2"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Class 3</label>
                    <input
                      type="text"
                      name="class_3"
                      value={schoolForm.class_3}
                      onChange={handleFormChange}
                      placeholder="Class 3"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Class 4</label>
                    <input
                      type="text"
                      name="class_4"
                      value={schoolForm.class_4}
                      onChange={handleFormChange}
                      placeholder="Class 4"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Class 5</label>
                    <input
                      type="text"
                      name="class_5"
                      value={schoolForm.class_5}
                      onChange={handleFormChange}
                      placeholder="Class 5"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Class 6</label>
                    <input
                      type="text"
                      name="class_6"
                      value={schoolForm.class_6}
                      onChange={handleFormChange}
                      placeholder="Class 6"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Class 7</label>
                    <input
                      type="text"
                      name="class_7"
                      value={schoolForm.class_7}
                      onChange={handleFormChange}
                      placeholder="Class 7"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Class 8</label>
                    <input
                      type="text"
                      name="class_8"
                      value={schoolForm.class_8}
                      onChange={handleFormChange}
                      placeholder="Class 8"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">Class 9</label>
                    <input
                      type="text"
                      name="class_9"
                      value={schoolForm.class_9}
                      onChange={handleFormChange}
                      placeholder="Class 9"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Class 10
                    </label>
                    <input
                      type="text"
                      name="class_10"
                      value={schoolForm.class_10}
                      onChange={handleFormChange}
                      placeholder="Class 10"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Class 11
                    </label>
                    <input
                      type="text"
                      name="class_11"
                      value={schoolForm.class_11}
                      onChange={handleFormChange}
                      placeholder="Class 11"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Class 12
                    </label>
                    <input
                      type="text"
                      name="class_12"
                      value={schoolForm.class_12}
                      onChange={handleFormChange}
                      placeholder="Class 12"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    {/* Add similar inputs for other classes (Class 3 to Class 12) */}

                    {/* School Type */}
                    <label className="font-semibold text-[20px]">
                      Class From
                    </label>
                    <input
                      type="text"
                      name="class_from"
                      value={schoolForm.class_from}
                      onChange={handleFormChange}
                      placeholder="Class From"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Class To
                    </label>
                    <input
                      type="text"
                      name="class_to"
                      value={schoolForm.class_to}
                      onChange={handleFormChange}
                      placeholder="Class To"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Day Schools
                    </label>
                    <select
                      name="day_schools"
                      value={schoolForm.day_schools}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Day Boarding Schools
                    </label>
                    <select
                      name="day_boarding_schools"
                      value={schoolForm.day_boarding_schools}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Full Boarding Schools
                    </label>
                    <select
                      name="full_boarding_schools"
                      value={schoolForm.full_boarding_schools}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Girls Schools
                    </label>
                    <select
                      name="girls_schools"
                      value={schoolForm.girls_schools}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Boys Schools
                    </label>
                    <select
                      name="boys_schools"
                      value={schoolForm.boys_schools}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Co-ed Schools
                    </label>
                    <select
                      name="coed_schools"
                      value={schoolForm.coed_schools}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      ICSE/ISC Schools
                    </label>
                    <select
                      name="icse_isc_schools"
                      value={schoolForm.icse_isc_schools}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      CBSE Schools
                    </label>
                    <select
                      name="cbse_schools"
                      value={schoolForm.cbse_schools}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      CIE Schools
                    </label>
                    <select
                      name="cie_schools"
                      value={schoolForm.cie_schools}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      IB Schools
                    </label>
                    <select
                      name="ib_schools"
                      value={schoolForm.ib_schools}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      IGCSE Schools
                    </label>
                    <select
                      name="igcse_schools"
                      value={schoolForm.igcse_schools}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Establishment Year
                    </label>
                    <input
                      type="text"
                      name="establishment"
                      value={schoolForm.establishment}
                      onChange={handleFormChange}
                      placeholder="Establishment Year"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Admission Start
                    </label>
                    <input
                      type="text"
                      name="admission_start"
                      value={schoolForm.admission_start}
                      onChange={handleFormChange}
                      placeholder="Admission Start"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Admission End
                    </label>
                    <input
                      type="text"
                      name="admission_end"
                      value={schoolForm.admission_end}
                      onChange={handleFormChange}
                      placeholder="Admission End"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Principal
                    </label>
                    <input
                      type="text"
                      name="principal"
                      value={schoolForm.principal}
                      onChange={handleFormChange}
                      placeholder="Principal"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Principal Message
                    </label>
                    <input
                      type="text"
                      name="principal_msg"
                      value={schoolForm.principal_msg}
                      onChange={handleFormChange}
                      placeholder="Principal Message"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Director
                    </label>
                    <input
                      type="text"
                      name="director"
                      value={schoolForm.director}
                      onChange={handleFormChange}
                      placeholder="Director"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Director Message
                    </label>
                    <input
                      type="text"
                      name="director_msg"
                      value={schoolForm.director_msg}
                      onChange={handleFormChange}
                      placeholder="Director Message"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Headmaster
                    </label>
                    <input
                      type="text"
                      name="headmaster"
                      value={schoolForm.headmaster}
                      onChange={handleFormChange}
                      placeholder="Headmaster"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Headmaster Message
                    </label>
                    <input
                      type="text"
                      name="headmaster_msg"
                      value={schoolForm.headmaster_msg}
                      onChange={handleFormChange}
                      placeholder="Headmaster Message"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Chairman
                    </label>
                    <input
                      type="text"
                      name="chairman"
                      value={schoolForm.chairman}
                      onChange={handleFormChange}
                      placeholder="Chairman"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Chairman Message
                    </label>
                    <input
                      type="text"
                      name="chairman_msg"
                      value={schoolForm.chairman_msg}
                      onChange={handleFormChange}
                      placeholder="Chairman Message"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    {/* Sports Fields */}
                    <label className="font-semibold text-[20px]">Cricket</label>
                    <select
                      name="cricket"
                      value={schoolForm.cricket}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Badminton
                    </label>
                    <select
                      name="badminton"
                      value={schoolForm.badminton}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Horse Riding
                    </label>
                    <select
                      name="horse_riding"
                      value={schoolForm.horse_riding}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Basketball
                    </label>
                    <select
                      name="basketball"
                      value={schoolForm.basketball}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Lawn Tennis
                    </label>
                    <select
                      name="lawn_tennis"
                      value={schoolForm.lawn_tennis}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Table Tennis
                    </label>
                    <select
                      name="table_tennis"
                      value={schoolForm.table_tennis}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">Squash</label>
                    <select
                      name="squash"
                      value={schoolForm.squash}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">Skating</label>
                    <select
                      name="skating"
                      value={schoolForm.skating}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Football
                    </label>
                    <select
                      name="football"
                      value={schoolForm.football}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Shooting
                    </label>
                    <select
                      name="shooting"
                      value={schoolForm.shooting}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Swimming
                    </label>
                    <select
                      name="swimming"
                      value={schoolForm.swimming}
                      onChange={handleFormChange}
                      className="border-[2px] px-4 py-2 rounded-lg"
                    >
                      <option value="NA">NA</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    <label className="font-semibold text-[20px]">
                      Image Code
                    </label>
                    <input
                      type="text"
                      name="image_code"
                      value={schoolForm.image_code}
                      onChange={handleFormChange}
                      placeholder="Image Code"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Latitude
                    </label>
                    <input
                      type="text"
                      name="latitude"
                      value={schoolForm.latitude}
                      onChange={handleFormChange}
                      placeholder="Latitude"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Longitude
                    </label>
                    <input
                      type="text"
                      name="longitude"
                      value={schoolForm.longitude}
                      onChange={handleFormChange}
                      placeholder="Longitude"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Review 1
                    </label>
                    <input
                      type="text"
                      name="review_1"
                      value={schoolForm.review_1}
                      onChange={handleFormChange}
                      placeholder="Review 1"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Review 2
                    </label>
                    <input
                      type="text"
                      name="review_2"
                      value={schoolForm.review_2}
                      onChange={handleFormChange}
                      placeholder="Review 2"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Review 3
                    </label>
                    <input
                      type="text"
                      name="review_3"
                      value={schoolForm.review_3}
                      onChange={handleFormChange}
                      placeholder="Review 3"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Alumni 1
                    </label>
                    <input
                      type="text"
                      name="alumni_1"
                      value={schoolForm.alumni_1}
                      onChange={handleFormChange}
                      placeholder="Alumni 1"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Alumni 2
                    </label>
                    <input
                      type="text"
                      name="alumni_2"
                      value={schoolForm.alumni_2}
                      onChange={handleFormChange}
                      placeholder="Alumni 2"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Alumni 3
                    </label>
                    <input
                      type="text"
                      name="alumni_3"
                      value={schoolForm.alumni_3}
                      onChange={handleFormChange}
                      placeholder="Alumni 3"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Average Results
                    </label>
                    <input
                      type="text"
                      name="avg_results"
                      value={schoolForm.avg_results}
                      onChange={handleFormChange}
                      placeholder="Average Results"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Infrastructure
                    </label>
                    <input
                      type="text"
                      name="infrastructure"
                      value={schoolForm.infrastructure}
                      onChange={handleFormChange}
                      placeholder="Infrastructure"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Academic Reputation
                    </label>
                    <input
                      type="text"
                      name="academic_reputation"
                      value={schoolForm.academic_reputation}
                      onChange={handleFormChange}
                      placeholder="Academic Reputation"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Co-Curricular Activities
                    </label>
                    <input
                      type="text"
                      name="co_curricular_activities"
                      value={schoolForm.co_curricular_activities}
                      onChange={handleFormChange}
                      placeholder="Co-Curricular Activities"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Placement
                    </label>
                    <input
                      type="text"
                      name="placement"
                      value={schoolForm.placement}
                      onChange={handleFormChange}
                      placeholder="Placement"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      Total Points
                    </label>
                    <input
                      type="text"
                      name="total_points"
                      value={schoolForm.total_points}
                      onChange={handleFormChange}
                      placeholder="Total Points"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    <label className="font-semibold text-[20px]">
                      School Rankings
                    </label>
                    <input
                      type="text"
                      name="school_rankings"
                      value={schoolForm.school_rankings}
                      onChange={handleFormChange}
                      placeholder="School Rankings"
                      className="border-[2px] px-4 py-2 rounded-lg"
                    />

                    {/* Add more fields as required by the schema */}
                  </div>

                  <div className="mt-6 text-xl ml-20">
                    <div className="flex gap-8">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-br  from-theme-primary to-[#DE0202] hover:bg-gradient-to-tl (from-theme-primary to-[#DE0202]) text-[#FFFFFF] rounded-lg font-semibold"
                      >
                        Update School
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingSchool(null)}
                        className="px-6 py-2 bg-gradient-to-br  from-theme-primary to-[#DE0202] hover:bg-gradient-to-tl (from-theme-primary to-[#DE0202]) text-[#FFFFFF] rounded-lg font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* School List Section */}
            <table className="mt-6 w-full">
              <thead>
                <tr className="text-theme-primary text-[22px] font-semibold">
                  <th className=" text-start px-4 py-2">Name</th>
                  <th className="text-start px-4 py-2">Location</th>
                  <th className="text-start px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school, index) => (
                  <tr
                    key={school._id}
                    className={
                      index % 2 === 0
                        ? "hover:bg-[#e6edfa] h-[50px] text-lg font-medium text-theme-primary"
                        : "hover:bg-[#e6edfa] h-[50px] text-lg font-medium text-theme-primary bg-[#e2e8f0]"
                    }
                  >
                    <td className="px-4 py-2 ">
                      <p>{school.name}</p>
                    </td>
                    <td className=" px-4 py-2">{school.location}</td>
                    <td className=" px-4 py-2">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleEditClick(school)}
                          className="w-28 h-10 bg-gradient-to-br  from-theme-primary to-[#DE0202] hover:bg-gradient-to-tl (from-theme-primary to-[#DE0202]) text-[#FFFFFF] rounded-lg font-semibold"
                        >
                          Edit
                        </button>
                        <button onClick={() => handleDelete(school._id)}>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Popup for Viewing All Schools */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schools;
