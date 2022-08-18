const CrowdFunding = artifacts.require("CrowdFunding");

module.exports = function(deployer) {
  deployer.deploy(
    CrowdFunding, 
    "Test campaign",
    2,
    200,
    "0xba9CE519b7cbdDd9bcfBF0B8DffD1BC61BCb7058"
  );
};