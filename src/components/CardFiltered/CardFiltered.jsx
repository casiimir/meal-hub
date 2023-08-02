import styles from "./CardFiltered.module.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { localStorageManager } from "@/utils/localStorage";
import SaveBadge from "../SaveBadge";

const CardFiltered = ({ obj }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  const [data, setData] = useState(null);
  // FUNCTIONS ----------------
  useEffect(() => {
    if (localStorageManager.getData(obj?.idMeal) === null) {
      // console.log("DATI NON PRESENTI: FAI FETCH");
      try {
        fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${obj?.idMeal}`
        )
          .then((res) => res.json())
          .then((data) => {
            localStorageManager.setData(obj?.idMeal, data.meals[0]);
            setData(data.meals[0]);
          });
      } catch (error) {
        console.log("Errore nella richiesta API:", error);
      }
    } else {
      // console.log("QUESTI DATI SONO GIA PRESENTI : PRENDILI DAL LOCAL");
      setData(localStorageManager.getData(obj?.idMeal));
    }
  }, [obj.idMeal]);
  const handleOpenRecepi = (idMeal) => {
    router.push("/recipe/" + idMeal);
  };
  const reduceText = (text, maxLenght) => {
    if (text.length <= maxLenght) {
      return text;
    } else {
      return text.slice(0, 19) + "...";
    }
  };

  // RETURN -------------------
  return (
    <div className={styles.CardFiltered}>
      <div
        className={styles.card}
        onClick={() => handleOpenRecepi(obj?.idMeal)}
      >
        <div className={styles.text}>
          <div className={styles.title_wrapper}>
            <p className={styles.text_title}>{reduceText(obj?.strMeal)}</p>
          </div>
          <p className={styles.text_category}> {data && data.strCategory}</p>
          <p className={styles.text_area}> {data && data.strArea}</p>
        </div>
        <div className={styles.buttonSave}>
          <SaveBadge size="xs" idMeal={obj?.idMeal} />
        </div>
      </div>
      <div className={styles.image}>
        <img src={obj?.strMealThumb} alt={obj?.strMeal} />{" "}
      </div>
    </div>
  );
};

export default CardFiltered;
