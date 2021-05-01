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
import { AuctionRepository_abi } from "../../../abi/AuctionRepository_abi"

// uint auctionId = auctions.length;
// Auction memory newAuction;
// newAuction.name = _auctionTitle;
// newAuction.blockDeadline = _blockDeadline;
// newAuction.startPrice = _startPrice;
// newAuction.metadata = _metadata;
// newAuction.deedId = _deedId;
// newAuction.deedRepositoryAddress = _deedRepositoryAddress;
// newAuction.owner = msg.sender;
// newAuction.active = true;
// newAuction.finalized = false;

const auctionMetaData = {
  contract_address: "0x1a9127b29180DA82C6072b7ef2F855c955ef2fF1",
  nft_id: 0,
  auction_title: "",
  auction_metadata: "",
  auction_start_price: 0,
  auction_deadline: 0,
}

const AuctionHouse = ({web3}) => {
  const userStore = useContext(UserStore);



  useEffect(() => console.log(web3), [])

  return (
    <Fragment>
        <Container className="auction-house-container" >

        </Container>
    </Fragment>
  );
};

export default observer(AuctionHouse);
