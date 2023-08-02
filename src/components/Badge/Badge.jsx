import styles from "./Badge.module.scss";

/**
 *
 * @param {*} size "lg" | "md" | "sm" - (default -> "md")
 * @param {*} text string - (default -> "Badge")
 * @param {*} shape "round" | "default" | "light" | "square" - (default -> "default")
 * @param {*} submit boolean - (default -> false) If true it will act like a submit button for Form component
 * @param {*} icon ReactComponent - (default -> IoChevronForward)
 * @param {*} direction "left" | "right" - (default - "right") - Is the icon position.
 * @param {*} color "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "dark" | "medium" | "light" - (default - "primary")
 * @param {*} type "fill" | "outline" - (default - "fill")
 * @param {*} onClick callback - (default -> ()=>console.log("Click"))
 * @returns
 */

const Badge = ({
  size = "md",
  text = "Badge",
  shape = "default",
  isIcon = false,
  isRound = false,
  icon = (iconSize) => {
    return <IoClose size={iconSize} />;
  },
  direction = "right",
  color = "primary",
  type = "fill",
  onClick = () => {
    console.log("Click");
  },
}) => {
  // VARIABLES ----------------------
  // CONDITIONS ---------------------
  // FUNCTIONS ----------------------
  // RETURN -------------------------
  return (
    <div
      onClick={onClick}
      className={`
      ${styles.Badge} 
      ${styles[size]}
      ${styles[isRound ? "round" : shape]}
      ${styles[direction]}
      ${isRound ? styles["isRound"] : styles["isNotRound"]}
      ${styles[type + "_" + color]}
    `}
    >
      {isIcon ? icon(cFontSize[size]) : null}
      {text ? <span className={styles.text}>{text}</span> : null}
    </div>
  );
};

export default Badge;
