import { LuPlusCircle } from "react-icons/lu";
import Button from "../Button";
import IngredientsModal from "../IngredientsModal";
import styles from "./FloatingActionButton.module.scss";

import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const FloatingActionButton = () => {
  // VARIABLES ----------------
  const router = useRouter();
  const { user } = useAuthContext();
  // CONDITIONS ---------------
  const [isModalIngredients, setInModalIngredients] = useState(false);
  // FUNCTIONS ----------------
  const handleClick = () => {
    user ? setInModalIngredients(!isModalIngredients) : router.push("/login");
  };
  // RETURN -------------------
  return (
    <>
      <div className={styles.FloatingActionButton}>
        <Button
          size="lg"
          shape="round"
          icon={(size) => <LuPlusCircle size={size} />}
          onClick={() => handleClick()}
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
