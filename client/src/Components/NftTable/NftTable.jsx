import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Image, Button, Form, FormFile, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { Link, history } from 'react-router-dom';

import NftDisplay from '../../Components/NftDisplay';
import EmptyDisplay from '../../Components/EmptyDisplay';

//STORE
import NftStore from '../../Stores/NftStore';
import UserStore from '../../Stores/UserStore';

const NftTable = ({ type, data }) => {

	const nftStore = useContext(NftStore);
	const userStore = useContext(UserStore);

	const { loadNfts, isNftLiked, isNftBookmarked, updateNftLikes } = nftStore;
	const { user, updateUserBookmarks, updateUserInStore } = userStore;

	const [nfts, setNfts] = useState([])

	useEffect(() => {
		loadNfts({
			"_id": { "$in": data}
		}).then( response => {
			setNfts(response)
		})
	}, []);

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
			<Container className="">
				<Row className="pt-4 pl-2 profile-nfts-grid">
					{
					nfts.length 
					?
						nfts.map((nft, i) => (
							<Col key={i} xl={3} lg={4} md={4} sm={10} xs={10} key={i}>
								<NftDisplay
									_id={nft._id}
									title={nft.title}
									user_id={nft.user_id}
									creator_id={nft.creator_id}
									creator_name={nft.creator_name}
									nft_description={nft.nft_description}
									nft_id={nft.nft_id}
									date_mint={nft.date_mint}
									likes={nft.likes}
									stars={nft.stars}
									previous_sold={nft.previous_sold}
									thumbnail_image={nft.thumbnail_image}
									auction_mode={nft.auction_mode}
									isLiked={user ? isNftLiked(user, nft._id) : false}
									isBookmarked={user ? isNftBookmarked(user, nft._id) : false}
									handleLikeNft={handleLikeNft}
									handleBookmarkNft={handleBookmarkNft}
									key={`profil-col-${i}`}
								/>
							</Col>
						))
					:
						<Col md={12} className="text-white h5">
							{/* <EmptyDisplay nft={false}></EmptyDisplay> */}
							<span className=" h6">{`You have not ${type} any NFT's`}</span>
						</Col>
					}
					
				</Row>
			</Container>
	);
};

export default NftTable;
