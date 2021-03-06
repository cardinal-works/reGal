//Modules
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Container, Image, Row, Col } from 'react-bootstrap';
import MetaMaskOnboarding from '@metamask/onboarding';
import MetaMaskHelp from '../../../assets/images/metamask-help-1.png';
import mmlogo from "../../../assets/images/metamask.svg"

const oData = {
  onboard_text: 'install MetaMask',
  connect_text: [<Image className="mmlogo" width="20px" src={mmlogo}/>],
  connected_text: 'connected',
};


const OnboardingButton = (props) => {
	const [buttonText, setButtonText] = useState(oData.onboard_text);
	const [isDisabled, setDisabled] = useState(false);
	const [accounts, setAccounts] = useState([]);
	const [redirect, setRedirect] = useState(<></>);
	const onboarding = useRef();


	useEffect(() => {
		if (!onboarding.current) {
			onboarding.current = new MetaMaskOnboarding();
		}
	}, []);

	useEffect(() => {
		if (MetaMaskOnboarding.isMetaMaskInstalled()) {
			if (accounts.length > 0) {
				setButtonText(oData.connected_text);
				setDisabled(true);
				onboarding.current.stopOnboarding();
			} else {
				setButtonText(oData.connect_text);
				setDisabled(false);
			}
		}
	}, [accounts]);

	useEffect(() => {
		function handleNewAccounts(newAccounts) {
			setAccounts(newAccounts);
		}
		if (MetaMaskOnboarding.isMetaMaskInstalled()) {
			// window.ethereum.request({ method: 'eth_requestAccounts' }).then((res) => handleNewAccounts);
			// window.ethereum.on('accountsChanged', handleNewAccounts);
			// return () => {
				// window.ethereum.off('accountsChanged', handleNewAccounts);
        // window.location.reload()
			// };
		}
	}, []);

	const onClick = () => {
		if (MetaMaskOnboarding.isMetaMaskInstalled()) {
			window.ethereum.request({ method: 'eth_requestAccounts' }).then((newAccounts) => {
				setAccounts(newAccounts);
				window.location.reload()
			});
		} else {
			onboarding.current.startOnboarding();
		}
	};

	return (
		<Container>
			{buttonText === 'connected' ? (
				<></>
			) : (
				<Button disabled={isDisabled} onClick={onClick} className="mt-2 onboarding-button">
					{buttonText}
				</Button>
			)}
			{/* {buttonText == [<Image className="mmlogo" width="20px" src={mmlogo}/>] ? ( */}
				<Fragment>
					<Container>
						<Row className="pt-4 mb-4 pb-4">
							<Col>
								<Image src={MetaMaskHelp} width="200px" className="metamask-help-1"></Image>
							</Col>
							<Col className="pt-2" md={12}>
								<small>nothing happening? check the extension notifications in your browser's toolbar</small>
							</Col>
						</Row>
					</Container>
				</Fragment>
			{/* ) : null} */}
			{redirect}
		</Container>
	);
};

export default OnboardingButton;
// canyon forget bus only anger act brother fever right together kitten happy