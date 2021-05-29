//Modules
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Nav, Navbar, Image, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserStore from '../../Stores/UserStore';
import { observer } from 'mobx-react-lite';

//Components 
import CreateModal from '../CreateModal';
import Web3 from 'web3';

// Images
import Regal from '../../../assets/images/regal-2.png';


const Navigation = () => {
	const userStore = useContext(UserStore);
	const [modalShow, setModalShow] = useState(false);
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	let web3 = new Web3(Web3.givenProvider || 'ws://localhost:9546');

	useEffect(() => {
		// ** REGAL SIGNED MESSAGE -> JWT -> Authenication Key
		// *  web3.eth.personal.sign("Welcome to Regal", window.ethereum.selectedAddress).then((obj, res) => console.log(obj, res));
		// ** TEMPLATE FOR FUTURE USE

		if (window.ethereum && window.ethereum.selectedAddress) loadUser(window.ethereum.selectedAddress);
	}, []);

	return (
		<Navbar className="nav-container" bg="dark" collapseOnSelect expand="lg" variant="dark">
			<Navbar.Brand as={Link} to="/" className="regal-brand text-majesti">
				<Image className="regal-image" src={Regal} />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="nav-links mr-auto my-auto mb-0 pb-0">
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
						<i className="fas fa-search"></i>
					</Nav.Link>
				</Nav>
				<Nav>
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
								<Nav.Link className="">
									<Image as={Link} to="/profile" className="profile-link-image " src={user.profile_image} height="50px"></Image>
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
