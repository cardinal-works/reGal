//Modules
import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
//Components
import Navigation from "../NavBar";
import Footer from "../Footer";

const ComponentWrapper = ({ children }) => {
  return (
    <Fragment>
      <Navigation web3={web3}/>
      {children}
      <Footer />
    </Fragment>
  )
}

export default ComponentWrapper;