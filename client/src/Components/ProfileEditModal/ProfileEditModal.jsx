//Modules
import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Toast, Image, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ipfs from '../../ipfs';
var Buffer = require('buffer/').Buffer;

import UserStore from '../../Stores/UserStore';
import { set } from 'mobx';

const userChangesSchema = {
	profile_image: null,
	bio: null,
};

const ProfileEditModal = (props) => {
	const userStore = useContext(UserStore);
	const [uploading, setUploading] = useState(false);
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	const [userChanges, setUserChanges] = useState(userChangesSchema);

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

	const handleInput = (e) => {
		e.preventDefault();
		let userChange = userChanges;
		setUserChanges((prevState) => {
			return { ...prevState, bio: e.target.value };
		});
	};

	const handleFileUpload = (file) => {
		console.log('reader');
		setUploading(true);
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
		setUploading(false);
	};

	const handleUpdateUser = (e) => {
		e.preventDefault();
		let newUser = { ...user, ...userChanges };
		!newUser.bio ? newUser.bio = user.bio : null;
		!newUser.profile_image ? newUser.profile_image = user.profile_image : null;
		updateUser(newUser)
			.then((res) => {
				// console.log(res)
			})
			.catch((err) => console.log(err));
		props.onHide();
	};

	return (
		<Fragment>
			{user ? (
				<Modal {...props} className="profile-edit-modal" aria-labelledby="contained-modal-title-vcenter" size={'sm'} centered>
					<Modal.Header className="toast-1-header text-center" closeButton={false}>
						<Modal.Title className="" id="contained-modal-title-vcenter">
							<div className="text-white profile-edit-text">Profile Edit</div>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Col md={12} className="mt-1 pb-2 text-left h6">
							<div className="pb-1 h5">Upload profile photo:</div>
							<br />
							<small>*Upload times for IPFS can vary, please be patient as your image is uploaded.</small>
						</Col>
						<Col lg={12} md={12} className="text-center mt-2 profile-image-preview">
							<Image className="profile-banner-image" src={userChanges.profile_image ? userChanges.profile_image : user.profile_image} />
							<br />
							{uploading ? (
								<span className="spinner-border spinner-border-sm mr-2 mb-1 mt-3"></span>
							) : (
								<Fragment>
									<Button className="mt-3 upload-button" size="md">
										<i className="fad fa-cloud-upload"></i>
									</Button>
									<input
										type="file"
										accept="image/jpeg,image/png"
										onChange={(e) => {
											handleFileUpload(e.target.files[0]);
										}}
										className="input-overlay mt-2 "
									/>
								</Fragment>
							)}
						</Col>
						<Col md={12} className="pt-4 mt-3 pb-2 h6 text-center">
							<Form onSubmit={(e) => handleSubmit(e)} className="text-center pb-2">
								<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
									<Form.Label className="pb-1">Update your artist bio:</Form.Label>
									<Form.Control required as="textarea" name="bio" minLength="1" maxLength="280" rows={3} onChange={(e) => handleInput(e)} defaultValue={user.bio} />
								</Form.Group>
								<div className="text-center pt-4">
									<Button className="cancel-back mr-1">
										<i className="fas fa-backspace"></i>
									</Button>
									<Button className="ml-1 profile-edit-submit" type="submit" onClick={(e) => handleUpdateUser(e)}>
										{'update'}
									</Button>
								</div>
							</Form>
						</Col>
					</Modal.Body>
				</Modal>
			) : null}
		</Fragment>
	);
};

export default observer(ProfileEditModal);
