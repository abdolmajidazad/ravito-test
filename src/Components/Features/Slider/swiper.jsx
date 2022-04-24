import {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
export default function SwiperComponent(props) {

    return (
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
    )
}

// function Item(props)
//
// {
//     const {sonItem={}} =  props;
//     return (
//         <ClipItem sonItem={sonItem} columns={{xs:6,sm:4,md:3}}/>
//     )
// }