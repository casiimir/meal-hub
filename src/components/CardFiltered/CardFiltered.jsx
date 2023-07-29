import styles from "./CardFiltered.module.scss";
import { LuBookmarkPlus } from "react-icons/lu";
import { obj } from "./obj";
import Button from "../Button";
import React, { useEffect, useState } from "react";

const reduceText = (text, maxLenght) => {
  if (text.length <= maxLenght) {
    return text;
  } else {
    return text.slice(0, 19) + "...";
  }
};
const CardFiltered = ({ obj }) => {
  const [data, setData] = useState(null);
  console.log(data);
  // VARIABLES ----------------

  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  useEffect(() => {
    try {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${obj.idMeal}`
      )
        .then((res) => res.json())
        .then((data) => setData(data.meals[0]));
    } catch (error) {
      console.error("Errore nella richiesta API:", error);
    }
  }, [obj.idMeal]);

  const onClick = () => console.log(obj.idMeal);
  // RETURN -------------------
  return (
    <div className={styles.CardFiltered}>
      <div className={styles.card}>
        <div className={styles.text}>
          <div className={styles.title_wrapper}>
            <p className={styles.text_title}>{reduceText(obj.strMeal)}</p>
          </div>
          <p className={styles.text_category}> {data && data.strCategory}</p>
          <p className={styles.text_area}> {data && data.strArea}</p>
        </div>
        <div className={styles.buttonSave} onClick={onClick}>
          <Button
            shape={"round"}
            size={"xxs"}
            type={"fill"}
            icon={(size) => <LuBookmarkPlus size={size} />}
          />
        </div>
      </div>
      <div className={styles.image}>
        <img src={obj.strMealThumb} alt={obj.strMeal} />{" "}
      </div>
    </div>
  );
};

export default CardFiltered;
