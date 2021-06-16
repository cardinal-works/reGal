//Modules
import React, { useEffect, useState, useContext, Fragment, useRef } from 'react';
import { ContractFactory, ethers, utils } from 'ethers';
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
			const contractAddress = '0x3604100cEBe47C4F1E34e878c5f1c8b4ED4e0a80';
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
			// ethers.utils.parseTransaction(receipt)
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
