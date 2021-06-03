//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Row, Col, Nav, Image, Button, Form, FormFile, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { Link, history } from 'react-router-dom';
//Contracts
import ProfileCard from '../../Components/ProfileCard';
// import CreateModal from '../ProfileEditModal';

import NftDisplay from '../../Components/NftDisplay';
import EmptyDisplay from '../../Components/EmptyDisplay'
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import ipfs from '../../ipfs';
var Buffer = require('buffer/').Buffer;
//Media

const Profile = (props) => {
	const [modalShow, setModalShow] = useState(false);
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	const { loadNfts, getAllNfts, loadNft, nft, nftRegistry } = nftStore;



	useEffect(() => {
		if (!window.ethereum) {
			console.log('hello')
			props.history.push("/signup")
		} 
		if (!window.ethereum.selectedAddress) {
			props.history.push("/signup")
		}
		loadUser(window.ethereum.selectedAddress).then((res) => {
			loadNfts({ user_id: res._id });
			// setUserChanges(res);
		});
		// loadNft(1); 
	}, []);


	return (
		<Fragment>
			<Container className="profile-container" >
				<Row className="profile-details-row">
					{user && (
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
								<EmptyDisplay featured={true}></EmptyDisplay>
								{/* <NftDisplay
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
									featured={true}
								/> */}
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
									{/* <Row className="pt-4 pl-2 profile-nfts-grid">
										{nft &&
											nft.slice(0, 3).map((nft, i) => {
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
									</Row> */}
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
