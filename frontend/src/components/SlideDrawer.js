import { useEffect, useState } from 'react'; 
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    Stack,
    Button,
    Input,
    FormLabel,
    useDisclosure,
    Textarea,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    useToast,
} from '@chakra-ui/react'
import Api from '../services/Api';

function SlideDrawer({ handleOpen }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rate, setRate] = useState(0);
    const [release_date, setRelease_date] = useState('');
    const [image_url, setImage_url] = useState('');

    const [open, setOpen] = useState(false)
    const toast = useToast()

    const handleCreateMovie = () => {
        console.log(release_date)
        console.log(image_url)
        Api.post('/movies', {
        title: title,
        rate: rate,
        description: description,
        release_date: release_date,
        image_url: image_url
        })
        .then((response) => {
        toast({
            title: `Filme Adicionado com sucesso!`,
            status: 'success',
            position: 'top',
            isClosable: true,
        })
        })
        .catch(() => {
        toast({
            title: `Não foi possivel Adicionar, verifique os dados!`,
            status: 'error',
            position: 'top',
            isClosable: true,
        })
        })

        setOpen(false)
    }

    return (
        <Drawer
            isOpen={open}
            placement='right'
            onClose={!open}
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
                    placeholder='"Forest Gump"'
                    onChange={(v) => setTitle(v.target.value)}
                    />
                </Box>
                <Box>
                    <FormLabel>Resumo</FormLabel>
                    <Textarea
                    id='desc'
                    placeholder='"Filme de comédia em que o protagonista conta suas histórias"'
                    resize='none'
                    onChange={(v) => setDescription(v.target.value)}
                    />
                </Box>
                <Box>
                    <FormLabel>Avaliação</FormLabel>
                    <Slider defaultValue={1} min={1} max={5} step={1} colorScheme='teal' onChange={(v) => setRate(v)}
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
                    placeholder='"http://image.com"'
                    onChange={(v) => setImage_url(v.target.value)}
                    />
                </Box>
                <Box pt='1.5rem'>
                    <FormLabel>Data de Lançamento</FormLabel>
                    <Input
                    size="md"
                    type="date"
                    onChange={(v) => setRelease_date(v.target.value)}
                    />
                </Box>
                </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
                <Button variant='outline' mr={3} onClick={!open}>
                Cancelar
                </Button>
                <Button colorScheme='blue' onClick={handleCreateMovie} >Criar</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default SlideDrawer;
