//Modules
import React from "react";
import { Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConnectWallet from "../../Components/ConnectWallet";
// import Lines from "../../../assets/images/nav-lines.png"

const Navigation = () => {
  return (
    <div>
      <Navbar variant="dark" expand="3x">
        {/* Should switch the brand out with a logo image */}
        <Navbar.Brand
          href="/explore"
          className="text-majesti ml-2"
          style={{ fontSize: "3em", paddingLeft: "8px" }}
        >
          Regal
          <div className="text-white" style={{ fontSize: "0.35em"}}>
            <i>NFT MARKETPLACE</i>
          </div>
        </Navbar.Brand>
        <Nav className="ml-auto" style={{ paddingRight: "15px" }}>
          {window.ethereum.selectedAddress ? null : <ConnectWallet />}
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ml-auto text-majesti">
            <Nav.Link href="/explore">explore</Nav.Link>
            <Nav.Link href="/profile">profile</Nav.Link>
            {/* template for google form link */}
            <Nav.Link
              target="_blank"
              href="https://forms.gle/R1tCLf24bhgK8t7AA"
            >
              apply
            </Nav.Link>
            <Nav.Link href="/whitepaper">whitepaper</Nav.Link>
            {/* <Nav.Link href="#dropdown"><img className='nav-lines' src={Lines} width={'30em'}/></Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
