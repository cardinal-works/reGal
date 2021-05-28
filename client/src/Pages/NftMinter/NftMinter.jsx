//Modules
import React, { useEffect, useState, useContext, Fragment } from 'react';
import {
	Container,
	Row,
	Col,
	Image,
	Form,
	Button,
	ToggleButtonGroup,
	ToggleButton,
	FormControl,
} from 'react-bootstrap';
import ipfs from '../../ipfs';
import { Link, Redirect } from 'react-router-dom';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';
import { RegalAuction } from '../../../abi/RegalAuction_abi';
var Buffer = require('buffer/').Buffer;

const _dbMetadata = {
	title: '',
	creator: '@artistName',
	nft_description: '',
	nft_id: null,
	thumbnail_image: '',
	raw_image: null,
	likes: 0,
	current_bid: 0,
	auction_id: 0,
	asking_bid: null,
	previous_sold: null,
	auction_duration: null,
	auction_startDate: null,
	auction_mode: false,
	auction_started: false,
	tags: [],
};

const NftMinter = ({ web3 }) => {
	const contractAddr = '0xF8915Fa980F1a44770C80500F9Bb4169b7E04D72';
	// const contractAddr = "0xce863dD3ec9bcDEEE585660Cab63C777E1201876";
	const RegalAuctionContract = new web3.eth.Contract(RegalAuction, contractAddr);
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const [userChanges, setUserChanges] = useState({});
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	const { createNft } = nftStore;
	const [dbMetaData, setDbMetaData] = useState(_dbMetadata);
	const [renderInput, setRenderInput] = useState([<div key={0}></div>]);

	useEffect(() => {
		console.log(web3);
		loadUser(window.ethereum.selectedAddress).then((res) => {
			setDbMetaData((prevState) => ({ ...prevState, creator: res.display_name, user_id: res._id }));
		});
	}, []);

	const handleMint = async () => {
		if (user._id) {
			const _bcMetadata = {
				title: dbMetaData.title,
				creator: dbMetaData.creator,
				nft_id: dbMetaData.nft_id,
				raw_image: dbMetaData.raw_image,
			};
			const _bcStringified = JSON.stringify(_bcMetadata);
			const result = await ipfs.add(_bcStringified);
			const ipfsLink = 'https://gateway.ipfs.io/ipfs/' + result.path;

			const mdResult = await RegalAuctionContract.methods
				.createCollectible(ipfsLink)
				.send({ from: window.ethereum.selectedAddress })
				.then(res => createNft({ ...dbMetaData, nft_id: res.events.Transfer.returnValues.tokenId}, dbMetaData.user_id))
		} else {
			return;
		}
	};

	const handleInputChange = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		let proxy = dbMetaData;
		setDbMetaData({ ...proxy, [name]: value });
	};

	const handleNftLink = (e) => {
		e.preventDefault();
		const value = e.target.value;
		setState((prevState) => ({
			...prevState,
			nftLink: value,
		}));
	};

	const handleRenderInput = (event, bool) => {
		event.preventDefault();
		console.log(bool);
		if (bool === true) {
			setRenderInput([
				<FormControl
					key={'input'}
					placeholder="https://www.dropbox.com/s/ymhg..."
					aria-label="https://www.dropbox.com/s/ymhg..."
					aria-describedby="basic-addon1"
					onChange={(e) => handleNftLink(e)}
				/>,
			]);
		} else setRenderInput([<div key={'empty'}></div>]);
	};

	const handleFileUpload = (file, arg) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => uploadToIPFS(reader, arg);
	};

	const uploadToIPFS = async (reader, arg) => {
		const buffer = await Buffer.from(reader.result);
		const result = await ipfs.add(buffer);
		const ipfsLink = 'https://gateway.ipfs.io/ipfs/' + result.path;
		const metadata = dbMetaData;
		if (arg === null) {
			setDbMetaData({ ...metadata, thumbnail_image: ipfsLink });
		} else setDbMetaData({ ...metadata, raw_image: ipfsLink });
	};

	return (
		<Container className="minter-container">
			<Row className="user-profile-data text-center">
				{dbMetaData.thumbnail_image.length == 0 ? (
					<Fragment>
						<Col md={6} lg={12}>
							<Image
								className="profile-image"
								src={user ? user.profile_image : null}
								width="150px"
								height="150px"></Image>
						</Col>
						<Col md={6} lg={12} className=" mt-3">
							<span className="text-majesti text-white user-profile-name font-secondary ">
								{' '}
								{user ? '@' + user.display_name : '@displayname'}{' '}
							</span>{' '}
						</Col>
						<Col md={6} lg={12} className="mt-1 ml-1">
							<span className="text-primary text-center">
								{user ? user.wallet_id.slice(0, 3) + '...' + user.wallet_id.slice(-3) : null}
							</span>
						</Col>
					</Fragment>
				) : null}
			</Row>
			<Row className="nft-upload-form justify-content-md-center">
				<Col md={12}>
					<div className="nft-upload-placeholder text-center mx-auto">
						{dbMetaData.thumbnail_image && (
							<Image
								className="image-border-box my-auto"
								loop="infinite"
								src={dbMetaData.thumbnail_image}
								alt="Nft thumbnail preview"
							/>
						)}
					</div>
				</Col>
				<Col md={6} className="mt-4 md-offset-3 mx-auto">
					<Form>
						<Form.Group>
							<Form.Label className="text-white">Name*</Form.Label>
							<Form.Control
								type="text"
								name="title"
								placeholder="NFT Name"
								value={dbMetaData.title}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className="text-white">Artist*</Form.Label>
							<Form.Control
								type="text"
								disabled={true}
								name="creator"
								placeholder="@artistName"
								value={dbMetaData.creator}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className="text-white">Description*</Form.Label>
							<Form.Control
								as="textarea"
								row={3}
								name="nft_description"
								placeholder="NFT Description"
								value={dbMetaData.nft_description || ''}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.File
								className="text-primary"
								label="Upload raw file*"
								name="nft_thumbnail"
								onChange={(e) => handleFileUpload(e.target.files[0])}
							/>
						</Form.Group>
						<Form.Group>
							<Form.File
								className="text-primary"
								label="Upload thumbnail*"
								name="nft_uri"
								onChange={(e) => handleFileUpload(e.target.files[0], null)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className="text-white">Provide Downloadable Link?</Form.Label>
							<div></div>
							<ToggleButtonGroup type="checkbox">
								<ToggleButton
									variant="success"
									size={'sm'}
									value={true}
									onClick={(e) => {
										handleRenderInput(e, true);
									}}>
									Yes
								</ToggleButton>
								<ToggleButton
									variant="warning"
									size={'sm'}
									onClick={(e) => {
										handleRenderInput(e, false);
									}}>
									No
								</ToggleButton>
							</ToggleButtonGroup>
						</Form.Group>
						<Form.Group>{renderInput}</Form.Group>
						<Form.Group className="text-center mt-5 mb-5">
							<Button
								className="mint-submit"
								onClick={handleMint}
								// disabled={
								//     dbMetaData.title &&
								//     dbMetaData.creator &&
								//     nft_description &&
								//     nft_uri
								//   ? false : true}
							>
								Mint
							</Button>
						</Form.Group>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default NftMinter;
