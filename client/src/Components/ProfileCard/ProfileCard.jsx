// ** MODULES
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// ** COMPONENTS
import CornerRibbon from 'react-corner-ribbon';
import Countdown from 'react-countdown';
import {
	Row,
	Col,
	Image,
	Button,
	Container,
	Card,
	ListGroup,
	ListGroupItem,
} from 'react-bootstrap';
// ** STORE
import UserStore from '../../Stores/UserStore';
import { observer } from 'mobx-react-lite';

const ProfileCard = ({
	_id,
	display_name,
	wallet_id,
	profile_image,
	profile_featured_id,
	bio,
	profile_bg_color,
}) => {
	const userStore = useContext(UserStore);
	const { loadUser, user, loadingInitial, submitting } = userStore;

	useEffect(() => {
		console.log();
		loadUser(window.ethereum.selectedAddress);
		// .then(console.log("hello", Object.fromEntries(nftRegistry)))
	}, []);
	// const nftStore = useContext(NftStore);
	// const { updateNft, loadNft } = nftStore;
	// const [currentEtherPrice, setCurrentEtherPrice] = useState(null);

	// const handleLikeNft = () => {
	// 	loadNft(_id).then((user) => updateNft({ ...nft, likes: nft.likes + 1 }));
	// };

	return (
		<Fragment>
			<Container className="profile-card-container pb-3">
				<Card
					// as={Link}
					// to={{
					// 	pathname: `/details/${nft_id}`,
					// 	state: { nft_id: Number(nft_id) },
					// }}
					className="profile-item-card">
					<Card.Img
						className="profile-card-image"
						variant="top"
						src={profile_image}
					/>
				</Card>
				<Container className="">
					<Row className="overlay-container">
						<Col md={12} className="symbols-container pt-1 pb-1">
							<div className="likes-div">
								<span
									className="text-white  text-green"
									style={{ fontWeight: '900' }}>
									<i
										style={{ fontSize: '14px', color: '#e2c249' }}
										className="fas fa-sign-language"></i>
								</span>
								<span className="pl-1">
									<i className="far fa-star star "></i>
								</span>
							</div>
						</Col>
						<Col md={12} className="pt-1">
							<span className="text-white creator-link">
								{' @'}
								{display_name}
							</span>
						</Col>
						<Col className="pt-1 pb-1 text-white">{user.bio}</Col>
						<Col md={12} className="pt-1 pb-1">
							<div className="more-div text-white pb-1 text-end">
								{user.wallet_id === wallet_id ? (
									<i className="fad fa-pencil"></i>
								) : (
									<i className="far fa-ellipsis-h pl-3"></i>
								)}
							</div>
						</Col>
					</Row>
				</Container>
			</Container>
		</Fragment>
	);
};

export default observer(ProfileCard);
