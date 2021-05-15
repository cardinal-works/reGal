//Modules
import React, { useState, Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
//Components
import NftDisplay from '../../Components/NftDisplay/NftDisplay';
import { Col, Container, Row, Dropdown } from 'react-bootstrap';
import { Parallax } from 'react-scroll-parallax';
import CornerRibbon from 'react-corner-ribbon';
//State and Data
import { observer } from 'mobx-react-lite';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';

const Explore = (web3) => {
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const { loadUser } = userStore;
	const { loadNfts, getAllNfts } = nftStore;

	useEffect(async () => {
		loadNfts();
		let userAddress;
		if (window.ethereum) {
			await window.ethereum
				.request({ method: 'eth_accounts' })
				.then((res) => {
					userAddress = res;
					loadUser(userAddress[0]);
				})
				.catch((error) => {
					if (error.code === 4001) {
						console.log('Please connect to MetaMask.');
					} else {
						console.error(error);
					}
				});
		}
		return;
	}, []);

	useEffect(() => {
		console.log(getAllNfts.map((res) => res));
	}, [getAllNfts]);

	return (
		<div className="gradiant-background">
			<Container className="nft-container " fluid>
				<Row className="featured-nft-nav ">
					<Col className="featured-text text-end featured-text text-white font-primary">
							Featured				
						</Col>
						<Col className="text-start mt-1">
						<Dropdown>
							<Dropdown.Toggle
								variant="danger"
								size="lg"
								className="sort-button"
								id="dropdown-basic"
                >
								sort
							</Dropdown.Toggle>
							<Dropdown.Menu >
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
									<Col lg={2} md={6} sm={6} key={index} className="explore-live-feed">
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
						{getAllNfts.length &&
							// getAllNfts.slice(0, 2).map((nft, index) => {
								getAllNfts.map((nft, index) => {
								return (
									<Col lg={2} md={6} sm={6} key={index} className="explore-live-feed">
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
