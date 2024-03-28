import React from "react";
import Login from "./Account/Login";
import { auth } from "./Config/Firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./Components/Todo";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/:userId" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
