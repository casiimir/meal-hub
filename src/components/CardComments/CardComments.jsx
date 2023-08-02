import styles from "./CardComments.module.scss";
import { useEffect, useState } from "react";
import CardHero from "../CardHero";
import { useRouter } from "next/navigation";
import Comment from "../Comment";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";

const CardComments = ({ data }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  const [recipeData, setRecipeData] = useState();
  const [comments, setComments] = useState(data?.comments.slice(0, 4));
  useEffect(() => {
    if (data) getData(data.idMeal);
  }, [data]);
  // FUNCTIONS ----------------
  const getData = async (idMeal) => {
    // console.log(data);
    const ref = collection(db, "recipes");
    const q = query(ref, where("idMeal", "==", idMeal));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnap) => {
      setRecipeData(docSnap.data());
    });
  };
  // RETURN -------------------
  return (
    <div className={styles.CardComments}>
      <CardHero
        data={recipeData}
        onClick={() => router.push("/recipe/" + recipeData.idMeal)}
        noSave
      />
      <div className={styles.comments}>
        <h4 className={styles.title}>Fist 4 comments:</h4>
        {comments?.map((comm, index) => {
          return (
            <Comment
              key={index + "comunityComments" + data?.idMeal}
              data={comm}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardComments;
