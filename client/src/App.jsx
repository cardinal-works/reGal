//Modules
import React from 'react';
import { Route, Switch } from 'react-router-dom';
//Components
import Landing from './Pages/Landing';
import Farm from './Pages/Farm';
import Explore from './Pages/Explore';
import Profile from './Pages/Profile';
import NftMinter from './Pages/NftMinter';
import Auction from './Pages/Auction';
import AuctionHouse from './Pages/AuctionHouse';
import DetailedView from './Pages/DetailedView';
import ProfileSettings from './Pages/ProfileSettings';
import ComponentWrapper from './Components/ComponentWrapper';
import Whitepaper from './Pages/Whitepaper';
import SignUp from './Pages/SignUp';
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({ ethers }) => {
	return (
		<Switch>
			<ComponentWrapper ethers={ethers}>
				<Route exact path="/" component={Explore} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/explore">
					<Explore ethers={ethers} />
				</Route>
				<Route exact path="/auction-house">
					<AuctionHouse ethers={ethers} />
				</Route>
				<Route exact path="/dashboard" component={ProfileSettings} />
				<Route exact path="/whitepaper" component={Whitepaper} />
				<Route exact path="/details/:id">
					<DetailedView ethers={ethers} />
				</Route>
				<Route exact path="/farm">
					<Farm ethers={ethers} />
				</Route>
				<Route exact path="/minter">
					<NftMinter ethers={ethers} />
				</Route>
				<Route exact path="/auction/:id">
					<Auction ethers={ethers} />
				</Route>
			</ComponentWrapper>
		</Switch>
	);
};

export default App;
