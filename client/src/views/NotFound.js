import React from 'react';
import { Flex, Heading, ButtonGroup, Button, Container } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
    const navigate = useNavigate();

    return <Container padding="10">
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
            <Heading as="h1" size="xl" padding="2">404</Heading>
            <Heading as="h2" size="lg" padding="2">Page not found</Heading>
            <ButtonGroup spacing={4} padding="2">
                <Button variant="outline" href="/" onClick={() => navigate("/")}>Home</Button>
            </ButtonGroup>
        </Flex>
    </Container>
}
export default NotFound;