import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {io} from 'socket.io-client'
import {useNavigate} from 'react-router'

const socket = io("http://localhost:8000")

const Home = () => {

    const [myId, setMyId] = useState("");
    let navigate = useNavigate();

    const createRoom = ()=>{
        socket.emit("create_room")
    }

    useEffect(()=>{
        socket.on("connect" , ()=>{
            setMyId(socket.id)
        })

        socket.on("room_created" ,(roomId)=>{
            navigate(`/room/${roomId}`)
        })
    } ,[])

  return (

    <div>
     <h1>MY Id :  {myId} </h1>
     <button onClick={createRoom} >Create Room</button>
    </div>
  )
}

export default Home
