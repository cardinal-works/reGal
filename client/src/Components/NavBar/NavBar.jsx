//Modules
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Nav, Navbar, Image, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserStore from '../../Stores/UserStore';
import { observer } from 'mobx-react-lite';
import CreateModal from "../CreateModal"

const Navigation = () => {
	const userStore = useContext(UserStore);
	const [modalShow, setModalShow] = useState(false);
	const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;

	useEffect(() => {
		loadUser(window.ethereum.selectedAddress).then((res) => setUserChanges(res));
	}, []);

	return (
		<Navbar collapseOnSelect expand="lg" variant="dark">
			<Navbar.Brand
				as={Link}
				to="/explore"
				className="text-majesti mr-3 mt-4"
				style={{ fontSize: '4.5em' }}>
				REGAL
			</Navbar.Brand>
			<Navbar.Toggle className="mb-2" aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="nav-top mt-3">
					<Nav.Link as={Link} to="/explore">
						explore
					</Nav.Link>
					{/* <Nav.Link as={Link} to="/profile">
						profile
					</Nav.Link> */}
					<Nav.Link as={Link} to="/#">
						farm
					</Nav.Link>
				</Nav>
				<Nav className="nav-profile-image-link">
					{user ? (
						<Fragment>
							<Container className="profile-container">
								<Button
									as={Link}
									onClick={() => setModalShow(true)}
									className="btn-regal mr-4 mt-2">
									CREATE
								</Button>

								<CreateModal
									show={modalShow}
									onHide={() => setModalShow(false)}
								/>
								<div className="profile-link-nav ">
									<Link to="/profile">
										<Image
											className="nav-profile-image mb-2"
											src={user.profile_image}
											width="70px"
											height="70px"></Image>
									</Link>
								</div>
							</Container>
						</Fragment>
					) : (
						<Button as={Link} to="/signup" className="btn-regal">
							CONNECT
						</Button>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default observer(Navigation);
