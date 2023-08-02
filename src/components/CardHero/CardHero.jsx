import styles from "./CardHero.module.scss";
import { useRouter } from "next/router";
import SaveBadge from "../SaveBadge";

const CardHero = ({ data, callback = () => {}, noSave = false }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  const handleOpenRecepi = (idMeal) => {
    router.push("/recipe/" + idMeal);
    // console.log(data?.idMeal);
  };
  // RETURN -------------------
  return (
    <>
      <div
        onClick={() => handleOpenRecepi(data?.idMeal)}
        className={styles.CardHero}
        style={{ backgroundImage: `url(${data?.strMealThumb})` }}
      >
        <div className={styles.CardHero__gradient}>
          <div className={styles.header}>
            {noSave ? null : (
              <SaveBadge callback={callback} idMeal={data?.idMeal} />
            )}
          </div>

          <div className={styles.content}>
            <h3 className={styles.card__title}>{data?.strMeal}</h3>
            <p className={styles.card__subtitle}>{data?.strCategory}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHero;
