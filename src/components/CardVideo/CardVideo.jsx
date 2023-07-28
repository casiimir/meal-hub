import Button from "../Button";
import CardHero from "../CardHero";
import styles from "./CardVideo.module.scss";

import { LuBookmarkPlus } from "react-icons/lu";

const CardVideo = ({ data }) => {
  // VARIABLES ----------------

  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  const handleSaveThisContent = () => {
    console.log("handleSaveThisContent : ", data.meals[0].idMeal);
  };

  // RETURN -------------------
  return (
    <>
      {data.meals.map((meal) => (
        <div className={styles.container} key={meal.idMeal}>
          <div className={styles.button}>
            <Button
              shape="round"
              size="xxs"
              width="40"
              icon={(size) => <LuBookmarkPlus size={20} />}
              onClick={() => handleSaveThisContent()}
            />
          </div>
          <iframe
            className={styles.iframe}
            width="315"
            height="201"
            src={meal.strYoutube.replaceAll("watch?v=", "embed/")}
            title={meal.strMeal}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </>
  );
};

export default CardVideo;
