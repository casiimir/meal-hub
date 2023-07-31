import Button from "../Button";
import { useRouter } from "next/router";
import { LuBookmarkPlus } from "react-icons/lu";
import styles from "./CardGrid.module.scss";

const CardGrid = ({ data }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  const handleOpenRecipePage = (idMeal) => {
    router.push("/recipe/" + idMeal);
    // console.log("handleOpenRecipePage : , router.push(/product/" + data.idMeal);
    // router.push("/product/"+data.idMeal);
  };

  const handleSaveThisRecipe = (e) => {
    e.stopPropagation();
    console.log("handleSaveThisRecipe :" + data.idMeal);
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
      onClick={() => handleOpenRecipePage(data.idMeal)}>
      <div className={styles.CardGrid__gradient}>
        <div className={styles.header}>
          <Button
            size="xs"
            shape="round"
            icon={(size) => <LuBookmarkPlus size={size} />}
            onClick={(e) => handleSaveThisRecipe(e)}
          />
        </div>

        <div>
          <h3 className={styles.title}>{reduceText(data.strMeal)}</h3>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
