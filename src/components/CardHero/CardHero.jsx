import Button from "../Button";
import styles from "./CardHero.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

import { LuBookmarkMinus, LuBookmarkPlus } from "react-icons/lu";
import { recipeManager } from "@/utils/dbManager";
import { localStorageManager } from "@/utils/localStorage";

const CardHero = ({ data }) => {
  const router = useRouter();
  // VARIABLES ----------------
  // CONDITIONS ---------------
  const [isSaved, setIsSaved] = useState(data?.saved);
  // FUNCTIONS ----------------
  const handleSaveThisContent = (e) => {
    e.stopPropagation();
    console.log("handleSaveThisContent : ", data.idMeal);
    recipeManager.saveAdd(data.idMeal);
    let aux = data;
    aux.saved = true;
    setIsSaved(true);
    localStorageManager.setData(data.idMeal, aux);
  };
  const handleRemoveThisContent = (e) => {
    e.stopPropagation();
    console.log("handleRemoveThisContent : ", data.idMeal);
    recipeManager.removeAdd(data.idMeal);
    let aux = data;
    aux.saved = false;
    setIsSaved(false);
    localStorageManager.setData(data.idMeal, aux);
  };

  const handleOpenRecepi = (idMeal) => {
    router.push("/recipe/" + idMeal);
    console.log(data.idMeal);
  };
  // RETURN -------------------
  return (
    <>
      <div
        onClick={() => handleOpenRecepi(data.idMeal)}
        className={styles.CardHero}
        style={{ backgroundImage: `url(${data.strMealThumb})` }}
      >
        <div className={styles.CardHero__gradient}>
          <div className={styles.header}>
            <Button
              shape="round"
              size="xs"
              color={isSaved ? "warning" : "primary"}
              icon={
                isSaved
                  ? (size) => <LuBookmarkMinus size={size} />
                  : (size) => <LuBookmarkPlus size={size} />
              }
              onClick={
                isSaved
                  ? (e) => handleRemoveThisContent(e)
                  : (e) => handleSaveThisContent(e)
              }
            />
          </div>
          <div className={styles.content}>
            <h3 className={styles.card__title}>{data.strMeal}</h3>
            <p className={styles.card__subtitle}>{data.strCategory}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHero;
