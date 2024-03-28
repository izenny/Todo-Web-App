import React from "react";
import Logo from "../assets/icon.png";
import GoogleLogo from "../assets/Google.png";
import Boy from "../assets/boy.png";
import Background from "../assets/background.png";
import Lamp from "../assets/lamp.png";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../Config/Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  //google sign in function
  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("logged in");
      const user = auth.currentUser; // logged user details
      if (user) {
        const userId = user.uid;     // logged userId
        console.log("userId", userId);
        navigate(`/dashboard/${userId}`); //navigate to dashboard with userid in url
      }
    } catch (err) {
      console.log("error in auth", err);
    }
  };

  return (
    <div className="flex w-screen min-h-screen">
      <div className="w-full md:w-1/2 relative ">
        <div className="w-11 h-16 ml-10 mt-10">
          <img src={Logo} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex w-full absolute top-1/3 justify-center   ">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold m-5">LOGIN</h1>
            <p className="text-[1.1rem] w-2/3 mb-2 text-slate-600">
              Stay organized and productive with our easy-to-use todo list
              website. Sign up today to start managing your tasks effectively!
            </p>
            <div
              onClick={signIn}
              className="bg-[#4285F4] h-9 w-56 flex mt-4 items-center hover:bg-blue-600 cursor-pointer"
            >
              <div className=" h-full p-1 ">
                <img
                  src={GoogleLogo}
                  alt=""
                  className=" h-full bg-white p-1 shadow"
                />
              </div>
              <span className="text-white ml-3  font-medium">
                Sign in using Google
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 relative hidden md:block">
        <div className="w-20 absolute left-1/3">
          <img src={Lamp} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="w-full h-full absolute pt-10 pl-20 right-0 bottom-0 ">
          <img src={Background} alt="" className="w-full h-full object-fill " />
        </div>
        <div className=" absolute w-60 bottom-1/4 right-1/4  md:w-48  xl:w-64 ">
          <img src={Boy} alt="" className="w-full h-full object-fill" />
        </div>
      </div>
    </div>
  );
};

export default Login;
