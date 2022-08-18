import crowdfundingAbi from "./crowdfundingAbi";
import {web3} from "./web3";

export function createContract(contractAddress){
    return new web3.eth.Contract(crowdfundingAbi, contractAddress);
}