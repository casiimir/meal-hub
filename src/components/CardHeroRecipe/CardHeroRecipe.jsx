import Button from "../Button";
import styles from "./CardHeroRecipe.module.scss";

import { LuBookmarkPlus } from "react-icons/lu";

const CardHeroRecipe = ({ data }) => {
  // VARIABLES ----------------
  // CONDITIONS ---------------

  const meals = data.meals[0];
  // FUNCTIONS ----------------
  const handleSaveThisContent = () => {
    console.log("handleSaveThisContent : ", meals.idMeal);
  };
  // RETURN -------------------
  return (
    <div
      className={styles.CardHero}
      style={{ backgroundImage: `url(${meals.strMealThumb})` }}
    >
      <div className={styles.CardHero__gradient}>
        <div className={styles.header}>
          <Button
            shape="round"
            size="xxs"
            width="40"
            icon={(size) => <LuBookmarkPlus size={20} />}
            onClick={() => handleSaveThisContent()}
          />
        </div>

        <div className={styles.content}>
          <h3 className={styles.card__title}>{meals.strMeal}</h3>
          <p className={styles.card__subtitle}>{meals.strCategory}</p>
        </div>
      </div>
    </div>
  );
};

export default CardHeroRecipe;
