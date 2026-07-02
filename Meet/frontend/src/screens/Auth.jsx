import { signInWithPopup } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { useNavigate } from "react-router";



const Auth = () => {

  const ServerUrl = "http://localhost:8000";
  const navigate = useNavigate()

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let User = response.user;
      let name = User.displayName;
      let email = User.email;
      const result = await axios.post(
        ServerUrl + "/api/auth/google",
        { name, email },
        { withCredentials: true },
      );

      console.log(result.data);
      navigate("/home")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={handleGoogleAuth}>
        <FcGoogle size={20} />
        continue with google
      </button>
    </div>
  );
};

export default Auth;
