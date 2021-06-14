//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Row, Col, Image, Nav, Card, Button, Form, FormFile } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//Contracts
import AuctionTable from '../../Components/AuctionTable';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';
import { observer } from 'mobx-react-lite';

const Bids = () => {
	const [modalShow, setModalShow] = useState(false);
	const [params, setParams] = useState(useParams());
	const [auctionFilter, setAuctionFilter] = useState(false);
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const { loadNfts, loadNft, getAllNfts, nft, nftRegistry } = nftStore;
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;

	useEffect(() => {
		console.log(window.ethereum.selectedAddress);
		loadUser(window.ethereum.selectedAddress).then((res) => loadNfts({ user_id: res._id }));
	}, []);
	return (
		<Container>
			{user && (
				<Col className="mb-1" lg={12} md={12}>
					<Nav fill variant="tabs" defaultActiveKey="link-1" className="profile-nft-nav mt-5">
						<Nav.Item>
							<Nav.Link  eventKey="link-1">
								Bids
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link  eventKey="link-2">
								Collect
							</Nav.Link>
						</Nav.Item>
					</Nav>
					<AuctionTable user={user}/>
					{/* {user.collections.length > 0 && (
						<Col md={12} style={{ fontSize: '13px', color: '#f6a615' }} className="text-right pt-1">
							View All
							<i style={{ fontSize: '13px', color: '#f6a615' }} className="fas fa-angle-double-right pl-2 my-auto pr-2"></i>
						</Col>
					)} */}
				</Col>
			)}
		</Container>
	);
};

export default observer(Bids);
