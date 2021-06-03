// ** MODULES
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// ** COMPONENTS
import NftDisplay from '../../Components/NftDisplay/NftDisplay';
import { Col, Container, Row, Dropdown, CardDeck } from 'react-bootstrap';
// ** STATE
import { observer } from 'mobx-react-lite';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';

const Explore = (ethers) => {
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const { loadUser } = userStore;
	const { loadNfts, getAllNfts } = nftStore;

	useEffect(async () => {
		loadNfts();
		// let userAddress;
		// if (window.ethereum) {
		// 	await window.ethereum
		// 		.request({ method: 'eth_accounts' })
		// 		.then((res) => {
		// 			userAddress = res;
		// 			loadUser(userAddress[0]);
		// 		})
		// 		.catch((error) => {
		// 			if (error.code === 4001) {
		// 				console.log('Please connect to MetaMask.');
		// 			} else {
		// 				console.error(error);
		// 			}
		// 		});
		// }
		// return;
	}, []);

	return (
		<div className="gradiant-background">
			<Container className="nft-container pt-0">
				<Row className="featured-nft-nav mb-3 m-1">
					<Col className="featured-text-col text-white p-0 text-start">
						<span className="featured-text">featured</span>{' '}
					</Col>
					<Col className="sort-button-col mb-2 text-end p-0">
						<Dropdown>
							<Dropdown.Toggle variant="danger" size="lg" className="sort-button" id="dropdown-basic">
								sort
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item href="#/action-1">Most Liked</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Most Recent</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Highest Current Bid</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Lowest Current Bid</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Recently Sold</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Col>
				</Row>
				<Row className="nft-explore-rows">
				
					{getAllNfts.length &&
						getAllNfts.map((nft, index) => {
							return (
								<Col lg={3} md={4} sm={6} xs={12} key={index} className="explore-live-feed">
									<NftDisplay
										_id={nft._id}
										likes={nft.likes}
										thumbnail_image={nft.thumbnail_image}
										nft_id={nft.nft_id}
										current_bid={nft.current_bid}
										title={nft.title}
										auction_startDate={nft.auction_startDate}
										auction_duration={nft.auction_duration}
										creator={nft.creator}
										date_mint={nft.date_mint}
										tags={nft.tags}
									/>
								</Col>
							);
						})}
					
				</Row>
			</Container>
		</div>
	);
};

export default observer(Explore);
