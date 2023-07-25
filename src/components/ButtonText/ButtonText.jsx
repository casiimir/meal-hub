import styles from './ButtonText.module.scss'

const ButtonText = ({
  text = "Button",
  isActive = false,
  onClickEv = () => { console.log("Default button event.") }
}) => {
  // VARIABLES ----------------
  // CONDITIONS ---------------
  // FUNCTIONS ----------------
  // RETURN -------------------
  return (
    <div
      onClick={() => onClickEv()}
      className={`
        ${styles.ButtonText} 
        ${isActive ? styles.ButtonText__active : styles.ButtonText__notActive}`}
    >
      {text}
    </div>
  );
}

export default ButtonText;