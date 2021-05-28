//Modules
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Nav, Navbar, Image, Container, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserStore from '../../Stores/UserStore';
import { observer } from 'mobx-react-lite';
import CreateModal from '../CreateModal';
import Web3 from "web3"

const Navigation = () => {
	const userStore = useContext(UserStore);
	const [modalShow, setModalShow] = useState(false);
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
	let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");


	useEffect(() => {
		console.log(web3)
		if(window.ethereum && window.ethereum.selectedAddress)
			loadUser(window.ethereum.selectedAddress);
	}, []);

	return (
		<Container className='nav-container' fluid>
		<Navbar className="nav-bar" collapseOnSelect expand="lg" variant="dark">
			<Navbar.Brand
				as={Link}
				to="/"
				className="r-div text-majesti"
				style={{ fontSize: '5.0em' }}>
				Regal
			</Navbar.Brand>
			<Navbar.Toggle className="mb-2" aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="nav-top mt-3">
					{/* <Form className="search-container" inline>
						<FormControl type="text" placeholder="Search" className="search-form mr-sm-2" />
						<Button variant="outline-success" className="search-button">Search</Button>
					</Form> */}
					<Nav.Link as={Link} to="/">
						explore
					</Nav.Link>
					<Nav.Link as={Link} to="/profile">
						profile
					</Nav.Link>
					<Nav.Link as={Link} to="/farm">farm</Nav.Link>
					<Nav.Link>
						<i className="fas fa-search"></i>
					</Nav.Link>
				</Nav>
				<Nav></Nav>
				<Nav className="nav-profile-image-link">
					{user ? (
						<Fragment>
							<Container className="profile-container">
								<Button
									onClick={() => setModalShow(true)}
									className="btn-regal mr-4 mb-2">
									Create
								</Button>

								<CreateModal show={modalShow} onHide={() => setModalShow(false)} />
								<div className="profile-link-nav ">
									<Link to="/profile">
										<Image
											className="nav-profile-image mb-2"
											src={user.profile_image}
											width="100px"
											height="100px"></Image>
									</Link>
								</div>
							</Container>
						</Fragment>
					) : (
						<Container className="profile-container">
							<Button as={Link} to="/signup" className="btn-regal">
								Connect
							</Button>
						</Container>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		</Container>
	);
};

export default observer(Navigation);
