import { useEffect } from 'react'; 
import { Box, Grid } from '@chakra-ui/react'
import Card from '../components/Card';
import ModalCard from '../components/Modal';

function Home() {

  // const [movies, setMovies] = useState([]);

    return (
        <Box flex='5'>
            <Grid  templateColumns='repeat(4, 1fr)' gap={6} p='1rem'>
            <ModalCard><Card /></ModalCard>
            <ModalCard><Card /></ModalCard>
            <ModalCard><Card /></ModalCard>
            <ModalCard><Card /></ModalCard>
            <ModalCard><Card /></ModalCard>
            <ModalCard><Card /></ModalCard>
            <ModalCard><Card /></ModalCard>
            <ModalCard><Card /></ModalCard>
            <ModalCard><Card /></ModalCard>
            <ModalCard><Card /></ModalCard>
            <ModalCard><Card /></ModalCard>
            <ModalCard><Card /></ModalCard>
            <ModalCard><Card /></ModalCard>
            </Grid>
        </Box>
    );
}

export default Home;
