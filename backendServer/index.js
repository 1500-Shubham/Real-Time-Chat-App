// run code node ./index.js

// import http from "http"
const http=require("http");
const express=require("express");
// import express from "express"
// import cors from "cors"
const cors=require("cors");
// import {socketIO} from "socket.io"
const socketIO=require("socket.io");
const app = express();
const port = 4000 || process.env.PORT;
const users=[{}];
app.use(cors()); // used for inter communication kisko kisko allow hai urls
app.get("/",(req,res)=>{
    res.send("Hi / page");
})

const server=http.createServer(app);
const io=socketIO(server);

io.on("connection",(socket)=>{ // this socket is passed
    console.log("New Connection");

socket.on('joined',(data)=>{
    //data is passed
    users[socket.id]=data.user;
    console.log(`${data.user} has joined`)
    socket.emit('welcome',{user:"Admin",msg:`Welcome to the chat ${users[socket.id]}`})
    socket.broadcast.emit('userJoined',{user:"Admin",msg:`${users[socket.id]} has joined`})
})

socket.on('discon',()=>{
    socket.broadcast.emit('leave',{user:"Admin",msg:`${users[socket.id]} has left the chat`})
    console.log("User Left");
})
socket.on('message',({message,id})=>{
    io.emit('sendMessage',{user:users[id],msg:message,id:id})
    // while joining saved user details with socket id
})

})

server.listen(port,()=>{
    console.log(`Server working on port ${port}`);
})