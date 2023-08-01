import { LuPlusCircle } from "react-icons/lu";
import Button from "../Button";
import IngredientsModal from "../IngredientsModal";
import styles from "./FloatingActionButton.module.scss";

import { useState } from "react";

const FloatingActionButton = () => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  const [isModalIngredients, setInModalIngredients] = useState(false);
  // FUNCTIONS ----------------
  // RETURN -------------------
  return (
    <>
      <div className={styles.FloatingActionButton}>
        <Button
          size="lg"
          shape="round"
          icon={(size) => <LuPlusCircle size={size} />}
          onClick={() => setInModalIngredients(!isModalIngredients)}
        />
      </div>
      <IngredientsModal
        isOpen={isModalIngredients}
        setIsOpen={setInModalIngredients}
      />
    </>
  );
};

export default FloatingActionButton;
