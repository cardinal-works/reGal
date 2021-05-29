// ** MODULES
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// ** COMPONENTS
import CornerRibbon from 'react-corner-ribbon';
import { Row, Col, Image, Button, Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
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
			<Card
				as={Link}
				to={{
					pathname: `/details/${nft_id}`,
					state: { nft_id: Number(nft_id) },
				}}
				className="nft-item-card">
				<Card.Img className="explore-card-image" variant="top" src={thumbnail_image} />
				<div className="countdown-div">
					<span className="countdown">4d 12h 18m 34s</span>
				</div>
				<div className="current-bid-div">
					<span className="current-bid">{current_bid} ETH</span>
				</div>
				<div className="creator-div">
					<span className="creator-text">@{creator}</span>
				</div>
				<div className="more-div">
					<span className="more-text">...</span>
				</div>
				<div className="likes-div">
					<span className="likes-text text-start">
						<i className="fas fa-heart mx-auto heart pr-1" style={{ color: '#d20000' }}></i>{likes} 
					</span>
				</div>
			</Card>
		</Fragment>
	);
};

export default observer(NftDisplay);
