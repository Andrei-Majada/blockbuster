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
    Badge,
    Center,
    useToast,
    Textarea,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Stack,
    Button,
    Input,
    FormLabel,
} from '@chakra-ui/react'

import { StarIcon  } from '@chakra-ui/icons'
import { BsPencilSquare, BsStarHalf, BsTrash3Fill } from 'react-icons/bs'
import { useState } from 'react';

import Api from '../services/Api';

function ModalCard({id, image_url, title, rate, description, release_date, children, source, reload}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [openEdit, setOpenEdit] = useState(false)
    const toast = useToast()

    const [titleEdit, setTitleEdit] = useState(title);
    const [descriptionEdit, setDescriptionEdit] = useState(description);
    const [rateEdit, setRateEdit] = useState(rate);
    const [release_dateEdit, setRelease_dateEdit] = useState(release_date);
    const [image_urlEdit, setImage_urlEdit] = useState(image_url);

    const handleNew = () => {
        const date = new Date(release_date)
        const year = date.getFullYear()
        const newDate = new Date()
        const yearNow = newDate.getFullYear()

        return year === yearNow ? true : false
    }

    const handleDelete = () => {
        Api.delete(`/movies/${id}`)
        .then(() => {
            toast({
                title: `Filme Excluído com sucesso!`,
                status: 'success',
                position: 'top',
                isClosable: true,
            })
        })
        .catch(() => {
            toast({
                title: `Não foi possivel Excluir, tente novamente mais tarde!`,
                status: 'error',
                position: 'top',
                isClosable: true,
            })
        })

        onClose()
        reload()
    }

    const handleEdit = () => {
        Api.put(`/movies/${id}`, {
            title: titleEdit,
            rate: rateEdit,
            description: descriptionEdit,
            release_date: release_dateEdit,
            image_url: image_urlEdit
        })
        .then(() => {
            toast({
                title: `Filme Atualizado com sucesso!`,
                status: 'success',
                position: 'top',
                isClosable: true,
            })
        })
        .catch(() => {
            toast({
                title: `Não foi possivel Atualizar, tente novamente mais tarde!`,
                status: 'error',
                position: 'top',
                isClosable: true,
            })
        })

        setOpenEdit(false)
        onClose()
        reload()
    }

    const handleFav = () => {
        Api.put(`/movies/${id}`, {
            isFavorite: source === 'home' ? true : false
        })
        .then(() => {
            toast({
                title: source === 'home' ? `Filme adicionado aos favoritos!` : `Filme removido dos favoritos!`,
                status: 'success',
                position: 'top',
                isClosable: true,
            })
        })
        .catch(() => {
            toast({
                title: `Não foi possivel ${source === 'home' ? 'adicionar' : 'remover'}, tente novamente mais tarde!`,
                status: 'error',
                position: 'top',
                isClosable: true,
            })
        })

        if (source === 'home'){
            reload()
        } else {
            onClose()
            reload()
        }
    }

    return (
    <>
    <Box as='button' onClick={onOpen}>{children}</Box>
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader alignSelf='center'>{title || ' '}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Center overflow='hidden'>
                <Image htmlHeight='450px' htmlWidth='300px' borderRadius='lg' src={image_url} fallbackSrc='https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'/>
            </Center>
            <Box pt='3'>
                <Text
                    fontSize='sm'
                    textColor='black'
                    fontWeight='bold'
                    noOfLines={2}
                    textAlign='center'
                >
                    {description || ' '}
                </Text>
            </Box>
            <Box display='flex' pt='0.5rem' justifyContent='space-around'>
                <Box>
                {Array(5)
                .fill('')
                .map((_, i) => (
                    <StarIcon
                    key={i}
                    color={i < parseInt(rate, 10) ? 'orange' : 'gray.300'}
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
                    { handleNew() && 
                        <Badge colorScheme='red'>Novo</Badge>
                    }
                </Box>
                <Box
                    color='Black'
                    fontWeight='bold'
                    letterSpacing='wide'
                    alignSelf='flex-end'
                    fontSize='xs'
                    ml='2'
                    >
                    {release_date || ' '}
                </Box>
            </Box>
        </ModalBody>
        <ModalFooter justifyContent='space-around' pb='2rem'>
            <IconButton
                colorScheme={source === 'home' ? 'green' : 'red'}
                aria-label={source === 'home' ? 'Favoritar filme' : 'Remover dos favoritos'}
                icon={<BsStarHalf />}
                onClick={handleFav}
            />
            <IconButton
                colorScheme='blue'
                aria-label='Editar filme'
                icon={<BsPencilSquare />}
                onClick={() => setOpenEdit(true)}
            />
            <IconButton
                colorScheme='gray'
                aria-label='Excluir filme'
                icon={<BsTrash3Fill />}
                onClick={handleDelete}
            />
        </ModalFooter>
        </ModalContent>
    </Modal>
    { openEdit && 
        <Drawer
            isOpen={openEdit}
            placement='right'
            onClose={() => setOpenEdit(false)}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
                Adicionar um filme
            </DrawerHeader>

            <DrawerBody>
                <Stack spacing='24px'>
                <Box>
                    <FormLabel>Título</FormLabel>
                    <Input
                    id='title'
                    value={titleEdit}
                    placeholder='"Forest Gump"'
                    onChange={(v) => setTitleEdit(v.target.value)}
                    />
                </Box>
                <Box>
                    <FormLabel>Resumo</FormLabel>
                    <Textarea
                        id='desc'
                        value={descriptionEdit}
                        placeholder='"Filme de comédia em que o protagonista conta suas histórias"'
                        resize='none'
                        onChange={(v) => setDescriptionEdit(v.target.value)}
                    />
                </Box>
                <Box>
                    <FormLabel>Avaliação</FormLabel>
                    <Slider defaultValue={parseInt(rate, 10)} min={1} max={5} step={1} colorScheme='teal' onChange={(v) => setRateEdit(v)}
                    >
                        <SliderMark value={1} mt='2' fontSize='sm'>
                            1
                        </SliderMark>
                        <SliderMark value={2} mt='2' fontSize='sm'>
                            2
                        </SliderMark>
                        <SliderMark value={3} mt='2' fontSize='sm'>
                            3
                        </SliderMark>
                        <SliderMark value={4} mt='2' fontSize='sm'>
                            4
                        </SliderMark>
                        <SliderMark value={5} mt='2' fontSize='sm'>
                            5
                        </SliderMark>
                        <SliderTrack >
                            <Box position='relative' right={10} />
                            <SliderFilledTrack bg='tomato' />
                        </SliderTrack>
                        <SliderThumb boxSize={6} />
                    </Slider>
                </Box>
                <Box>
                    <FormLabel>URL da imagem</FormLabel>
                    <Input
                    id='imageURL'
                    value={image_urlEdit}
                    placeholder='"http://image.com"'
                    onChange={(v) => setImage_urlEdit(v.target.value)}
                    />
                </Box>
                <Box pt='1.5rem'>
                    <FormLabel>Data de Lançamento</FormLabel>
                    <Input
                    size="md"
                    value={release_dateEdit}
                    type="date"
                    onChange={(v) => setRelease_dateEdit(v.target.value)}
                    />
                </Box>
                </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
                <Button variant='outline' mr={3} onClick={() => setOpenEdit(false)}>
                Cancelar
                </Button>
                <Button colorScheme='blue' onClick={handleEdit} >Atualizar</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    }
    </>
    )
}

export default ModalCard;