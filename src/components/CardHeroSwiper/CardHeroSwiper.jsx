import styles from './CardHeroSwiper.module.scss';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CardHero from '../CardHero';

const CardHeroSwiper = ({
  data = dataMock
}) => {
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
        )
      })}


    </Swiper>
  );
}

export default CardHeroSwiper;

const dataMock = [
  {
    "strMeal": "Baked salmon with fennel & tomatoes",
    "strMealThumb": "https://www.themealdb.com/images/media/meals/1548772327.jpg",
    "idMeal": "52959"
  },
  {
    "strMeal": "Cajun spiced fish tacos",
    "strMealThumb": "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
    "idMeal": "52819"
  },
  {
    "strMeal": "Escovitch Fish",
    "strMealThumb": "https://www.themealdb.com/images/media/meals/1520084413.jpg",
    "idMeal": "52944"
  },
  {
    "strMeal": "Fish fofos",
    "strMealThumb": "https://www.themealdb.com/images/media/meals/a15wsa1614349126.jpg",
    "idMeal": "53043"
  },
  {
    "strMeal": "Fish pie",
    "strMealThumb": "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
    "idMeal": "52802"
  },
  {
    "strMeal": "Fish Stew with Rouille",
    "strMealThumb": "https://www.themealdb.com/images/media/meals/vptqpw1511798500.jpg",
    "idMeal": "52918"
  },
]