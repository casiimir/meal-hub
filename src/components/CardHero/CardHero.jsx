import Button from "../Button";
import styles from "./CardHero.module.scss";
import Router, { useRouter } from "next/router";

import { LuBookmarkPlus } from "react-icons/lu";

const CardHero = ({ data }) => {
  const router = useRouter();
  // VARIABLES ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  const handleSaveThisContent = (e) => {
    e.stopPropagation();
    console.log("handleSaveThisContent : ", data.idMeal);
  };

  const handleOpenRecepi = (idMeal) => {
    router.push("/recipe/" + idMeal);
    console.log(data.idMeal);
  };
  // RETURN -------------------
  return (
    <div
      onClick={() => handleOpenRecepi(data.idMeal)}
      className={styles.CardHero}
      style={{ backgroundImage: `url(${data.strMealThumb})` }}>
      <div className={styles.CardHero__gradient}>
        <div className={styles.header}>
          <Button
            shape="round"
            size="xs"
            icon={(size) => <LuBookmarkPlus size={size} />}
            onClick={(e) => handleSaveThisContent(e)}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.card__title}>{data.strMeal}</h3>
          <p className={styles.card__subtitle}>{data.strCategory}</p>
        </div>
      </div>
    </div>
  );
};

export default CardHero;
