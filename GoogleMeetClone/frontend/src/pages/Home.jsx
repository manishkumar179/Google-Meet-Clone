import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { removeUser } from "../reducers/UserSlice";
import { Send } from "lucide-react";
import { LogOut } from "lucide-react";

const socket = io("http://localhost:8000");

const Home = () => {
  const [myId, setMyId] = useState("");
  const [message, setMessage] = useState("");
  let dispatch = useDispatch();
  const sendMessage = () => {
    socket.emit("send_message", message);
  };

  let handleLogout = async () => {
    try {
      let res = await axiosInstance.get("/api/auth/logout");
      dispatch(removeUser());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      setMyId(socket.id);
    });

    socket.on("receiver_message", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="h-[400px] bg-gradient-to-br  text-white flex items-center justify-center px-4">
      
      <div className="w-[500px] max-w-xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
      <h1 className="text-black font-bold text-center text-3xl mb-5 " >Message</h1>
        <div className="flex gap-3 mb-4">
          
          <input
            type="text"
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border text-black placeholder:text-xl focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={sendMessage}
            className="px-5 py-3 rounded-xl text-black bg-white hover:bg-green-500 transition-all font-medium shadow-lg"
          >
            <Send size={20} />
          </button>
        </div>

        <div className="flex justify-between items-center mt-6">
          <h1></h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-200 border border-red-500/30 text-black hover:bg-red-500/20 transition"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
