import axios from 'axios';
import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import './Register.css';


function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate =useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/auth/register", { username, email, password })
            console.log("Response: ", response);
            setUsername("");
            setEmail("");
            setPassword("");
            alert("Registration Successful!")
            navigate('/login')
            
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Something went wrong!";
            console.log("Axios Error: ", errorMessage);
        }
    }
    return (
        <div className='parent-auth-container'>
            <h1 className='heading-text'>REGISTER</h1>
            <div className='register-page'>
                <form onSubmit={handleSubmit} className='form-page'>
                    <label htmlFor="name">Username</label>
                    <input type="text" id='name' name='name' value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="password">Password</label>
                    <input type="text" id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type='submit'>Register</button>
                    <p className='line-style'>already registered? <Link style={{ color: "red", textDecoration: "none", fontWeight: "bolder" }} to={"/login"}>Login</Link> here.</p>
                </form>
            </div>
        </div>
    )
}
export default Register;