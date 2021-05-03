import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Image,
  Card,
  Button,
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import UseInterval from "../UseInterval";

import Profile from "../../../assets/images/profile.png";
import mint from "../../../assets/images/mint.png";
import portrait from "../../../assets/images/portrait.png";

const NftDisplay = ({
  likes,
  comments,
  image,
  id,
  bid,
  title,
  creator,
  date_mint,
  current,
  previous,
  ending,
}) => {

  let timeLeft = new Date(ending).getTime() - new Date().getTime();

  const [auctionTimer, setAuctionTimer] = useState([{
      days: Math.floor(timeLeft / (86400000)),
      hours: Math.floor((timeLeft % (86400000)) / (3600000)),
      minutes: Math.floor((timeLeft % (3600000)) / (60000)),
      seconds: Math.floor((timeLeft % (60000)) / 1000),
    }]);

  UseInterval(() => {
    let timeLeft = new Date(ending).getTime() - new Date().getTime();
    setAuctionTimer([
      {
        days: Math.floor(timeLeft / (86400000)),
        hours: Math.floor((timeLeft % (86400000)) / (3600000)),
        minutes: Math.floor((timeLeft % (3600000)) / (60000)),
        seconds: Math.floor((timeLeft % (60000)) / 1000),
      },
    ]);
  }, 1000)

  return (
    <Fragment>
      <Card className="nft-display mb-3">
        <Card.Img className="explore-card-image" src={image} style={{borderRadius: "15px"}} />
      </Card>
    </Fragment>
  );
};

export default NftDisplay;
