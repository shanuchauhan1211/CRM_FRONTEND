import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewEnquires from "./pages/NewEnquires";
import User from "./pages/User";
import Mancoun from "./pages/Managecc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CounsellorTable from "./pages/CounsellorTable";

import { AuthContext } from "./context/authContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Schools from "./pages/Schools";
import ReportMaker from "./pages/Report";

function App() {

const audio = new Audio('jaldi-waha-se-hato-ringtone-wgy59kalx-tkkb.mp3');
// //console.log("Audio object created:", audio);

  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  // //console.log(isLoggedIn);
  useEffect(() => {
    fetchDatas();
  }, [toggle]);
  useEffect(() => {
    fetchDatas();
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(async () => {
        data?.forEach((item) => {
          item?.reminders.forEach((reminder) => {
            const reminderDateTime = new Date(reminder?.datetime);
            const presentDateTime = new Date();
            if (
              reminderDateTime.getFullYear() ===
                presentDateTime.getFullYear() &&
              reminderDateTime.getMonth() === presentDateTime.getMonth() &&
              reminderDateTime.getDate() === presentDateTime.getDate() &&
              reminderDateTime.getHours() === presentDateTime.getHours() &&
              reminderDateTime.getMinutes() === presentDateTime.getMinutes()
            ) {
              try {
                audio.play();
              } catch (error) {
                console.error("Error playing audio:", error);
              }
              showAlert(reminder?.message, reminderDateTime.toLocaleString());
            } else {
              //console.log("hello");
            }
          });
        });
      }, 60000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [data]);
  const showAlert = (text, dateTime) => {
    alert(`Reminder: ${text} - Time: ${dateTime}`);
  };

  const fetchDatas = async () => {
    const token_object = JSON.parse(localStorage.getItem("authToken"));
    try {
      const response = await axios.get(
        `https://cr-mbackend-eosin.vercel.app/table/myLeads/${token_object.user.id}`
      );
      // //console.log(response.data);
      setData(response.data);
      // //console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path="/" element={<Home />} />,
              <Route
                exact
                path="/NewEnquires"
                element={<NewEnquires toggle={toggle} setToggle={setToggle} />}
              />
              
              <Route path="/Man" element={<Mancoun />} />,
              <Route path="/ConTable" element={<CounsellorTable />} />
              <Route path="/Schools" element={<Schools />} />
              <Route path="/report" element={<ReportMaker/>}/>

            </>
          ) : (
            <>
              <Route exact path="/*" element={<User />} />,
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}
export default App;
