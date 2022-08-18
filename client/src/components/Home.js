import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Container,
    Flex
} from '@chakra-ui/react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => setAddress(event.target.value);
    const handleSubmit = () => {
        navigate(`/campaigns/${address}`);
    }

    return (
        <Container padding="5">
            <Flex justifyContent="flex-start" alignItems="flex-start" flexDirection="column">
                <FormControl>
                    <FormLabel>
                        Contract Address
                    </FormLabel>
                    <Input type="text" value={address} onChange={handleChange} />
                </FormControl>
                <Button
                    mt={4}
                    colorScheme='teal'
                    type='submit'
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Flex>
        </Container>


    )
}
export default Home;