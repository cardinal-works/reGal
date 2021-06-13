//Components
import React, { useEffect, useState, useContext, Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Figure, Toast, Table, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { ethers, utils } from 'ethers';
import { RegalAuction } from '../../../abi/RegalAuction_abi';
import NftDetailDisplay from '../../Components/NftDetailDisplay';
import NftStore from '../../Stores/NftStore';
import UserStore from '../../Stores/UserStore';
import PriceStore from '../../Stores/PriceStore';

const DetailedView = () => {
	const contract = useRef();
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const priceStore = useContext(PriceStore);

	const [params, setParams] = useState(useParams());
	const [bidding, setBidding] = useState(false);
	const [currentEtherPrice, setCurrentEtherPrice] = useState();

	const { loadNft, nft } = nftStore;
	const { loadUser, user } = userStore;
	const { getPrices, prices } = priceStore;
	const [price, setPrice] = useState(0);


	useEffect(async () =>  {
		loadNft(params['id']);
		getPrices();
		loadUser(window.ethereum.selectedAddress);
		const setup = async () => {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contractAddress = '0x3604100cEBe47C4F1E34e878c5f1c8b4ED4e0a80';
			contract.current = new ethers.Contract(contractAddress, RegalAuction, signer);
		};
		setup();
	}, []);

	const handleBid = async (e) => {
		let tx = {
			from: window.ethereum.selectedAddress,
			value: ethers.utils.parseEther(e.target.form[0].value),
		};
		console.log(contract.current);
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		console.log(contract.current.placeBid(1, tx))
	};

	const handleArmed = () => {};

	return (
		<Fragment>
			<Container className="detail-container">
				<Row className="detail-nft-row  mb-2 pb-2">
					{nft && user && (
						<Col md={7} className="mt-1 mb-1">
							<NftDetailDisplay
								_id={nft._id}
								title={nft.title}
								user_id={nft.user_id}
								creator_id={nft.creator_id}
								creator_name={user.display_name}
								nft_description={nft.nft_description}
								nft_id={nft.nft_id}
								date_mint={nft.date_mint}
								likes={nft.likes}
								stars={nft.stars}
								previous_sold={nft.previous_sold}
								thumbnail_image={nft.thumbnail_image}
								auction_mode={nft.auction_mode}
							/>
						</Col>
					)}
					{user && nft && (
						<Col md={3} xs={6} className="text-left mb-4 mt-3 my-auto">
							<Image className="mb-2" width="250px" src={user.profile_image} />
							<br />
							<span className="h4 text-white">@{user.display_name}</span>
							<br />
							<br />
							<span className="h6 text-white">current bid: {nft.current_bid}</span>
							<br />
							<span className="h6 text-white">asking price: {nft.current_bid}</span>
							<br />
							<br />

							{!bidding ? (
								<Button onClick={() => setBidding(true)}>Place Bid</Button>
							) : (
								<Form className="text-white">
									<Form.Group controlId="bid-amt">
										<Form.Label className="p-0">Bid Amount</Form.Label>
										<Form.Control type="number" />
									</Form.Group>
									<Button onClick={(e) => handleBid(e)}>Confirm</Button>
									<Button className="ml-1" onClick={() => setBidding(false)}>
										Cancel
									</Button>
								</Form>
							)}
						</Col>
					)}
				</Row>
				<Row>
					<Col className=" text-white" md={12}>
						{' '}
						<h5>transaction history: </h5>
					</Col>
					<Col className="" md={12}>
						<Table striped bordered hover variant="dark" className="mt-1 mb-1">
							<thead>
								<tr>
									<th>#</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Username</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>Mark</td>
									<td>Otto</td>
									<td>@mdo</td>
								</tr>
								<tr>
									<td>2</td>
									<td>Jacob</td>
									<td>Thornton</td>
									<td>@fat</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default observer(DetailedView);
