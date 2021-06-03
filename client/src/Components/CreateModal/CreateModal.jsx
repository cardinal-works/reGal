//Modules
import React, { Fragment } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { observer } from 'mobx-react-lite';

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
									<Button className="button-nft" onClick={props.onHide}>
										NFT
									</Button>
								</Link>
							</Col>
							<Col lg={12} className="mx-auto mb-5">
								<Link to="/auction-house">
									<Button className="button-auction" onClick={props.onHide}>
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
