//Modules
import React, { useEffect, useState, useContext, Fragment, useRef } from 'react';
import { ContractFactory, ethers } from 'ethers';
import ipfs from '../../ipfs';
import { Link, Redirect } from 'react-router-dom';
//Components
import { Container, Row, Col, Form, Button, Toast } from 'react-bootstrap';
import NftDisplay from '../../Components/NftDisplay';
import UserStore from '../../Stores/UserStore';
import NftStore from '../../Stores/NftStore';
//Utilities
import { RegalAuction } from '../../../abi/RegalAuction_abi';
var Buffer = require('buffer/').Buffer;

const NftMinter = () => {
	// CONTRACT REF
	const contract = useRef();
	// USER STORE
	const userStore = useContext(UserStore);
	const nftStore = useContext(NftStore);
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	const { createNft, loadNfts, nftRegistry, getAllNfts } = nftStore;
	// LOCAL STATE
	const [formList, setFormList] = useState([true, false, false, false]);
	const [uploading, setUploading] = useState(false);
	const [nftId, setNftId] = useState(1);
	const [redirect, setRedirect] = useState(<></>)
	const [userMetaData, setUserMetaData] = useState({
		title: '',
		creator_name: '',
		nft_description: '',
		thumbnail_image: '',
		tags: [],
	});

	useEffect(() => {
		// LOAD ALL NFTS
		loadNfts()
		// LOADING CURRENT USER
		loadUser(window.ethereum.selectedAddress).then((res) => {
			console.log(res);
			setUserMetaData((prevState) => ({
				...prevState,
				creator: res.display_name,
				user_id: res._id,
			}));
		});
		// FUNCTION TO INSTANTIATE OUR PROVIDER/SIGNER/CONTRACT
		const setup = async () => {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contractAddress = '0x65F5efd807B5aD6A9e8980d90BFAbCF4299A7D17';
			contract.current = new ethers.Contract(contractAddress, RegalAuction, signer);
		};
		setup();
	}, []);

	useEffect(() => {
		console.log(nftRegistry.size)
	}, [nftRegistry])

	const handleMint = async () => {
		if (user._id && nftRegistry) {
			const userData = {
				user_id: user._id,
				title: userMetaData.title,
				creator_name: user.display_name,
				nft_id: nftRegistry.size + 1,
				thumbnail_image: userMetaData.thumbnail_image,
				nft_description: userMetaData.nft_description,
			};
			const metaData = JSON.stringify(userData);
			const result = await ipfs.add(metaData);
			const ipfsLink = 'https://gateway.ipfs.io/ipfs/' + result.path;
			console.log(contract.current);
			let tx = await contract.current.createCollectible(ipfsLink);
			const receipt = await tx.wait();
			createNft(userData, user._id).then((res) => {
				let updatedCollection = user.collections;
				updatedCollection.push(res);
				updateUser({ ...user, collections: updatedCollection });
				setRedirect(<Redirect to="/profile" />)
			});
		} else {
			return;
		}
	};

	const handleInputChange = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		setUserMetaData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleNftLink = (e) => {
		e.preventDefault();
		const value = e.target.value;
		setState((prevState) => ({
			...prevState,
			nftLink: value,
		}));
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
		const metadata = userMetaData;
		setUserMetaData({ ...metadata, thumbnail_image: ipfsLink });
		setUploading(false);
	};

	return (
		<Container className="nft-minter-container ">
			<Toast show={formList[0]} animation={false} className="toast-1 mx-auto pb-3">
				<Toast.Header className="toast-1-header" closeButton={false}>
					<strong className="mx-auto text-majesti font-tertiary">R</strong>
				</Toast.Header>
				<Toast.Body>
					<Row className="pb-3 pt-2">
						<Col md={12} className="text-center pb-3 pt-2">
							If this is your first time minting an NFT, click <a href="#">here</a> for a quick explanation on what you need to know.
						</Col>
						<Col className="text-center pb-3 pt-2">Otherwise, choose between starting from scratch (new) or from a previous draft.</Col>
					</Row>
					<Row className="text-center">
						<Col className="mx-auto">
							<Button
								className="drafts-button"
								onClick={() => {
									setNext(true);
								}}>
								Drafts
							</Button>
							<Button className="new-button ml-3 text-center" onClick={() => setFormList([false, true, false, false])}>
								New
							</Button>
						</Col>
					</Row>
				</Toast.Body>
			</Toast>
			<Toast show={formList[1]} animation={false} className="toast-2 mx-auto">
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
						<Col md={12} style={{ fontSize: '12px' }}>
							{userMetaData.thumbnail_image ? (
								<NftDisplay
									nft_id={0}
									likes={420}
									preview={true}
									thumbnail_image={userMetaData.thumbnail_image}
									current_bid={999}
									title={userMetaData.title}
									creator={user.display_name}
								/>
							) : null}
						</Col>
						<Col md={12} className="pb-4">
							{userMetaData.thumbnail_image ? null : <b>upload your artwork</b>}
						</Col>
						<Col className="text-center">
							{userMetaData.thumbnail_image ? (
								<span>
									doesn't look right? <br /> upload another <i className="fas fa-caret-down mt-2"></i>{' '}
								</span>
							) : (
								<>
									<span className="text-center">
										This will be the representation of your art <b> on the blockchain</b> and the preview <b>on our site. </b>
									</span>
									<span>
										It can never be changed or deleted so choose wisely. <br /> <br />
										<i>You will be able to preview your art before it is minted.</i>
									</span>
								</>
							)}
						</Col>
					</Row>
					<Row className="mt-2">
						<Col md={12} className="mx-auto text-center">
							<Button className="ipfs-button mb-1 mt-5">
								{uploading ? <span className="spinner-border spinner-border-sm mr-2 mb-1"></span> : <i className="fad fa-cloud-upload"></i>}
								{uploading ? <small>uploading to IPFS</small> : ''}
								<input
									type="file"
									name="images[]"
									accept="image/gif, image/png, image/jpeg,"
									onChange={(e) => {
										setUploading(true);
										handleFileUpload(e.target.files[0]);
									}}
									className="input-overlay"
									type="file"></input>
							</Button>
						</Col>
						<Col md={12} className="text-center pb-3 pt-2">
							<small>20MB limit (jpg, png, mp4, gif, jpeg)</small>
						</Col>
						<Col md={12} className="mt-1 pt-2 mb-3 text-center">
							<Button className="button-prev mr-1 mt-1" onClick={() => setFormList([true, false, false, false])}>
								<i className="fad fa-angle-double-left "></i>
							</Button>
							{userMetaData.thumbnail_image.length > 1 && (
								<Button className="button-next ml-1 mt-1" onClick={() => setFormList([false, false, true, false])}>
									<i className="fad fa-chevron-double-right "></i>
								</Button>
							)}
						</Col>
					</Row>
				</Toast.Body>
			</Toast>
			<Toast show={formList[2]} animation={false} className="toast-3 mx-auto">
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
							{userMetaData.thumbnail_image ? (
								<NftDisplay
									nft_id={0}
									likes={420}
									thumbnail_image={userMetaData.thumbnail_image}
									current_bid={999}
									title={userMetaData.title}
									creator={user.display_name}
									description={userMetaData.nft_description}
									preview={true}
								/>
							) : null}
						</Col>
						<Col md={12} className="pb-3 mb-3">
							describe your artwork
						</Col>
						<Col md={12} className="text-center">
							<Form className="text-left">
								<Form.Group>
									<Form.Label className="text-white">title*</Form.Label>
									<Form.Control maxLength="60" type="text" name="title" placeholder="" value={userMetaData.title} onChange={handleInputChange} />
								</Form.Group>
								<Form.Group>
									<Form.Label className="text-white">description*</Form.Label>
									<Form.Control maxLength="280" as="textarea" row={6} name="nft_description" placeholder="" value={userMetaData.nft_description || ''} onChange={handleInputChange} />
								</Form.Group>
								<Form.Label className="pl-1">tags</Form.Label>
								<Form.Control type="text" placeholder="disabled" readOnly />
							</Form>
						</Col>
					</Row>
					<Row className="mt-4">
						<Col md={12} className="mx-auto text-center mb-3 pb-1">
							<Button className="button-prev mr-1" onClick={() => setFormList([false, true, false, false])}>
								<i className="fad fa-angle-double-left"></i>
							</Button>
							<Button className="button-next ml-1" onClick={() => setFormList([false, false, false, true])}>
								<i className="fad fa-chevron-double-right"></i>
							</Button>
						</Col>
					</Row>
				</Toast.Body>
			</Toast>
			<Toast show={formList[3]} animation={false} className="toast-4 mx-auto">
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
							{userMetaData.thumbnail_image ? (
								<Fragment>
									<NftDisplay nft_id={0} likes={420} thumbnail_image={userMetaData.thumbnail_image} current_bid={999} title={userMetaData.title} creator={user.display_name} />{' '}
									<small className="text-white pb-2">note: description is only visible on the detail page</small>{' '}
								</Fragment>
							) : null}
						</Col>
						<Col md={12} className=" text-center pt-5 pb-3">
							save draft or mint?
						</Col>
						<Col className="text-center">
							<span className="text-center pt-1 pb-1">
								Any interaction with the blockchain costs gas. If you don't want to mint (pay) it now, you can save your art as a draft.
								<br />{' '}
							</span>
						</Col>
					</Row>
					<Row className="mt-2 mb-2 text-center pt-2">
						<Col className="text-center">
							<Button className=" mr-1 button-save" variant="secondary">
								save draft
							</Button>

							<Button className=" ml-1 button-mint" onClick={handleMint} disabled={userMetaData.title && userMetaData.creator && userMetaData.nft_description ? false : true}>
								mint
							</Button>
						</Col>
						<Col md={12} className="mx-auto text-center pt-1 mb-1">
							<Button className="button-prev mt-4" onClick={() => setFormList([false, false, true, false])}>
								<i className="fad fa-angle-double-left"></i>
							</Button>
						</Col>
						{redirect}
					</Row>
				</Toast.Body>
			</Toast>
		</Container>
	);
};

export default NftMinter;

// const handleRenderInput = (event, bool) => {
// 	event.preventDefault();
// 	console.log(bool);
// 	if (bool === true) {
// 		setRenderInput([
// 			<FormControl
// 				key={'input'}
// 				placeholder="https://www.dropbox.com/s/ymhg..."
// 				aria-label="https://www.dropbox.com/s/ymhg..."
// 				aria-describedby="basic-addon1"
// 				onChange={(e) => handleNftLink(e)}
// 			/>,
// 		]);
// 	} else setRenderInput([<div key={'empty'}></div>]);
// };

// <Container className="minter-container">
// 	<Row className="user-profile-data text-center">
// 		{userMetaData.thumbnail_image.length == 0 ? (
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
// 				{userMetaData.thumbnail_image && (
// 					<Image
// 						className="image-border-box my-auto"
// 						loop="infinite"
// 						src={userMetaData.thumbnail_image}
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
// 						value={userMetaData.title}
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
// 						value={userMetaData.creator}
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
// 						value={userMetaData.nft_description || ''}
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
// 						//     userMetaData.title &&
// 						//     userMetaData.creator &&
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
