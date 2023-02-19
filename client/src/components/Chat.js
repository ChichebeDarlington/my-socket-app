import React, { useEffect, useState } from 'react'
import {FaComment} from "react-icons/fa"

const Chat = ({socket,username,room}) => {
    const [currentMessage, setCurrentMessage]= useState("")
    const [messageList, setMessageList]= useState([])


    const sendMessage = ()=>{
        let time = `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
        if(currentMessage !== ""){
            const messageData = {
                author:username,
                message:currentMessage,
                roomId:room,
                date:time
            }
            socket.emit("sendMessage",messageData)
            setMessageList((list)=>[...list, messageData])
        } else{
            return
        }
    }

    useEffect(()=>{
        socket.on("receivedMessage", (data)=>{
            console.log(data);
            setMessageList((list)=>[...list, data])
        })
    },[socket])

  return (
    <div>
        <div className='chat-header'>chat live</div>
        <div className='chat-text'>
            {messageList.map(messageChat=>{
                const {author, date,message, roomId}=messageChat
                return <div>
                    <h3>{message}</h3>
                </div>
            })}
        </div>
        <div className='chat-footer'></div>
        <input 
        type="text" 
        placeholder='chat'
        value={currentMessage}
        onChange={(e)=>setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}><FaComment/></button>
    </div>
  )
}

export default Chat