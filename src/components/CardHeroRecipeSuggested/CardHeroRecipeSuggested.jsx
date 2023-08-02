import styles from "./CardHeroRecipeSuggested.module.scss";
import SaveBadge from "../SaveBadge";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CardHeroRecipeSuggested = ({ data, list }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  const [uniqueList, setUniqueList] = useState();

  useEffect(() => {
    const arrayActual = [];
    list.forEach((elem) => {
      arrayActual.push(elem.strIngredient);
    });
    const intersection = data?.arrayIngredients.filter((element) =>
      arrayActual.includes(element)
    );
    setUniqueList(intersection);
  }, [list]);
  // FUNCTIONS ----------------
  // RETURN -------------------
  return (
    <div
      className={styles.CardHero}
      onClick={() => router.push("/recipe/" + data?.idMeal)}
      style={{ backgroundImage: `url(${data?.strMealThumb})` }}
    >
      <div className={styles.CardHero__gradient}>
        <div className={styles.header}>
          <div className={styles.indicatior}>
            {uniqueList?.length + " compatible ing. / " + list.length}
          </div>
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

export default CardHeroRecipeSuggested;
