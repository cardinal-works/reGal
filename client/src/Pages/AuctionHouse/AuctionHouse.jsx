//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Row, Col, Image, Card, Button, Form, FormFile } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
//Contracts
import ProfileNftDisplay from '../../Components/ProfileNftDisplay';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';
import { observer } from 'mobx-react-lite';
import Auction from '../Auction';
import { toJS } from 'mobx';
import ipfs from '../../ipfs';
var Buffer = require('buffer/').Buffer;
import { AuctionRepository } from '../../../abi/AuctionRepository_abi';

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
	const [modalShow, setModalShow] = useState(false);
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const { loadNfts, getAllNfts, nftRegistry } = nftStore;
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	let contractAddr = '0x6fA517231FC8Af43254DA18F9C19FD35160a79ce';
	const AuctionRepositoryContract = new web3.eth.Contract(AuctionRepository, contractAddr);

	useEffect(() => {
		console.log(window.ethereum.selectedAddress);
		loadUser(window.ethereum.selectedAddress).then((res) => loadNfts({ user_id: res._id }));
		AuctionRepositoryContract.methods
			.getAuctionsOf(window.ethereum.selectedAddress)
			.call()
			.then(res => console.log('res', res))
	}, []);

	useEffect(() => {
		console.log(getAllNfts);
	}, [getAllNfts]);

	return (
		<Fragment>
			<Container className="auction-house-container mt-2" fluid>
				<Row className="d-flex justify-content-center">
					<div className="font-secondary text-white pr-1 text-center mb-4">Your Collection</div>
					{getAllNfts.length &&
						getAllNfts.map((nft, index) => (
							<Col lg={2} md={3} sm={6} key={index} className="auction-cards">
								<Card className="card-nft">
									<Card.Img className="card-nft-image" variant="top" src={nft.thumbnail_image} />
									<Card.Body>
										<Card.Title>{nft.title}</Card.Title>
										<Card.Text></Card.Text>
										{nft.auction_mode ? (
											<Fragment>
												<Button
													as={Link}
													to={{
														pathname: `/auction/${nft.nft_id}`,
													}}
													variant="warning">
													Cancel
												</Button>
											</Fragment>
										) : (
											<Fragment>
												<Button
													as={Link}
													to={{
														pathname: `/auction/${nft.nft_id}`,
													}}
													className="primary">
													Start
												</Button>
											</Fragment>
										)}
									</Card.Body>
								</Card>
							</Col>
						))}
				</Row>
			</Container>
		</Fragment>
	);
};

export default observer(AuctionHouse);
