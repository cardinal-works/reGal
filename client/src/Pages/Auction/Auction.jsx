//Components
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, ListGroup, Table, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { RegalAuction } from '../../../abi/RegalAuction_abi';
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

	let contractAddr = '0x3C7038139356e5e30Cbc8bC407076617ce3437ea';
	const RegalAuctionContract = new web3.eth.Contract(RegalAuction, contractAddr);

	const [auctionData, setAuctionData] = useState({
		title: null,
		startDate: Date.now(),
		endTime: null,
		startPrice: null,
		deedId: 1,
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
		// const weiValue = Web3.utils.toWei(e.target.value, 'ether');
		const value = weiValue;
		setAuctionData((prevState) => ({
			...prevState,
			startPrice: value,
		}));
	};

	const handleDuration = (e) => {

		const value = Number(e.target.value);
		let end = Date.now() + value;
		end = Math.round(end / 1000)
		setAuctionData((prevState) => ({
			...prevState,
			endTime: end,
		}));
	};

	const handleCreateAuction = async () => {
		// const { title, blockDeadline, startPrice, metaData, deedId, deedRepo } = auctionData;
		const title = auctionData.title;
		const endDate = auctionData.endDate;
		const startPrice = auctionData.startPrice;
		const deedId = auctionData.deedId;
		RegalAuctionContract.methods
			.startAuction(1, 1, 1622185134)
			.send({ from: window.ethereum.selectedAddress })
			.then(res => console.log(res))
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
										<Form.Control onChange={(e) => handleDuration(e)} as="select" defaultValue="Choose...">
											<option>Choose Duration...</option>
											<option value={86400}>1 day</option>
											<option value={259200}>3 days</option>
											<option value={604800}>7 days</option>
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
