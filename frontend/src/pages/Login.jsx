import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
     const response = await axios.post("http://localhost:3002/auth/login",{email,password});
      console.log("Response: ",response);
      localStorage.setItem("userId", response.data.data.userID);
      localStorage.setItem("isLoggedIn",true);
      localStorage.setItem("token", response.data.data.token);
      setEmail("")
      setPassword("")
      alert("Login Successful!");
      navigate("/")
      window.location.reload()
    }catch(err){
      const errorMessage = err.response?.data?.error || "Something Went Wrong!";
      console.log(errorMessage);
    }
  }
  return (
    <div className='parent-auth-container'>
      <h1 className='heading-text'>Login</h1>
      <div className='login-page'>
        <form onSubmit={handleSubmit} className='form-page'>
          <label htmlFor="email">Email</label>
          <input type="email" id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="password">Password</label>
          <input type="text" id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type='submit'>Login</button>
          <p className='line-style'>New here? <Link style={{ color: "red", textDecoration: "none", fontWeight: "bolder" }} to={"/register"}>Register</Link> Now.</p>
        </form>
      </div>
    </div>
  )
}

export default Login;