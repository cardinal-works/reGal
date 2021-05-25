import React, { Fragment, useState, useEffect, useRef, useContext } from 'react';
import { Image, Card, Button, Row, Col, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UseInterval from '../UseInterval';
import CornerRibbon from 'react-corner-ribbon';
//Store
import NftStore from '../../Stores/NftStore';
//Media
import heart from '../../../assets/images/heart.png';
import Profile from '../../../assets/images/profile.png';
import mint from '../../../assets/images/mint.png';
import portrait from '../../../assets/images/portrait.png';
import { observer } from 'mobx-react-lite';

const NftDisplay = ({
	_id,
	likes,
	thumbnail_image,
	auction_startDate,
	auction_duration,
	nft_id,
	current_bid,
	title,
	creator,
	date_mint,
	tags,
}) => {
	const nftStore = useContext(NftStore);
	const { updateNft, loadNft } = nftStore;
	const [currentEtherPrice, setCurrentEtherPrice] = useState(null);

	useEffect(() => {
		fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc')
			.then((response) => response.json())
			.then((data) => setCurrentEtherPrice(data[1]['current_price']))
			.catch((err) => console.log('ERROR: ', err));
	}, []);

	const handleLikeNft = () => {
		loadNft(nft_id).then((nft) => updateNft({ ...nft, likes: nft.likes + 1 }));
	};

	return (
		<Fragment>
			<div className="details-button">
				<Link
					to={{
						pathname: `/details/${nft_id}`,
						state: { nft_id: Number(nft_id) },
					}}
					className="btn btn-regal mt-4">
					Details
				</Link>
				<Button variant="danger" className="like-button mt-4 ml-2" onClick={handleLikeNft}>
					<i className="text-start fas fa-heart "></i>
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
		</Fragment>
	);
};

export default observer(NftDisplay);
