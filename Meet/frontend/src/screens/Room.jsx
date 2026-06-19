import React from 'react'
import { useParams } from 'react-router'

const Room = () => {
  let {roomId} = useParams()
  return (
    <div>
      Room id : {roomId}
    </div>
  )
}

export default Room
