//Modules
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NftDisplay from '../NftDisplay';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const AuctionTable = ({user}) => {
	return (
		<Container>
				<Row className="pt-4 pl-2 profile-nfts-grid">
					{user.collections.length ? (
						user.collections.slice(0, 3).map((nft, i) => {
							return (
								<>
									<Col key={i} xl={3} lg={4} md={12} sm={10} xs={10}>
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
										<i style={{ fontSize: '13px', color: '#f6a615' }} className="fas fa-angle-double-right pl-2 pr-2"></i>
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
		</Container>
	);
};

export default AuctionTable;
