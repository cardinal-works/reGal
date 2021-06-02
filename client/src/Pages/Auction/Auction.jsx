//Components
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Toast, ListGroup, Table, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { RegalAuction } from '../../../abi/RegalAuction_abi';
import NftStore from '../../Stores/NftStore';
import UserStore from '../../Stores/UserStore';
import NftDisplay from "../../Components/NftDisplay"
import PriceStore from '../../Stores/PriceStore';

const Auction = ({ web3 }) => {
	const nftStore = useContext(NftStore);
	const userStore = useContext(UserStore);
	const priceStore = useContext(PriceStore);
	const [params, setParams] = useState(useParams());
	const [currentEtherPrice, setCurrentEtherPrice] = useState();
	const { loadNft, updateNft, nft } = nftStore;
	const { getPrices, prices } = priceStore;
	const { user, loadUser } = userStore;

	let contractAddr = '0x3C7038139356e5e30Cbc8bC407076617ce3437ea';
	const RegalAuctionContract = new web3.eth.Contract(RegalAuction, contractAddr);

	const [auctionData, setAuctionData] = useState({
		title: null,
		startDate: Date.now(),
		endTime: null,
		startPrice: null,
		deedId: 1,
	});

	const handleAuctionTitle = (e) => {
		e.preventDefault();
		const value = e.target.value;
		setAuctionData((prevState) => ({
			...prevState,
			title: value,
		}));
	};

	const handleStartPrice = (e) => {
		e.preventDefault();
		// const weiValue = Web3.utils.toWei(e.target.value, 'ether');
		const value = weiValue;
		setAuctionData((prevState) => ({
			...prevState,
			startPrice: value,
		}));
	};

	const handleDuration = (e) => {

		const value = Number(e.target.value);
		let end = Date.now() + value;
		end = Math.round(end / 1000)
		setAuctionData((prevState) => ({
			...prevState,
			endTime: end,
		}));
	};

	const handleCreateAuction = async () => {
		// const { title, blockDeadline, startPrice, metaData, deedId, deedRepo } = auctionData;
		const title = auctionData.title;
		const endDate = auctionData.endDate;
		const startPrice = auctionData.startPrice;
		const deedId = auctionData.deedId;
		RegalAuctionContract.methods
			.startAuction(1, 1, 1622185134)
			.send({ from: window.ethereum.selectedAddress })
			.then(res => console.log(res))
	};



	useEffect(() => {
		loadUser(window.ethereum.selectedAddress);
		loadNft(params.id);
		getPrices();
	}, []);

	return (
		<Fragment>
			{nft && user ? (
				<Container>
					<Row>
						<Col>
						<Toast show={true} animation={false} className="toast-4 mx-auto">
				<Toast.Header closeButton={false}>
					<Col className="text-start p-0">
						<strong className="mx-auto text-start text-majesti">R</strong>
					</Col>
					<Col className="text-end p-0">
						<small>3/3</small>
					</Col>
				</Toast.Header>
				<Toast.Body>
					<Row className="text-end">
						<Col md={12} className="mb-2">
							{nft.thumbnail_image ? (
								<Fragment>
									<NftDisplay
										nft_id={0}
										likes={420}
										thumbnail_image={nft.thumbnail_image}
										current_bid={999}
										title={nft.title}
										creator={user.display_name}
									/>{' '}
									<small className="text-white pb-2">note: description is only visible on the detail page</small>{' '}
								</Fragment>
							) : null}
						</Col>
						<Col md={12} className=" text-center pt-5 pb-3">
							save draft or mint?
						</Col>
						<Col className="text-center">
							<span className="text-center pt-1 pb-1">
								Any interaction with the blockchain costs gas. If you don't want to mint (pay) it now, you can save your art
								as a draft.
								<br />{' '}
							</span>
						</Col>
					</Row>
					<Row className="mt-2 mb-2 text-center pt-2">
						<Col className="text-center">
							<Button className=" mr-1 button-save" variant="secondary">
								save draft
							</Button>

							<Button
								className=" ml-1 button-mint">
							
							
								mint
							</Button>
						</Col>
						<Col md={12} className="mx-auto text-center pt-1 mb-1">
							<Button className="button-prev mt-4" >
								<i className="fad fa-angle-double-left"></i>
							</Button>
							{/* <Button className="ml-1 button-next" onClick={() => setFormList([false, false, false, true])}>
								<i className="fad fa-chevron-double-right"></i>
							</Button> */}
						</Col>
					</Row>
				</Toast.Body>
			</Toast>
						</Col>
					</Row>
				</Container>
			) : null}
		</Fragment>
	);
};

export default observer(Auction);
