import { useEffect, useState } from 'react'; 
import Home from './Home';
import NavItem from '../components/NavItem';
import Favoritos from './Favoritos';
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
  Flex, 
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

function Base() {
  const [home, setHome] = useState(true);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [rating, setRating] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [imageURL, setImageURL] = useState('');

  const [movies, setMovies] = useState([
    {
        imageUrl: 'https://www.ofuxico.com.br/wp-content/uploads/2021/12/Harry-Potter-foto.jpg',
        title: 'Harry Potter',
        rating: 4,
        summary: 'Modern home in city center in the heart of historic Los Angeles'
    },
    {
        imageUrl: 'https://www.ofuxico.com.br/wp-content/uploads/2021/12/Harry-Potter-foto.jpg',
        title: 'Harry Potter',
        rating: 3,
        summary: 'Modern home in city center in the heart of historic Los Angeles',
        date: '23/04/2019'
    },
    {
        imageUrl: 'https://www.ofuxico.com.br/wp-content/uploads/2021/12/Harry-Potter-foto.jpg',
        title: 'Harry Potter',
        rating: 1,
        summary: 'Modern home in city center in the heart of historic Los Angeles',
        date: '23/04/2019'
    },
    {
        imageUrl: 'https://www.ofuxico.com.br/wp-content/uploads/2021/12/Harry-Potter-foto.jpg',
        title: 'Harry Potter',
        rating: 5,
        summary: 'Modern home in city center in the heart of historic Los Angeles',
        date: '23/04/2019'
    },
    {
        imageUrl: 'https://www.ofuxico.com.br/wp-content/uploads/2021/12/Harry-Potter-foto.jpg',
        title: 'Harry Potter',
        rating: 2,
        summary: 'Modern home in city center in the heart of historic Los Angeles',
        date: '23/04/2019'
    },
    {
        imageUrl: 'https://www.ofuxico.com.br/wp-content/uploads/2021/12/Harry-Potter-foto.jpg',
        title: 'Harry Potter',
        rating: 4,
        summary: 'Modern home in city center in the heart of historic Los Angeles',
        date: '23/04/2019'
    },
]);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const handleHomePage = () => {
    setHome(true)
  }

  const handleFavPage = () => {
    setHome(false)
  }

  const handleCreateMovie = () => {
    Api.post('/movies', {
      title: title,
      rate: rating,
      description: summary
    })
    .then((response) => {
      toast({
        title: `Filme Adicionado com sucesso!`,
        status: 'success',
        isClosable: true,
      })
    })
    .catch(() => {
      toast({
        title: `Não foi possivel Adicionar, verifique os dados!`,
        status: 'error',
        isClosable: true,
    })
    })

    onClose()
  }

  return (
  <Flex 
    color='white'
    h='100vh'
    bgColor='#a9c1c6'
  >
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
                <NavItem onCLick={handleHomePage} title="Home"/>
                <NavItem onCLick={handleFavPage} title="Favoritos"/>
            </Flex>
            <Flex
                p="5% 5% 15% 5%"
                flexDir="column"
                w="100%"
                alignItems="flex-end"
                as="nav"
            >
                <Button colorScheme='green' w="100%" onClick={onOpen}>Adicionar</Button>
            </Flex>
        </Flex>
    {home ? 
    <Home /> :
    <Favoritos />
  }
  { isOpen && 
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
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
                  onChange={(v) => setSummary(v.target.value)}
                  />
              </Box>
              <Box>
                <FormLabel>Avaliação</FormLabel>
                <Slider defaultValue={1} min={1} max={5} step={1} colorScheme='teal' onChange={(v) => setRating(v)}
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
                  onChange={(v) => setImageURL(v.target.value)}
                />
              </Box>
              <Box pt='1.5rem'>
                <FormLabel>Data de Lançamento</FormLabel>
                <Input
                  size="md"
                  type="date"
                  onChange={(v) => setDueDate(v.target.value)}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='blue' onClick={handleCreateMovie} >Criar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  }
  </Flex>
  );
}

export default Base;
