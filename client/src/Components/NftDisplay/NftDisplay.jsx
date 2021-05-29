// ** MODULES
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// ** COMPONENTS
import CornerRibbon from 'react-corner-ribbon';
import { Image, Button, Container, } from 'react-bootstrap';
// ** STORE
import NftStore from '../../Stores/NftStore';
import { observer } from 'mobx-react-lite';

const NftDisplay = ({ _id, likes, thumbnail_image, auction_startDate, auction_duration, nft_id, current_bid, title, creator, date_mint, tags }) => {
	const nftStore = useContext(NftStore);
	const { updateNft, loadNft } = nftStore;
	const [currentEtherPrice, setCurrentEtherPrice] = useState(null);

	const handleLikeNft = () => {
		loadNft(nft_id).then((nft) => updateNft({ ...nft, likes: nft.likes + 1 }));
	};

	return (
		<Fragment>
			<Container className="nft-display-container p-0" fluid>
				<div className="details-likes-div">
					<Button variant="danger" className="like-button" onClick={handleLikeNft}>
						<i className="text-start fas fa-heart "></i>
					</Button>
					<Button
						as={Link}
						to={{
							pathname: `/details/${nft_id}`,
							state: { nft_id: Number(nft_id) },
						}}
						className="details-button ml-1">
						Details
					</Button>
				</div>
				<div className="nft-display">
					<CornerRibbon
						position="top-right" // OPTIONAL, default as "top-right"
						fontColor="#000" // OPTIONAL, default as "#f0f0f0"
						backgroundColor="#fff" // OPTIONAL, default as "#2c7"
						containerStyle={{}} // OPTIONAL, style of the ribbon
						style={{}} // OPTIONAL, style of ribbon content
						className="font-tertiary " // OPTIONAL, css class of ribbon
					>
						{
							<Fragment>
								<i className="fas fa-heart mx-auto heart pr-1" style={{ color: '#d20000' }}></i>
								{likes}
							</Fragment>
						}
					</CornerRibbon>
					<div className="image-overlay">
						<div className="d-block mb-1">
							<span className="overlay-text">{title}</span>
						</div>
						<div className="d-block mb-1">
							<span className="overlay-text">Current Bid: </span>
							<span className="overlay-values text-primary">1.02ETH</span>
						</div>
						<div className="d-block mb-1">
							<span className="overlay-text">creator: </span>
							<span className="overlay-values text-primary">@{creator}</span>
						</div>
						<div className="d-block mb-1">
							<span className="overlay-text">auctioneer: </span>
							<span className="overlay-values text-primary">@{creator}</span>
						</div>
					</div>
					<Image className="explore-card-image" src={thumbnail_image} fluid />
				</div>
			</Container>
		</Fragment>
	);
};

export default observer(NftDisplay);
