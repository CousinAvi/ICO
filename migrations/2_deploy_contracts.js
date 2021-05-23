var Token = artifacts.require("./Token.sol");
var TokenCrowdSale = artifacts.require("./TokenCrowdSale.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Token, "Token", "TKN", 18);
  token = await Token.deployed();

  await deployer.deploy(TokenCrowdSale, Token.address, 1, 1000, 5000, 1621741094, 1621846094);
  await token.passMinterRole(TokenCrowdSale.address);
};
