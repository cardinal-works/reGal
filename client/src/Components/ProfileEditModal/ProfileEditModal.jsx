//Modules
import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Toast, Image, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import ipfs from '../../ipfs';
var Buffer = require('buffer/').Buffer;

import UserStore from '../../Stores/UserStore';

const ProfileEditModal = (props) => {
	const userStore = useContext(UserStore);
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	const [userChanges, setUserChanges] = useState(
		user || {
			profile_image: '',
			bio: '',
			display_name: '',
		}
	);

	useEffect(() => {
		if (!window.ethereum) {
			console.log('hello');
			props.history.push('/signup');
		}
		if (!window.ethereum.selectedAddress) {
			props.history.push('/signup');
		}
		loadUser(window.ethereum.selectedAddress);
	}, []);

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

	return (
		<Fragment>
			<Modal {...props} size="sm" className="profile-edit-modal" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Body>
					<Container className="create-container">
						<Row className="text-center">
							<Toast>
							<Toast.Header className="toast-1-header" closeButton={false}>
								<strong className="mx-auto text-majesti font-tertiary">R</strong>
							</Toast.Header>
							<Toast.Body>
								<Row className="text-center mx-auto">
									<Col lg={12} md={4} className="profile-preview">
										<Image className="profile-banner-image" src={user.profile_image} />
									</Col>
									<Col lg={12} className="profile-preview-bio text-start">
										<br />
										<span className="text-white creator-link font-secondary bio-name ">
											{' @'}
											{user.display_name}
											<br />
										</span>
										<span className="text-white creator-link bio-text">{user.bio}</span>
										<br />
										<br />
									</Col>
									<Col md={12}>
										<Form onSubmit={(e) => handleSubmit(e)} className="text-left pb-2">
											<Form.Group>
												<Form.Label className="text-white">email</Form.Label>
												<Form.Control required type="email" name="email_address" placeholder="" onChange={(e) => handleUserData(e)} />
											</Form.Group>
											<Form.Group>
												<Form.Label className="text-white">display name</Form.Label>
												<Form.Control required maxLength="15" minLength="4" name="display_name" onChange={(e) => handleUserData(e)} />
											</Form.Group>
											<Form.Group as={Row} controlId="formHorizontalCheck">
												<Col className="pt-2">
													<Form.Check name="email_list" type="switch" id="custom-switch" label={<small>subscribe to newsletter</small>} onChange={(e) => handleUserData(e)} />
												</Col>
											</Form.Group>
											<div className="text-center pt-4">
												<Button type="submit">{'submit'}</Button>
											</div>
										</Form>
									</Col>
								</Row>
							</Toast.Body>
							</Toast>
							{/* <Col lg={12} className="text-center mb-5 mt-4">
								<span className="text-white font-primary text-majesti">R</span>
							</Col>
							<Col lg={12} className="mx-auto mb-3">
								<Link to="/minter">
									<Button className="button-nft" onClick={props.onHide}>
										NFT
									</Button>
								</Link>
							</Col>
							<Col lg={12} className="mx-auto mb-5">
								<Link to="/auction-house">
									<Button className="button-auction" onClick={props.onHide}>
										AUCTION
									</Button>
								</Link>
							</Col> */}
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		</Fragment>
	);
};

export default observer(ProfileEditModal);
