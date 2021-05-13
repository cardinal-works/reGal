//Components
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, ListGroup, Table, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import NftStore from '../../Stores/NftStore';
import UserStore from '../../Stores/UserStore';
import PriceStore from '../../Stores/PriceStore';

const Auction = () => {
	const nftStore = useContext(NftStore);
	const userStore = useContext(UserStore);
	const priceStore = useContext(PriceStore);
	const [params, setParams] = useState(useParams());
	const [currentEtherPrice, setCurrentEtherPrice] = useState();
	const { loadNft, nft } = nftStore;
	const { getPrices, prices } = priceStore;
	const { user, loadUser } = userStore;

	const [auctionData, setAuctionData] = useState({
		title: null,
		blockDeadline: 0.05 * 60 * 60 / 17,
		startPrice: null,
		metaData = `Regal Auction @${Date.now()}`,
		deedId: nft[0].nft_id,
		deedRepo: "0xFE8A0dd9E6307968407cAA165cca28b62bCD0E93",
	})

	const handleAuctionTitle = (e) => {
		e.preventDefault();
		const value = e.target.value
		setAuctionData((prevState) => ({
		  ...prevState,
		  title: value,
		}));
	  }

	  const handleStartPrice = (e) => {
		e.preventDefault();
		const value = e.target.value
		setAuctionData((prevState) => ({
		  ...prevState,
		  startPrice: value,
		}));
	  }

	useEffect(() => {
		loadNft(params['id']);
		getPrices();
		loadUser(window.ethereum.selectedAddress);
	}, []);

	return (
		<Fragment>
			{nft && user &&
				nft.map((nft, index) => (
					<Container key={index}>
						<Row>
							<Col>
								{' '}
								<div>
									<Image src={nft.thumbnail_image}></Image>
								</div>
							</Col>
							<Col className="text-white font-tertiary">
								<Form>
								<Form.Group controlId="exampleForm.ControlInput0">
										<Form.Label>Auctioneer</Form.Label>
										<Form.Control type="text" disabled placeholder={user.wallet_id} />
									</Form.Group>
									<Form.Group controlId="exampleForm.ControlInput1">
										<Form.Label>Auction Name*</Form.Label>
										<Form.Control onChange={(e) => handleAuctionTitle(e)}  type="text" placeholder="First Mint - 1 of 1" />
									</Form.Group>
									<Row>
										<Form.Group as={Col} controlId="exampleForm.ControlInput2">
											<Form.Label>Start Price*</Form.Label>
											<Form.Control onChange={(e) => handleStartPrice(e)} type="text" placeholder="0 ETH" />
										</Form.Group>

										<Form.Group as={Col} controlId="formGridState">
											<Form.Label>Auction Duration*</Form.Label>
											<Form.Control as="select" defaultValue="Choose...">
												<option>Choose Duration...</option>
												<option>24 hours</option>
												<option>72 hours</option>
												<option>7 days</option>
											</Form.Control>
										</Form.Group>
									</Row>

									<Form.Group controlId="exampleForm.ControlTextarea1">
										<Form.Label>Example textarea</Form.Label>
										<Form.Control as="textarea" rows={3} />
									</Form.Group>
								</Form>
								{/* <span className="text-white font-tertiary">{!nft.auction_mode ? "Active" : "Cancel?"}</span>
							<span className="text-white font-tertiary">{nft.asking_bid}</span>
							<span></span> */}
							</Col>
						</Row>
					</Container>
				))}
		</Fragment>
	);
};

export default observer(Auction);
