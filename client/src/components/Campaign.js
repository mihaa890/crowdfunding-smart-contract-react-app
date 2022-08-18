import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Input,
    Flex,
    Tfoot
} from '@chakra-ui/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { web3 } from '../contracts/web3';
import {
    createContract
} from '../contracts/crowdfundingContract';

export const CampaignState = {
    ON_GOING_STATE: '0',
    FAILED_STATE: '1',
    SUCCEEDED_STATE: '2',
    PAID_OUT_STATE: '3'
}

const Campaign = () => {

    const [campaign, setCampaign] = useState({
        name: '',
        targetAmount: 0,
        totalCollected: 0,
        campaignFinished: false,
        deadline: new Date(0),
        isBeneficiary: false,
        state: ''
    });
    const [contributionAmount, setContributionAmount] = useState(0);
    const { address } = useParams();

    useEffect(() => {
        const _getCampaign = async () => {
            const currentCampaign = await getCampaign(address);
            setCampaign(currentCampaign);
        }
        _getCampaign();
    }, []);


    const getCampaign = async () => {
        const contract = createContract(address);

        const name = await contract.methods.name().call();
        const targetAmount = await contract.methods.targetAmount().call();
        const totalCollected = await contract.methods.totalCollected().call();
        const beforeDeadline = await contract.methods.beforeDeadline().call();
        const beneficiary = await contract.methods.beneficiary().call();
        const deadlineSeconds = await contract.methods.fundingDeadline().call();
        const state = await contract.methods.state().call();

        const deadlineDate = new Date(0);
        deadlineDate.setUTCSeconds(deadlineSeconds);
        const accounts = await web3.eth.getAccounts();

        campaign.name = name;
        campaign.targetAmount = targetAmount;
        campaign.totalCollected = totalCollected;
        campaign.campaignFinished = !beforeDeadline;
        campaign.deadline = deadlineDate;
        campaign.isBeneficiary  =  beneficiary.toLowerCase() === accounts[0].toLowerCase();
        campaign.state = state;

        return campaign;

    }
    const campaignInteraction = () => {
        if (campaign.state === CampaignState.ON_GOING_STATE) {
            return postCampaignInterface();
        }
        else {
            return contributeInterface();
        }
    }

    const postCampaignInterface = () => {
        if (campaign.state === CampaignState.ON_GOING_STATE) {

            return <Button width="120px" margin="10px" mt={4} colorScheme='teal' type='button'>Finished Campaign</Button>
        } else if (campaign.state === CampaignState.SUCCEEDED_STATE && campaign.isBeneficiary === true) {

            return <Button width="120px" margin="10px" mt={4} colorScheme='teal' type='button'>Collect funds</Button>

        } else if (campaign.state === CampaignState.FAILED_STATE) {
            return <Button width="120px" margin="10px" mt={4} colorScheme='teal' type='button'>Refund</Button>
        }
    }



    const contributeInterface = () => {
        return <Flex flexDirection="row" alignItems="center">
            <Button width="120px" margin="10px" mt={4} colorScheme='teal' type='button' onClick={() => onContribute(contributionAmount)} >
                Contribute
            </Button>
            <Input
                width="300px"
                margin="10px"
                type="number"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)} />
        </Flex>
    }
    console.log(campaign)

    const onContribute = async (_contributeAmount) => {
        const accounts = await web3.eth.getAccounts();
        console.log(web3)
        _contributeAmount = web3.utils.toWei(contributionAmount.toString(), 'ether');
        const contract = createContract(address);
        await contract.methods.contribute().send({
            from: accounts[0],
            value: _contributeAmount
        });
        const _campaign = campaign;
        _campaign.totalCollected = Number.parseInt(campaign.totalCollected) + Number.parseInt(contributionAmount);
        setCampaign(_campaign);
    }


    return <Flex flexDirection="column" padding="15px">
        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Target Amount</Th>
                    <Th>Total Collected</Th>
                    <Th>Has finished</Th>
                    <Th>Deadline</Th>
                    <Th>Is beneficiary</Th>
                    <Th>Contract State</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>{campaign.name}</Td>
                    <Td>{campaign.targetAmount}</Td>
                    <Td>{campaign.totalCollected} eth</Td>
                    <Td>{campaign.campaignFinished.toString()}</Td>
                    <Td>{campaign.deadline.toString()}</Td>
                    <Td>{campaign.isBeneficiary.toString()}</Td>
                    <Td>{campaign.state}</Td>
                </Tr>
            </Tbody>
            <Tfoot>
                <Tr>
                    <Td colSpan="7">
                        {campaignInteraction()}
                    </Td>
                </Tr>
            </Tfoot>
        </Table>
    </Flex>
}
export default Campaign;