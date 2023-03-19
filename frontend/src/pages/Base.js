import { useEffect, useState } from 'react'; 
import Home from './Home';
import NavItem from '../components/NavItem';
import Fav from './Fav';
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
  FormControl
} from '@chakra-ui/react'
import Api from '../services/Api';

function Base() {
  const [home, setHome] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState(0);
  const [release_date, setRelease_date] = useState('');
  const [image_url, setImage_url] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [disableAddButton, setDisableAddButton] = useState(true)
  const toast = useToast()

  const handleHomePage = () => {
    setHome(true)
  }

  const handleFavPage = () => {
    setHome(false)
  }

  useEffect(() => {
    if (title !== '' && description !== '' && release_date !== '' && image_url !== '') {
      setDisableAddButton(false)
    } else {
      setDisableAddButton(true)
    }
  },[title, description, release_date, image_url])

  useEffect(() => {
    setTitle('')
    setDescription('')
    setRate(1)
    setImage_url('')
    setRelease_date('')
  }, [isOpen])

  const handleCreateMovie = () => {
    console.log(release_date)
    console.log(image_url)
    Api.post('/movies', {
      title: title,
      rate: rate,
      description: description,
      release_date: release_date,
      image_url: image_url,
      isFavorite: false
    })
    .then(() => {
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

    onClose()
    setDisableAddButton(true)
  }

  return (
  <Flex 
    color='white'
    minH='100vh'
    bgColor='#a9c1c6'
    bgSize='revert-layer'
  >
    <Flex
            pos="fixed"
            left="5"
            h="95vh"
            bgColor='white'
            marginTop="2.5vh"
            marginRight="2.5vw"
            boxShadow="lg"
            borderRadius="12px"
            w="15vw"
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
                <Button colorScheme='green' w="100%" onClick={() => {
                  setDisableAddButton(true)
                  onOpen()
                }}>Adicionar</Button>
            </Flex>
        </Flex>
        <Flex ml='17vw'>
        {home ? 
          <Home /> :
          <Fav />
        }
        </Flex>
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
                <FormControl isRequired>
                  <FormLabel>Título</FormLabel>
                  <Input
                    id='title'
                    placeholder='"Forest Gump"'
                    onChange={(v) => setTitle(v.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
              <FormControl isRequired>
                <FormLabel>Resumo</FormLabel>
                  <Textarea
                    id='desc'
                    placeholder='"Filme de comédia em que o protagonista conta suas histórias"'
                    resize='none'
                    onChange={(v) => setDescription(v.target.value)}
                    />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                <FormLabel>Avaliação</FormLabel>
                  <Slider defaultValue={1} min={1} max={5} step={1} colorScheme='teal' onChange={(v) => setRate(v)}>
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
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>URL da imagem</FormLabel>
                  <Input
                    id='imageURL'
                    placeholder='"http://image.com"'
                    onChange={(v) => setImage_url(v.target.value)}
                  />
                </FormControl>
              </Box>
              <Box pt='1.5rem'>
                <FormControl isRequired>
                  <FormLabel>Data de Lançamento</FormLabel>
                  <Input
                    size="md"
                    type="date"
                    onChange={(v) => setRelease_date(v.target.value)}
                  />
                </FormControl>
              </Box>
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button isDisabled={disableAddButton} colorScheme='blue' onClick={handleCreateMovie} >Criar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  }
  </Flex>
  );
}

export default Base;
