// //Modules
// import React, { Fragment, useState, useContext, useEffect } from 'react';
// import { Container, Row, Col, Button, Modal, Toast, Image, Form } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { observer } from 'mobx-react-lite';
// import ipfs from '../../ipfs';
// var Buffer = require('buffer/').Buffer;

// import UserStore from '../../Stores/UserStore';

// const ProfileEdit = ({ bio, profile_image }) => {
// 	const userStore = useContext(UserStore);
// 	const { loadUser, updateUser, loadingInitial, submitting } = userStore;
// 	const [uploading, setUploading] = useState(false);
// 	const [userChanges, setUserChanges] = useState({ bio, profile_image });

// 	const handleFileUpload = (file) => {
// 		console.log('reader');
// 		setUploading(true);
// 		const reader = new FileReader();
// 		reader.readAsArrayBuffer(file);
// 		reader.onloadend = () => uploadToIPFS(reader);
// 	};

// 	const uploadToIPFS = async (reader) => {
// 		console.log('ipfs');
// 		const buffer = await Buffer.from(reader.result);
// 		const result = await ipfs.add(buffer);
// 		const ipfsLink = 'https://gateway.ipfs.io/ipfs/' + result.path;
// 		setUserChanges((prevState) => {
// 			return { ...prevState, profile_image: ipfsLink };
// 		});
// 		setUploading(false);
// 	};

// 	const handleInput = (e) => {
// 		e.preventDefault();
// 		let userChange = userChanges;
// 		setUserChanges((prevState) => {
// 			return { ...prevState, bio: e.target.value };
// 		});
// 	};

// 	// const handleUpdateUser = (e) => {
// 	// 	e.preventDefault();
// 	// 	if (userChanges.profile_image.length === 0) {
// 	// 		setUserChanges({ ...userChanges, profile_image: user.profile_image });
// 	// 	}
// 	// 	let newUser = { ...user, ...userChanges };

// 	// 	updateUser(newUser)
// 	// 		.then((res) => {
// 	// 			setEditMode(false);
// 	// 		})
// 	// 		.catch((err) => console.log(err));
// 	// };

// 	return (
	
// 	);
// };

// export default observer(ProfileEdit);
