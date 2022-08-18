const Migrations = artifacts.require("Migrations");
const CrowdFunding = artifacts.require("CrowdFunding");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(CrowdFunding);
};
