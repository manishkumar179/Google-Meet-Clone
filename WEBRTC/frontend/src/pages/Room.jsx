import { useEffect } from "react";
import { useRef } from "react";

import { useParams } from "react-router";
import socket from "../service/socket";
import { createPeer } from "../service/peer";

const Room = () => {

  const {roomId}=useParams()
  const localVideoRef = useRef(null);
  const localSteamRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const peer = useRef(createPeer());

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localSteamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        stream.getTracks().forEach((t)=>{
          peer.current.addTrack(t,stream)
        })


        socket.emit("join_room",roomId)

      } catch (error) {
        console.log(error);
      }
    };
    getUserMedia();

    peer.current.ontrack = (e)=>{
      remoteVideoRef.current.srcObject = e.streams[0];
    }


    socket.on("user_joined", async (joindId) => {
      // offer create
      const offer = await peer.current.createOffer();

      // local diescreption
      await peer.current.setLocalDescription(offer);
      // offer emit
      socket.emit("offer", { roomId, offer });
    });

    // signaling server
    socket.on("offer", async ({ offer }) => {
      // remotedicription Set
      await peer.current.setRemoteDescription(offer);
      // anwer create krna ha
      const answer = await peer.current.createAnswer();
      // local description
      await peer.current.setLocalDescription(answer);
      // answer emit
      socket.emit("answer", { roomId, answer });
    });

    // signaling server
    socket.on("answer", async ({ answer }) => {
      await peer.current.setRemoteDescription(answer);
    });


    socket.on("ice_candidate",async({candidate})=>{
        // add kr vana ha. 

        await peer.current.addIceCandidate(candidate)
    })

    peer.current.onicecandidate = (event) => {
      // *-----------*
      socket.emit("ice_candidate", { roomId, candidate: event.candidate });
    };


  }, [roomId]);


  const invite=async()=>{
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("copied!!")
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

  return (
    <div>

      {/* Invite button */}
      <button onClick={invite}>invite People</button>
      {/* local me khud  */}
      <video ref={localVideoRef}  muted autoPlay playsInline/>
      <video ref={remoteVideoRef}  autoPlay playsInline />
    </div>
  );
};

export default Room;