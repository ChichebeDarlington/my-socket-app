import React, { useEffect, useState } from 'react'
import {FaPaperPlane} from "react-icons/fa"
import scroll from "react-scroll-to-bottom"

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
    <div className='chat-container'>
        <div className='chat-header'>chat live</div>
        <div className='chat-text'>
            <scroll className="message-container">
            {messageList.map(messageChat=>{
                const {author, date,message,signin, roomId}=messageChat
                return <div>
                    <h3>{message}</h3>
                </div>
            })}
            </scroll>
        </div>
        <div className='chat-footer'>
        <input 
        className='chat-input'
        type="text" 
        placeholder='chat'
        value={currentMessage}
        onChange={(e)=>setCurrentMessage(e.target.value)}
        />
        <button className='chat-btn' onClick={sendMessage}><FaPaperPlane/></button>
        </div>
    </div>
  )
}

export default Chat