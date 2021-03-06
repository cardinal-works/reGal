//Modules
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Nav, Navbar, Image, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import UserStore from '../../Stores/UserStore';
import { observer } from 'mobx-react-lite';
import history from '../../History';

//Components
import CreateModal from '../CreateModal';
//Assets
import R from '../../../assets/images/R1.png';
// import Web3 from 'web3';

const Navigation = () => {
	const userStore = useContext(UserStore);
	const [modalShow, setModalShow] = useState(false);
	const [buttonText, setButtonText] = useState('connect');
	const [redirect, setRedirect] = useState(<></>);
	const { loadUser, user } = userStore;
	const pending = false;

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum
				.request({ method: 'eth_requestAccounts' })
				.then((res) => {
					loadUser(res[0]).then((res) => {
						if (res === undefined) {
							setButtonText('connect');
							return setRedirect(<Redirect to="/signup" />);
						} 
						else {
							setButtonText('connect');
							// return setRedirect(<Redirect to="/profile" />);
						}
					});
				})
				.catch(() => setButtonText('connect'));
		}
	}, [])

	const handleConnect = () => {
		setButtonText(<span className="spinner-border spinner-border-sm mb-1 mt-1"></span>);

		if (!window.ethereum) {
			setTimeout(() => {
				setButtonText('connect');
				return setRedirect(<Redirect to="/signup" />);
			}, 1000);
		}
		if (window.ethereum) {
			window.ethereum
				.request({ method: 'eth_requestAccounts' })
				.then((res) => {
					loadUser(res[0]).then((res) => {
						if (res === undefined) {
							setButtonText('connect');
							return setRedirect(<Redirect to="/signup" />);
						} 
						else {
							setButtonText('connect');
							// return setRedirect(<Redirect to="/profile" />);
						}
					});
				})
				.catch(() => setButtonText('connect'));
		}
	};

	return (
		<Navbar className="nav-container" bg="dark" collapseOnSelect expand="lg" variant="dark">
			<Navbar.Brand as={Link} to="/" className="regal-brand text-majesti font-primary">
				<Image src={R} width="40px"></Image>
			</Navbar.Brand>
			<Navbar.Toggle className="" aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse className="" id="responsive-navbar-nav">
				<Nav className="nav-links">
					<Nav.Link as={Link} to="/">
						explore
					</Nav.Link>
					<Nav.Link as={Link} to="/bids">
						auctions
					</Nav.Link>
					<Nav.Link as={Link} to="/farm">
						farm
					</Nav.Link>
					<Nav.Link>
						<i className="fas fa-search"></i>
					</Nav.Link>
				</Nav>
				<Nav className="ml-auto">
					{user ? (
						<Container className="profile-nav-container" fluid style={{ padding: 0 }}>
							<Nav.Link className="create-nav-link">
								<div className="profile-link-nav">
									<i as={Button} onClick={() => setModalShow(true)} className="fas fa-plus mr-2"></i>
								</div>
							</Nav.Link>
							<Nav.Link as={Link} to="/bids" className="create-nav-link text-center">			
									<div className="bids">bids</div>								
							</Nav.Link>
							<CreateModal show={modalShow} onHide={() => setModalShow(false)} />
							<div className="profile-link-nav ml-2">
								<Nav.Link as={Link} to="/profile" className="">
									<Image className="profile-link-image " src={user.profile_image} height="50px"></Image>
								</Nav.Link>
							</div>
						</Container>
					) : (
						<Fragment>
							<Button onClick={handleConnect} className="connect-button" variant="outline-success">
								{buttonText}
							</Button>
						</Fragment>
					)}
					{redirect}
				</Nav>
			</Navbar.Collapse>
			<CreateModal show={modalShow} onHide={() => setModalShow(false)} />
		</Navbar>
	);
};

export default observer(Navigation);
