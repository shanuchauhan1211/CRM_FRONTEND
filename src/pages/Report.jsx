import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SchoolPDF from "../components/SchoolPDF";
import Pdf from "../components/Pdf";

const SchoolMatcher = () => {
  const [userBudget, setUserBudget] = useState("");
  const [selectedBoards, setSelectedBoards] = useState([]);
  const [selectedClass, setSelectedClass] = useState(""); // State for selected class
  const [schoolFilters, setSchoolFilters] = useState({
    daySchools: false,
    dayBoardingSchools: false,
    fullBoardingSchools: false,
    girlsSchools: false,
    boysSchools: false,
    coedSchools: false,
  });
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);

  //download refrence
  const pdfRef = useRef();

  const handleDownload = () => {
    if (pdfRef.current) {
      pdfRef.current.downloadPDF();
    }
  };

  useEffect(() => {
    const fetchSchools = () => {
      axios
        .get("https://cr-mbackend-eosin.vercel.app/schools/")
        .then((response) => {
          setSchoolsData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching schools:", error);
        });
    };
    fetchSchools();
  }, []);

  const boardsOptions = ["CBSE", "ICSE", "CIE", "IB", "IGCSE"];
  const classOptions = [
    "Class1",
    "Class2",
    "Class3",
    "Class4",
    "Class5",
    "Class6",
    "Class7",
    "Class8",
    "Class9",
    "Class10",
    "Class11",
    "Class12",
  ]; // Add class options

  const handleBoardChange = (board) => {
    setSelectedBoards((prev) => {
      if (prev.includes(board)) {
        return prev.filter((item) => item !== board);
      } else {
        return [...prev, board];
      }
    });
  };

  const handleClassChange = (className) => {
    setSelectedClass(className);
  };

  const handleFilterChange = (filter) => {
    setSchoolFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedBudget = parseInt(userBudget);
    if (!parsedBudget || selectedBoards.length === 0 || !selectedClass) {
      alert(
        "Please enter a valid budget, select at least one board, and choose a class."
      );
      return;
    }

    const matchingSchools = schoolsData.filter((school) => {
      return (
        (selectedBoards.includes("CBSE") && school.cbse_schools === "Yes") ||
        (selectedBoards.includes("ICSE") && school.icse_isc_schools === "Yes") ||
        (selectedBoards.includes("CIE") && school.cie_schools === "Yes") ||
        (selectedBoards.includes("IB") && school.ib_schools === "Yes") ||
        (selectedBoards.includes("IGCSE") && school.igcse_schools === "Yes" ||
          (schoolFilters.daySchools ? school.day_schools === "Yes" : true) &&
          (schoolFilters.dayBoardingSchools ? school.day_boarding_schools === "Yes" : true) &&
          (schoolFilters.fullBoardingSchools ? school.full_boarding_schools === "Yes" : true) &&
          (schoolFilters.girlsSchools ? school.girls_schools === "Yes" : true) &&
          (schoolFilters.boysSchools ? school.boys_schools === "Yes" : true) &&
          (schoolFilters.coedSchools ? school.coed_schools === "Yes" : true))
      );
    });

  console.log(matchingSchools);

    const topSchools = getTopMatchingSchools(
      parsedBudget,
      matchingSchools,
      selectedClass
    );
    setFilteredSchools(topSchools);
  };


  function getMatchingSchools(userBudget, schoolsData, className) {
    const minThreshold = userBudget - userBudget * 0.25;

    const matchPercentages = [
      { range: 0.25, percentage: 100 },
      { range: 0.5, percentage: 80 },
      { range: 0.75, percentage: 60 },
      { range: 1.0, percentage: 40 },
      { range: 1.25, percentage: 20 },
    ];

    let matchedSchools = [];

    for (const school of schoolsData) {
      const feeFrom = parseInt(school[`class_${className.slice(-1)}`]); // Access fee based on selected class
      const feeTo = feeFrom; // Assuming fee is the same for now, modify if needed
      const schoolBudget = (feeFrom + feeTo) / 2;

      if (schoolBudget < minThreshold) {
        continue;
      }

      for (const { range, percentage } of matchPercentages) {
        const minBudget = userBudget - userBudget * range;
        const maxBudget = userBudget + userBudget * range;

        if (schoolBudget >= minBudget && schoolBudget <= maxBudget) {
          matchedSchools.push({
            schoolName: school.name,
            schoolBudget: schoolBudget,
            matchPercentage: percentage,
            schoolRanking: parseInt(school.school_rankings),
            location: school.location,
            contact: school.contact,
            website: school.website,
            phone: school.phone,
            infrastructure: school.infrastructure,
            academic_reputation: school.academic_reputation,
            placement: school.placement,
            co_curricular_activities: school.co_curricular_activities,
            cricket: school.cricket,
            badminton: school.badminton,
            horse_riding: school.horse_riding,
            basketball: school.basketball,
            lawn_tennis: school.lawn_tennis,
            table_tennis: school.table_tennis,
            squash: school.squash,
            skating: school.skating,
            football: school.football,
            shooting: school.shooting,
            swimming: school.swimming,
            principal_msg: school.principal_msg,
            principal: school.principal,
            class_from: school.class_from,
            class_to: school.class_to,
            about_school: school.about_school,
            icse_isc_schools: school.icse_isc_schools,
            cbse_schools: school.cbse_schools,
            cie_schools: school.cie_schools,
            ib_schools: school.ib_schools,
            igcse_schools: school.igcse_schools,
            coed_schools: school.coed_schools,
            full_boarding_schools: school.full_boarding_schools,
            day_boarding_schools: school.day_boarding_schools,
            day_schools: school.day_schools,
            establishment: school.establishment,
          });
          break;
        }
      }
    }

    matchedSchools.sort((a, b) => {
      if (b.matchPercentage !== a.matchPercentage) {
        return b.matchPercentage - a.matchPercentage;
      }
      return a.schoolRanking - b.schoolRanking;
    });

    return matchedSchools;
  }

  function getTopMatchingSchools(userBudget, schoolsData, selectedClass) {
    const matches = getMatchingSchools(userBudget, schoolsData, selectedClass);

    if (matches.length >= 3) {
      return matches.slice(0, 3);
    } else if (matches.length > 0) {
      return matches.slice(0, 1);
    }

    return [];
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 overflow-x-hidden tablescrollbar">
        <Navbar />
        <div className="ml-[300px] mt-20 h-screen w-[81vw]">
          <div className="min-h-screen w-[1200px] flex items-center justify-center bg-gray-100">
            <form
              className="p-6 rounded-lg shadow-lg w-[800px] bg-[white]"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-bold mb-4 text-theme-primary">
                Find Your School
              </h2>

              {/* Budget Input */}
              <div className="mb-4">
                <label
                  htmlFor="budget"
                  className="block mb-2 text-lg text-theme-primary font-medium"
                >
                  Enter Your Budget (in INR)
                </label>
                <input
                  id="budget"
                  type="number"
                  value={userBudget}
                  onChange={(e) => setUserBudget(e.target.value)}
                  className="border-[2px] px-4 py-3 rounded-lg border-theme-primary w-[80%] text-theme-primary"
                  placeholder="Enter your name"
                />
              </div>

              {/* Class Selection */}
              <div className="mb-4">
                <label
                  htmlFor="classSelect"
                  className="block mb-2 text-lg text-theme-primary font-medium"
                >
                  Select Class:
                </label>
                <select
                  id="classSelect"
                  value={selectedClass}
                  onChange={(e) => handleClassChange(e.target.value)}
                  className="border-[2px] px-4 py-3 rounded-lg border-theme-primary w-[80%] text-theme-primary"
                >
                  <option value="">Select a class</option>
                  {classOptions.map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </select>
              </div>

              {/* School Board Selection */}
              <div className="mb-4">
                <label className="block mb-2 text-lg text-theme-primary font-medium">
                  Select Preferred School Boards
                </label>
                {boardsOptions.map((board) => (
                  <div
                    key={board}
                    className="flex items-center mb-2 text-theme-primary "
                  >
                    <input
                      type="checkbox"
                      checked={selectedBoards.includes(board)}
                      onChange={() => handleBoardChange(board)}
                      className="mr-2 w-6"
                    />
                    <span>{board}</span>
                  </div>
                ))}
              </div>

              {/* School Type Filters */}
              <div className="mb-4">
                <label className="block mb-2 font-medium text-lg text-theme-primary">
                  Select School Types
                </label>
                {Object.keys(schoolFilters).map((filter) => (
                  <div
                    key={filter}
                    className="flex items-center mb-2 text-theme-primary"
                  >
                    <input
                      type="checkbox"
                      checked={schoolFilters[filter]}
                      onChange={() => handleFilterChange(filter)}
                      className="mr-2"
                    />
                    <span>
                      {filter.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 p-2 px-6 bg-gradient1 text-white rounded"
              >
                Find Schools
              </button>
              <div>
                <div className="md:hidden">
                  <Pdf
                    ref={pdfRef}
                    school={filteredSchools}
                    selectedClass={selectedClass}
                  />
                </div>
                <div className="flex mt-8">
                  <button
                    onClick={handleDownload}
                    className="bg-gradient1 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </form>

            {/* Results Section */}
            <div className="-mt-4 ml-20 -mr-28 bg-white py-4 rounded-lg shadow-lg px-8">
              {filteredSchools.length > 0 ? (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-theme-primary">
                    Matching Schools
                  </h2>
                  <ul>
                    {filteredSchools.map((school, index) => (
                      <li
                        key={index}
                        className="mb-2 p-4 border border-theme-primary rounded"
                      >
                        <div className="text-theme-primary">
                          <h3 className="font-semibold">{school.schoolName}</h3>
                          <p>Estimated Budget: ₹{school.schoolBudget}</p>
                          <p>Match Percentage: {school.matchPercentage}%</p>
                          <p>Ranking: {school.schoolRanking}</p>
                          <p>Location: {school.location}</p>
                          <p>Contact: {school.contact}</p>
                          <p>
                            Website:{" "}
                            <a
                              href={school.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {school.website}
                            </a>
                          </p>
                          <p>Phone: {school.phone}</p>
                          <p> infrastructure: {school.infrastructure}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <PDFDownloadLink
                    document={<SchoolPDF schools={filteredSchools} />}
                    fileName="matching_schools.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        <button className="mt-4 p-2 bg-green-600 text-black rounded">
                          Loading PDF...
                        </button>
                      ) : (
                        <button className="hidden mt-4 p-2 bg-green-600 text-black rounded">
                          Download PDF
                        </button>
                      )
                    }
                  </PDFDownloadLink>
                </div>
              ) : (
                <p className="text-theme-primary">No match found.......</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolMatcher;
