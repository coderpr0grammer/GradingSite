import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home.js";
import Grade from "../pages/Grade/Grade";
import MyAssignments from "../pages/MyAssignments/MyAssignments";
import Discover from "../pages/Discover/Discover";

const RoutesTree = () => {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/grade" element={<Grade/>} />
        <Route path="/my-assignments" element={<MyAssignments/>} />
        <Route path="/discover" element={<Discover/>} />
      </Routes>
  );
};

export default RoutesTree;