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

const App = () => {
	return (
		<Switch>
			<ComponentWrapper >
				<Route exact path="/" component={Explore} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/explore">
					<Explore />
				</Route>
				<Route exact path="/auction-house">
					<AuctionHouse />
				</Route>
				<Route exact path="/dashboard" component={ProfileSettings} />
				<Route exact path="/whitepaper" component={Whitepaper} />
				<Route exact path="/details/:id">
					<DetailedView />
				</Route>
				<Route exact path="/farm">
					<Farm />
				</Route>
				<Route exact path="/minter">
					<NftMinter />
				</Route>
				<Route exact path="/auction/:id">
					<Auction />
				</Route>
			</ComponentWrapper>
		</Switch>
	);
};

export default App;
