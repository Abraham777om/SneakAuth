const Contracts = artifacts.require("Contract");

module.exports = function (deployer){
    deployer.deploy(Contracts);
};

