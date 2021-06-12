//Components
import React, { useEffect, useState, useContext, Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Toast, Form, FloatingLabel } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { ethers } from 'ethers';
import { toJS } from 'mobx';
import { RegalAuction } from '../../../abi/RegalAuction_abi';
import NftStore from '../../Stores/NftStore';
import UserStore from '../../Stores/UserStore';
import NftDisplay from '../../Components/NftDisplay';
import PriceStore from '../../Stores/PriceStore';

const Auction = () => {
	const contract = useRef();
	const nftStore = useContext(NftStore);
	const userStore = useContext(UserStore);
	const priceStore = useContext(PriceStore);
	const [params, setParams] = useState(useParams());
	const [currentEtherPrice, setCurrentEtherPrice] = useState();
	const { updateNft, loadNft, nft } = nftStore;
	const { getPrices, prices } = priceStore;
	const { updateUser, user, loadUser } = userStore;

	const [auctionData, setAuctionData] = useState({
		seller_id: null,
		seller_name: null,
		asking_bid: null,
		end_date: null,
	});

	useEffect(() => {
		const now = Date.now();
		// LOADING CURRENT USER
		loadUser(window.ethereum.selectedAddress).then((res) => {
			console.log(res);
		});
		// FUNCTION TO INSTANTIATE OUR PROVIDER/SIGNER/CONTRACT
		const setup = async () => {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contractAddress = '0x1348862Ab87B8314beB0A99480fDd8D2F154BeB6';
			contract.current = new ethers.Contract(contractAddress, RegalAuction, signer);
		};
		let NFTid = Number(params.id);
		loadNft(NFTid);
		setup();
	}, []);

	const handleCreateAuction = async (e) => {
		let nft_id = nft.nft_id;
		let seller_id = user._id;
		let seller_name = user.display_name;
		let start_date = Date.now();
		let asking_bid = Number(auctionData.asking_bid);
		let end_date = Number(auctionData.end_date) + start_date;

		const updatedAuctionData = {
			seller_id,
			seller_name,
			start_date,
			asking_bid,
			end_date,
		};

		let tx = await contract.current.startAuction(nft_id, asking_bid, end_date);
		const receipt = await tx.wait();

		loadNft(Number(params.id)).then((res) => {
			console.log('res', toJS(res));
			let updatedNft = toJS(res);
			console.log(updatedNft);
			updatedNft['auction_mode'] = true;
			updatedNft.auctions.push(updatedAuctionData);

			updateNft(updatedNft);
		});
		// 	let collections;
		loadUser(window.ethereum.selectedAddress).then((res) => {
			console.log(toJS(res));
			let updatedUser = toJS(res);
			updatedUser.collections.forEach((nfts) => {
				if (nfts.nft_id === Number(params.id)) {
					nfts.auctions.push(updatedAuctionData);
					nfts.auction_mode = true;
					return;
				}
			});
			console.log(updatedUser);
			updateUser(updatedUser);
			// console.log()
		});

		// })
	};

	const handleInputChange = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		setAuctionData((prevState) => ({ ...prevState, [name]: value }));
	};

	useEffect(() => {
		loadUser(window.ethereum.selectedAddress);
		loadNft(params.id);
	}, []);

	return (
		<Fragment>
			{nft && user ? (
				<Container className="auction-form-container" fluid>
					<Row>
						<Col>
							<Toast show={true} animation={false} className="toast-4 mx-auto">
								<Toast.Header closeButton={false}>
									<Col className="text-start p-0">
										<strong className="mx-auto text-start text-majesti">R</strong>
									</Col>
									<Col className="text-end p-0">
										<small>3/3</small>
									</Col>
								</Toast.Header>
								<Toast.Body>
									<Row className="text-end p-3">
										<Col md={12} className="mb-2">
											{nft.thumbnail_image ? (
												<Fragment>
													<NftDisplay nft_id={0} likes={420} thumbnail_image={nft.thumbnail_image} current_bid={999} title={nft.title} creator={user.display_name} />{' '}
												</Fragment>
											) : null}
										</Col>
										<Col md={12} className="h5 text-left pt-2 pb-3">
											Auction Creation
										</Col>
										<Col className="text-center">
											<Form className="text-left ">
												<Form.Group md={12}>
													<Form.Label className="">select duration</Form.Label>
													<br />
													<select name="end_date" id="" onChange={handleInputChange}>
														<option value={86400000}>1 Day</option>
														<option value={259200000}>3 Days</option>
														<option value={604800000}> 7 Days</option>
													</select>
												</Form.Group>
												<Form.Group>
													<Form.Label className="">asking price (ETH)</Form.Label>
													<Form.Control maxLength="60" type="number" name="asking_bid" placeholder="" onChange={handleInputChange} />
												</Form.Group>
												<Form.Group className="mb-3">
													<Form.Check required label="Agree to terms and conditions" feedback="You must agree before submitting." />
												</Form.Group>
											</Form>
										</Col>
									</Row>
									<Row className="mt-1 mb-2 text-center pt-1">
										<Col className="text-center">
											<Button className=" ml-1 button-mint" onClick={handleCreateAuction}>
												start auction
											</Button>
										</Col>
										<Col md={12} className="mx-auto text-center pt-1 mb-1">
											<Button className="button-prev mt-4" variant="secondary">
												<i className="fad fa-angle-double-left"></i>
											</Button>
										</Col>
									</Row>
								</Toast.Body>
							</Toast>
						</Col>
					</Row>
				</Container>
			) : null}
		</Fragment>
	);
};

export default observer(Auction);
