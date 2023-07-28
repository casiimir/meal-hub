import Button from "../Button";
import CardFilteredSwiper from "../CardFilteredSwiper";
import styles from "./SectionPage.module.scss";
// import { obj } from "../CardFiltered/obj";
import { useRouter } from "next/navigation";
// devo passare 3 props per i tre titoli
const SectionPage = ({ sections, data }) => {
  // const handleOpenSearchCategory = (idCategory) => {
  //   router.push("/search/c-" + idCategory);
  // } per filtered;
  console.log(data);
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  const handleExplore = () => {
    router.push("/search/" + sections.exploreto);
  };
  // RETURN -------------------
  return (
    <>
      <div className={styles.SectionPage}>
        <div className={styles.header}>
          <h3>{sections.title}</h3>
          <Button
            text="Explore more"
            type="text"
            size="xs"
            icon={null}
            onClick={() => handleExplore()}
          />
        </div>
        <div className={styles.content}>
          <CardFilteredSwiper obj={sections.category} />
        </div>
      </div>
    </>
  );
};

export default SectionPage;
