// ** SIGN UP page for user creation ** //

//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Col, Row, Image, Toast, Form, Button, Modal, FormFile } from 'react-bootstrap';
//Stores
import UserStore from '../../Stores/UserStore';
//Components
import OnboardingButton from '../../Components/OnboardingButton';

// ** BASIC USER CREATION SCHEMA ** //
const userSchema = {
	wallet_id: null,
	display_name: null,
	email_address: null,
	email_list: false,
};

const SignUp = (props) => {
	// ** STORE ** //
	const userStore = useContext(UserStore);
	const { loadUser, createUser, user } = userStore;
	// ** LOCAL STATE ** //
	const [userData, setUserData] = useState(userSchema);
	const [submitButtonText, setSubmitButtonText] = useState('Submit');
	const [validated, setValidated] = useState(false);

	// ** ERROR HANDLING FOR USERS SIGNING UP WITH AN EXISTING ACCOUNT ** //
	useEffect(() => {
		if (window.ethereum && window.ethereum.selectedAddress) {
			loadUser(window.ethereum.selectedAddress).then((res) => {
				if (res !== undefined) {
					return props.history.push('profile');
				}
			});
		}
	}, []);

	// ** FORM INPUT HANDLER ** //
	const handleUserData = (e) => {
		let address = window.ethereum.selectedAddress;
		let key = e.target.name;
		let val = e.target.value;
		if (val === 'on') {
			setUserData((prevState) => {
				let bool = !prevState.email_list;
				return { ...prevState, email_list: bool };
			});
		} else {
			setUserData((prevState) => {
				return {
					...prevState,
					[key]: val,
					['wallet_id']: address,
				};
			});
		}
	};

	// ** SUBMIT AND USER CREATION HANDLER ** //
	const handleSubmit = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			setSubmitButtonText(
				<>
					Creating Profile
					<span className="spinner-border spinner-border-sm mb-1 mt-1 ml-1" />
				</>
			);
			createUser(userData)
				.then((res) => console.log(res))
				.then(() => {
					setTimeout(() => {
						setValidated(true);
					}, 1500);
				});
		}
	};

	return (
		<Container className="signup-container my-5 mb-3 pb-3" fluid>
			{/* ALERT BOX WITH METAMASK MODULE THAT ALLOWS USERS TO INSTALL METAMASK AND GET RE-ROUTED TO OUR SIGN UP PAGE  */}
			{!window.ethereum && (
				<Toast show={true} animation={false} className="toast-1 mx-auto mb-2 pb-2">
					<Toast.Header className="toast-1-header" closeButton={false}>
						<strong className="mx-auto text-majesti font-tertiary">R</strong>
					</Toast.Header>
					<Toast.Body>
						<Row className="pb-1 pt-2">
							<Col md={12} className="text-center pb-3 mb-3 pt-1">
								We weren't able to find your digital wallet!
							</Col>

							<Col md={12} className="text-center pb-3 mb-3 pt-2">
								{/* Imported module to help faciliate metamask user sign up */}
								<OnboardingButton></OnboardingButton>
							</Col>
							<Col md={12} className="text-center pb-3 mb-3 pt-1"></Col>
							<Col className="text-center pb-3 pt-3">
								<small>
									*If you have never used cyptocurrency or interacted with a blockchain website, click
									<a href="#"> here</a> for a quick guide to get started.
								</small>
							</Col>
						</Row>
					</Toast.Body>
				</Toast>
			)}
			{!window.selectedAddress && (
				<Fragment>
					<Toast show={true} animation={false} className="toast-1 mx-auto mb-2 pb-2">
						<Toast.Header className="toast-1-header" closeButton={false}>
							<strong className="mx-auto text-majesti font-tertiary">R</strong>
						</Toast.Header>
						<Toast.Body>
							<Row className="pb-1 pt-2">
								<Col md={12} className="h4 text-center pb-3 mb-3 pt-1">
									Connect with MetaMask <br /> <span className=" h5"> to create an account.</span>
								</Col>

								<Col md={12} className="text-center pb-3 mb-3 pt-2">
									{/* Imported module to help faciliate metamask user sign up */}
									<OnboardingButton></OnboardingButton>
								</Col>
								<Col className="text-center pb-3 pt-3">
									<small>
										*If you have never used cyptocurrency or interacted with a blockchain website, click
										<a href="#"> here</a> for a quick guide to get started.
									</small>
								</Col>
							</Row>
						</Toast.Body>
					</Toast>
				</Fragment>
			)}
			{/* THE FORM MODULE THAT IS ASSOCIATED TO USER CREATION */}
			{window.ethereum && window.ethereum.selectedAddress ? (
				<>
					<Toast show={true} animation={false} className="toast-1 mx-auto mb-2 pb-2">
						<Toast.Header className="toast-1-header" closeButton={false}>
							<strong className="mx-auto text-majesti font-tertiary">R</strong>
						</Toast.Header>
						<Toast.Body>
							<Container>
								<Row>
									<Col md={12}>
										<p className="text-center h4">Create Profile</p>
										<p className="pt-4 text-center pb-2">Enter your email and display name below. A preview of your profile will populate below.</p>
										<p className="pt-4">
											<i className="text-white mr-2 fas fa-link"></i>
											{window.ethereum.selectedAddress.slice(0, 6) + '...' + window.ethereum.selectedAddress.slice(38, 44)}
										</p>
										<Form validated={validated} onSubmit={(e) => handleSubmit(e)} className="text-left pb-2">
											<Form.Group>
												<Form.Label className="text-white">email</Form.Label>
												<Form.Control required type="email" name="email_address" placeholder="" onChange={(e) => handleUserData(e)} />
											</Form.Group>
											<Form.Group>
												<Form.Label className="text-white">display name</Form.Label>
												<Form.Control required maxLength="15" minLength="4" name="display_name" onChange={(e) => handleUserData(e)} />
											</Form.Group>
											<Form.Group as={Row} controlId="formHorizontalCheck">
												<Col className="pt-2">
													<Form.Check name="email_list" type="switch" id="custom-switch" label={<small>subscribe to newsletter</small>} onChange={(e) => handleUserData(e)} />
												</Col>
											</Form.Group>
											<div className="text-center pt-4">
												<Button type="submit">{submitButtonText}</Button>
											</div>
										</Form>
										<div className="pt-5">
											<small>* We don't share your email with anyone. It's a utility strictly for providing an extra level of security for our users and community.</small>
										</div>
									</Col>
								</Row>
							</Container>
						</Toast.Body>
					</Toast>
				</>
			) : null}
		</Container>
	);
};

export default SignUp;
