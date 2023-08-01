import Button from "../Button";
import { useRouter } from "next/router";
import { LuBookmarkPlus } from "react-icons/lu";
import styles from "./CardGrid.module.scss";
import SaveBadge from "../SaveBadge";

const CardGrid = ({ data }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  const handleOpenRecipePage = (idMeal) => {
    router.push("/recipe/" + idMeal);
  };

  const reduceText = (text, maxLenght) => {
    if (text.length <= maxLenght) {
      return text;
    } else {
      return text.slice(0, 16) + "...";
    }
  };
  // RETURN -------------------
  return (
    <div
      className={styles.CardGrid}
      style={{ backgroundImage: `url(${data?.strMealThumb})` }}
      onClick={() => handleOpenRecipePage(data.idMeal)}
    >
      <div className={styles.CardGrid__gradient}>
        <div className={styles.header}>
          <SaveBadge idMeal={data.idMeal} />
        </div>

        <div>
          <h3 className={styles.title}>{reduceText(data.strMeal)}</h3>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
