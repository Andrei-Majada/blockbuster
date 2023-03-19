import React from 'react'
import {
    Flex,
    Button
} from '@chakra-ui/react'
import { FiHome, FiStar } from 'react-icons/fi'

export default function NavItem({ title, onCLick }) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems="flex"
        >
            <Button onClick={onCLick} leftIcon={title === 'Home' ? <FiHome /> : <FiStar />} variant='solid'>
                {title}
            </Button>
        </Flex>
    )
}