import React, { useState } from 'react'
import "./Join.css"
import logo from "../../images/logo.png"
import { Link } from 'react-router-dom';

var user;

export const Join = () => {  
    const sendUserFun = ()=>{
        user=document.getElementById('joinInput').value;
        document.getElementById('joinInput').value="";
    }

    const [name,setName]=useState("");
  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <img src={logo} alt='Logo'/>
            <h1>C Chat</h1>
            <input onChange={(e)=>setName(e.target.value)} placeholder='Enter Your Name' type='text' id='joinInput'/>
            <Link onClick={(e)=>!name?e.preventDefault():null} to="/chat"><button onClick={sendUserFun} className='joinbtn' >Log In</button></Link>
            <h1>JoinPage</h1>
        </div>
    </div>

  )
}

export {user};