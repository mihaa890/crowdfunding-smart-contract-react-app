let CrowdFunding = artifacts.require("./CrowdFunding");

contract('CrowdFunding', function(accounts) {
    let contract;
    let contractCreator = accounts[0];
    let owner = accounts[1];

    const ONE_ETH = 1000000000000000000;
    const ON_GOING_STATE = '0';
    const SUCCESS_STATE = '1';
    const FAIL_STATE = '2';
    const PAID_OUT_STATE = '3';

    beforeEach(async function() {
        contract = await CrowdFunding.new(
            'funding',
            1,
            10,
            owner,
            {from: contractCreator,
            gas: 1000000
        }

        );
    });
    it('should be able to create a new contract', async function() {
        let campaignName = await contract.name.call();
        expect(campaignName).to.equal('funding');

        let targetAmount = await contract.targetAmount.call();
        expect(targetAmount.toNumber()).to.equal(ONE_ETH);

        let actualBeneficiary  = await contract.beneficiary.call();
        expect(actualBeneficiary).to.equal(owner);

        let state = await contract.state.call();
        expect(state.valueOf()).to.equal(ON_GOING_STATE);


    });

});