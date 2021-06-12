import React from 'react';
import { Container, Row, Col, Nav, Image, Button, Form, FormFile, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { Link, history } from 'react-router-dom';

import NftDisplay from '../../Components/NftDisplay';
import EmptyDisplay from '../../Components/EmptyDisplay';

const NftTable = ({ user, profileTable }) => {
	return (

			<Container className="">
				{/* COLLECTION TABLE */}
				{profileTable == 'collection' ? (
					<Row className="pt-4 pl-2 profile-nfts-grid">
						{user.collections ? (
							user.collections.slice(0, 3).map((nft, i) => {
								return (
									<>
										<Col key={i} xl={3} lg={3} md={12} sm={10} xs={10}>
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
												key={`profil-col-${i}`}
											/>
										</Col>
									</>
								);
							})
						) : (
							<Col md={12} className="text-white h5">
								{/* <EmptyDisplay nft={false}></EmptyDisplay> */}
								<i className="h6 far fa-at user-profile pt-2"></i>
								{user.display_name} <span className=" h6"> hasn't minted any collectibles</span>
							</Col>
						)}
						<Col md={12} style={{ fontSize: '13px', color: '#f6a615' }} className="text-right pt-3">
							View All
							<i style={{ fontSize: '13px', color: '#f6a615' }} className="fas fa-angle-double-right pl-2 my-auto pr-2"></i>
						</Col>
					</Row>
				) : null}
				{/* LIKED TABLE */}
				{profileTable == 'liked_nfts' ? (
					<Row className="pt-4 pl-2 profile-nfts-grid">
						{user.liked_nfts.length ? (
							user.liked_nfts.slice(0, 3).map((nft, i) => {
								return (
									<>
										<Col key={i} xl={4} lg={5} md={12} sm={10} xs={10}>
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
												key={`profil-col-${i}`}
											/>
										</Col>
										<Col md={12} style={{ fontSize: '13px', color: '#f6a615' }} className="text-right pt-3">
											View All
											<i style={{ fontSize: '13px', color: '#f6a615' }} className="fas fa-angle-double-right pl-2 my-auto pr-2"></i>
										</Col>
									</>
								);
							})
						) : (
							<Col md={12} className="text-white h5">
								{/* <EmptyDisplay nft={false}></EmptyDisplay> */}
								<i className="h6 far fa-at user-profile pt-2"></i>
								{user.display_name} <span className=" h6"> hasn't liked any collectibles</span>
							</Col>
						)}
					</Row>
				) : null}
				{/* LIKED TABLE */}
				{profileTable == 'recently_viewed_nfts' ? (
					<Row className="pt-4 pl-2 profile-nfts-grid">
						{user.recently_viewed_nfts.length ? (
							user.recently_viewed_nfts.slice(0, 3).map((nft, i) => {
								return (
									<>
										<Col key={i} xl={4} lg={5} md={12} sm={10} xs={10}>
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
												key={`profil-col-${i}`}
											/>
										</Col>
										<Col md={12} style={{ fontSize: '13px', color: '#f6a615' }} className="text-right pt-3">
											View All
											<i style={{ fontSize: '13px', color: '#f6a615' }} className="fas fa-angle-double-right pl-2 my-auto pr-2"></i>
										</Col>
									</>
								);
							})
						) : (
							<Col md={12} className="text-white h5">
								{/* <EmptyDisplay nft={false}></EmptyDisplay> */}
								<i className="h6 far fa-at user-profile pt-2"></i>
								{user.display_name} <span className=" h6"> hasn't viewed any collectibles</span>
							</Col>
						)}
					</Row>
				) : null}
				{/* SAVED TABLE */}
				{profileTable == 'saved' ? (
					<Row className="pt-4 pl-2 profile-nfts-grid ">
						{user.starred ? (
							user.starred.slice(0, 3).map((nft, i) => {
								return (
									<>
										<Col key={i} xl={4} lg={5} md={12} sm={10} xs={10}>
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
												key={`profil-col-${i}`}
											/>
										</Col>
										<Col md={12} style={{ fontSize: '13px', color: '#f6a615' }} className="text-right pt-3">
											View All
											<i style={{ fontSize: '13px', color: '#f6a615' }} className="fas fa-angle-double-right pl-2 my-auto pr-2"></i>
										</Col>
									</>
								);
							})
						) : (
							<Col md={12} className="text-white h5">
								{/* <EmptyDisplay nft={false}></EmptyDisplay> */}
								<i className="h6 far fa-at user-profile pt-2"></i>
								{user.display_name} <span className=" h6"> hasn't saved any collectibles</span>
							</Col>
						)}
					</Row>
				) : null}
			</Container>
	);
};

export default NftTable;
