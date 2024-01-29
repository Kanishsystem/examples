import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../themes/MainLayout";
import { ToastContainer } from "react-toastify";
import TextBoxExample from "../pages/examples/TextBoxExample";
import TableExample from "../pages/examples/TableExample";
import SelectBoxExample from "../pages/examples/SelectBoxExample";

const SiteRoute = () => {
  const isAuthenticated = true;

  const exampleRoutes=()=>{
    return (
      <MainLayout>     
        <Routes>
          <Route path="textbox" element={<TextBoxExample />} />  
          <Route path="selectbox" element={<SelectBoxExample />} />  
          <Route path="table" element={<TableExample />} />     
        </Routes>
    </MainLayout>
    )
  }

  


  return (
    <>
      <Router>
        <Routes>
         <Route path="/" element={ <MainLayout><Home /></MainLayout>} />          
          <Route
            path="/examples/*"
            element={ exampleRoutes()}
          />          
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default SiteRoute;
