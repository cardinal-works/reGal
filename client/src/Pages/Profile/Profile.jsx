//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Row, Col, Nav, Image, Button, Form, FormFile, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { Link, history } from 'react-router-dom';
//Contracts
import ProfileCard from '../../Components/ProfileCard';
import ProfileNftDisplay from '../../Components/ProfileNftDisplay';

import NftDisplay from '../../Components/NftDisplay';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import CornerRibbon from 'react-corner-ribbon';
import ipfs from '../../ipfs';
var Buffer = require('buffer/').Buffer;
//Media
import demo from '../../../assets/images/demo-art.jpeg';
import demo2 from '../../../assets/images/nft-1.jpg';
import demo3 from '../../../assets/images/nft-2.jpg';
import demo4 from '../../../assets/images/nft-3.jpg';
import demo5 from '../../../assets/images/nft-5.jpg';
import demo6 from '../../../assets/images/nft-6.jpg';

const initialState = {
	nfts: [
		{
			id: 1,
			image: demo,
			likes: 27,
			comments: 8,
			title: 'Backbone',
		},
		{
			id: 2,
			image: demo2,
			likes: 109,
			comments: 56,
			title: 'OTXHello',
		},
		{
			id: 3,
			image: demo3,
			likes: 89,
			comments: 17,
			title: 'Spaceman',
		},
		{
			id: 4,
			image: demo4,
			likes: 211,
			comments: 24,
			title: 'Grooves',
		},
		{
			id: 5,
			image: demo5,
			likes: 32,
			comments: 10,
			title: 'Pixel Monkey',
		},
		{
			id: 6,
			image: demo6,
			likes: 49,
			comments: 16,
			title: 'Martian',
		},
	],
};

const Profile = (props, web3) => {
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	const { loadNfts, getAllNfts, loadNft, nft, nftRegistry } = nftStore;
	const [editMode, setEditMode] = useState(false);

	const [userChanges, setUserChanges] = useState(
		toJS(user) || {
			profile_image: '',
			bio: '',
			display_name: '',
		}
	);

	useEffect(() => {
		// console.log(nftRegistry);
	}, [nftRegistry]);

	const [nfts, setNfts] = useState([
		{
			id: 1,
			image: demo,
			likes: 27,
			comments: 8,
			bid: 4,
			title: 'velociraptor',
			creator: 'deffie',
			date_mint: '02/01/2021',
			current: 1.3,
			previous: 1.0,
		},
		{
			id: 2,
			image: demo2,
			likes: 109,
			comments: 56,
			bid: 27,
			title: 'dilip',
			creator: 'lucid monday',
			date_mint: '01/17/2021',
			current: 4.32,
			previous: null,
		},
		{
			id: 3,
			image: demo3,
			likes: 89,
			comments: 17,
			bid: 2,
			title: 'late year',
			creator: 'othello',
			date_mint: '02/01/2021',
			current: 0.9,
			previous: 2.4,
		},
		{
			id: 4,
			image: demo4,
			likes: 211,
			comments: 24,
			bid: 3,
			title: 'beeple',
			creator: 'rahmteen',
			date_mint: '01/17/2021',
			current: 3.12,
			previous: null,
		},
		{
			id: 5,
			image: demo5,
			likes: 32,
			comments: 10,
			bid: 60,
			title: 'prince kong',
			creator: 'cgYoda',
			date_mint: '02/01/2021',
			current: 1.3,
			previous: 1.0,
		},
		{
			id: 6,
			image: demo6,
			likes: 49,
			comments: 16,
			bid: 32,
			title: 'dead space',
			creator: 'elon',
			date_mint: '01/17/2021',
			current: 10.92,
			previous: null,
		},
	]);

	const handleFileUpload = (file) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => uploadToIPFS(reader);
	};

	const uploadToIPFS = async (reader) => {
		const buffer = await Buffer.from(reader.result);
		const result = await ipfs.add(buffer);
		const ipfsLink = 'https://gateway.ipfs.io/ipfs/' + result.path;
		let userChange = userChanges;
		setUserChanges({
			...userChange,
			profile_image: ipfsLink,
		});
	};

	const handleDisplayName = (e) => {
		e.preventDefault();
		let userChange = userChanges;
		setUserChanges({
			...userChange,
			display_name: e.target.value,
		});
	};

	const handleBio = (e) => {
		e.preventDefault();
		let userChange = userChanges;
		setUserChanges({
			...userChange,
			bio: e.target.value,
		});
	};

	const handleUpdateUser = (e) => {
		e.preventDefault();
		if (userChanges.profile_image.length === 0) {
			setUserChanges({ ...userChanges, profile_image: user.profile_image });
		}
		let newUser = { ...user, ...userChanges };

		updateUser(newUser)
			.then((res) => {
				setEditMode(false);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		console.log();
		loadUser(window.ethereum.selectedAddress).then((res) => {
			loadNfts({ user_id: res._id });
			setUserChanges(res);
		});
		loadNft(1);
		// .then(console.log("hello", Object.fromEntries(nftRegistry)))
	}, []);

	useEffect(() => {
		console.log(user);
	}, [loadingInitial, user, getAllNfts]);

	return (
		<Fragment>
			<Container className="profile-container" >
				<Row className="profile-details-row">
					{user && nft && (
						<Fragment >
							<Col md={12} className="profile-page-card-nav">
								<ProfileCard
									_id={user._id}
									profile_image={user.profile_image}
									wallet_id={user.wallet_id}
									profile_featured_id={user.profile_featured_id}
									bio={user.bio}
									profile_bg_color={user.profile_bg_color}
									display_name={user.display_name}></ProfileCard>
							</Col>
							<Col className="" lg={3} md={5}>
								<NftDisplay
									_id={nfts._id}
									likes={nfts.likes}
									thumbnail_image={nfts.thumbnail_image}
									nft_id={nfts.nft_id}
									current_bid={nfts.current_bid}
									title={nfts.title}
									auction_startDate={nfts.auction_startDate}
									auction_duration={nfts.auction_duration}
									creator={nfts.creator}
									date_mint={nfts.date_mint}
									tags={nfts.tags}
									featured={true}
								/>
							</Col>
							<Col className="" lg={9} md={6}>
								<Nav fill variant="tabs" defaultActiveKey="link-0" className="profile-nft-nav">
									<Nav.Item>
										<Nav.Link eventKey="link-0">Collection</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="link-1">Liked</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="link-2">Recently Viewed</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="link-3">Starred</Nav.Link>
									</Nav.Item>
								</Nav>
								<Container className="" >
									<Row className="pt-4 pl-2 profile-nfts-grid">
										{nfts &&
											nfts.slice(0, 3).map((nft, i) => {
												return (
													<Col key={i} xl={4} lg={5} md={12} sm={10} xs={10}>
														<NftDisplay />
													</Col>
												);
											})}
										<Col md={12} style={{fontSize: '13px', color: "#f6a615"}}  className="text-right pt-3">
											View All
										<i style={{fontSize: '13px', color: "#f6a615"}} className="fas fa-angle-double-right pl-2 my-auto pr-2"></i>
										</Col>
									</Row>
								
								</Container>
							</Col>
						</Fragment>
					)}
				</Row>
			</Container>
		</Fragment>
	);
};

