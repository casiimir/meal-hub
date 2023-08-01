import styles from "./CardHeroRecipe.module.scss";
import SaveBadge from "../SaveBadge";

const CardHeroRecipe = ({ data }) => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  // RETURN -------------------
  return (
    <div
      className={styles.CardHero}
      style={{ backgroundImage: `url(${data?.strMealThumb})` }}
    >
      <div className={styles.CardHero__gradient}>
        <div className={styles.header}>
          <div className={styles.buttonSave}>
            <SaveBadge size="sm" idMeal={data?.idMeal} />
          </div>
        </div>

        <div className={styles.content}>
          <h3 className={styles.card__title}>{data?.strMeal}</h3>
          <p className={styles.card__subtitle}>{data?.strCategory}</p>
        </div>
      </div>
    </div>
  );
};

export default CardHeroRecipe;
