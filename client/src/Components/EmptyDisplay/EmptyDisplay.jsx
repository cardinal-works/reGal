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

const EmptyDisplay = ({featured}) => {
	const nftStore = useContext(NftStore);
	const { updateNft, loadNft } = nftStore;
	const [currentEtherPrice, setCurrentEtherPrice] = useState(null);

	const handleLikeNft = () => {
		loadNft(nft_id).then((nft) => updateNft({ ...nft, likes: nft.likes + 1 }));
	};

	return (
		<Fragment>
			<Container className="empty-display-container pb-3">
				<Card
					as={Link}
					to={"/minter"}
					className="empty-item-card">
					{featured ? (<>
						<div style={{ position: 'relative', height: '200px' }}>
							<CornerRibbon
								position="top-left" // OPTIONAL, default as "top-right"
								fontColor="#000000" // OPTIONAL, default as "#f0f0f0"
								backgroundColor="#de961b" // OPTIONAL, default as "#2c7"
								containerStyle={{}} // OPTIONAL, style of the ribbon
								style={{ fontSize: '12px' }} // OPTIONAL, style of ribbon content
								className="text-white" // OPTIONAL, css class of ribbon
							>
								featured
							</CornerRibbon>
							
						</div>
						<i className="text-white text-center fas fa-plus"></i>
						</>
					) : (
						<i className="text-white text-center my-auto mx-auto  fas fa-plus"></i>
					)}
				</Card>
				<Container className="pl-1 pr-1">
					<Row className="empty-overlay-container pb-1">
						<Col md={12} className="symbols-container pt-1 pb-1 text-end">
							<div className="likes-div">
								<span className="text-white pr-2 text-green" style={{ fontWeight: '900' }}>
									{1.20}Ξ
								</span>
								<span className="likes-text text-white pl-1">
									<i className="fas fa-heart mx-auto heart pr-1" style={{ color: '#d20000', fontWeight: '900' }}></i>
									{0}
								</span>
								<span className="pl-1">
									<i className="far fa-star star "></i>
								</span>
							</div>
						</Col>
						<Col md={12} className=" text-start pt-1">
							{' '}
							<span className="text-white empty-creator-link">
								<i className="far fa-at user-profile pr-1"></i>
								{/* {' @'} */}
								{" "}
							</span>
						</Col>
						<Col md={12} className="pt-1 pb-1 empty-title-text text-white text-start">
							{/* {title} */}
						</Col>
				
							<Col className="text-start pl-4 pt-1 pb-3" md={8}>
								{" "}
							</Col>
			
						
							<Col className="pt-1 pb-1">
								<div className="more-div text-white text-end">
									{/* {!preview ? <Countdown date={Date.now() + 100000000} /> : null} */}
									<i className="far fa-ellipsis-h pl-3"></i>
								</div>
							</Col>
					</Row>
				</Container>
			</Container>
		</Fragment>
	);
};

export default observer(EmptyDisplay);