export default observer(Profile);

// <Row className="nft-display-rows mb-5 pb-3">
// {editMode === false ? (
// 	<Col lg={3} md={6} className="mt-3">
// 		<Col md={6} lg={12}>
// 			<Image
// 				className="profile-image "
// 				src={user ? user.profile_image : null}
// 				width="250px"
// 				height="250px"></Image>
// 		</Col>
// 		<Col md={6} lg={12} className=" mt-3">
// 			<span className="text-majesti text-white user-profile-name font-secondary ">
// 				{' '}
// 				{user ? '@' + user.display_name : '@displayname'}{' '}
// 			</span>{' '}
// 		</Col>
// 		<Col md={6} lg={12} className="mt-1 ml-1">
// 			<span className="text-primary text-center">
// 				{user
// 					? user.wallet_id.slice(0, 3) +
// 					  '...' +
// 					  user.wallet_id.slice(-3)
// 					: null}
// 			</span>
// 		</Col>
// 		<Col md={6} lg={12} className="mt-4 ml-1">
// 			<p className="text-start text-white user-profile-bio">
// 				{' '}
// 				{user ? user.bio : null}{' '}
// 			</p>
// 		</Col>
// 		<Col md={6} lg={12} className="text-start">
// 			<Button
// 				className="btn-regal mt-2 mb-3 mr-1"
// 				onClick={() => setEditMode(!editMode)}>
// 				Edit
// 			</Button>
// 			<Button className="btn-regal mt-2 mb-3 ml-1 mr-1">
// 				<i className="fas fa-cog"></i>
// 			</Button>
// 		</Col>
// 	</Col>
// ) : (
// 	<Col lg={6} className="">
// 		<Form>
// 			<Form.Group>
// 				<Col lg={12}>
// 					<Image
// 						className="profile-image mb-2 "
// 						src={
// 							userChanges.profile_image.length > 1
// 								? userChanges.profile_image
// 								: user.profile_image
// 						}
// 						width="250px"
// 						height="250px"></Image>

