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

	const handleLikeNft = () => {
	};

	return (
		<Fragment>
			<Container className="stats-display-container pb-3">
				
			</Container>
		</Fragment>
	);
};

export default observer(StatsDisplay);
