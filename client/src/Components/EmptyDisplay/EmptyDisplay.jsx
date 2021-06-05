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
// ** ASSETS
import empty from '../../../assets/images/emptynew.png';

const EmptyDisplay = ({ featured, nft }) => {
	const nftStore = useContext(NftStore);
	const { updateNft, loadNft } = nftStore;
	const [currentEtherPrice, setCurrentEtherPrice] = useState(null);

	// const handleLikeNft = () => {
	// 	loadNft(nft_id).then((nft) => updateNft({ ...nft, likes: nft.likes + 1 }));
	// };

	return (
		<Fragment>
			<Container className="empty-display-container pb-3">
				<Card className="empty-item-card">
					{featured && (
						<>
							<div style={{ position: 'relative', height: '200px' }}>
								<CornerRibbon
									position="top-left" // OPTIONAL, default as "top-right"
									fontColor="#000000" // OPTIONAL, default as "#f0f0f0"
									backgroundColor="" // OPTIONAL, default as "#2c7"
									containerStyle={{}} // OPTIONAL, style of the ribbon
									style={{ fontSize: '12px' }} // OPTIONAL, style of ribbon content
									className="text-white" // OPTIONAL, css class of ribbon
								>
									{/* featured */}
								</CornerRibbon>
								<Card.Img className="empty-card-image" />
							</div>
						</>
					)}
					{nft && <Card.Img src={empty}></Card.Img>}
				</Card>
				<Container className="">
					<Row className="empty-overlay-container pb-1">
						<Col md={12} className="symbols-container pt-1 pb-0 text-end">
							<div className="likes-div">
							{featured && (
									<div className="text-left">
										{/* <span className="text-white">Feature a collectible</span> */}
										<br />
									</div>
								)}
								<span className="text-white pr-2 text-green" style={{ fontWeight: '900' }}>
									{0}Ξ
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
						<Col md={12} className="ml-3 empty-title-text text-white text-start">
							<small>
								{featured && (
									<Fragment>
										<div className="text-left">
										<Button className="featured-button mb-1" style={{fontSize: "1.1em"}}>
										Feature <i className="fas fa-stars"></i>
										</Button>
										</div>
									</Fragment>
								)}
							</small>
						</Col>
						<Col className="text-start pl-4 pt-1 pb-3" md={8}></Col>
					</Row>
				</Container>
			</Container>
		</Fragment>
	);
};

export default observer(EmptyDisplay);