// 					<Form.File
// 						id="exampleFormControlFile1"
// 						className="choose-file-button"
// 						label={`PROFILE PICTURE UPLOAD (4mb max)`}
// 						onChange={(e) =>
// 							handleFileUpload(e.target.files[0])
// 						}
// 					/>
// 					<Form.Label className="text-white"></Form.Label>
// 				</Col>
// 			</Form.Group>
// 			<Form.Group controlId="formDisplayName">
// 				<Col md={12} className="mt-3">
// 					<Form.Label className="text-white">
// 						DISPLAY NAME
// 					</Form.Label>
// 					<Form.Control
// 						type="text"
// 						placeholder={
// 							user ? user.display_name : '@displayname'
// 						}
// 						onChange={(e) => handleDisplayName(e)}
// 					/>
// 				</Col>
// 			</Form.Group>
// 			<Form.Group controlId="formWalletId">
// 				<Col md={12} className="mt-1">
// 					<span className="text-primary">
// 						{user
// 							? user.wallet_id.slice(0, 3) +
// 							  '...' +
// 							  user.wallet_id.slice(-3)
// 							: null}
// 					</span>
// 				</Col>
// 			</Form.Group>
// 			<Form.Group controlId="formBio">
// 				<Col lg={12} md={12} className="mt-1">
// 					<Form.Label className="text-white">
// 						ARTIST BIO
// 					</Form.Label>
// 					<Form.Control
// 						as="textarea"
// 						rows={3}
// 						type="text"
// 						placeholder={user ? user.bio : null}
// 						onChange={(e) => handleBio(e)}
// 					/>
// 				</Col>
// 			</Form.Group>
// 			<Col lg={12} md={12} className="text-start">
// 				<div>
// 					<Button
// 						className="btn-regal mt-2 mb-3 mr-1"
// 						onClick={(e) => handleUpdateUser(e)}>
// 						{submitting ? (
// 							<span className="spinner-border spinner-border-sm mr-2 mb-1"></span>
// 						) : null}
// 						{submitting ? 'Submitting' : 'Submit'}
// 					</Button>
// 					<Button
// 						className="btn-regal mt-2 mb-3 ml-1"
// 						onClick={() => setEditMode(!editMode)}>
// 						CANCEL
// 					</Button>
// 				</div>
// 			</Col>
// 		</Form>
// 	</Col>
// )}
// {/*  */}
// <Col className="featured-nft" lg={9} md={6}>
// 	<div className="text-white font-primary ">Featured</div>
// 	<ProfileNftDisplay
// 		likes={nfts[5].likes}
// 		comments={nfts[5].comments}
// 		image={nfts[5].image}
// 		id={nfts[5].id}
// 		bid={nfts[5].bid}
// 		title={nfts[5].title}
// 		creator={nfts[5].creator}
// 		date_mint={nfts[5].date_mint}
// 		current={nfts[5].current}
// 		previous={nfts[5].previous}
// 	/>
// </Col>
// </Row>
// <Row className="mb-5">
// <span className="text-white font-secondary">Collection</span>
// {getAllNfts.length &&
// 	getAllNfts.map((nfts, index) => (
// 		<Col
// 			lg={4}
// 			md={3}
// 			sm={6}
// 			key={index}
// 			className="nft-collection mt-3 mb-3">
// 			<ProfileNftDisplay
// 				image={nfts.thumbnail_image}
// 				nft_id={nfts.nft_id}
// 			/>
// 		</Col>
// 	))}
// </Row>
// <Row>
// <span className="text-white font-secondary pt-2">Liked</span>
// {nfts.length &&
// 	nfts.map((nfts, index) => (
// 		<Col
// 			lg={3}
// 			md={3}
// 			sm={12}
// 			key={index}
// 			className="nft-liked mt-3 mb-3">
// 			<ProfileNftDisplay
// 				likes={nfts.likes}
// 				comments={nfts.comments}
// 				image={nfts.image}
// 				id={nfts.id}
// 				bid={nfts.bid}
// 				title={nfts.title}
// 				creator={nfts.creator}
// 				date_mint={nfts.date_mint}
// 				current={nfts.current}
// 				previous={nfts.previous}
// 			/>
// 		</Col>
// 	))}
// </Row>
// <Row>
// <span className="text-white font-secondary pt-5">
// 	Recently Viewed
// </span>
// {nfts.length &&
// 	nfts.map((nfts, index) => (
// 		<Col
// 			lg={3}
// 			md={3}
// 			sm={12}
// 			key={index}
// 			className="nft-viewed mt-3 mb-3">
// 			<ProfileNftDisplay
// 				likes={nfts.likes}
// 				comments={nfts.comments}
// 				image={nfts.image}
// 				id={nfts.id}
// 				bid={nfts.bid}
// 				title={nfts.title}
// 				creator={nfts.creator}
// 				date_mint={nfts.date_mint}
// 				current={nfts.current}
// 				previous={nfts.previous}
// 			/>
// 		</Col>
// 	))}
// </Row>
