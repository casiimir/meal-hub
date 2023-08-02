import { LuChevronRight, LuX } from "react-icons/lu";
import { useState, useEffect } from "react";
import { getData } from "@/utils/dbManager";
import styles from "./IngredientWithRecepies.module.scss";
import Button from "../Button";

const IngredientWithRecepies = ({
  data,
  callback,
  callback2,
  icon = (size) => <LuChevronRight size={size} />,
}) => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  const [mainRecepies, setMainRecepies] = useState();
  // FUNCTIONS ----------------
  useEffect(() => {
    handleGetData();
  }, []);
  const handleGetData = async () => {
    const recepies = await getData.ingridient(data?.strIngredient);
    // console.log(recepies);
    setMainRecepies(recepies);
  };
  // RETURN -------------------
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          {mainRecepies
            ? mainRecepies.length + " unique recipes aviable"
            : "Searching..."}
        </p>
      </div>
      <div className={styles.IngredientSearchedResult}>
        <div className={styles.img__container}>
          <img
            className={styles.img}
            src={`https://www.themealdb.com/images/ingredients/${data.strIngredient}.png`}
            alt={data.strIngredient}
          />
        </div>
        <div className={styles.data__container}>
          <h3>{data.strIngredient}</h3>
          <p>{data.strType}</p>
        </div>
        <div className={styles.cta__container}>
          <Button
            size="xs"
            icon={(size) => <LuX size={size} />}
            onClick={() => callback2()}
          />
          <Button size="xs" icon={icon} onClick={() => callback()} />
        </div>
      </div>
    </div>
  );
};

export default IngredientWithRecepies;
