// ** MODULES
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// ** COMPONENTS
import NftDisplay from '../../Components/NftDisplay/NftDisplay';
import { Col, Container, Row, Dropdown, CardDeck, Image, Pagination } from 'react-bootstrap';
// ** STATE
import { observer } from 'mobx-react-lite';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';

const Explore = () => {
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);

	const { user, updateUserInStore, updateUserBookmarks } = userStore;
	const { loadNfts, loadNftByParams, getAllNfts, updateNftLikes, isNftBookmarked, isNftLiked } = nftStore;

	useEffect(async () => {
		loadNfts();
	}, []);

	const sortNfts = (payload) => {
		loadNftByParams(payload);
	}

	const handleLikeNft = (id) => {
		let action = isNftLiked(user, id) ? "disLike" : "Like";
		updateNftLikes({
			action,
			nftId: id,
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
			nftId: id,
			userId: user._id
		}).then( response => {
			if(response)
			{
				updateUserInStore(response);
			}
		})
	};

	return (
		<div className="gradiant-background">
			<Container className="nft-container pt-0">
				<Row className="featured-nft-nav mb-3 m-1">
					<Col className="featured-text-col text-white p-0 text-start">
						<span className="featured-text">featured</span>{' '}
					</Col>
					<Col className="sort-button-col mb-2 text-end p-0">
						<Dropdown>
							<Dropdown.Toggle variant="danger" size="lg" className="sort-button" id="dropdown-basic">
								sort
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item onClick={() => sortNfts({field: "likes", sort: -1, limit: 20})} >Most Liked</Dropdown.Item>
								<Dropdown.Item onClick={() => sortNfts({field: "date_mint", sort: -1, limit: 20})} >Most Recent</Dropdown.Item>
								<Dropdown.Item onClick={() => sortNfts({field: "current_price", sort: -1, limit: 20})} >Highest Current Bid</Dropdown.Item>
								<Dropdown.Item onClick={() => sortNfts({field: "likes", sort: 1, limit: 20})} >Lowest Current Bid</Dropdown.Item>
								<Dropdown.Item onClick={() => sortNfts({field: "likes", sort: 1, limit: 20})} >Recently Sold</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Col>
				</Row>
				<Row className="nft-explore-rows">
					{getAllNfts.length &&
						getAllNfts.map((nft, index) => {
							return (
								<Col lg={3} md={4} sm={6} xs={12} key={index} className="explore-live-feed">
									<NftDisplay
										_id={nft._id}
										likes={nft.likes}
										thumbnail_image={nft.thumbnail_image}
										nft_id={nft.nft_id}
										current_bid={nft.current_bid}
										title={nft.title}
										auction_startDate={nft.auction_startDate}
										auction_duration={nft.auction_duration}
										creator={nft.creator_name}
										date_mint={nft.date_mint}
										tags={nft.tags}
										isLiked={user ? isNftLiked(user, nft._id) : false}
										isBookmarked={ user ? isNftBookmarked(user, nft._id) : false}
										handleLikeNft={handleLikeNft}
										handleBookmarkNft={handleBookmarkNft}
									/>
								</Col>
							);
						})}
				</Row>
			</Container>
		</div>
	);
};

export default observer(Explore);
