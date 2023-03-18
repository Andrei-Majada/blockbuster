import { useState } from 'react'; 
import Home from './Home';
import NavItem from '../components/NavItem';
import Favoritos from './Favoritos';
import SliderRating from '../components/SliderRating'
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
  Textarea
} from '@chakra-ui/react'

function Base() {
  const [home, setHome] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleHomePage = () => {
    setHome(true)
  }

  const handleFavPage = () => {
    setHome(false)
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
                <FormLabel htmlFor='title'>Título</FormLabel>
                <Input
                  id='title'
                  placeholder='"Forest Gump"'
                />
              </Box>
              <Box>
                <FormLabel htmlFor='desc'>Resumo</FormLabel>
                <Textarea
                  id='desc'
                  placeholder='"Filme de comédia em que o protagonista conta suas histórias"'
                  resize='none'
                  />
              </Box>
              <Box>
                <FormLabel htmlFor='title'>Avaliação</FormLabel>
                <SliderRating />
              </Box>
              <Box pt='1.5rem'>
                <FormLabel htmlFor='title'>Data de Lançamento</FormLabel>
                <Input
                  size="md"
                  type="date"
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  }
  </Flex>
  );
}

export default Base;
