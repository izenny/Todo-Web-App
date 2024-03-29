import React, { useState } from "react";
import Logo from "../assets/icon.png";
import { AiOutlineSearch } from "react-icons/ai";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../Config/Firebase";
import { useNavigate, useParams } from "react-router-dom";
import Todolist from "./Todolist";
import { signOut } from "firebase/auth";
import Navbar from "./Navbar";

const Todo = () => {
  
  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("All");
  const todoRef = collection(db, "TodoList");
  const { userId } = useParams(); // Get user ID from URL
  const navigate = useNavigate();

  // Form validation function
  const validateForm = () => {
    const errors = {};
    if (!title.trim()) {
      errors.title = "Title is required";
    }
    if (!description) {
      errors.description = "Description is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to submit a new todo item
  const submitToDo = async (e) => {
    const errors = validateForm();
    if (validateForm()) {
      try {
        const newTask = await addDoc(todoRef, {
          id: userId,
          task: title,
          description: description,
          favorite: false,
          completed: false,
        });
        setTitle("");
        setDecription("");
        console.log("Todo task added", newTask.id);
      } catch (err) {
        console.log("new task error", err);
      }
    }
  };

  // Function to update search input value
  const searchList = (e) => {
    setSearch(e.target.value);
  };

  // Function to update selected filter option
  const filterList = (e) => {
    setSelectedOption(e.target.value);
  };

  // Function to handle user logout
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.log("error on auth", err);
    }
  };

  // Function to submit form on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitToDo();
    }
  };

  return (
    <div className="h-screen">
      <Navbar/>
    <div className="flex flex-col sm:flex-row h-3/4  ">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        
        <div className="flex flex-col justify-center items-center w-full ">
          <h2 className="text-3xl font-semibold m-5">TODO</h2>
          <p className="text-[1.1rem] w-2/3 mb-2 text-slate-600">
            Instantly create your personalized todo list and stay organized. Get
            started now!
          </p>
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title}</p>
          )}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            className="border h-9 w-2/3 p-2 mb-3"
          />

          {errors.description && (
            <p className="text-sm text-red-600">{errors.description}</p>
          )}
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDecription(e.target.value)}
            onKeyPress={handleKeyPress}
            className="border h-9 w-2/3 p-2"
          />
          <button
            onClick={submitToDo}
            className="bg-[#4285F4] h-10 w-2/3 flex mt-4 items-center justify-center text-white font-medium hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col relative h-full mt-1 md:mt-2 justify-center items-center">
       
        <div className="flex flex-col sm:flex-row w-full justify-around mt-2 items-center">
          <div className="flex h-7 justify-center items-center border">
            <input
              type="text"
              placeholder="Search"
              onChange={searchList}
              className="h-full pl-2 outline-none"
            />
            <AiOutlineSearch className="text-xl" />
          </div>
          <div className="flex border justify-center items-center">
            <h2 className="pl-2">Filter By</h2>
            <select
              value={selectedOption}
              onChange={filterList}
              className="ml-1 outline-none"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Favorite">Favorite</option>
              <option value="Removed">Removed</option>
            </select>
          </div>
        </div>
        <div className=" w-full mt-2">
          <h2 className="text-3xl font-semibold m-3 text-left">TODO LIST</h2>
        </div>
        <div className="list w-full mt-3 h-4/6 no-scrollbar overflow-scroll">
          <div className="w-full">
            <Todolist
              userId={userId}
              selectedOption={selectedOption}
              search={search}
            />
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Todo;
