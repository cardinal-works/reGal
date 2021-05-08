//Components
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import NftStore from '../../Stores/NftStore';



const DetailedView = (props) => {
	const nftStore = useContext(NftStore);
    const [params, setParams] = useState(useParams())
    const [currentEtherPrice, setCurrentEtherPrice] = useState(null)
	const { loadNfts, getAllNfts, nftRegistry } = nftStore;
    // console.log(useParams())

	useEffect(() => {
        loadNfts({nft_id: Number(params["id"])})
	}, []);

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc')
        .then((response) => response.json())
        .then((data) => setCurrentEtherPrice(data[1]['current_price']))
        .catch((err) => console.log('ERROR: ', err));
	}, [nftRegistry]);

   if (getAllNfts === null) {
       return(<div></div>) }
       else return (
        <Container>
            <Row>
                <Col md={12} className="nft-title-details">
                    <h1 className="text-uppercase d-inline-block text-primary font-italic text-md-left text-center">{getAllNfts.title}</h1>
                    <span className="d-inline-block text-info ml-3 font-italic text-md-left text-center"><span className="fas fa-certificate mr-1"></span>Artist verified</span>
                    <span className="d-inline-block text-info ml-3 font-italic text-md-left text-center"><span className="fas fa-certificate mr-1"></span>Regal Minted</span>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Image src={getAllNfts.thumbnail_image} fluid/>
                </Col>
                <Col md={8}>
                    <div className="bid-details text-md-left text-center">
                        <span className="text-white fas fa-circle fa-lg"></span>
                        <h2 className="text-white d-inline-block ml-2">Top Bid</h2>
                    </div>
                    <div className="nft-bids mt-2 text-md-left text-center">
                        <div className="eth-price d-inline-block">
                            <span className="fab fa-ethereum text-primary fa-lg"></span>
                            <span className="text-primary ml-1 currency-value">{getAllNfts.current_bid}</span>
                        </div>
                        <div className="usd-price d-inline-block ml-3">
                            <span className="fas fa-dollar-sign text-green fa-lg"></span>
                            <span className="text-primary ml-1 text-green currency-value">{getAllNfts.current_bid * currentEtherPrice}</span>
                        </div>
                    </div>
                    <div className="buyer-seller mt-2 text-md-left text-center">
                        <div>
                            <span className="text-white">Minter: </span>
                            <span className="text-info">@{getAllNfts.creator ? getAllNfts.creator : ""}</span>
                        </div>
                        <div>
                            <span className="text-white">Owner: </span>
                            <span className="text-info">@{getAllNfts.creator ? getAllNfts.creator : ""}</span>
                        </div>
                    </div>
                    {/* <div className="nft-tags mt-4">
                        <ListGroup horizontal className="text-white font-italic">
                            {
                                loadedgetAllNfts.tags && loadedgetAllNfts.tags.map( (tag, index) => (
                                    <ListGroup.Item key={index}>#{tag}</ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </div> */}
                    <p className="nft-description text-white mt-3 text-md-left text-center">{getAllNfts.description}</p>
                    <div className="controls-wrapper text-md-left text-center">
                        <Button variant="outline-primary" className="btn-fix">Place A Bid</Button>
                    </div>
                </Col>
            </Row>
            <Row className="mb-5 mt-3">
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
                            {/* {
                            loadedgetAllNfts.transactionHistory && loadednft.transactionHistory.map((transaction, index) => (
                                <tr key={index}>
                                    <td>date</td>
                                    <td>value</td>
                                    <td>from</td>
                                    <td>to</td>
                                </tr>
                            ))
                            } */}
                        </tbody>
                    </Table>
                </Col>
                {/* <Col md={12} className="text-center mt-3 total-value-summary">
                    <span className="font-italic text-white">Total Value Transferred</span><span className="text-primary font-italic ml-3">${loadedgetAllNfts.totalValue ? loadedgetAllNfts.totalValue : ""}</span>
                </Col> */}
            </Row>
        </Container>
    )
}

export default observer(DetailedView);