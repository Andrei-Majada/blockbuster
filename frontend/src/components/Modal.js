import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Image,
    Text,
    IconButton,
} from '@chakra-ui/react'

import { StarIcon,  } from '@chakra-ui/icons'
import { BsPencilSquare, BsStarHalf, BsTrash3Fill } from 'react-icons/bs'

import { useDisclosure } from '@chakra-ui/react';

function ModalCard({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Modern home',
        description: 'lorem ipson lorem ipson lorem ipson lorem ipson lorem ipson lorem ipson lorem ipson lorem ipson lorem ipsonlorem ipson',
        formattedPrice: '$1,900.00',
        reviewCount: 34,
        rating: 4,
    }

    return (
    <>
    <Box as='button' onClick={onOpen}>{children}</Box>
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader alignSelf='center'>{property.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Box overflow='hidden'>
                <Image borderRadius='lg' src={property.imageUrl} alt={property.imageAlt} />
            </Box>
            <Box p='3'>
                <Text
                    fontSize='sm'
                    textColor='black'
                    noOfLines={2}
                >
                    {property.description}
                </Text>
            </Box>
            <Box display='flex' alignItems='center' p='1rem' justifyContent='space-around'>
                <Box>
                {Array(5)
                .fill('')
                .map((_, i) => (
                    <StarIcon
                    key={i}
                    color={i < property.rating ? 'orange' : 'gray.300'}
                    />
                ))}
                </Box>
                <Box
                    color='Black'
                    fontWeight='semibold'
                    letterSpacing='wide'
                    alignSelf='flex-end'
                    fontSize='xs'
                    ml='2'
                    >
                    filme / comédia
                </Box>
                <Box
                    color='Black'
                    fontWeight='semibold'
                    letterSpacing='wide'
                    alignSelf='flex-end'
                    fontSize='xs'
                    ml='2'
                    >
                    24/08/2019
                </Box>
            </Box>
        </ModalBody>
        <ModalFooter justifyContent='space-around' pb='2rem'>
            <IconButton
                colorScheme='green'
                aria-label='Favoritar filme'
                icon={<BsStarHalf />}
                onClick={() => console.log('favoritando')}
            />
            <IconButton
                colorScheme='blue'
                aria-label='Editar filme'
                icon={<BsPencilSquare />}
                onClick={() => console.log('Editando')}
            />
            <IconButton
                colorScheme='gray'
                aria-label='Excluir filme'
                icon={<BsTrash3Fill />}
                onClick={() => console.log('excluindo')}
            />
        </ModalFooter>
        </ModalContent>
    </Modal>
    </>
    )
}

export default ModalCard;