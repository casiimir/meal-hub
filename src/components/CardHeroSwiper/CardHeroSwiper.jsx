import styles from './CardHeroSwiper.module.scss';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CardHero from '../CardHero';

const CardHeroSwiper = () => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  // RETURN -------------------
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{
        clickable: true,
      }}
      spaceBetween={50}
      slidesPerView={1}
      speed={1000}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      className={`${styles.CardHeroSwiper}`}
    >
      <SwiperSlide>
        <CardHero />
      </SwiperSlide>
      <SwiperSlide>
        <CardHero />
      </SwiperSlide>
      <SwiperSlide>
        <CardHero />
      </SwiperSlide>
      <SwiperSlide>
        <CardHero />
      </SwiperSlide>

    </Swiper>
  );
}

export default CardHeroSwiper;