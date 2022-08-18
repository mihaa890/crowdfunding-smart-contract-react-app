pragma solidity >=0.4.22 <0.9.0;

contract CrowdFunding{
    enum State {
        ON_GOING,
        FAILED,
        SUCCEEDED,
        PAID_OUT
    }
    event CampaignFinished(
        address addr,
        uint totalCollected,
        bool succeeded
    );

    string public name;
    uint public targetAmount;
    uint public fundingDeadLine;
    address payable public beneficiary;

    State public state;

    //how much each address has contributed
    mapping (address => uint) public amounts;
    bool public collected;
    uint public totalCollected;

    modifier inState(State expectedState) {
        require(state == expectedState, "Invalid state");
        //execute the body of the method
        _;
    }

    /*
    * @name the name of the campaign
    * @targetAmount the target amount of the campaign
    * @fundingDeadLine the deadline of the campaign
    * @beneficiary the address of the beneficiary
    * @state the state of the contract
    */
    constructor(string memory _name, uint _targetAmount, uint _fundingDeadLine, address payable _beneficiary){
        name = _name;
        targetAmount = _targetAmount * 1 ether; // convert to weis
        fundingDeadLine = currentTime() + _fundingDeadLine * 1 minutes;
        beneficiary = _beneficiary;
        state = State.ON_GOING; 
    }

    function currentTime() internal view returns (uint){
        return block.timestamp;
    }


    function contribute() public payable inState(State.ON_GOING){
        require(beforeDeadline(), "Campaign is not active");

        amounts[msg.sender] += msg.value;
        totalCollected += msg.value;

        totalCollected >= targetAmount ? collected = true : collected = false;
    }

    function beforeDeadline() internal view returns (bool){
        return currentTime() < fundingDeadLine;
    }

    function finishCrowdFunding() public inState(State.ON_GOING){
        require(beforeDeadline(), "Campaign is not active");

        !collected ? state = State.FAILED : state = State.SUCCEEDED;

        emit CampaignFinished(msg.sender, totalCollected, collected);
    }

    function collect() public inState(State.SUCCEEDED){
        !beneficiary.send(totalCollected) ? state = State.PAID_OUT : state = State.FAILED;
    }

    function widthdraw() public inState(State.FAILED){
        require(amounts[msg.sender] > 0, "No money to withdraw");
        
        uint contributed = amounts[msg.sender];
        amounts[msg.sender] = 0;

        if(!payable(msg.sender).send(contributed)){
            amounts[msg.sender] = contributed;
    }
}

}

