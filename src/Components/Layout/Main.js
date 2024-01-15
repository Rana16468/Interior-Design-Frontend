import React from "react";
import Navbar from "../Header/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
