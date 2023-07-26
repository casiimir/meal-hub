import styles from "./Button.module.scss";

const Button = ({
  isRound = false,
  text = "",
  icon = null,
  isNotActive = false,
  shadow = false,
  iconLeftSide = false,
  border = false,
}) => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  // RETURN -------------------
  return (
    <button className={`${styles.Button} ${isNotActive && styles.IsNotActive}`}>
      {icon && <span>{icon}</span>}
      {text && <span className={styles.ButtonText}>{text}</span>}
    </button>
  );
};

export default Button;
