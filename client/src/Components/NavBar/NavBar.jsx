//Modules
import React, { useState, useContext, useEffect, Fragment } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Image,
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Profile from "../../../assets/images/profile-icon.png";
import { isMobile } from "react-device-detect";
import UserStore from "../../Stores/UserStore";
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx'
// import Lines from "../../../assets/images/nav-lines.png"

const Navigation = () => {
  const userStore = useContext(UserStore);
  const [redirect, setRedirect] = useState(false);
  const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;

  useEffect(() => {
    if (!window.ethereum.isMetaMask) {
      setRedirect(true)
    };
    if (!window.ethereum.selectedAddress) {
      setRedirect(true)
    }

    // loadUser(window.ethereum.selectedAddress)
    // .then(res => setUserChanges(res))
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" >
      <Navbar.Brand
        as={Link}
        to="/explore"
        className="text-majesti mr-3"
        style={{ fontSize: "4.5em" }}
      >
        REGAL
      </Navbar.Brand>
      <Navbar.Toggle className="mb-2" aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="nav-top" >
            <Nav.Link as={Link} to="/explore">explore</Nav.Link>
            <Nav.Link as={Link} to="/profile">profile</Nav.Link>
            <Nav.Link
              as={Link}
              rel="noopener"
              target="_blank"
              to="https://forms.gle/R1tCLf24bhgK8t7AA"
            >
              apply
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/whitepaper">whitepaper</Nav.Link> */}
          </Nav>
          <Nav className="nav-profile-image-link">
           {user ? 
           <Fragment>
             <Container className="profile-container">
            <Button as={Link}  to="/minter" className="btn-regal mr-4 mt-3">CREATE
           </Button>
             <div className="profile-link-nav">
             <Link to="/profile">
           <Image className="nav-profile-image mb-2 " src={user.profile_image} width="70px" height="70px">
           </Image> 
           <div className="text-center">
          <span className="user-profile-name text-white">{user ? '@'+ user.display_name : null}</span>
          </div>
          </Link> 
          </div>
          </Container>
           </Fragment>
           : <Button as={Link}  to="/signup" className="btn-regal">CONNECT
           </Button>}
          </Nav>

        </Navbar.Collapse>
    </Navbar>
  );
};

export default observer(Navigation);
