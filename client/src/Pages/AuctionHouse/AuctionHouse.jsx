//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Row, Col, Image, Nav, Card, Button, Form, FormFile } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
//Contracts
import NftDisplay from '../../Components/NftDisplay';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';
import { observer } from 'mobx-react-lite';
import Auction from '../Auction';
import { toJS } from 'mobx';
import ipfs from '../../ipfs';
var Buffer = require('buffer/').Buffer;
import { AuctionRepository } from '../../../abi/AuctionRepository_abi';

const AuctionHouse = ({ ethers }) => {
	const [modalShow, setModalShow] = useState(false);
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const { loadNfts, getAllNfts, nftRegistry } = nftStore;
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	let contractAddr = '0xa535e0C5Dec0a2CE862495AF88B2155D347615E3';
	// const AuctionRepositoryContract = new web3.eth.Contract(AuctionRepository, contractAddr);

	useEffect(() => {
		console.log(window.ethereum.selectedAddress);
		loadUser(window.ethereum.selectedAddress).then((res) => loadNfts({ user_id: res._id }));
		// AuctionRepositoryContract.methods
		// 	.getAuctionsOf(window.ethereum.selectedAddress)
		// 	.call()
		// 	.then(res => console.log('res', res))
	}, []);

	useEffect(() => {
		console.log(getAllNfts);
	}, [getAllNfts]);

	return (
		<Fragment>
			<Container className="auction-house-container mt-2" >
				<Row className="">
					<div className="font-secondary text-white pr-1 text-center mb-4">Your Collection</div>
					{getAllNfts.length &&
						getAllNfts.map((nft, index) => (
							<Col>
								<Nav fill variant="tabs" defaultActiveKey="link-0" className="profile-nft-nav">
									<Nav.Item>
										<Nav.Link onClick={() => window.alert('hello')} eventKey="link-0">Collection</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link onClick={() => window.alert('hello')} eventKey="link-1">Drafts</Nav.Link>
									</Nav.Item>
								</Nav>
								<Container className="profile-nfts-grid" >
									<Row className="pt-4 pl-2">
										<Col lg={6} md={12}>
											<NftDisplay />
										</Col>

										<Col md={12} style={{ fontSize: '13px', color: '#f6a615' }} className="text-right pt-3">
											View All
											<i
												style={{ fontSize: '13px', color: '#f6a615' }}
												className="fas fa-angle-double-right pl-2 my-auto pr-2"></i>
										</Col>
									</Row>
								</Container>
							</Col>
						))}
				</Row>
			</Container>
		</Fragment>
	);
};

export default observer(AuctionHouse);
