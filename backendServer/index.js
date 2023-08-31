// import http from "http"
const http=require("http");
const express=require("express");
// import express from "express"
// import cors from "cors"
const cors=require("cors");
// import {socketIO} from "socket.io"
const socketIO=require("socket.io");
const app = express();
const port = 5000 || process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Hi / page");
})

const server=http.createServer(app);
const io=socketIO(server);

io.on("connection",()=>{
    console.log("New Connection");
})

server.listen(port,()=>{
    console.log(`Server working on port ${port}`);
})