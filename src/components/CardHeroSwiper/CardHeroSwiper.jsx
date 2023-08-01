import styles from "./CardHeroSwiper.module.scss";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CardHero from "../CardHero";

const CardHeroSwiper = ({ data }) => {
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
      speed={2000}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      className={`${styles.CardHeroSwiper}`}
    >
      {data?.map((recep, index) => {
        return (
          <SwiperSlide key={index + "CardHeroSwiper"}>
            <CardHero data={recep} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CardHeroSwiper;
