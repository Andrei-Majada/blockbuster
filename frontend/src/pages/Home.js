import { useEffect, useState } from 'react'; 
import { Box, Grid, Spinner, Center, useToast } from '@chakra-ui/react'
import Card from '../components/Card';
import ModalCard from '../components/Modal';
import Api from '../services/Api';

function Home() {

    const [movies, setMovies] = useState([]);
    const toast = useToast()

    useEffect(() => {
        Api.get('/movies')
        .then((response) => {
            console.log(response)
            setMovies(response)
        })
        .catch((err) => {
            toast({
                title: `${err} toast`,
                status: err,
                isClosable: true,
            })
        })
    }, [])

    return (
        <Box flex='5'>
            { movies.lenth > 0 ?
                <Grid  templateColumns='repeat(4, 1fr)' gap={6} p='1rem'>
                    {
                        movies.map((movie, index) => {
                            return(
                                <ModalCard key={index} imageUrl={movie.imageUrl} title={movie.title} rating={movie.rating} summary={movie.summary} date={movie.date}>
                                    <Card imageUrl={movie.imageUrl} title={movie.title} rating={movie.rating} />
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
