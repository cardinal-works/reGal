//Modules
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
//Contracts
import ProfileNftDisplay from '../ProfileNftDisplay';
import UserStore from '../../Stores/UserStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import ipfs from '../../ipfs';
var Buffer = require('buffer/').Buffer;
//Media

const CreateModal = (props) => {
	return (
		<Fragment>
			<Modal
				{...props}
				size="sm"
				className="create-modal"
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Body>
					<Container className="create-container">
						<Row className="text-center">
							<Col lg={12} className="text-center mb-5 mt-4">
								<span className="text-white font-primary text-majesti">R</span>
							</Col>
							<Col lg={12} className="mx-auto mb-3">
								<Link to="/minter">
									<Button className="btn-regal" onClick={props.onHide}>
										NFT
									</Button>
								</Link>
							</Col>
							<Col lg={12} className="mx-auto mb-5">
								<Link to="/auction-house">
									<Button className="btn-regal " onClick={props.onHide}>
										AUCTION
									</Button>
								</Link>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		</Fragment>
	);
};

export default observer(CreateModal);
