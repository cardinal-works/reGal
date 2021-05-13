//Modules
import React from 'react';
import { Route, Switch } from "react-router-dom";
//Components
import Landing from './Pages/Landing';
import Explore from './Pages/Explore';
import Profile from './Pages/Profile';
import NftMinter from './Pages/NftMinter';
import Auction from './Pages/Auction'
import AuctionHouse from './Pages/AuctionHouse'
import DetailedView from "./Pages/DetailedView";
import ProfileSettings from "./Pages/ProfileSettings"
import ComponentWrapper from './Components/ComponentWrapper';
import Whitepaper from "./Pages/Whitepaper"
import SignUp from "./Pages/SignUp"
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({web3}) => {

    return (
        <Switch>
            <ComponentWrapper>
            <Route exact path='/' component={Explore}/>
                <Route exact path='/signup' component={SignUp}/>
                <Route exact path='/profile' component={Profile}/>
                <Route exact path='/explore'>
                    <Explore web3={web3} />
                </Route>
                <Route exact path='/auction-house'>
                    <AuctionHouse web3={web3} />
                </Route>
                <Route exact path='/dashboard' component={ProfileSettings} />
                <Route exact path='/whitepaper' component={Whitepaper} />
                <Route exact path="/details/:id" component={DetailedView} />
                <Route exact path='/minter'>
                    <NftMinter web3={web3} />
                </Route>
                <Route exact path='/auction/:id'>
                    <Auction web3={web3} />
                </Route>
            </ComponentWrapper>
        </Switch>
    )
}

export default App;