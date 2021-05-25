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


const AUCTION_ADD = process.env.AUCTION_ADD

const AuctionHouse = ({ web3 }) => {
	const [modalShow, setModalShow] = useState(false);
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const { loadNfts, getAllNfts, nftRegistry } = nftStore;
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	let contractAddr = AUCTION_ADD;
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
