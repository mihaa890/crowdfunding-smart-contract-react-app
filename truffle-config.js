module.exports = {
  networks: {
   ganache:{
    host:"localhost",
    port:7545,
    gas:5000000,
    network_id : 5777 // match any network id
   }
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.16",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
