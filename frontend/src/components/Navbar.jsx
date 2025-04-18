import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar({ handleLogout }) {
     const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("isLoggedIn"));
    
      useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
      }, []);
    
    return (
        <div className='nav-container' >
            <Link className='link-style' to={"/"}>Home</Link>
            <Link className='link-style' to={"/create"}>Write Blog</Link>
            
        {
            isLoggedIn? <Link className='link-style' to={"/profile"}>Profile</Link> : <Link className='link-style' to={"/login"}>Login</Link>
        }
        </div>
    )
}

export default Navbar;