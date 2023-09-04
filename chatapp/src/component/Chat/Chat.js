// run code npm run start // see script from package.json

import React, { useEffect, useState } from 'react'
import {user} from '../Join/Join'
import socketIO from "socket.io-client"
import "./Chat.css"
import { Message } from '../Message/Message'
import ReactScrollToBottom from "react-scroll-to-bottom"
import sendLogo from "../../images/sendLogo.png"
import closeLogo from "../../images/closeIcon.png"
const ENDPOINT="http://localhost:4000/"

let socket; // will be defined using use effect
export const Chat = () => {
const [id,setId] =useState("");
const [messages,setMessages] =useState([]);
const send=()=>{
  const message=document.getElementById("chatInput").value
  socket.emit("message",{message,id})
  document.getElementById("chatInput").value=""
}

useEffect(()=>{
      socket=socketIO(ENDPOINT,{transports:['websocket']});
      socket.on("connect",()=>{
        alert("connected") // dialog box banke dikhayega
        setId(socket.id) // socket jaha hai woh user hai abhi ka 
      })
      socket.emit('joined',{user:user});
      socket.on("welcome",(data)=>{
        setMessages([...messages,data])
        console.log(data.user,data.msg);
      })
      socket.on('userJoined',(data)=>{
        setMessages([...messages,data])
        console.log(data.user,data.msg);
      })
      socket.on('leave',(data)=>{
        setMessages([...messages,data])
        console.log(data.user,data.msg);
      })

      return ()=>{
        socket.emit('discon');
        socket.off();
      }

},[])

useEffect(() => {
  socket.on('sendMessage',(data)=>{
    setMessages([...messages,data])
    console.log(data.user,data.msg,data.id);
  })

  return () => {
    socket.off() //ek baar message jane ke baad off baar baar har message pe render pura nahi
  }
}, [messages]) // jab messages change ho tab chale use effect warna messages baar baar 
// new create ho ja raha


  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
              <h2>C Chat</h2>
              <a href='/'><img src={closeLogo} alt='close' ></img></a>
            </div>
            <ReactScrollToBottom className='chatBox'>
            {messages.map((item,i) => <Message message={item.msg} classs={item.id===id?'right':'left'} user={item.id===id?"":item.user} />)}
            </ReactScrollToBottom>
            <div className='inputBox'></div>
            <div className='myedit'>
            <input onKeyPress={(e)=> {
              if(e.key==='Enter') return send;
              else return null;
            }} type='text' id='chatInput'/>
            <button onClick={send} className='sendBtn'><img src={sendLogo} alt="Send"/></button>
            </div>
            
        </div>
    </div>
  )
}
