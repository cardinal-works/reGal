// ** MODULES
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// ** COMPONENTS
import CornerRibbon from 'react-corner-ribbon';
import Countdown from 'react-countdown';
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
			<Container className="nft-display-container pb-3">
				<Card
					as={Link}
					to={{
						pathname: `/details/${nft_id}`,
						state: { nft_id: Number(nft_id) },
					}}
					className="nft-item-card">
					<Card.Img className="explore-card-image" variant="top" src={thumbnail_image} />
				</Card>
				<Container className="pl-1 pr-1">
					<Row className="overlay-container">
						<Col md={12} className="pt-1 pb-1">
							<div className="likes-div">
								<span className="text-white pr-2 text-green" style={{fontWeight: '900'}}>{current_bid}Ξ</span>
								<span className="likes-text text-white pl-1">
									<i className="fas fa-heart mx-auto heart pr-1" style={{ color: '#d20000',fontWeight: '900'}}></i>
									{likes}
								</span>
								<span className="pl-1">
									<i className="far fa-star star "></i>
								</span>
								<span className="pl-1 text-white">
								<i className="fad fa-user-circle profile "></i>{" "}{creator}
								</span>
							</div>
						</Col>
						<Col className="pt-1 pb-1 text-white">
							{title}
						</Col>
						<Col className="pt-1 pb-1">
							<div className="more-div text-white text-end">
							<Countdown date={Date.now() + 100000000} />
								<i className="far fa-ellipsis-h pl-3"></i>
							</div>
						</Col>
					</Row>
				</Container>
			</Container>
		</Fragment>
	);
};

export default observer(NftDisplay);
