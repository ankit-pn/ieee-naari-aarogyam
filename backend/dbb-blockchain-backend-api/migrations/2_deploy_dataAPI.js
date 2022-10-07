const data = artifacts.require("./dataAPI.sol");

module.exports = function(deployer) {
  deployer.deploy(data);
};