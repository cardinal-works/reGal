//Components
import React, { useEffect, useState, useContext, Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Figure, Toast, Table, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { ethers, utils } from 'ethers';
import { RegalAuction } from '../../../abi/RegalAuction_abi';
import NftDetailDisplay from '../../Components/NftDetailDisplay';
import NftStore from '../../Stores/NftStore';
import UserStore from '../../Stores/UserStore';
import PriceStore from '../../Stores/PriceStore';
import timeConverter from '../../Helpers/unix';

const DetailedView = () => {
	const contract = useRef();
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const priceStore = useContext(PriceStore);

	const [params, setParams] = useState(useParams());
	const [bidding, setBidding] = useState(false);
	const [currentEtherPrice, setCurrentEtherPrice] = useState();

	const { updateNft, loadNft, nft, isNftBookmarked, isNftLiked, updateNftLikes } = nftStore;
	const { updateUser, loadUser, user, updateUserRecentViews, updateUserInStore, updateUserBookmarks } = userStore;
	const { getPrices, prices } = priceStore;
	const [price, setPrice] = useState(0);

	useEffect(async () => {
		loadNft(params['id']);
		getPrices();
		loadUser(window.ethereum.selectedAddress);
		const setup = async () => {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contractAddress = '0x3604100cEBe47C4F1E34e878c5f1c8b4ED4e0a80';
			contract.current = new ethers.Contract(contractAddress, RegalAuction, signer);
		};
		setup();
	}, []);

	useEffect(() => {
		if(nft && user && !isRecentlyViewed())
		{
			updateUserRecentViews({
				userId: user._id,
				nftId: nft._id
			}).then( response => {
				if(response)
				{
					updateUserInStore(response);
				}
			})
		}
	}, [nft])

	const isRecentlyViewed = () => {
		return user.recently_viewed_nfts.find( nft => nft._id == nft);
	}

	const handleLikeNft = (id) => {
		let action = isNftLiked(user, id) ? "disLike" : "Like";
		updateNftLikes({
			action,
			nftId: nft._id,
			userId: user._id
		}).then( response => {
			if(response)
			{
				updateUserInStore(response.user);
			}
		})
	};

	const handleBookmarkNft = (id) => {
		let action = isNftBookmarked(user, id) ? "remove" : "add";
		updateUserBookmarks({
			action,
			nftId: nft_id,
			userId: user._id
		}).then( response => {
			if(response)
			{
				updateUserInStore(response);
			}
		})
	};

	const handleBid = async (e) => {
		let updatedNft = toJS(nft);
		let updatedUser = toJS(user);
		let current = updatedNft.auctions.length;

		let tx = {
			// to: "0x3604100cEBe47C4F1E34e878c5f1c8b4ED4e0a80",
			from: window.ethereum.selectedAddress,
			value: ethers.utils.parseEther(e.target.form[0].value),
		};
		let bid = {
			wallet_id: user.wallet_id,
			value: Number(e.target.form[0].value),
			name: user.display_name,
			time: Date.now(),
			end: nft.auctions[current - 1].end_date
		};

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		let txn = contract.current.placeBid(nft.nft_id, tx).then((res) => {
			res.wait()	

		updatedNft.auctions[current - 1].bids.push(bid);
		updateNft(updatedNft);

		updatedUser.bidding.push(bid);
		updateUser(updatedUser)
		})
		

	};

	const handleArmed = () => {};

	return (
		<Fragment>
			<Container className="detail-container">
				<Row className="detail-nft-row  mb-2 p-5 ">
					{nft && user && (
						<Col md={5} className="mt-1 mb-1">
							<NftDetailDisplay
								_id={nft._id}
								title={nft.title}
								user_id={nft.user_id}
								creator_id={nft.creator_id}
								creator_name={user.display_name}
								nft_description={nft.nft_description}
								nft_id={nft.nft_id}
								date_mint={nft.date_mint}
								likes={nft.likes}
								stars={nft.stars}
								previous_sold={nft.previous_sold}
								thumbnail_image={nft.thumbnail_image}
								auction_mode={nft.auction_mode}
								isNftBookmarked={user ? isNftBookmarked(user, nft._id) : false}
								isNftLiked={user ? isNftLiked(user, nft._id) : false}
								handleLikeNft={handleLikeNft}
								handleBookmarkNft={handleBookmarkNft}
							/>
						</Col>
					)}
					{user && nft && (
						<Col md={6} xs={12} className="mb-4 mt-3 mx-auto text-center">
							<Image className="mb-2" width="250px" src={user.profile_image} />
							<Col className="h4 text-white mt-2 pb-2">@{user.display_name}</Col>
							<Col className="h6 text-white mt-2 pb-2">current bid: {nft.current_bid}</Col>
							<Col className="h6 text-white mt-2 pb-2">asking price: {nft.current_bid}</Col>
							<Col>
								{!bidding ? (
									<Button className="mt-3 " onClick={() => setBidding(true)}>
										Place Bid
									</Button>
								) : (
									<Form className="text-white">
										<Form.Group controlId="bid-amt">
											<Form.Label className="p-0">Bid Amount</Form.Label>
											<Form.Control type="number" />
										</Form.Group>
										<Button onClick={(e) => handleBid(e)}>Confirm</Button>
										<Button className="ml-1" onClick={() => setBidding(false)}>
											Cancel
										</Button>
									</Form>
								)}
							</Col>
						</Col>
					)}
				</Row>
				<Row>
					<Col className=" text-white" md={12} >
						<h5>
							<i className="fas fa-history pb-1 h6 mr-1"></i>history
						</h5>
						<Table hover variant="dark" className="mt-1 mb-1 p-2">
							<thead>
								<tr>
									<th>#</th>
									<th>time</th>
									<th>name</th>
									<th>address</th>
									<th>bid</th>
								</tr>
							</thead>
							<tbody>
								{nft &&
									nft.auction_mode === true &&
									nft.auctions[nft.auctions.length - 1].bids.map((bidder, i) => {
										return (
											<tr key={i}>
												<td>{i + 1}</td>
												<td>{Math.ceil((Date.now() - bidder.time) / 3600000) + 'h ago'}</td>
												<td>{bidder.name}</td>
												<td>{bidder.wallet_id}</td>
												<td>{bidder.value} Ξ</td>
											</tr>
										);
									})}
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default observer(DetailedView);
