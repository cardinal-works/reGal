//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Row, Col, Nav, Image, Button, Form, FormFile, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { Link, history } from 'react-router-dom';
//Contracts
import ProfileCard from '../../Components/ProfileCard';
// import CreateModal from '../ProfileEditModal';

import NftDisplay from '../../Components/NftDisplay';
import EmptyDisplay from '../../Components/EmptyDisplay';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import ipfs from '../../ipfs';
var Buffer = require('buffer/').Buffer;
//Media

const Profile = (props) => {
	const userStore = useContext(UserStore);
	const [profileTable, setProfileTable] = useState('collection');
	const nftStore = useContext(NftStore);
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	const { loadNfts, getAllNfts, loadNft, nft, nftRegistry } = nftStore;

	// ** Error handling for users trying to enter the profile page when not a user. ** //
	useEffect(() => {
		if (!window.ethereum) {
			props.history.push('/signup');
		}
		if (!window.ethereum.selectedAddress) {
			props.history.push('/signup');
		}
		loadUser(window.ethereum.selectedAddress).then((res) => {
			console.log(res);
			loadNfts({ user_id: res._id });
		});
	}, []);

	return (
		<Fragment>
			<Container className="profile-container">
				<Row className="profile-details-row">
					{user && (
						<Fragment>
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
								{user.profile_featured_id ? (
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
										featured={true}
									/>
								) : (
									<EmptyDisplay featured={true}></EmptyDisplay>
								)}
							</Col>
							<Col className="" lg={9} md={6}>
								<Nav fill variant="tabs" defaultActiveKey="link-0" className="profile-nft-nav">
									<Nav.Item>
										<Nav.Link onClick={() => setProfileTable('collection')} eventKey="link-1" active >
											Collection
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link onClick={() => setProfileTable('liked_nfts')} eventKey="link-2">
											Liked
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link onClick={() => setProfileTable('recently_viewed_nfts')} eventKey="link-3">
											Recently Viewed
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link onClick={() => setProfileTable('saved')} eventKey="link-4">
											Saved
										</Nav.Link>
									</Nav.Item>
								</Nav>
								<Container className="">
									{/* COLLECTION TABLE */}
									{profileTable == 'collection' ? (
										<Row className="pt-4 pl-2 profile-nfts-grid">
											{user.collection ? (
												user.collection.slice(0, 3).map((nft, i) => {
													return (
														<>
															<Col key={i} xl={4} lg={5} md={12} sm={10} xs={10}>
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
																	key={`profil-col-${i}`}
																/>
															</Col>
															<Col md={12} style={{ fontSize: '13px', color: '#f6a615' }} className="text-right pt-3">
																View All
																<i style={{ fontSize: '13px', color: '#f6a615' }} className="fas fa-angle-double-right pl-2 my-auto pr-2"></i>
															</Col>
														</>
													);
												})
											) : (
												<Col xl={4} lg={5} md={12} sm={10} xs={10}>
													<EmptyDisplay nft={true}></EmptyDisplay>
												</Col>
											)}
										</Row>
									) : null}
									{/* LIKED TABLE */}
									{profileTable == 'liked_nfts' ? (
										<Row className="pt-4 pl-2 profile-nfts-grid">
											{user.liked_nfts.length ? (
												user.liked_nfts.slice(0, 3).map((nft, i) => {
													return (
														<>
															<Col key={i} xl={4} lg={5} md={12} sm={10} xs={10}>
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
																	key={`profil-col-${i}`}
																/>
															</Col>
															<Col md={12} style={{ fontSize: '13px', color: '#f6a615' }} className="text-right pt-3">
																View All
																<i style={{ fontSize: '13px', color: '#f6a615' }} className="fas fa-angle-double-right pl-2 my-auto pr-2"></i>
															</Col>
														</>
													);
												})
											) : (
												<Col md={12} className="text-white h5">
													{/* <EmptyDisplay nft={false}></EmptyDisplay> */}
													<i className="h6 far fa-at user-profile pt-2"></i>
													{user.display_name} <span className=" h6"> has not liked any collectibles</span>
												</Col>
											)}
										</Row>
									) : null}
									{/* LIKED TABLE */}
									{profileTable == 'recently_viewed_nfts' ? (
										<Row className="pt-4 pl-2 profile-nfts-grid">
											{user.recently_viewed_nfts.length ? (
												user.recently_viewed_nfts.slice(0, 3).map((nft, i) => {
													return (
														<>
															<Col key={i} xl={4} lg={5} md={12} sm={10} xs={10}>
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
																	key={`profil-col-${i}`}
																/>
															</Col>
															<Col md={12} style={{ fontSize: '13px', color: '#f6a615' }} className="text-right pt-3">
																View All
																<i style={{ fontSize: '13px', color: '#f6a615' }} className="fas fa-angle-double-right pl-2 my-auto pr-2"></i>
															</Col>
														</>
													);
												})
											) : (
												<Col md={12} className="text-white h5">
													{/* <EmptyDisplay nft={false}></EmptyDisplay> */}
													<i className="h6 far fa-at user-profile pt-2"></i>
													{user.display_name} <span className=" h6"> has not viewed any collectibles</span>
												</Col>
											)}
										</Row>
									) : null}
									{/* SAVED TABLE */}
									{profileTable == 'saved' ? (
										<Row className="pt-4 pl-2 profile-nfts-grid">
											{user.starred ? (
												user.starred.slice(0, 3).map((nft, i) => {
													return (
														<>
															<Col key={i} xl={4} lg={5} md={12} sm={10} xs={10}>
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
																	key={`profil-col-${i}`}
																/>
															</Col>
															<Col md={12} style={{ fontSize: '13px', color: '#f6a615' }} className="text-right pt-3">
																View All
																<i style={{ fontSize: '13px', color: '#f6a615' }} className="fas fa-angle-double-right pl-2 my-auto pr-2"></i>
															</Col>
														</>
													);
												})
											) : (
												<Col md={12} className="text-white h5">
													{/* <EmptyDisplay nft={false}></EmptyDisplay> */}
													<i className="h6 far fa-at user-profile pt-2"></i>
													{user.display_name} <span className=" h6"> has not saved any collectibles</span>
												</Col>
											)}
										</Row>
									) : null}
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
