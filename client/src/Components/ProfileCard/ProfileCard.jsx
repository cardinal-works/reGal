// ** MODULES
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// ** COMPONENTS
import CornerRibbon from 'react-corner-ribbon';
import Countdown from 'react-countdown';
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
				<Row className="overlay-container pt-3 pb-3">
					<Col md={2} className="profile-banner-image-col text-center">
						<Image className="profile-banner-image" src={profile_image} />
					</Col>
					<Col md={8} className="symbols-container">
							<span className="text-white  text-green" style={{ fontWeight: '900' }}>
								<i style={{ fontSize: '14px', color: '#e2c249' }} className="fas fa-sign-language"></i>
							</span>
							<span className="pl-1">
								<i className="far fa-star star "></i>
							</span>
						<span className="text-white creator-link">
							{' @'}
							{display_name}
						</span>
						<span className="text-white creator-link">
							bio:
							{
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu turpis auctor, rhoncus quam tincidunt, dictum purus. In dictum eu lorem in faucibus. Praesent vitae libero ut risus malesuada tristique. '
							}
						</span>
						<div className='profile-social-div pt-1'>
						<i className="fas fa-link"></i>
						<i className="fab fa-twitter-square"></i>
						<i className="fab fa-instagram-square"></i>
						</div>
					</Col>
					<Col className="mr-1 pt-2">
						<div className="more-div text-white pb-1 ">
							{user.wallet_id === wallet_id ? <i className="fad fa-pencil"></i> : <i className="far fa-ellipsis-h pl-3"></i>}
						</div>
					</Col>
					<Col>
							
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default observer(ProfileCard);
