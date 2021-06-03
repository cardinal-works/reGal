// ** MODULES
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// ** COMPONENTS
import CornerRibbon from 'react-corner-ribbon';
import Countdown from 'react-countdown';
import StatsDisplay from '../StatsDisplay';
import { Row, Col, Image, Button, Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
// ** STORE
import UserStore from '../../Stores/UserStore';
import { observer } from 'mobx-react-lite';

const ProfileCard = ({ _id, display_name, wallet_id, profile_image, profile_featured_id, bio, profile_bg_color }) => {
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
						{/* <span className="pl-1">
							<i style={{ fontSize: '14px', color: '#e2c249' }}  className="far fa-star star "></i>
						</span> */}
						<br />
						<span className="text-white creator-link font-secondary bio-name ">
							{' @'}
							{display_name}
							<br />
						</span>
						<span className="text-white creator-link pt-1 bio-text">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu turpis auctor, rhoncus quam tincidunt,
							dictum purus. In dictum eu lorem in faucibus. Praesent vitae libero ut risus malesuada tristique.
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
									<i className="fad fa-pencil edit pr-1"></i>
									<i className="fas fa-cog settings"></i>
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
			</Container>
		</Fragment>
	);
};

export default observer(ProfileCard);
