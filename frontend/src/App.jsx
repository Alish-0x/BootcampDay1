import React from "react";
import Heading from "./components/Heading";
import About from "./components/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Heading />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
