//Components
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, ListGroup, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { AuctionRepository } from '../../../abi/AuctionRepository_abi';
import NftStore from '../../Stores/NftStore';
import PriceStore from '../../Stores/PriceStore';

const DetailedView = () => {
	const nftStore = useContext(NftStore);
	const priceStore = useContext(PriceStore);
	const [params, setParams] = useState(useParams());
	const [currentEtherPrice, setCurrentEtherPrice] = useState();
	const { loadNft, nft } = nftStore; 
	const { getPrices, prices } = priceStore;
	const [price, setPrice] = useState(0);
	// console.log(useParams())

	let contractAddr = '0x0aC149cF75Ffcbe2C9E31948055B19E489E1267b';
	// const AuctionRepositoryContract = new web3.eth.Contract(AuctionRepository, contractAddr);

	useEffect(() => {
        loadNft(params['id']);
		getPrices()
	}, []);

	useEffect(() => {
		if(prices && nft)
		{
			setPrice(nft.current_bid * prices['current_price']);
		}
	}, [prices]);

	const handleBid = async (e) => {
		e.preventDefault()
		await AuctionRepositoryContract.methods
			.bidOnAuction()
			.send({ from: window.ethereum.selectedAddress })
			.then((res) => console.log(res))

	}

	return (
		<Container className="detailedview-container" fluid>
			{nft && 
                (
					<Fragment>
						<Row>
							<Col className="nft-title-details text-md-center mb-2">
								<h1 className="text-uppercase d-inline-block text-primary font-italic text-md-center text-center">
									{nft.title}
								</h1>
								<span className="d-inline-block text-info ml-3 font-italic text-md-center text-center">
									<span className="fas fa-certificate mr-1"></span>Artist verified
								</span>
								<span className="d-inline-block text-info ml-3 font-italic text-md-center text-center">
									<span className="fas fa-certificate mr-1"></span>Regal Minted
								</span>
							</Col>
						</Row>
						<Row>
							<Col className="thumbnail-image mx-auto" md={6}>
								<Image src={nft.thumbnail_image} fluid />
							</Col>
							<Col className="nft-details mx-auto mt-4" md={12}>
								<div className="bid-details text-md-center text-center">
									<span className="text-white fas fa-circle fa-lg"></span>
									<h2 className="text-white d-inline-block ml-2">Top Bid</h2>
								</div>
								<div className="nft-bids mt-2 text-md-center text-center">
									<div className="eth-price d-inline-block">
										<span className="fab fa-ethereum text-primary fa-lg"></span>
										<span className="text-primary ml-1 currency-value">
											{nft.current_bid}
										</span>
									</div>
									<div className="usd-price d-inline-block ml-3">
										<span className="fas fa-dollar-sign text-green fa-lg"></span>
										<span className="text-primary ml-1 text-green currency-value">
											{price}
										</span>
									</div>
								</div>
								<div className="buyer-seller mt-2 text-md-center text-center">
									<div>
										<span className="text-white">Minter: </span>
										<span className="text-info">
											@{nft.creator ? nft.creator : ''}
										</span>
									</div>
									<div>
										<span className="text-white">Owner: </span>
										<span className="text-info">
											@{nft.creator ? nft.creator : ''}
										</span>
									</div>
								</div>
								{/* <div className="nft-tags mt-4">
                        <ListGroup horizontal className="text-white font-italic">
                            {
                                loadednft.tags && loadednft.tags.map( (tag, index) => (
                                    <ListGroup.Item key={index}>#{tag}</ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </div> */}
								<p className="nft-description text-white mt-3 text-md-center text-center">
									{nft.description}
								</p>
								<div className="controls-wrapper text-md-center text-center mb-5 pb-5">
									<Button onClick={(e) => handleBid(e)} variant="outline-primary" className="btn-fix">
										Place A Bid
									</Button>
								</div>
							</Col>
						</Row>
						{/* <Row className="mb-5 mt-3">
                <Col md={12}>
                    <Table responsive className="text-white text-center nft-records">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Value</th>
                                <th>Transfered From</th>
                                <th>Transfered To</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            loadedgetAllNfts.transactionHistory && loadednft.transactionHistory.map((transaction, index) => (
                                <tr key={index}>
                                    <td>date</td>
                                    <td>value</td>
                                    <td>from</td>
                                    <td>to</td>
                                </tr>
                            ))
                            } 
                        </tbody>
                    </Table>
                </Col> */}
						{/* <Col md={12} className="text-center mt-3 total-value-summary">
                    <span className="font-italic text-white">Total Value Transferred</span><span className="text-primary font-italic ml-3">${loadedgetAllNfts.totalValue ? loadedgetAllNfts.totalValue : ""}</span>
                </Col> */}
						{/* </Row> */}
					</Fragment>
				)}
		</Container>
	);
};

export default observer(DetailedView);
