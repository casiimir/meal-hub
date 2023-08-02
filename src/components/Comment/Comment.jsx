import { useRouter } from "next/navigation";
import styles from "./Comment.module.scss";

const Comment = ({ data }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  const date = new Date(data.when).toLocaleString();
  // FUNCTIONS ----------------
  // RETURN -------------------
  return (
    <div className={styles.Comment}>
      <div
        onClick={() => router.push("/profile/" + data.uid)}
        className={styles.header}
      >
        <h4>{data.name}</h4>
        <p className={styles.small}>{date}</p>
      </div>

      <p>{data.comment}</p>
    </div>
  );
};

export default Comment;
