//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Row, Col, Nav, Image, Button, Form, Toast } from 'react-bootstrap';
import { Link, history } from 'react-router-dom';
//Contracts
import ProfileCard from '../../Components/ProfileCard';
import NftTable from '../../Components/NftTable';
import ProfileEditModal from '../../Components/ProfileEditModal';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import ipfs from '../../ipfs';
var Buffer = require('buffer/').Buffer;
//Media

const Profile = (props) => {
	const userStore = useContext(UserStore);
	const [modalShow, setModalShow] = useState(false);
	const [profileTable, setProfileTable] = useState('collection');

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


	return (
		<Fragment>
			<Container className="profile-container">
				<Row className="profile-details-row">
					<ProfileEditModal show={modalShow} onHide={() => setModalShow(false)} />
					{!modalShow && user && (
						<Col md={12} className="text-right">
							<div className="more-div text-white pb-1 ">
								{user.wallet_id === window.ethereum.selectedAddress ? (
									<Fragment>
										<i as={Button} onClick={() => setModalShow(true)}  style={{color: 'gold'}} className="fad fa-pencil edit pr-2"></i>
										<i className="fas fa-cog settings" style={{color: 'grey'}} ></i>
									</Fragment> 
								) : (
									<i className="far fa-ellipsis-h pl-3"></i>
								)}
							</div>
						</Col>
					)}
					{!modalShow && user && (
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
							<Col className="mb-1" lg={12} md={12}>
								<Nav fill variant="tabs" defaultActiveKey="link-1" className="profile-nft-nav mt-5">
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
								{user.collections.length > 0 && <Col md={12} style={{ fontSize: '13px', color: '#f6a615' }} className="text-right pt-1">
							View All
							<i style={{ fontSize: '13px', color: '#f6a615' }} className="fas fa-angle-double-right pl-2 my-auto pr-2"></i>
						</Col>}
							</Col>
						</Fragment>
					)}
				</Row>
			</Container>
		</Fragment>
	);
};

export default observer(Profile);
