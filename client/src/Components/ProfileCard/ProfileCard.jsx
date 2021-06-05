// ** MODULES
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfileEditModal from '../ProfileEditModal';
// ** COMPONENTS
import StatsDisplay from '../StatsDisplay';
import { Row, Col, Image, Button, Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
// ** STORE
import UserStore from '../../Stores/UserStore';
import { observer } from 'mobx-react-lite';

const ProfileCard = ({ _id, display_name, wallet_id, profile_image, profile_featured_id, bio, profile_bg_color }) => {
	const [modalShow, setModalShow] = useState(true);
	const [editMode, setEditMode] = useState(false);
	const userStore = useContext(UserStore);
	const { loadUser, user, loadingInitial, submitting } = userStore;

	useEffect(() => {
		console.log();
		loadUser(window.ethereum.selectedAddress);
	}, []);

	return (
		<Fragment>
			<Container className="profile-page-banner-container mb-2">
				<Row className="overlay-container pt-1 pb-3">
					<Col lg={3} md={4} className="profile-banner-image-col text-center pb-4">
						<Image className="profile-banner-image" src={profile_image} />
					</Col>
					<Col className="symbols-container">
						<span className="text-white" style={{ fontWeight: '900' }}>
							<nobr className="text-majesti">
								<i style={{ fontSize: '12px', color: '#1b68de' }} className="fad fa-badge-check pr-1"></i>verified
							</nobr>
						</span>
						<br />
						<span className="text-white creator-link font-secondary bio-name ">
							{' @'}
							{display_name}
							<br />
						</span>
						<span className="text-white creator-link pt-1 bio-text">
							{user.bio}
							<br />
						</span>
						<div className="profile-social-div pt-1">
							<i className="fab fa-twitter-square twitter"></i>
							<i className="fab fa-instagram-square instagram"></i>
							<i className="fas fa-share-alt-square website"></i>
						</div>
					</Col>
					<Col className="mr-1 pt-2">
						<div className="more-div text-white pb-1 ">
							{user.wallet_id === wallet_id ? (
								<Fragment>
									<i as={Button} onClick={() => setModalShow(true)} className="fad fa-pencil edit pr-2"></i>
									<i  className="fas fa-cog settings"></i>
								</Fragment>
							) : (
								<i className="far fa-ellipsis-h pl-3"></i>
							)}
						</div>
					</Col>
					<Col md={12} className="">
						<StatsDisplay />
					</Col>
				</Row>
				<ProfileEditModal show={modalShow} onHide={() => setModalShow(false)}></ProfileEditModal>
			</Container>
		</Fragment>
	);
};

export default observer(ProfileCard);
