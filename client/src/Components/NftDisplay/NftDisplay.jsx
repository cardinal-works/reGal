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
  thumbnail_image,
  nft_id,
  current_bid,
  title,
  creator,
  date_mint,
  tags,
}) => {

  // let timeLeft = new Date(ending).getTime() - new Date().getTime();

  // const [auctionTimer, setAuctionTimer] = useState([{
  //     days: Math.floor(timeLeft / (86400000)),
  //     hours: Math.floor((timeLeft % (86400000)) / (3600000)),
  //     minutes: Math.floor((timeLeft % (3600000)) / (60000)),
  //     seconds: Math.floor((timeLeft % (60000)) / 1000),
  //   }]);

  // UseInterval(() => {
  //   let timeLeft = new Date(ending).getTime() - new Date().getTime();
  //   setAuctionTimer([
  //     {
  //       days: Math.floor(timeLeft / (86400000)),
  //       hours: Math.floor((timeLeft % (86400000)) / (3600000)),
  //       minutes: Math.floor((timeLeft % (3600000)) / (60000)),
  //       seconds: Math.floor((timeLeft % (60000)) / 1000),
  //     },
  //   ]);
  // }, 1000)

  return (
    <Fragment>
      <div className="nft-display mb-3">
        <div className="overlay-text-explore text-white">
          hello world
          </div>
        <Image className="explore-card-image" src={thumbnail_image} style={{borderRadius: "15px"}} />
      </div>
    </Fragment>
  );
};

export default NftDisplay;
