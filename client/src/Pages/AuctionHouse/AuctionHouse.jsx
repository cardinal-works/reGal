//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Row, Col, Image, Card, Button, Form, FormFile } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
//Contracts
import ProfileNftDisplay from '../../Components/ProfileNftDisplay';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import ipfs from '../../ipfs';
var Buffer = require('buffer/').Buffer;
import { AuctionRepository_abi } from '../../../abi/AuctionRepository_abi';

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
	contract_address: '0x1a9127b29180DA82C6072b7ef2F855c955ef2fF1',
	nft_id: 0,
	auction_title: '',
	auction_metadata: '',
	auction_start_price: 0,
	auction_deadline: 0,
};

const AuctionHouse = ({ web3 }) => {
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const { loadNfts, getAllNfts, nftRegistry } = nftStore;
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	useEffect(() => {
		console.log(window.ethereum.selectedAddress);
		loadUser(window.ethereum.selectedAddress).then((res) => loadNfts({ user_id: res._id }));
	}, []);

	useEffect(() => {
		console.log(getAllNfts);
	}, [getAllNfts]);

	return (
		<Fragment>
			<Container className="auction-house-container">
      <Row >
				{getAllNfts.length &&
					getAllNfts.map((nft, index) => (
            <Col key={index}>
							<Card style={{ width: '18rem' }}>
								<Card.Img variant="top" src={nft.thumbnail_image} />
								<Card.Body>
									<Card.Title>{nft.title}</Card.Title>
									<Card.Text>
										{nft.nft_description}
									</Card.Text>
									<Button variant="primary">Start</Button>
								</Card.Body>
							</Card>
            </Col>
					))}
          	</Row>
				{/* <Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label> </Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Form.Group controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Check me out" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form> */}
			</Container>
		</Fragment>
	);
};

export default observer(AuctionHouse);
