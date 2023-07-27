import styles from "./HeroCard.module.scss";
import { LuBookmarkPlus } from "react-icons/lu";
import { objhero } from "./mokhero";

const HeroCard = ({}) => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  // RETURN -------------------
  return (
    
    <div
      className={styles.HeroCard}
    //   style={{ backgroundImage: `url(${objhero.strMealThumb})`}}>
    >
        < img src={objhero.strMealThumb} className={styles.HeroImg}/>
        <div className={styles.HeroTextContainer}> 
            <h1 className={styles.HeroTitle}> Traditional Food {objhero.strArea} </h1>
            <p className={styles.HeroText}> Categoria/Area geografica {objhero.strCategory}</p>
         </div>
      <div className={styles.icon}>  <LuBookmarkPlus/> </div>
    </div>
  );
};

export default HeroCard;
