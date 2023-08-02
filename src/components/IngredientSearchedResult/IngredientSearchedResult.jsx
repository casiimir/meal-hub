import { LuCopyPlus } from "react-icons/lu";
import Button from "../Button";
import styles from "./IngredientSearchedResult.module.scss";

const IngredientSearchedResult = ({
  data,
  callback,
  icon = (size) => <LuCopyPlus size={size} />,
}) => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  // RETURN -------------------
  return (
    <div onClick={() => callback()} className={styles.IngredientSearchedResult}>
      <div className={styles.img__container}>
        <img
          className={styles.img}
          src={`https://www.themealdb.com/images/ingredients/${data.strIngredient}.png`}
          alt={data.strIngredient}
        />
      </div>
      <div className={styles.data__container}>
        <h5>{data.strIngredient}</h5>
        <p>{data.strType}</p>
      </div>
      <div className={styles.cta__container}>
        <Button size="xs" icon={icon} />
      </div>
    </div>
  );
};

export default IngredientSearchedResult;
