import Button from "../Button";
import CardFilteredSwiper from "../CardFilteredSwiper";
import styles from "./SectionPage.module.scss";
import { obj } from "../CardFiltered/obj";
import { useRouter } from "next/navigation";

const SectionPage = ({ title = "Categories", exploreTo = "/category/id" }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  const handleExplore = () => {
    router.push(exploreTo);
  };
  // RETURN -------------------
  return (
    <div className={styles.SectionPage}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <Button
          text="Explore more"
          type="text"
          size="xs"
          icon={null}
          onClick={() => handleExplore()}
        />
      </div>
      <div className={styles.content}>
        <CardFilteredSwiper obj={[obj]} />
      </div>
    </div>
  );
};

export default SectionPage;
