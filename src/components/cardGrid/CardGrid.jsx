import Button from '../Button';
import { useRouter } from 'next/router';
import { LuBookmarkPlus } from 'react-icons/lu';
import styles from './CardGrid.module.scss';

const CardGrid = ({ data }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  const handleOpenRecipePage = () => {
    console.log("handleOpenRecipePage : , router.push(/product/" + data.idMeal);
    router.push("/recipe/" + data.idMeal);
  }
  const handleSaveThisRecipe = () => {
    console.log("handleSaveThisRecipe :" + data.idMeal);
  }
  // RETURN -------------------
  return (
    <div
      className={styles.CardGrid}
      style={{ backgroundImage: `url(${data?.strMealThumb})` }}
      onClick={() => handleOpenRecipePage()}
    >
      <div className={styles.CardGrid__gradient}>
        <div className={styles.header}>
          <Button
            size="xs"
            shape="round"
            icon={(size) => <LuBookmarkPlus size={size} />}
            onClick={() => handleSaveThisRecipe()}
          />
        </div>

        <div>
          <h3 className={styles.title}>
            {data?.strMeal}
          </h3>
        </div>

      </div>
    </div>
  );
}

export default CardGrid;