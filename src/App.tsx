import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import AddContact from "./AddContact";
import "./App.css";
import { Box } from "@chakra-ui/react";
import { NavBar } from "./NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Box mt={"5%"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddContact />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
