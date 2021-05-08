import React, { Fragment, useState, useEffect, useRef } from 'react';
import {
	Image,
	Card,
	Button,
	Row,
	Col,
	Container,
	ListGroup,
	ListGroupItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UseInterval from '../UseInterval';
import CornerRibbon from 'react-corner-ribbon';
//Media
import heart from '../../../assets/images/heart.png';
import Profile from '../../../assets/images/profile.png';
import mint from '../../../assets/images/mint.png';
import portrait from '../../../assets/images/portrait.png';

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

	// let timeLeft = new Date(ending).getTime() - new Date().getTime();
	const [currentEtherPrice, setCurrentEtherPrice] = useState(null);
	// const [auctionTimer, setAuctionTimer] = useState([{
	//     days: Math.floor(timeLeft / (86400000)),
	//     hours: Math.floor((timeLeft % (86400000)) / (3600000)),
	//     minutes: Math.floor((timeLeft % (3600000)) / (60000)),
	//     seconds: Math.floor((timeLeft % (60000)) / 1000),
	//   }]);
	// UseInterval(() => {
	// let timeLeft = new Date(ending).getTime() - new Date().getTime();
	//   setAuctionTimer([
	//     {
	//       days: Math.floor(timeLeft / (86400000)),
	//       hours: Math.floor((timeLeft % (86400000)) / (3600000)),
	//       minutes: Math.floor((timeLeft % (3600000)) / (60000)),
	//       seconds: Math.floor((timeLeft % (60000)) / 1000),
	//     },
	//   ]);
	// }, 1000)

	useEffect(() => {
		fetch(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'
		)
			.then((response) => response.json())
			.then((data) => setCurrentEtherPrice(data[1]['current_price']))
			.catch((err) => console.log('ERROR: ', err));

		return;
	}, []);

	return (
		<Fragment>
			<div className="details-button">
				<Link to={{
                pathname: `/details/${nft_id}`,
                state: { nft_id: Number(nft_id) }}
              }>
					<Button className="btn-regal mt-4">details</Button>
				</Link>
			</div>
			<div className="nft-display">
				<CornerRibbon
					position="top-right" // OPTIONAL, default as "top-right"
					fontColor="#000" // OPTIONAL, default as "#f0f0f0"
					backgroundColor="#fff" // OPTIONAL, default as "#2c7"
					containerStyle={{}} // OPTIONAL, style of the ribbon
					style={{ }} // OPTIONAL, style of ribbon content
					className="font-tertiary " // OPTIONAL, css class of ribbon
				>
					{
						<Fragment>
							<i
								className="fas fa-heart mx-auto heart pr-1"
								style={{ color: '#d20000' }}></i>
							{likes}
						</Fragment>
					}
				</CornerRibbon>
				<div className="overlay-text-explore text-white">
					<div className="">
						<i style={{ fontSize: '0.75em' }}>{'current bid: '}</i>
						<div> Ξ {current_bid}</div>
						<div>{'$ ' + (current_bid * currentEtherPrice).toFixed(2)}</div>
					</div>
					<div className="h5 pt-4">{title}</div>
					<div className="">
						<i style={{ fontSize: '0.75em' }}>creator: </i>
						<a href="#">@{creator}</a>
					</div>
					<div className="">
						<i style={{ fontSize: '0.75em' }}>auctioneer: </i>
						<a href="#">@{creator}</a>
					</div>
					{console.log(Date.parse(date_mint) + auction_duration)}
					{/* <Link to={`/details/${nft_id}`}><Button className="btn-regal mt-4">details</Button></Link> */}
				</div>
				<Image className="explore-card-image" src={thumbnail_image} />
			</div>
		</Fragment>
	);
};

export default NftDisplay;
