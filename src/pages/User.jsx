import axios from 'axios';
import {React ,useContext,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/authContext";


export default function User() {

  const {login}=useContext(AuthContext)
  const initial = { email: "", password: "" };
  const [credential, setcredential] = useState(initial);
  // const [ID, setId] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://cr-mbackend-eosin.vercel.app/Addcon/signIn", {
        email: credential.email,
        password: credential.password,
      });
      // //console.log(response);
      // const json = await response.json()
      // //console.log(json);
      if (response.data.success === true) {
        //console.log(response.data);

    const authToken = JSON.stringify( jwtDecode(response.data.authToken));

    //console.log(authToken);
    //console.log(response.data.result.user.isadmin);
        localStorage.setItem("authToken",authToken)
        // const value = jwtDecode(response.data.authToken);
        // setId(value.user.id);
        if(response.data.result.user.isadmin === true){
          login();
      navigate("/");
        }
        else if(response.data.result.user.isadmin === false){
          login();
                navigate("/NewEnquires");
        }
      
      // else{
      //   //console.log("hey");
      // }
      setcredential(initial);
      alert("Welcome you are Logged In !!!");
      // navigate("/Man");
    }
    }
     catch (error) {
      //console.log(error);
      alert("invalid credential");

    }
  };

  const onchange = (event) => {
    setcredential({ ...credential, [event.target.name]: event.target.value });
  };



  return (

      <div className="bg-gradient-to-r h-screen from-[#E9EBFD] to-[#8393EB] p-[100px]">
      <div className="flex justify-evenly p-2  text-theme-primary">
        <div className="px-[40px] mt-[150px] space-y-2 ">
          <img className="h-[100px] w-[120px]" src="edu123.png" alt="" />
          <p className="text-[36px]  ">Customer Relationship Management</p>
          <p className="text-[48px] font-medium  "> Dashboard</p>
        </div>

        <div className="bg-white rounded-[20px] py-[80px] px-[40px] space-y-3 shadow-md shadow-[#00000056]">
          <div>
            <img src="coun.png" alt="" />
            <p className=" text-[36px] py-3"> Login</p>
          </div>
          <form onSubmit={handleSubmit} >
            <div className="flex flex-col ">
              <label htmlFor="" className=" text-[20px] py-2">
                Email
              </label>
              <input
              placeholder="Enter Email"
                type="text"
                name='email'
                value={credential.email}
                onChange={onchange}
                className="h-[40px] w-[400px] rounded-[10px] bg-background-secondary p-2"
                // onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col ">
              <label htmlFor="" className=" text-[20px] py-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                value={credential.password}
                onChange={onchange}
                name='password'
                className="h-[40px] w-[400px] rounded-[10px] bg-background-secondary p-2"
                // onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="pt-8">
            <button
              type="submit"
              className="gap-5 bg-gradient-to-r  from-[#6C4000] to-[#E10000] h-[40px] w-[200px] text-[16px]  text-white rounded-[10px]"
            >
              Login
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  )
}
