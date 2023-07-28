import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { LuX } from "react-icons/lu";
import Button from "../Button";

import { getData } from "../../utils/dbManager";

import styles from "./FiltersModal.module.scss";
import Badge from "../Badge";

const FiltersModal = ({ isOpen, setIsOpen }) => {
  // VARIABLES ----------------
  const router = useRouter();
  // CONDITIONS ---------------
  const [query, setQuery] = useState("");
  const [classMenu, setClassMenu] = useState("isOpen"); //"isOpen" | "isClosed"

  const [allCategories, setAllCategories] = useState();
  const [allNations, setAllNations] = useState();
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

  useEffect(() => {
    getAllNations();
    getAllCategories();
  }, []);

  const getAllNations = async () => {
    const data = await getData.nations();
    console.log(data);
    setAllNations(data);
  };
  const getAllCategories = async () => {
    const data = await getData.categories();
    console.log(data);
    setAllCategories(data);
  };

  const handleSearch = () => {
    router.push();
  };
  // RETURN -------------------
  return (
    <div
      className={`
    ${styles.FiltersModal}
    ${styles[classMenu]}
    `}
    >
      <div className={styles.header}>
        <h3>Filter Search</h3>
        <Button type="outline" size="sm" icon={(size) => <LuX size={size} />} />
      </div>
      <div className={styles.FiltersModal__content}>
        <div className={styles.section}>
          <h4>Nations: {allNations?.length}</h4>
          <div className={styles.section__content}>
            {allNations?.map((nation, index) => {
              return (
                <Badge key={index + "filterNation"} text={nation.strArea} />
              );
            })}
          </div>
        </div>
        <div className={styles.section}>
          <h4>Categories: {allCategories?.length}</h4>
          <div className={styles.section__content}>
            {allCategories?.map((cat, index) => {
              return (
                <Badge key={index + "filterCategory"} text={cat.strCategory} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
