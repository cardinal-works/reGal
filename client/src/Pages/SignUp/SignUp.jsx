//Modules
import React, { useEffect, useState, Fragment, useContext } from "react";
import {
  Container,
  Col,
  Row,
  Image,
  Form,
  Button,
  Modal,
  FormFile,
} from "react-bootstrap";
import MetaMask from "../../../assets/images/metamask.svg";
import { Link, Redirect } from "react-router-dom";
import WalletSupport from "../../Components/WalletSupport/WalletSupport";
import UserStore from "../../Stores/UserStore";

const SignUp = (props) => {
  // CONTEXT FOR STATE MGMT/REST API
  const userStore = useContext(UserStore);
  const { loadUser, createUser, user } = userStore;

  // STATE FOR USER SIGNUP DATA
  const [userData, setUserData] = useState({
    wallet_id: '',
    display_name: '',
    email_address: '',
    bio: '',
    profile_image: '',
    profile_bg_color: '',
    email_list: false,
    collections: [],
    liked_nfts: [],
    recently_viewed_nfts: []
  });
  // FUNCTIONS FOR HANDLING MODAL VIEW FOR SIGN UP
  // **************************************************
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // **************************************************

  // FUNCTION FOR CREATING USER
  // **************************************************
  const createProfile = (e) => {
    // BASIC ERROR HANDLING
    e.preventDefault();
    if (!window.ethereum || !userData || !userData.wallet_id || !userData.email_address) {
      return;
    }

    createUser(userData)
      .then((res) => {
        handleClose();
      })
      .catch((error) => console.log(error))
      .finally(() => props.history.push("/profile"))
  };
  // **************************************************

  // FUNCTIONS FOR CONNECTING METAMASK WITH JSON RPC
  // **************************************************
  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum
        .send("eth_requestAccounts")
        .then((res) => {
          setUserData(prevState => ({
            ...prevState,
            wallet_id: res.result[0],
            display_name: res.result[0],
            email_list: false,
          }));

          loadUser(res.result[0]).then((res) => {
            !res ? handleShow() : props.history.push("/")
          })
          
          // .catch((err) => console.log(err))
        });
      }
    };
  // **************************************************

  // FUNCTIONS FOR UPDATING STATE FOR USER REGISTRATION
  // **************************************************
  const handleInputChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    setUserData( prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleEmailList = () => {
    let emailList = userData.email_list;
    setUserData( prevState => ({ ...prevState, email_list: !emailList }));
  };
  // *****************************************************

  return (
    <div className="signup-container">
      <Container className="connect-1 pt-3">
        <Row>
          <Col
            className="text-white font-primary text-center mb-2 pb-2 pt-3"
            md={12}
            lg={12}
          ></Col>
        </Row>
        <Row>
          <Col className="text-center" lg={12}>
            <Col>
              <Image
                className="metamask-logo text-center"
                src={MetaMask}
                width="5%"
              ></Image>
            </Col>
            <Col>
              <Button className="btn-regal mt-4" onClick={ethEnabled}>
                Sign Up
              </Button>
            </Col>
          </Col>
          <Col className="text-center mt-3" lg={12}>
            <WalletSupport />
          </Col>
        </Row>
      </Container>
      <Modal
        backdrop="static"
        centered={true}
        size={"md"}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userData.wallet_id ? (
            <Fragment>
              <span className="h6 text-green">
                Connected {"  "} <i className="fas fa-check text-green"></i>
              </span>
              <p>{userData.wallet_id} </p>
            </Fragment>
          ) : (
            <Fragment>
              <span className="h6 text-red">
                Not Connected {"  "} <i className="far fa-times-circle "></i>
              </span>
            </Fragment>
          )}
          <Form>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="h6">Display Name</Form.Label>
              <Form.Control
                type="text"
                onChange={handleInputChange}
                name="display_name"
                placeholder={
                  userData.wallet_id
                    ? userData.wallet_id.slice(0, 3) +
                      "..." +
                      userData.wallet_id.slice(-3)
                    : null
                }
              />
              <Form.Text className="text-muted">
                This will default to your wallet address if left empty. (You
                can always change it later!)
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="h6">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="ebachman@pp.com"
                name="email_address"
                onChange={handleInputChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                onClick={handleEmailList}
                type="checkbox"
                label="Stay updated with our newsletter"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => createProfile(e)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
