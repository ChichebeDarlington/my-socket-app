import {useEffect, useState} from "react"
import Login from "./pages/Login";
import { io } from "socket.io-client";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:7000")
const App = () => {

  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [signin, setSignin] = useState(false)

  const startChart = ()=>{
    (username || room) && socket.emit("startChart", room)
    setSignin(true)
  }
  return (
    <div className="App">
      <h3 className="App-header">chat app...</h3>
      {
        !signin?(<div className="sign">
          <input className="username" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          <input className="room" placeholder="roomId" value={room} onChange={(e)=>setRoom(e.target.value)}/>
          <button className="" onClick={startChart} >submit</button>
          </div>):(<Chat socket={socket} room={room} username={username} />)
      }
    </div>
  )
}

export default App

// function App() {
//   const [username,setUsername]=useState("")
//   const [user,setUser]=useState("")
//   const [socket, setSocket]=useState(null)

//   useEffect(()=>{
//     setSocket(io("http://localhost:8000")) ;
//   },[])

//    const handleSubmit = (e)=>{
//     e.preventDefault()
//     setUser(username)
//     socketFunction()
//   }
// console.log(user);
//   const socketFunction = ()=>{
//     socket.emit("addNewUser", {user})
//   }
 
//   const handleChange=(e)=>{
//     setUsername(e.target.value)
//   }

//   return (
//     <div className="App">
//      <h1>Chat App</h1>
     
//      {user?(
//      <>
//      <h1>{user}</h1> 
//      <Navbar/></>
//      ):(<Login 
//       username={username}
//       handleChange={handleChange} 
//       handleSubmit={handleSubmit} 
//       />)}
     
//     </div>
//   );
// }

// export default App;
