//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Col, Row, Image, Toast, Form, Button, Modal, FormFile } from 'react-bootstrap';
import MetaMask from '../../../assets/images/metamask.svg';
import { Link, Redirect } from 'react-router-dom';
// import WalletSupport from '../../Components/WalletSupport/WalletSupport';
import UserStore from '../../Stores/UserStore';
import OnboardingButton from '../../Components/OnboardingButton';

const userSchema = {
	wallet_id: null,
	display_name: null,
	email_address: null,
	email_list: false,
};

const SignUp = (props) => {
	const [userData, setUserData] = useState(userSchema);
	const [validated, setValidated] = useState(false);

	const handleUserData = (e) => {
		let key = e.target.name;
		let val = e.target.value;
		if (val === 'on') {
			setUserData((prevState) => {
				let bool = !prevState.email_list;
				return { ...prevState, email_list: bool };
			});
		} else {
			setUserData((prevState) => {
				return { ...prevState, [key]: val };
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			setValidated(true);
		}
	};

	return (
		<Container className="signup-container mb-1 pb-1" fluid>
			<Toast show={window.ethereum.selectedAddress ? false : true} animation={false} className="toast-1 mx-auto mb-2 pb-2">
				<Toast.Header className="toast-1-header" closeButton={false}>
					<strong className="mx-auto text-majesti font-tertiary">R</strong>
				</Toast.Header>
				<Toast.Body>
					<Row className="pb-1 pt-3">
						{!window.ethereum && (
							<Col md={12} className="text-center pb-3 pt-2">
								We weren't able to find your digital wallet!
							</Col>
						)}
						<Col md={12} className="text-center pb-3 pt-2">
							<OnboardingButton></OnboardingButton>
						</Col>
						{!window.ethereum && (
							<Col className="text-center pb-3 pt-2">
								*If you have never used cyptocurrency or interacted with a blockchain website, click
								<a href="#"> here</a> for a quick guide to get started.
							</Col>
						)}
					</Row>
				</Toast.Body>
			</Toast>
			{window.ethereum.selectedAddress ? (
				<>
					<Toast show={!validated} animation={false} className="toast-1 mx-auto mb-2 pb-2">
						<Toast.Header className="toast-1-header" closeButton={false}>
							<strong className="mx-auto text-majesti font-tertiary">R</strong>
						</Toast.Header>
						<Toast.Body>
							<Container>
								<Row>
									<Col className="text-center pb-2">
										<span className="h4">Create Profile</span>
										<p className="pt-4">
											Enter your email and display name below. A preview of your profile will populate below.
										</p>
									</Col>
									<Col md={12}>
										<Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)} className="text-left pb-2">
											<Form.Group>
												<Form.Label className="text-white">email</Form.Label>
												<Form.Control
													required
													type="email"
													name="email_address"
													placeholder=""
													onChange={(e) => handleUserData(e)}
												/>
											</Form.Group>
											<Form.Group>
												<Form.Label className="text-white">display name</Form.Label>
												<Form.Control
													required
													maxLength="15"
													minLength="4"
													name="display_name"
													onChange={(e) => handleUserData(e)}
												/>
											</Form.Group>
											<Form.Group as={Row} controlId="formHorizontalCheck">
												<Col className="pt-2">
													<Form.Check
														name="email_list"
														type="switch"
														id="custom-switch"
														label={<small>subscribe to newsletter</small>}
														onChange={(e) => handleUserData(e)}
													/>
												</Col>
											</Form.Group>
											<div className="text-center pt-4">
												<Button type="submit">Submit</Button>
											</div>
										</Form>
										<div className="pt-5">
											<small>
												* We don't share your email with anyone. It's a utility strictly for providing an extra
												level of security for our users and community.
											</small>
										</div>
									</Col>
								</Row>
							</Container>
						</Toast.Body>
					</Toast>
					<Toast show={validated} animation={false} className="toast-1 mx-auto mb-2 pb-2">
						<Toast.Header className="toast-1-header" closeButton={false}>
							<strong className="mx-auto text-majesti font-tertiary">R</strong>
						</Toast.Header>
						<Toast.Body>
							<Row className="text-center mx-auto">
								<Col lg={12} md={4} className="profile-preview">
									<Image
										className="profile-banner-image"
										src={'https://gateway.ipfs.io/ipfs/QmVEBTtEo6q7m5KumcfdkaGn91TZiSN4GgZDtmcr7daNZ4'}
									/>
								</Col>
								<Col lg={12} className="profile-preview-bio text-start">
									<br />
									<span className="text-white creator-link font-secondary bio-name ">
										{' @'}
										{userData.display_name}
										<br />
									</span>
									<span className="text-white creator-link bio-text">
										To edit your bio or profile picture, visit your profile page and click on the{' '}
										<i style={{ color: '#f6a615' }} className="fad fa-pencil edit pr-1 pl-1"></i>symbol.
										<br />
									</span>
								</Col>
							</Row>
						</Toast.Body>
					</Toast>
				</>
			) : null}
		</Container>
	);
};

export default SignUp;

/* <span className="text-white" style={{ fontWeight: '900' }}>
									<nobr className="text-majesti">
										<i style={{ fontSize: '12px', color: '#1b68de' }} className="fad fa-badge-check pr-1"></i>verified
									</nobr>
								</span> */

/* <Row className="profile-preview-row">
<Container className="mx-auto">
  <Row className=" text-center">
    <Col lg={3} md={4} className="profile-banner-image-col text-center pb-4">
      <Image className="profile-banner-image" />
    </Col>
    <Col md={5} className="symbols-container">
      <span className="text-white" style={{ fontWeight: '900' }}>
        <nobr className="text-majesti">
          <i style={{ fontSize: '12px', color: '#1b68de' }} className="fad fa-badge-check pr-1"></i>
          verified
        </nobr>
      </span>
       <span className="pl-1">
      <i style={{ fontSize: '14px', color: '#e2c249' }}  className="far fa-star star "></i>
    </span> 
      <br />
      <span className="text-white creator-link font-secondary bio-name ">
        {' @'}
        {display_name} 
        <br />
      </span>
      <span className="text-white creator-link pt-1 bio-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu turpis auctor, rhoncus quam tincidunt,
        dictum purus. In dictum eu lorem in faucibus. Praesent vitae libero ut risus malesuada tristique.
        <br />
      </span>
      <div className="profile-social-div pt-1">
        <i className="fab fa-twitter-square twitter"></i>
        <i className="fab fa-instagram-square instagram"></i>
        <i className="fas fa-share-alt-square website"></i>
      </div>
    </Col>
    <Col md={12} className="">
      <StatsDisplay />
    </Col>
  </Row>
</Container>
</Row> */
