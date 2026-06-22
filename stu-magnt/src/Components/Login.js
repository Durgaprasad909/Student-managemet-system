import React, { useState } from 'react';
import './Login.css';
import { replace, useNavigate } from 'react-router-dom';
import {FaEye} from "react-icons/fa";
import { FaEyeSlash } from 'react-icons/fa';
import { useEffect } from 'react';
const Login = () => {
  const [Id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [data,setdata]=useState("")
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   fetch(`http://127.0.0.1:8000/api/login/?Id=${Id}&password=${password}`).then(response=>response.text()).then(result=>{
  //     if (result=="True")
  //     {
  //        console.log(result)
  //        navigate('/home',{replace:true});
  //     }
  //     else{
  //       alert("Please Enter Valid Credintials")
  //     }
  //   })
  //   // if (data=="True")
  //   // {
      
  //   // }
  //   // else
  //   // {
  //   //   console.log("here",data)
      
  //   // }

    
  // };

useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/home",{replace:true});
    }

  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("hello")
    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            login_id: Id,
            password: password
          })
        }
      );

      const data = await response.json();
      console.log(data)
      if (response.ok) {

        localStorage.setItem("token", data.token);

        navigate("/home",replace("true"));

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };
  return (
    <div className="login-page">
      <div className="login-card">
        <p className="eyebrow">Faculty Portal</p>
        <h1>Faculty Login</h1>
        <p className="subtitle">Enter your faculty credentials to access the dashboard.</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="facultyId">Faculty ID</label>
          <input
            id="facultyId"
            type="text"
            value={Id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter faculty ID"
            required
          />

          <label htmlFor="password">Faculty Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button type='submit'>Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
