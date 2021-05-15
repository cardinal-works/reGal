// UTILS
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
// MEDIA
import spaceman from '../../../assets/images/spaceman2.mp4';
import DAI from '../../../assets/images/token-pairs/RGL-DAI.png'
import ETH from '../../../assets/images/token-pairs/RGL-ETH.png'
import USDT from '../../../assets/images/token-pairs/RGL-USDT.png'


const Farm = ({ web3 }) => {
	return (
		<Fragment>
			<Container className="regal-spaceman">
				<video className="spaceman" src={spaceman} loop playsInline autoPlay muted></video>

				<Container className="mt-5" fluid>
					<Row className="mt-5 ">
						<Col className="mx-auto mt-5">
							<Table variant="dark" hover className="table-farm" striped>
								<thead>
									<tr>
										<th className="text-majesti pl-3 pb-3">R</th>
										<th><span>Pair</span></th>
										<th><span>TVL</span></th>
										<th><span>APR</span></th>
										<th><span></span></th>
									</tr>
								</thead>
								<tbody >
									<tr className="table-row">
										<td><img src={DAI} alt="REGAL/DAI PAIR" className="token-pair p-2"/></td>
										<td>RGL/DAI</td>
										<td >10,020</td>
										<td >5.02</td>
										<td ><Button className="btn-regal ml-5">Stake</Button></td>
									</tr>
									<tr className="table-row">
										<td><img src={ETH} alt="REGAL/ETH PAIR" className="token-pair p-2"/></td>
										<td>RGL/ETH</td>
										<td>23,912</td>
										<td>6.00</td>
										<td ><Button className="btn-regal ml-5">Stake</Button></td>
									</tr>
                                    <tr className="table-row">
										<td><img src={USDT} alt="REGAL/USDT PAIR" className="token-pair p-2"/></td>
										<td>RGL/TETHER</td>
										<td>173,492</td>
										<td>4.51</td>
										<td ><Button className="btn-regal ml-5">Stake</Button></td>
									</tr>
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>
			</Container>
		</Fragment>
	);
};

export default observer(Farm);
