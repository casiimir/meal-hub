import { useState, useEffect } from "react";
import Button from "../Button";
import styles from "./CommentsModal.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthContext } from "@/context/AuthContext";
import { LuSend, LuX } from "react-icons/lu";
import { localStorageManager } from "@/utils/localStorage";
import Comment from "../Comment";

const CommentsModal = ({ isOpen, setIsOpen, comments, recipeId }) => {
  // VARIABLES ----------------
  const { user } = useAuthContext();
  // CONDITIONS ---------------
  const [classMenu, setClassMenu] = useState("isClosed"); //"isOpen" | "isClosed"
  const [commentToLeave, setCommentToLeave] = useState("");
  // FUNCTIONS ----------------
  useEffect(() => {
    if (isOpen) {
      setClassMenu("isOpen");
      document.body.style.overflow = "hidden";
    } else {
      setClassMenu("isClosed");
      document.body.style.overflow = "scroll";
    }
  }, [isOpen]);

  const handleAddComment = async () => {
    // console.log(commentToLeave, recipeId);
    const docRef = doc(db, "comments", recipeId);
    const docSnap = await getDoc(docRef);

    const localUser = localStorageManager.getData("user");

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        comments: arrayUnion({
          uid: user.uid,
          name: localUser.name,
          comment: commentToLeave,
          when: Date.now(),
        }),
      });
      setCommentToLeave("");
    } else {
      await setDoc(doc(db, "comments", recipeId), {
        comments: [
          {
            uid: user.uid,
            name: localUser.name,
            comment: commentToLeave,
            when: Date.now(),
          },
        ],
      });
      setCommentToLeave("");
    }
  };

  // RETURN -------------------
  return (
    <div
      className={`
        ${styles.CommentsModal}
        ${styles[classMenu]}
      `}
    >
      <div className={styles.header}>
        <h3>Comments</h3>
        <Button
          onClick={() => setIsOpen(false)}
          type="outline"
          size="sm"
          icon={(size) => <LuX size={size} />}
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          onChange={(e) => setCommentToLeave(e.target.value)}
          type="text"
          className={styles.input}
          value={commentToLeave}
          placeholder="Leave a comment"
        />
        <Button
          color={commentToLeave ? "primary" : "light"}
          onClick={commentToLeave ? () => handleAddComment() : () => {}}
          icon={(size) => <LuSend size={size} />}
        />
      </div>
      <div className={styles.content}>
        {comments?.map((com, index) => {
          return <Comment data={com} index={index + "-" + recipeId} />;
        })}
      </div>
    </div>
  );
};

export default CommentsModal;
