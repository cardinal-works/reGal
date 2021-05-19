//Components
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, ListGroup, Table, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { AuctionRepository } from '../../../abi/AuctionRepository_abi';
import NftStore from '../../Stores/NftStore';
import UserStore from '../../Stores/UserStore';
import PriceStore from '../../Stores/PriceStore';

const Auction = ({ web3 }) => {
	const nftStore = useContext(NftStore);
	const userStore = useContext(UserStore);
	const priceStore = useContext(PriceStore);
	const [params, setParams] = useState(useParams());
	const [currentEtherPrice, setCurrentEtherPrice] = useState();
	const { loadNft, updateNft, nft } = nftStore;
	const { getPrices, prices } = priceStore;
	const { user, loadUser } = userStore;

	let contractAddr = '0xD317bDEe64fb50095d79F8D8586EFeae3D314D3d';
	const AuctionRepositoryContract = new web3.eth.Contract(AuctionRepository, contractAddr);

	const [auctionData, setAuctionData] = useState({
		title: null,
		blockDeadline: (1 * 60 * 60) / 17,
		startPrice: null,
		metaData: `Regal Auction @${Date.now()}`,
		deedId: null,
		deedRepo: '0xf151fE67F58d52f49D65B5BAddCC01f5c70F702B',
	});

	const handleAuctionTitle = (e) => {
		e.preventDefault();
		const value = e.target.value;
		setAuctionData((prevState) => ({
			...prevState,
			title: value,
		}));
	};

	const handleStartPrice = (e) => {
		e.preventDefault();
		const value = e.target.value;
		setAuctionData((prevState) => ({
			...prevState,
			startPrice: value,
		}));
	};

	const handleCreateAuction = async () => {
		// const { title, blockDeadline, startPrice, metaData, deedId, deedRepo } = auctionData;
		console.log(typeof nft.nft_id);
		const title = auctionData.title;
		const blockDeadline = Math.floor(auctionData.blockDeadline);
		const startPrice = auctionData.startPrice;
		const metaData = auctionData.metaData;
		const deedId = nft.nft_id;
		const deedRepo = auctionData.deedRepo;
		AuctionRepositoryContract.methods
			.createAuction(deedRepo, deedId, title, metaData, startPrice)
			.send({ from: window.ethereum.selectedAddress })
			.then((res) => console.log(res))

	};

	useEffect(() => {
		loadUser(window.ethereum.selectedAddress);
		loadNft(params.id);
		getPrices();
	}, []);

	return (
		<Fragment>
			{nft && user ? (
				<Container key={'auction'}>
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
									<Form.Control
										onChange={(e) => handleAuctionTitle(e)}
										type="text"
										placeholder="Rahmteen - Cube // First Mint - 1 of 1 !!"
									/>
								</Form.Group>
								<Row>
									<Form.Group as={Col} controlId="exampleForm.ControlInput2">
										<Form.Label>Start Price*</Form.Label>
										<Form.Control
											onChange={(e) => handleStartPrice(e)}
											type="text"
											placeholder="0 ETH"
										/>
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
								<Button variant="primary" size="lg" onClick={handleCreateAuction} className="mt-2">
									Submit
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			) : null}
		</Fragment>
	);
};

export default observer(Auction);
