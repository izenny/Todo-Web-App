import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Config/Firebase";

const Todolist = ({ userId, selectedOption, search }) => {
  console.log("search input", search);
  const [todos, setTodos] = useState([]); // State to hold the todos
  const [openMenuId, setOpenMenuId] = useState(null); // State to manage the opened menu

  // Function to toggle the menu for a todo item
  const toggleMenu = (docId) => {
    setOpenMenuId(openMenuId === docId ? null : docId);
  };

  // Function to handle the click on an option in the menu
  const handleOptionClick = async (option, docid) => {
    try {
      const todoDocRef = doc(db, "TodoList", docid);

      // Switch statement to handle different options
      switch (option) {
        case "Completed":
          await updateDoc(todoDocRef, { completed: true });
          break;
        case "Favorite":
          await updateDoc(todoDocRef, { favorite: true });
          break;
        case "Remove":
          await updateDoc(todoDocRef, { removed: true });
          break;
        case "Delete":
          const confirmed = window.confirm(
            "Are you sure you want to delete this todo?"
          );
          if (confirmed) {
            await deleteDoc(todoDocRef);
            alert("deleted");
          }
          break;
        default:
          break;
      }

      console.log(`Option ${option} ${docid} clicked`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    // Close the menu after handling the option click
    setOpenMenuId(null);
  };

  // Effect to fetch todos based on userId, selectedOption, and search
  useEffect(() => {
    const todoRef = collection(db, "TodoList");
    let q = query(todoRef, where("id", "==", userId)); // Base query with userId filter
    if (selectedOption !== "All") {
      q = query(
        todoRef,
        where("id", "==", userId),
        where(selectedOption.toLowerCase(), "==", true)
      ); // Modify query to filter based on selectedOption
    }
    if (search) {
      q = query(
        todoRef,
        where("id", "==", userId),
        where("task", ">=", search),
        where("task", "<=", search + "\uf8ff")
      ); // Modify query to search for tasks
    }

    // Subscribe to the query snapshot and update todos state
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ docid: doc.id, ...doc.data() });
      });
      setTodos(todos);
    });

    // Unsubscribe from the snapshot listener when component unmounts
    return () => unsubscribe();
  }, [userId, selectedOption, search]); // Dependencies for the effect

  return (
    <div className="h-full w-full ">
      { todos.length > 0 ? (todos.map((todo) => (
        <div
          key={todo.docid}
          className="flex m-2 shadow justify-between items-center p-2"
        >
          <div>
            <h2 className="font-semibold text-lg">{todo.task}</h2>
            <p className="text-sm">{todo.description}</p>
          </div>
          <div className="relative">
            <button onClick={() => toggleMenu(todo.docid)} className="p-2">
              <BsThreeDotsVertical />
            </button>
            {openMenuId === todo.docid && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    onClick={() => handleOptionClick("Completed", todo.docid)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handleOptionClick("Favorite", todo.docid)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    Favorite
                  </button>
                  <button
                    onClick={() => handleOptionClick("Remove", todo.docid)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleOptionClick("Delete", todo.docid)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))):(<p className="flex justify-center items-center mt-10 text-slate-400">Add your Todo List</p>)}
    </div>
  );
};

export default Todolist;
