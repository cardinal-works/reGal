//Modules
import React, { useState, useContext } from "react";
//Stores
import { StateContext } from "../../Providers/StateProvider.jsx";
//Components
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
//Css
import "./NavBar.css";

// empty default profile pic
//import profile from "../../../assets/profile.png";
// navbar circles gif
//import Circles from "../../../assets/crcle.gif";

const Navigation = () => {
  //const { userAddressHandler, userShortAddressHandler } = useContext(StateContext);
    //navigation for the site
  return (
    <Navbar variant="dark">
      <Navbar.Brand href="/" className="text-majesti" style={{fontSize: "2em"}}>R</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#explore">explore</Nav.Link>
        <Nav.Link href="#gallery">gallery</Nav.Link>
        <Nav.Link href="#apply">apply</Nav.Link>
        <Nav.Link href="#learn">learn</Nav.Link>
      </Nav>
    </Navbar>
  )
};

export default Navigation;