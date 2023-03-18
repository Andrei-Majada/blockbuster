import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Box,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function SliderRating() {
    const [sliderValue, setSliderValue] = useState(0)

    useEffect(() => {
        console.log('slidervalue: ', sliderValue)
    }, [sliderValue])
    
    return (
        <Slider defaultValue={1} min={1} max={5} step={1} colorScheme='teal' onChange={(v) => setSliderValue(v)}
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
    )
}