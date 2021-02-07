import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps{

}

export const NavBar: React.FC<NavBarProps>= ({}) => {
    const [{fetching:logoutFecthing},logout] = useLogoutMutation()
    const [{data,fetching}] = useMeQuery();
    let body;
    if (fetching)
    {
        body = null;
    }else if(!data?.me){
        body = (
            <>
                <NextLink href='/login'>
                    <Link ml={2}  color="white">Login</Link>
                </NextLink>
                <NextLink href = '/register'>
                    <Link ml={2} color="white" >Register</Link>
                </NextLink>
            </>
        )
    }else {
        body = (
            <Flex>
                <Box color="brown">{data.me.username}</Box>
                <Button ml={2}onClick={()=>{logout()}} isLoading={logoutFecthing} color="white" variant ="link">logout</Button>
            </Flex>
        );
    }
        return (
            <Flex bg="tomato" p = {4}>
                <Box  ml="auto">
                    {body}
                </Box>
            </Flex>
        );
}