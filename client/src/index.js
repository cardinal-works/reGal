import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import Web3 from 'web3';
import { ParallaxProvider } from 'react-scroll-parallax';
import App from './App.jsx';
import history from "./History";
import { ethers } from "ethers"
import truffleConfig from "../truffle-config";
//CSS
import "../assets/fonts/Majesti-Banner/Majesti-Banner-BoldItalic.otf"
import "../assets/styles/Custom.scss";

// var web3Location = `http://localhost:${truffleConfig.networks.regal.port}`;

// const provider = new ethers.providers.Web3Provider(window.ethereum)
let provider = ethers.getDefaultProvider('ropsten');

//import our Landing, that is linked to the root and 
window.addEventListener('load', function() {                    
  // var web3Provided;  
  // if (typeof web3 !== 'undefined') {                                             
  //   web3Provided = new Web3(web3.currentProvider);               
  // } else {                                                      
  //   web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location))
  // }   
  ReactDOM.render(
    <ParallaxProvider>
      <BrowserRouter history={history}>
        <App ethers={provider}/>
    </BrowserRouter>
    </ParallaxProvider>,
    document.getElementById('root')
  );
});
