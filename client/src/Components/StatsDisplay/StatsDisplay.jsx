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

const StatsDisplay = () => {
	const nftStore = useContext(NftStore);
	const { updateNft, loadNft } = nftStore;
	const [currentEtherPrice, setCurrentEtherPrice] = useState(null);

	const handleLikeNft = () => {};

	return (
		<Fragment>
				<Container className="stats-display-container pt-2 pl-0">
				<ListGroup className="stats-list" horizontal>
					<ListGroup.Item>total
						<span className=" pl-1 text-green">
						<nobr>1.0 <span className="icon-size eth">Ξ</span></nobr> 
						</span>
					</ListGroup.Item>
					<ListGroup.Item >
						saves
						<span className=" pl-1 stars">
							<nobr className="mt-n1">113 <i className="fas fa-bookmark icon-size star" ></i></nobr> 
						</span>
					</ListGroup.Item>
					<ListGroup.Item>
						likes
						<span className="pl-1 likes">
							<nobr>21 <i className="fas fa-heart icon-size heart"></i></nobr> 
						</span>
					</ListGroup.Item>
					<ListGroup.Item>
						views
						<span className="pl-1 views">
							<nobr>2943 <i className="fas fa-eye icon-size eye"></i></nobr> 
						</span>
					</ListGroup.Item>
				</ListGroup>
				
				</Container>
		</Fragment>
	);
};

export default observer(StatsDisplay);
