import { Join } from './component/Join/Join';
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Chat } from './component/Chat/Chat';
// import socketIO from "socket.io-client"

// const ENDPOINT="http://localhost:5000/"
// const socket=socketIO(ENDPOINT,{transports:['websocket']});

function App() {
  // basics socket ka yahi hai
  // socket.on("connect",()=>{});
  return (
    <div className="App">
     
    <Router>
    <Routes>
      <Route exact path="/" element={<Join/>}></Route>
      <Route exact path="/chat" element={<Chat/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
