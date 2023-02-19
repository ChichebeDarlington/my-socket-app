import { Server } from "socket.io";
import express from "express"
import http from "http"
import cors from "cors"

const app = express()

// middlewares
app.use(cors)


const server = http.createServer(app)


const io = new Server(server,{
  cors:{
    origin:"http://localhost:3000"
  }
})

io.on("connection", (socket)=>{
  // console.log(socket.id);

  socket.on("startChart", (chat)=>{
    socket.join(chat)
    console.log(`User of the ID: ${socket.id} ${chat} you...`);
  })

  socket.on("sendMessage", (message)=>{
    console.log(message);
    socket.to(message.roomId).emit("receivedMessage", message)
  })



  socket.on("disconnet", (userId)=>{
    console.log("user left", userId);
  })
})


server.listen(7000, ()=>{
  console.log("Listening to port 7000");
})




// const io = new Server({cors:{origin:"http://localhost:3000"}});

// let usersOnline = [];

// let addUsersOnline=(username,socketId)=>{
//  return !usersOnline.some(user=> user.username === username && usersOnline.push({username,socketId}))
// }


// let removeUsersOnline=(userId)=>{
//     if(usersOnline){
//         usersOnline.filter((user)=>user.userId !== userId)
//     }
// }

// let findSingleUser=(username)=>{
//         usersOnline.find((user)=>user.username === username)
// }

// io.on("connection", (socket) => {
//   socket.on("addNewUser", (username)=>{
//     addUsersOnline(username, socket.id)
//     console.log(username, socket.id);
//   })
//   socket.on("disconnect", (userId)=>{
//    removeUsersOnline(userId.id)
//   })
// });
// console.log(usersOnline);

// io.listen(8000);