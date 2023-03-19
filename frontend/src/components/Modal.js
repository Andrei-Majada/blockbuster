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

function ModalCard({imageUrl, title, rating, summary, date, children}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
    <>
    <Box as='button' onClick={onOpen}>{children}</Box>
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader alignSelf='center'>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Box overflow='hidden'>
                <Image borderRadius='lg' src={imageUrl} fallbackSrc='https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'/>
            </Box>
            <Box p='3'>
                <Text
                    fontSize='sm'
                    textColor='black'
                    noOfLines={2}
                >
                    {summary}
                </Text>
            </Box>
            <Box display='flex' alignItems='center' p='1rem' justifyContent='space-around'>
                <Box>
                {Array(5)
                .fill('')
                .map((_, i) => (
                    <StarIcon
                    key={i}
                    color={i < rating ? 'orange' : 'gray.300'}
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
                    {date}
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