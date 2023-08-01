import styles from "./CardFilteredSwiper.module.scss";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CardFiltered from "../CardFiltered";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const CardFilteredSwiper = ({ obj }) => {
  // VARIABLES ----------------
  // FUNCTIONS ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={60}
      slidesPerView={"auto"}
      speed={3000}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      className={`${styles.CardFilteredSwiper}`}
    >
      {obj?.map((o, index) => {
        return (
          <SwiperSlide
            key={index + "CardFilteredSwiper"}
            className={`${styles.swiperSlide}`}
          >
            <CardFiltered obj={o} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CardFilteredSwiper;
