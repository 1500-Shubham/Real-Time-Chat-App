import React, { useEffect } from 'react'
import {user} from '../Join/Join'
import socketIO from "socket.io-client"
import "./Chat.css"
import sendLogo from "../../images/sendLogo.png"
const ENDPOINT="http://localhost:5000/"

export const Chat = () => {

useEffect(()=>{
      const socket=socketIO(ENDPOINT,{transports:['websocket']});
      socket.on("connect",()=>{
        alert("connected") // dialog box banke dikhayega
      })
      socket.emit('joined',{user:user});
      socket.on("welcome",(data)=>{
        console.log(data.user,data.msg);
      })
      socket.on('userJoined',(data)=>{
        console.log(data.user,data.msg);
      })
      
      return ()=>{
        socket.emit('discon');
        socket.off();
      }

},[])

  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'></div>
            <div className='chatBox'></div>
            <div className='inputBox'></div>
            <div className='myedit'>
            <input type='text' id='chatInput'/>
            <button className='sendBtn'><img src={sendLogo} alt="Send"/></button>
            </div>
            
        </div>
    </div>
  )
}
