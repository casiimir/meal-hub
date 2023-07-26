import styles from "./Button.module.scss";

const Button = ({
  isRound = false,
  text = "",
  icon = null,
  isActive = false,
  shadow = false,
  iconLeftSide = false,
}) => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  // RETURN -------------------
  return (
    <button className={`${styles.Button} ${isActive && styles.IsActive}`}>
      {icon && <span>{icon}</span>}
      {text && <span className={styles.ButtonText}>{text}</span>}
    </button>
  );
};

export default Button;
