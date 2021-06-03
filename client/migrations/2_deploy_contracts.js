var RegalAuction = artifacts.require("./RegalAuction.sol");
// DeedRepository => 0xbb55adc67f64d1e6f08ba7523ecd2eca2ee434a3
module.exports = function(deployer) {
  deployer.deploy(RegalAuction);
};
