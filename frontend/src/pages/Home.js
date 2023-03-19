import { useEffect, useState } from 'react'; 
import { Box, Grid, Spinner, Center, useToast } from '@chakra-ui/react'
import Card from '../components/Card';
import ModalCard from '../components/Modal';
import Api from '../services/Api';

function Home() {

    const [movies, setMovies] = useState([]);
    const toast = useToast()

    const getMovies = () => {
        Api.get('/movies')
        .then((response) => {
            setMovies(response.data)
        })
        .catch((err) => {
            toast({
                title: `Não foi possivel carregar a lista!`,
                status: 'error',
                position: 'top',
                isClosable: true,
            })
        })
    }

    const reloadPage = () => {}

    useEffect(() => {
        getMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadPage])

    return (
        <Box flex='5'>
            { movies.length > 0 ?
                <Grid  templateColumns='repeat(4, 1fr)' gap={6} p='1rem'>
                    {
                        movies.map((movie, index) => {
                            return(
                                <ModalCard key={index} reload={() => reloadPage} source='home' id={movie._id} image_url={movie.image_url} title={movie.title} rate={movie.rate} description={movie.description} release_date={movie.release_date}>
                                    <Card image_url={movie.image_url} title={movie.title} rate={movie.rate} release_date={movie.release_date} />
                                </ModalCard>
                            )
                        })
                    }
                </Grid>
                :
                <Center alignItems='center'>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    /> 
                </Center>
            }
        </Box>
    );
}

export default Home;
