//Modules
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Nav, Navbar, Image, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserStore from '../../Stores/UserStore';
import { observer } from 'mobx-react-lite';
import history from "../../History";

//Components 
import CreateModal from '../CreateModal';
import Web3 from 'web3';


const Navigation = () => {
	const userStore = useContext(UserStore);
	const [modalShow, setModalShow] = useState(false);
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	let web3 = new Web3(Web3.givenProvider || 'ws://localhost:9546');

	useEffect(() => {
		console.log("History: ", history);
		// ** REGAL SIGNED MESSAGE -> JWT -> Authenication Key
		// web3.eth.personal.sign("Welcome to Regal", window.ethereum.selectedAddress).then((obj, res) => console.log(obj, res));
		// ** TEMPLATE FOR FUTURE USE

		if (window.ethereum && window.ethereum.selectedAddress) loadUser(window.ethereum.selectedAddress);
	}, []);

	return (
		<Navbar className="nav-container" bg="dark" collapseOnSelect expand="lg" variant="dark">
			<Navbar.Brand as={Link} to="/" className="regal-brand text-majesti font-primary pt-2">
				<span className='r-text'>R</span> 
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="nav-links">
					<Nav.Link as={Link} to="/">
						explore
					</Nav.Link>
					<Nav.Link as={Link} to="/profile">
						profile
					</Nav.Link>
					<Nav.Link as={Link} to="/farm">
						farm
					</Nav.Link>
					<Nav.Link>
						<i className="fas fa-search ml-2"></i>
					</Nav.Link>
				</Nav>
				<Nav className="ml-auto">
					{user ? (
						<Container className="profile-nav-container" fluid style={{ padding: 0 }}>
							<Nav.Link className="create-nav-link">
								<div className="profile-link-nav ">
									<Button onClick={() => setModalShow(true)} className="create-button mr-2" variant="outline-success">
										create
									</Button>
								</div>
							</Nav.Link>
							<CreateModal show={modalShow} onHide={() => setModalShow(false)} />
							<div className="profile-link-nav ">
								<Nav.Link as={Link} to="/profile" className="">
									<Image  className="profile-link-image " src={user.profile_image} height="50px"></Image>
								</Nav.Link>
							</div>
						</Container>
					) : (
						<Fragment>
							<Button as={Link} to="/signup" className="connect-button" variant="outline-success">
								connect
							</Button>
						</Fragment>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default observer(Navigation);
