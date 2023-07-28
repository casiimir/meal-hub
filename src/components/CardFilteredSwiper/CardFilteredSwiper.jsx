import styles from "./CardFilteredSwiper.module.scss";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CardFiltered from "../CardFiltered";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const CardFilteredSwiper = ({ obj }) => {
  console.log(obj);
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={10}
      slidesPerView={"auto"}
      speed={1000}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      className={`${styles.CardFilteredSwiper}`}>
      {obj?.map((o, index) => {
        return (
          <SwiperSlide
            key={index + "CardFilteredSwiper"}
            className={`${styles.swiperSlide}`}>
            <CardFiltered obj={o} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CardFilteredSwiper;
