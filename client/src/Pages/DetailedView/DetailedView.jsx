//Components
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Figure, Toast, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { RegalAuction } from '../../../abi/RegalAuction_abi';
import NftDetailDisplay from '../../Components/NftDetailDisplay';
import ProfileCard from '../../Components/ProfileCard';
import NftStore from '../../Stores/NftStore';
import UserStore from '../../Stores/UserStore';
import PriceStore from '../../Stores/PriceStore';

const DetailedView = () => {
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const priceStore = useContext(PriceStore);
	const [params, setParams] = useState(useParams());
	const [currentEtherPrice, setCurrentEtherPrice] = useState();
	const { loadNft, nft } = nftStore;
	const { loadUser, user } = userStore;
	const { getPrices, prices } = priceStore;
	const [price, setPrice] = useState(0);
	// console.log(useParams())

	let contractAddr = '0x0aC149cF75Ffcbe2C9E31948055B19E489E1267b';
	// const AuctionRepositoryContract = new web3.eth.Contract(AuctionRepository, contractAddr);

	useEffect(() => {
		loadNft(params['id']);
		getPrices();
		loadUser(window.ethereum.selectedAddress);
	}, []);

	useEffect(() => {
		if (prices && nft) {
			setPrice(nft.current_bid * prices['current_price']);
		}
	}, [prices]);

	const handleBid = async (e) => {
		e.preventDefault();
		await AuctionRepositoryContract.methods
			.bidOnAuction()
			.send({ from: window.ethereum.selectedAddress })
			.then((res) => console.log(res));
	};

	return (
		<Fragment>
			<Container className="detail-container">
				<Row className="detail-nft-row  mb-2 pb-2">
					{nft && user && (
						<Col md={8} className="mt-1 mb-1">
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
						<Col md={4} className="text-left mb-4 mt-3">
							<Image className="mb-2 pb-2" width="250px" src={user.profile_image} thumbnail />
							<br />
							<span className="h4 text-white">@{user.display_name}</span>
							<br />
							<br />
							<span className="h6 text-white">current bid: {nft.current_bid}</span>
							<br />
							<span className="h6 text-white">asking price: {nft.current_bid}</span>
							<br />
							<br />
							<span className="text-white">
								<Button>Place Bid</Button>
							</span>
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
