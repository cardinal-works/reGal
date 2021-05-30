//Modules
import React, { useEffect, useState, useContext, Fragment } from 'react';
import {
	Container,
	Row,
	Col,
	Image,
	Form,
	Button,
	OverlayTrigger,
	ToolTip,
	Toast,
	FormControl,
} from 'react-bootstrap';
import ipfs from '../../ipfs';
import { Link, Redirect } from 'react-router-dom';
import NftDisplay from '../../Components/NftDisplay';
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
	const [formList, setFormList] = useState([true, false, false, false]);
	const [uploading, setUploading] = useState(false);
	const [renderInput, setRenderInput] = useState([<div key={0}></div>]);

	useEffect(() => {
		console.log(web3);
		loadUser(window.ethereum.selectedAddress).then((res) => {
			console.log(res);
			setDbMetaData((prevState) => ({
				...prevState,
				creator: res.display_name,
				user_id: res._id,
			}));
		});
	}, []);

	const renderTooltip = () => <Tooltip id="button-tooltip">Simple tooltip</Tooltip>;

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
				.then((res) =>
					createNft(
						{
							...dbMetaData,
							nft_id: res.events.Transfer.returnValues.tokenId,
						},
						dbMetaData.user_id
					)
				);
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
		if (file === undefined) {
			setUploading(false);
			return;
		}
		if (file.size > 20000000) {
			setUploading(false);
			return;
		}
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => uploadToIPFS(reader, arg);
	};

	const uploadToIPFS = async (reader) => {
		const buffer = await Buffer.from(reader.result);
		const result = await ipfs.add(buffer);
		const ipfsLink = 'https://gateway.ipfs.io/ipfs/' + result.path;
		const metadata = dbMetaData;
		setDbMetaData({ ...metadata, thumbnail_image: ipfsLink });
		setUploading(false);
	};

	return (
		<Container className="nft-minter-container">
			<Toast show={formList[0]} animation={false} className="mx-auto pb-3">
				<Toast.Header closeButton={false}>
					<strong className="mx-auto text-majesti">R</strong>
				</Toast.Header>
				<Toast.Body>
					<Row>
						<Col className="text-center pb-3"></Col>
					</Row>
					<Row>
						<Col className="mx-auto text-end">
							<Button
								onClick={() => setFormList([false, true, false, false])}>
								New
							</Button>
						</Col>
						<Col className="mx-auto text-start">
							<Button
								onClick={() => {
									setNext(true);
								}}>
								Drafts
							</Button>
						</Col>
					</Row>
				</Toast.Body>
			</Toast>
			<Toast show={formList[1]} animation={false} className="mx-auto">
				<Toast.Header closeButton={false}>
					<Col className="text-start p-0">
						<strong className="mx-auto text-start text-majesti">R</strong>
					</Col>
					<Col className="text-end p-0">
						<small>1/3</small>
					</Col>
				</Toast.Header>
				<Toast.Body>
					<Row className="text-center">
						<Col md={12}>
							{dbMetaData.thumbnail_image ? (
								<NftDisplay
									nft_id={0}
									likes={420}
									thumbnail_image={dbMetaData.thumbnail_image}
									current_bid={999}
									title={dbMetaData.title}
									creator={user.display_name}
								/>
							) : null}
						</Col>
						<Col md={12} className="pb-3">
							upload your artwork
						</Col>
						<Col className="text-center">
							<small className="text-center">
								This will be the representation of your art{' '}
								<b> on the blockchain</b> and the preview{' '}
								<b>on our site.</b> <br /> <br />
								It can never be changed or deleted so choose wisely.{' '}
								<br />
								You will be able to preview your art before it is minted.
							</small>
						</Col>
					</Row>
					<Row className="mt-4">
						<Col md={12} className="mx-auto text-center">
							<Button>
								{uploading ? (
									<span className="spinner-border spinner-border-sm mr-2 mb-1"></span>
								) : (
									<i className="fad fa-cloud-upload"></i>
								)}
								{uploading ? <small>uploading to IPFS</small> : ''}

								<input
									accept="image/png, image/jpeg, video/mp4, image/gif, image/jpg"
									onChange={(e) => {
										setUploading(true);
										handleFileUpload(e.target.files[0]);
									}}
									className="input-overlay"
									type="file"></input>
							</Button>
						</Col>
						<Col md={12} className="text-center">
							<br />
							<small>20MB limit (jpg, png, mp4, gif, jpeg)</small>
						</Col>
						<Col md={12} className="mt-3 mb-3 text-center">
							<Button
								className="mr-1"
								onClick={() => setFormList([true, false, false, false])}>
								<i className="fad fa-angle-double-left"></i>
							</Button>
							{dbMetaData.thumbnail_image.length > 1 && (
								<Button
									className="ml-1"
									onClick={() =>
										setFormList([false, false, true, false])
									}>
									<i className="fad fa-chevron-double-right"></i>
								</Button>
							)}
						</Col>
					</Row>
				</Toast.Body>
			</Toast>
			<Toast show={formList[2]} animation={false} className="mx-auto">
				<Toast.Header closeButton={false}>
					<Col className="text-start p-0">
						<strong className="mx-auto text-start text-majesti">R</strong>
					</Col>
					<Col className="text-end p-0">
						<small>2/3</small>
					</Col>
				</Toast.Header>
				<Toast.Body>
					<Row className="text-center mb-2">
						<Col md={12}>
							{dbMetaData.thumbnail_image ? (
								<NftDisplay
									nft_id={0}
									likes={420}
									thumbnail_image={dbMetaData.thumbnail_image}
									current_bid={999}
									title={dbMetaData.title}
									creator={user.display_name}
								/>
							) : null}
						</Col>
						<Col md={12} className="pb-3 mb-3">
							describe your artwork
						</Col>
						<Col md={12} className="text-center">
							<Form className="text-left">
								<Form.Group controlId="minter.controlTitle">
									<Form.Label className="pl-1">title *</Form.Label>
									<Form.Control
										value={dbMetaData.title}
										name="title"
										type="text"
									/>
								</Form.Group>
								<Form.Group controlId="minter.controlDesc">
									<Form.Label className="pl-1">
										description *
									</Form.Label>
									<Form.Control
										name="description"
										as="textarea"
										rows={2}
									/>
									<small className="pl-1">* 280 character limit</small>
								</Form.Group>
								<Form.Label className="pl-1">tags</Form.Label>
								<Form.Control
									type="text"
									placeholder="disabled"
									readOnly
								/>
							</Form>
						</Col>
					</Row>
					<Row className="mt-4">
						<Col md={12} className="mx-auto text-center mb-3 pb-1">
							<Button
								onClick={() => setFormList([false, true, false, false])}>
								<i className="fad fa-angle-double-left"></i>
							</Button>
							<Button
								onClick={() => setFormList([false, false, false, true])}>
								<i className="fad fa-chevron-double-right"></i>
							</Button>
						</Col>
					</Row>
				</Toast.Body>
			</Toast>
			<Toast show={formList[3]} animation={false} className="mx-auto">
				<Toast.Header closeButton={false}>
					<Col className="text-start p-0">
						<strong className="mx-auto text-start text-majesti">R</strong>
					</Col>
					<Col className="text-end p-0">
						<small>3/3</small>
					</Col>
				</Toast.Header>
				<Toast.Body>
					<Row className="text-center">
					<Col md={12} className="mb-2">
							{dbMetaData.thumbnail_image ? (
								<NftDisplay
									nft_id={0}
									likes={420}
									thumbnail_image={dbMetaData.thumbnail_image}
									current_bid={999}
									title={dbMetaData.title}
									creator={user.display_name}
								/>
							) : null}
						</Col>
						<Col md={12} className="pb-3">
							save or mint?
						</Col>
						<Col className="text-center">
							<small className="text-center">
								Any interaction with the blockchain costs gas
								{/* <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}> */}
								<i className="fas fa-map-marker-question"></i>{' '}
								{/* </OverlayTrigger> */}
								. If you don't want to mint (pay) it now, you can save
								your art as a draft.
								<br />{' '}
							</small>
						</Col>
					</Row>
					<Row className="mt-4 mb-2 text-center">
						<Col className="mx-auto text-end">
							<Button variant="secondary">save</Button>
						</Col>
						<Col className="mx-auto text-start">
							<Button
								variant="success"
								onClick={() => {
									setNext(true);
								}}>
								mint
							</Button>
						</Col>
						<Col md={12} className="mx-auto text-center mb-3 pb-1">
							<Button className="ml-1"
								onClick={() => setFormList([false, true, false, false])}>
								<i className="fad fa-angle-double-left"></i>
							</Button>
							<Button className="mr-1"
								onClick={() => setFormList([false, false, false, true])}>
								<i className="fad fa-chevron-double-right"></i>
							</Button>
						</Col>
					</Row>
				</Toast.Body>
			</Toast>
		</Container>
	);
};

