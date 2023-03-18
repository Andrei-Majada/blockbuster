import { Box, Image, Text} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

function Card() {

    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Modern home in city center in the heart of historic Los Angeles',
        formattedPrice: '$1,900.00',
        reviewCount: 34,
        rating: 4,
    }

    return(
        <Box boxShadow='lg' borderRadius='lg' overflow='hidden' bgColor='white'>
            <Box p='1rem' overflow='hidden'>
                <Image borderRadius='md' src={property.imageUrl} alt={property.imageAlt} />
            </Box>
            <Box p='3'>
                <Text
                    fontSize='sm'
                    textColor='black'
                    noOfLines={2}
                >
                    {property.title}
                </Text>
            </Box>
            <Box display='flex' alignItems='center' p='0 1rem 1rem 1rem' justifyContent='space-around'>
                <Box>
                {Array(5)
                .fill('')
                .map((_, i) => (
                    <StarIcon
                    key={i}
                    color={i < property.rating ? 'orange' : 'gray.300'}
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
            </Box>
        </Box>
        // <Box maxW='sm' boxShadow='2xl' borderRadius='lg' overflow='hidden'>
        //     <Image src={property.imageUrl} alt={property.imageAlt} />
        //         <Box p='3' bgColor='gray.700' minH='lg'>
        //             <Box
        //                 as='h6'
        //                 noOfLines={1}
        //             >
        //                 {property.title}
        //             </Box>
        //         <Box display='flex' justifyContent='space-around'>
        //         <Box display='flex' alignItems='center' mt='.5rem'>
        //             {Array(5)
        //             .fill('')
        //             .map((_, i) => (
        //                 <StarIcon
        //                 key={i}
        //                 color={i < property.rating ? 'teal.500' : 'gray.300'}
        //                 />
        //             ))}
        //             <Box as='span' ml='2' color='orange' fontSize='sm'>
        //             {property.reviewCount} reviews
        //             </Box>
        //         </Box>
        //             <Box
        //             color='orange'
        //             fontWeight='semibold'
        //             letterSpacing='wide'
        //             alignSelf='flex-end'
        //             fontSize='xs'
        //             ml='2'
        //             >
        //             {property.beds} beds &bull; {property.baths} baths
        //             </Box>
        //         </Box>
        //     </Box>
        // </Box>
    )
}

export default Card;