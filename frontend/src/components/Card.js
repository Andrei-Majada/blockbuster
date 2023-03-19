import { Box, Image, Text} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

function Card({ title, image_url, rate, release_date }) {

    return(
        <Box boxShadow='lg' borderRadius='lg' overflow='hidden' bgColor='white'>
            <Box p='1rem' overflow='hidden'>
                <Image borderRadius='md' src={image_url} fallbackSrc='https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'/>
            </Box>
            <Box>
                <Text
                    fontSize='sm'
                    fontWeight='bold'
                    textColor='black'
                    noOfLines={2}
                    p='0.2rem'
                >
                    {title || ' '}
                </Text>
            </Box>
            <Box display='flex' alignItems='center' p='0 1rem 1rem 1rem' justifyContent='space-around'>
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
                    { release_date || ' '}
                </Box>
            </Box>
        </Box>
    )
}

export default Card;