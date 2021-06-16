//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Row, Col, Image, Nav, Card, Button, Form, FormFile } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//Contracts
import NftDisplay from '../../Components/NftDisplay';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';
import { observer } from 'mobx-react-lite';
import Auction from '../Auction';
import { toJS } from 'mobx';
import ipfs from '../../ipfs';
// var Buffer = require('buffer/').Buffer;
import { RegalAuction } from '../../../abi/RegalAuction_abi';

const AuctionHouse = () => {
	const [modalShow, setModalShow] = useState(false);
	const [params, setParams] = useState(useParams());
	const [auctionFilter, setAuctionFilter] = useState(false);
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const { loadNfts, loadNft, getAllNfts, nft, nftRegistry } = nftStore;
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	// const AuctionRepositoryContract = new web3.eth.Contract(AuctionRepository, contractAddr);

	useEffect(() => {
		console.log(window.ethereum.selectedAddress);
		loadUser(window.ethereum.selectedAddress).then((res) => loadNfts({ user_id: res._id }));
	}, []);

	useEffect(() => {
		loadNft(Number(params.id));
		console.log(getAllNfts);
	}, []);

	return (
		<Fragment>
			<Container className="auction-house-container mt-2">
				<Row className="">
					<div className="font-secondary text-white pr-1 text-center mb-4">Your Collection</div>

					<Col>
						<Nav fill variant="tabs" defaultActiveKey="link-0" className="profile-nft-nav">
							<Nav.Item>
								<Nav.Link onClick={() => setAuctionFilter(false)} eventKey="link-0">
									Collections
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link onClick={() => setAuctionFilter(true)} eventKey="link-1">
									Live
								</Nav.Link>
							</Nav.Item>
						</Nav>
						{!auctionFilter && (
							<Container className="profile-nfts-grid">
								<Row className="pt-4 pl-2">
									{user &&
										user.collections &&
										user.collections
											.filter((nft) => nft.auction_mode === false)
											.map((nft, i) => {
												return (
													<Col key={i + ' collections'} xl={3} lg={3} md={12} sm={10} xs={10}>
														<NftDisplay
															_id={nft._id}
															title={nft.title}
															user_id={nft.user_id}
															creator_id={nft.creator_id}
															creator_name={nft.creator_name}
															nft_description={nft.nft_description}
															nft_id={nft.nft_id}
															date_mint={nft.date_mint}
															likes={nft.likes}
															stars={nft.stars}
															previous_sold={nft.previous_sold}
															thumbnail_image={nft.thumbnail_image}
															auction_mode={nft.auction_mode}
															auction={true}
														/>
													</Col>
												);
											})}
								</Row>
							</Container>
						)}
						{auctionFilter && (
							<Container className="profile-nfts-grid">
								<Row className="pt-4 pl-2">
									{user &&
										user.collections &&
										user.collections
											.filter((nft) => nft.auction_mode === true)
											.map((nft, i) => {
												return (
													<Col key={i + ' live'} xl={3} lg={3} md={12} sm={10} xs={10}>
														<NftDisplay
															_id={nft._id}
															title={nft.title}
															user_id={nft.user_id}
															creator_id={nft.creator_id}
															creator_name={nft.creator_name}
															nft_description={nft.nft_description}
															nft_id={nft.nft_id}
															date_mint={nft.date_mint}
															likes={nft.likes}
															stars={nft.stars}
															previous_sold={nft.previous_sold}
															thumbnail_image={nft.thumbnail_image}
															auction_mode={nft.auction_mode}
															auction={true}
														/>
													</Col>
												);
											})}
								</Row>
							</Container>
						)}
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default observer(AuctionHouse);
