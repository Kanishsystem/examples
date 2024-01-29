import React, { useEffect, useState } from "react";
import { useSiteContext } from "../../contexts/SiteProvider";
import { Link, useNavigate } from 'react-router-dom';
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();
  const tabs = [
    {
      title: "Text Box",
      link: "textbox",
      icon:"fa-file"
    },
    {
      title: "Select Box",
      link: "selectbox",
      icon:"fa-image"
    },
  ]

  const handleNavigate = (linkName) => {
    let fullLink = "/examples/" + linkName;
    navigate(fullLink);
  }

  const display_tabs = () => {
    return (
      <>
        {
          tabs.map((item, index) => {
           return   <div className="column is-2 smart-example-card card box" key={index} onClick={() => handleNavigate(item.link)}>
               <i className={"fa "+item.icon}></i>
               <p className=""> {item.title}</p>
           </div>
          })
        }
      </>
    )
  }
  return (
    <div className="columns is-multiline"> {display_tabs()} </div>
  );


};

export default Home;
