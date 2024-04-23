import { useState } from "react";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
function App() {
  return (
    <>
      {/* https://stackoverflow.com/questions/66289122/how-to-create-a-protected-route-with-react-router-dom */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
