import { LuSmile, LuXCircle } from "react-icons/lu";
import styles from "./Toast.module.scss";
import { useState, useEffect } from "react";
import Button from "../Button";

/**
 *
 * @param {*} text string - (default -> "")
 * @param {*} icon ReactComponent - (default -> IoChevronForward)
 * @param {*} color "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "dark" | "medium" | "light" - (default - "primary")
 * @param {*} type "fill" | "outline" - (default - "fill")
 * @param {*} onClick callback - (default -> console.log("Click"))
 * @returns
 */

const Toast = ({
  color = "primary",
  type = "fill",
  icon = (iconSize) => {
    return <LuSmile size={iconSize} />;
  },
  text = "Ciao sono un toast",
  isOpen = true,
  setIsClosed,
  button,
  timer = 10,
}) => {
  // VARIABLES ----------------
  const speed = 1;
  // CONDITIONS ---------------
  const [classMenu, setClassMenu] = useState(""); //"isOpen" | "isClosed"
  const [counter, setCounter] = useState(timer);
  const [transitionTime, setTransitionTime] = useState(speed);
  // FUNCTIONS ----------------
  useEffect(() => {
    if (isOpen) {
      setClassMenu("isOpen");
    }
  }, [isOpen]);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setClassMenu("isClosed");
    }
  }, [counter]);

  useEffect(() => {
    if (classMenu === "isClosed" && transitionTime > 0) {
      setTimeout(() => setTransitionTime(transitionTime - 1), 1000);
    } else {
      if (classMenu === "isClosed") {
        setIsClosed(true);
      }
    }
  }, [classMenu, transitionTime]);

  const handleClose = () => {
    setClassMenu("isClosed");
  };

  // RETURN -------------------
  return (
    <div
      style={{ transition: `all ${speed}s ease-in-out` }}
      className={`
      ${styles.Toast}
      ${styles[type + "_" + color]}
      ${styles[classMenu]}
      `}
    >
      <div className={styles.sx}>
        {icon ? icon(24) : null}
        {text}
      </div>
      <div className={styles.dx}>
        <Button
          icon={(size) => <LuXCircle size={size} />}
          direction="right"
          size="xs"
          color="light"
          type="outline"
          text={"Close " + counter}
          onClick={() => handleClose()}
        />
        {button}
      </div>
    </div>
  );
};

export default Toast;
