//Modules
import React, { useEffect, useState, Fragment, useContext } from "react";
import { Container, Row, Col, Image, Button, Form, FormFile  } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
//Contracts
import ProfileNftDisplay from "../../Components/ProfileNftDisplay";
import UserStore from "../../Stores/UserStore";
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx'
import ipfs from "../../ipfs";
var Buffer = require("buffer/").Buffer;
//Media


const Create = () => {
  const userStore = useContext(UserStore);

  return (
    <Fragment>
        <Container className="create-container  " >
        <Row className="text-center my-auto">
            <Col lg={12} >
            <Link to="/minter"><Button className="btn-regal m-2">MINT NFT</Button></Link>
            <Link to="/auction-house"><Button className="btn-regal m-2">CREATE AUCTION</Button></Link>
            </Col>
        </Row>
        </Container>
    </Fragment>
  );
};

export default observer(Create);
