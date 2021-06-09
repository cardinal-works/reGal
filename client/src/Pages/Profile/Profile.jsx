//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Row, Col, Nav, Image, Button, Form, Toast } from 'react-bootstrap';
import { Link, history } from 'react-router-dom';
//Contracts
import ProfileCard from '../../Components/ProfileCard';
import NftTable from '../../Components/NftTable';
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
	const [editMode, setEditMode] = useState(false);
	const [profileTable, setProfileTable] = useState('collection');
	const [uploading, setUploading] = useState(false);
	const nftStore = useContext(NftStore);
	const { loadUser, user } = userStore;
	const { loadNfts } = nftStore;
	const [userChanges, setUserChanges] = useState();

	useEffect(() => {
		if (!window.ethereum) {
			props.history.push('/signup');
		}
		if (!window.ethereum.selectedAddress) {
			props.history.push('/signup');
		}
		loadUser(window.ethereum.selectedAddress).then((res) => {
			setUserChanges(res);
			console.log(res);
			loadNfts({ user_id: res._id });
		});
	}, []);

	const handleFileUpload = (file) => {
		console.log('reader');
		setUploading(true);
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => uploadToIPFS(reader);
	};

	const uploadToIPFS = async (reader) => {
		console.log('ipfs');
		const buffer = await Buffer.from(reader.result);
		const result = await ipfs.add(buffer);
		const ipfsLink = 'https://gateway.ipfs.io/ipfs/' + result.path;
		setUserChanges((prevState) => {
			return { ...prevState, profile_image: ipfsLink };
		});
		setUploading(false);
	};

	const handleInput = (e) => {
		e.preventDefault();
		let userChange = userChanges;
		setUserChanges((prevState) => {
			return { ...prevState, bio: e.target.value };
		});
	};

	return (
		<Fragment>
			<Container className="profile-container">
				<Row className="profile-details-row">
					{!editMode && user && (
						<Col md={12} className="text-right">
							<div className="more-div text-white pb-1 ">
								{user.wallet_id === window.ethereum.selectedAddress ? (
									<Fragment>
										<i as={Button} onClick={() => setEditMode(true)} className="fad fa-pencil edit pr-2"></i>
										<i className="fas fa-cog settings"></i>
									</Fragment>
								) : (
									<i className="far fa-ellipsis-h pl-3"></i>
								)}
							</div>
						</Col>
					)}
					{!editMode && user && (
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
							<Col className="" lg={12} md={12}>
								<Nav fill variant="tabs" defaultActiveKey="link-1" className="profile-nft-nav">
									<Nav.Item>
										<Nav.Link onClick={() => setProfileTable('collection')} eventKey="link-1">
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
								</Nav>
								<NftTable user={user} profileTable={profileTable} />
							</Col>
						</Fragment>
					)}
					{editMode && (
						<Container className="profile-edit-container">
							<Row className="profile-edit-row">
								<Toast>
									<Toast.Header className="toast-1-header" closeButton={false}>
										<div className="text-center mx-auto text-majesti text-white profile-edit-text">Profile Edit</div>
									</Toast.Header>
									<Toast.Body>
										<Row className="text-center mx-auto">
											<Col md={12} className="mt-1 pb-2 text-left h6">
												<div className="pb-1 h5">Upload profile photo:</div>
												<br />
												<small>*Upload times for IPFS can vary, please be patient as your image is uploaded.</small>
											</Col>
											<Col lg={12} md={4} className="mt-2 profile-image-preview">
												<Image className="profile-banner-image" src={userChanges.profile_image || null} />
												{uploading ? (
													<span className="spinner-border spinner-border-sm mr-2 mb-1"></span>
												) : (
													<input
														type="file"
														accept="image/jpeg,image/png"
														onClick={(e) => {
															handleFileUpload(e.target.files[0]);
														}}
														className="input-overlay mt-2"
													/>
												)}
											</Col>
											<Col md={12} className="pt-4 mt-3 pb-2 h6">
												<Form onSubmit={(e) => handleSubmit(e)} className="text-left pb-2">
													<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
														<Form.Label className="pb-1">Update your artist bio:</Form.Label>
														<Form.Control
															required
															as="textarea"
															name="bio"
															minLength="1"
															maxLength="280"
															rows={3}
															onChange={(e) => handleInput(e)}
															defaultValue={userChanges.bio || null}
														/>
													</Form.Group>
													<div className="text-center pt-4">
														<Button onClick={() => setEditMode(false)} className="cancel-back mr-1">
															<i className="fas fa-backspace"></i>
														</Button>
														<Button className="ml-1 profile-edit-submit" type="submit">
															{'update'}
														</Button>
													</div>
												</Form>
											</Col>
										</Row>
									</Toast.Body>
								</Toast>
							</Row>
						</Container>
					)}
				</Row>
			</Container>
		</Fragment>
	);
};

export default observer(Profile);
