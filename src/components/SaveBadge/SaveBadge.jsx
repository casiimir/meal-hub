import styles from "./SaveBadge.module.scss";
import { useState, useEffect } from "react";
import Button from "../Button";
import { LuBookmarkMinus, LuBookmarkPlus } from "react-icons/lu";
import { recipeManager } from "@/utils/dbManager";
import { useAuthContext } from "@/context/AuthContext";

const SaveBadge = ({ idMeal = "52959", size = "sm", callback }) => {
  // VARIABLES ----------------
  const { saved } = useAuthContext();
  // CONDITIONS ---------------
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    if (saved) setIsSaved(saved?.saved?.includes(idMeal));
  }, [saved]);
  // FUNCTIONS ----------------
  const handleSaveThisContent = (e) => {
    e.stopPropagation();
    console.log("handleSaveThisContent : ", idMeal);
    recipeManager.saveAdd(idMeal);
    setIsSaved(true);
  };
  const handleRemoveThisContent = (e) => {
    e.stopPropagation();
    console.log("handleRemoveThisContent : ", idMeal);
    recipeManager.removeAdd(idMeal);
    setIsSaved(false);
    callback();
  };
  // RETURN -------------------
  return (
    <div className={styles.SaveBadge}>
      <Button
        shape="round"
        size={size}
        color={isSaved ? "warning" : "primary"}
        icon={
          isSaved
            ? (size) => <LuBookmarkMinus size={size} />
            : (size) => <LuBookmarkPlus size={size} />
        }
        onClick={
          isSaved
            ? (e) => handleRemoveThisContent(e)
            : (e) => handleSaveThisContent(e)
        }
      />
    </div>
  );
};

export default SaveBadge;