export default NftMinter;

// <Container className="minter-container">
// 	<Row className="user-profile-data text-center">
// 		{dbMetaData.thumbnail_image.length == 0 ? (
// 			<Fragment>
// 				<Col md={6} lg={12}>
// 					<Image
// 						className="profile-image"
// 						src={user ? user.profile_image : null}
// 						width="150px"
// 						height="150px"></Image>
// 				</Col>
// 				<Col md={6} lg={12} className=" mt-3">
// 					<span className="text-majesti text-white user-profile-name font-secondary ">
// 						{' '}
// 						{user ? '@' + user.display_name : '@displayname'}{' '}
// 					</span>{' '}
// 				</Col>
// 				<Col md={6} lg={12} className="mt-1 ml-1">
// 					<span className="text-primary text-center">
// 						{user ? user.wallet_id.slice(0, 3) + '...' + user.wallet_id.slice(-3) : null}
// 					</span>
// 				</Col>
// 			</Fragment>
// 		) : null}
// 	</Row>
// 	<Row className="nft-upload-form justify-content-md-center">
// 		<Col md={12}>
// 			<div className="nft-upload-placeholder text-center mx-auto">
// 				{dbMetaData.thumbnail_image && (
// 					<Image
// 						className="image-border-box my-auto"
// 						loop="infinite"
// 						src={dbMetaData.thumbnail_image}
// 						alt="Nft thumbnail preview"
// 					/>
// 				)}
// 			</div>
// 		</Col>
// 		<Col md={6} className="mt-4 md-offset-3 mx-auto">
// 			<Form>
// 				<Form.Group>
// 					<Form.Label className="text-white">Name*</Form.Label>
// 					<Form.Control
// 						type="text"
// 						name="title"
// 						placeholder="NFT Name"
// 						value={dbMetaData.title}
// 						onChange={handleInputChange}
// 					/>
// 				</Form.Group>
// 				<Form.Group>
// 					<Form.Label className="text-white">Artist*</Form.Label>
// 					<Form.Control
// 						type="text"
// 						disabled={true}
// 						name="creator"
// 						placeholder="@artistName"
// 						value={dbMetaData.creator}
// 						onChange={handleInputChange}
// 					/>
// 				</Form.Group>
// 				<Form.Group>
// 					<Form.Label className="text-white">Description*</Form.Label>
// 					<Form.Control
// 						as="textarea"
// 						row={3}
// 						name="nft_description"
// 						placeholder="NFT Description"
// 						value={dbMetaData.nft_description || ''}
// 						onChange={handleInputChange}
// 					/>
// 				</Form.Group>
// 				<Form.Group>
// 					<Form.File
// 						className="text-primary"
// 						label="Upload raw file*"
// 						name="nft_thumbnail"
// 						onChange={(e) => handleFileUpload(e.target.files[0])}
// 					/>
// 				</Form.Group>
// 				<Form.Group>
// 					<Form.File
// 						className="text-primary"
// 						label="Upload thumbnail*"
// 						name="nft_uri"
// 						onChange={(e) => handleFileUpload(e.target.files[0], null)}
// 					/>
// 				</Form.Group>
// 				<Form.Group>
// 					<Form.Label className="text-white">Provide Downloadable Link?</Form.Label>
// 					<div></div>
// 					<ToggleButtonGroup type="checkbox">
// 						<ToggleButton
// 							variant="success"
// 							size={'sm'}
// 							value={true}
// 							onClick={(e) => {
// 								handleRenderInput(e, true);
// 							}}>
// 							Yes
// 						</ToggleButton>
// 						<ToggleButton
// 							variant="warning"
// 							size={'sm'}
// 							onClick={(e) => {
// 								handleRenderInput(e, false);
// 							}}>
// 							No
// 						</ToggleButton>
// 					</ToggleButtonGroup>
// 				</Form.Group>
// 				<Form.Group>{renderInput}</Form.Group>
// 				<Form.Group className="text-center mt-5 mb-5">
// 					<Button
// 						className="mint-submit"
// 						onClick={handleMint}
// 						// disabled={
// 						//     dbMetaData.title &&
// 						//     dbMetaData.creator &&
// 						//     nft_description &&
// 						//     nft_uri
// 						//   ? false : true}
// 					>
// 						Mint
// 					</Button>
// 				</Form.Group>
// 			</Form>
// 		</Col>
// 	</Row>
// </Container>
