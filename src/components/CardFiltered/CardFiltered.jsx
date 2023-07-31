import styles from "./CardFiltered.module.scss";
import { LuBookmarkPlus } from "react-icons/lu";
import { obj } from "./obj";
import Button from "../Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const reduceText = (text, maxLenght) => {
  if (text.length <= maxLenght) {
    return text;
  } else {
    return text.slice(0, 19) + "...";
  }
};
const CardFiltered = ({ obj }) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  // console.log(data);
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
      console.log("Errore nella richiesta API:", error);
    }
  }, [obj.idMeal]);
  const handleOpenRecepi = (idMeal) => {
    router.push("/recipe/" + idMeal);
  };

  const onSaveClick = (e) => {
    e.stopPropagation();

    console.log("Clicked on button save");
  };
  // RETURN -------------------
  return (
    <div className={styles.CardFiltered}>
      <div className={styles.card} onClick={() => handleOpenRecepi(obj.idMeal)}>
        <div className={styles.text}>
          <div className={styles.title_wrapper}>
            <p className={styles.text_title}>{reduceText(obj.strMeal)}</p>
          </div>
          <p className={styles.text_category}> {data && data.strCategory}</p>
          <p className={styles.text_area}> {data && data.strArea}</p>
        </div>
        <div className={styles.buttonSave} onClick={(e) => onSaveClick(e)}>
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
