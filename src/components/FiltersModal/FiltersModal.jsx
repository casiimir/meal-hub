import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { LuX } from "react-icons/lu";
import Button from "../Button";

import { getData } from "../../utils/dbManager";

import styles from "./FiltersModal.module.scss";
import BadgeActive from "../BadgeActive";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const FiltersModal = ({ isOpen, setIsOpen }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  const [classMenu, setClassMenu] = useState("isClosed"); //"isOpen" | "isClosed"

  const [allCategories, setAllCategories] = useState();
  const [allNations, setAllNations] = useState();

  const [selectedNation, setSelectedNation] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [error, setError] = useState(false);

  // FUNCTIONS ----------------
  useEffect(() => {
    if (isOpen) {
      setClassMenu("isOpen");
      document.body.style.overflow = "hidden";
    } else {
      setClassMenu("isClosed");
      document.body.style.overflow = "scroll";
    }
  }, [isOpen]);

  useEffect(() => {
    getAllNations();
    getAllCategories();
  }, []);

  const getAllNations = async () => {
    const data = await getData.nations();
    setAllNations(data);
  };
  const getAllCategories = async () => {
    const data = await getData.categories();
    setAllCategories(data);
  };

  const handleCategory = (category) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(
        selectedCategory.filter((cat) => cat.idCategory !== category.idCategory)
      );
    } else {
      const aux = [...selectedCategory];
      aux.push(category);
      console.log(aux);
      setSelectedCategory(aux);
    }
  };

  const handleSearch = () => {
    if (selectedCategory.length === 0) {
      setError(true);
    } else {
      setError(false);
      setIsOpen(false);
      const auxArr = [];
      selectedCategory.forEach((elem) => {
        auxArr.push(elem.strCategory);
      });

      router.push({
        pathname: "/search/k-Custom filter",
        query: {
          nation: selectedNation,
          categories: auxArr,
          isCustom: true,
        },
        shallow: false,
      });
    }
  };
  // RETURN -------------------
  return (
    <div
      className={`
    ${styles.FiltersModal}
    ${styles[classMenu]}
    `}
    >
      <div className={styles.header}>
        <h3>Filter Search</h3>
        <Button
          onClick={() => setIsOpen(false)}
          type="outline"
          size="sm"
          icon={(size) => <LuX size={size} />}
        />
      </div>
      <div className={styles.FiltersModal__content}>
        <div className={styles.section}>
          <div className={styles.section__header}>
            <h3>Nations: {allNations?.length}</h3>
            <p>{selectedNation}</p>
          </div>
          <div className={styles.section__content}>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={"auto"}
              speed={1000}
              autoplay={{
                delay: 1500,
                disableOnInteraction: true,
              }}
              className={`${styles.CategoriesSwiper}`}
            >
              {allNations?.map((nation, index) => {
                return (
                  <SwiperSlide
                    key={index + "filterNation"}
                    className={`${styles.swiperSlide}`}
                  >
                    <BadgeActive
                      onClick={() => setSelectedNation(nation.strArea)}
                      isActive={
                        selectedNation === nation.strArea ? true : false
                      }
                      size="xs"
                      single
                      text={nation.strArea}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.section__header}>
            <h3>Categories: {allCategories?.length}</h3>
            <p>{selectedCategory.length}</p>
          </div>
          <div className={styles.section__content}>
            <div className={styles.content__grid}>
              {allCategories?.map((cat, index) => {
                return (
                  <BadgeActive
                    onClick={() => {
                      handleCategory(cat);
                    }}
                    size="xs"
                    text={cat.strCategory}
                    key={index + "filterCategory"}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button
            width={"full"}
            text="Apply filters"
            direction="right"
            onClick={() => handleSearch()}
          />
          {error ? (
            <p className={styles.error}>
              Error: Please select al least 1 category
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
