import React from 'react'
import {
    Flex,
    Button,
    MenuItem,
} from '@chakra-ui/react'
import { FiHome, FiStar } from 'react-icons/fi'
import NavItem from '../components/NavItem'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom'

export default function Sidebar() {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/favoritos`; 
        navigate(path);
    }
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            bgColor='white'
            marginTop="2.5vh"
            marginRight="2.5vw"
            boxShadow="lg"
            borderRadius="12px"
            w="200px"
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems="flex-start"
                as="nav"
            >

                <NavItem icon={FiHome} title="Home"/>
                <Button onClick={() => {
                    navigate("/favoritos");
                }}
                > 
                <NavItem icon={FiStar} title="Favoritos"/>
                </Button>
                
                <Button onClick={() => {
                    navigate("/favoritos");
                }}
                >
                Favoritos
                </Button>

            </Flex>
        </Flex>
    )
}