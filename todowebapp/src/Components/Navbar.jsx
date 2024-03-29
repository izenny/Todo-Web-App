import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../Config/Firebase";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/icon.png";

const Navbar = () => {
  const navigate = useNavigate();

    const logOut = async () => {
        try {
          await signOut(auth);
          navigate("/");
        } catch (err) {
          console.log("error on auth", err);
        }
      };
  return (
    <div className="flex justify-between items-center">
      <div className="w-11 h-16 ml-10 mt-10">
        <img src={Logo} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex ">
        <button
          onClick={logOut}
          className="h-10 w-20 shadow mr-10 mt-8 rounded-lg hover:bg-blue-500 hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
