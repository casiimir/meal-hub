import { LuCheckSquare, LuSquare } from 'react-icons/lu';
import styles from './BadgeActive.module.scss'
import { useState } from 'react';


/**
 * 
 * @param {*} isActive boolean - (default -> "false")
 * @param {*} size "lg" | "md" | "sm" | "xs" - (default -> "md")
 * @param {*} text string - (default -> "Badge")
 * @param {*} shape "round" | "default" | "light" | "square" - (default -> "default")
 * @param {*} submit boolean - (default -> false) If true it will act like a submit button for Form component
 * @param {*} icon ReactComponent - (default -> IoChevronForward)
 * @param {*} direction "left" | "right" - (default - "right") - Is the icon position.
 * @param {*} color "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "dark" | "medium" | "light" - (default - "primary")  
 * @param {*} single boolean - if true will be active only one element (default - false)
 * @param {*} onClick callback - (default -> ()=>console.log("Click"))
 * @returns 
 */



const BadgeActive = ({
  isActive = false,
  size = "md",
  text = "Badge",
  shape = "default",
  isIcon = false,
  isRound = false,
  icon = (iconSize) => { return <IoClose size={iconSize} /> },
  direction = "right",
  color = "primary",
  single = false,
  onClick = () => { console.log("Click") },
}) => {
  // VARIABLES ----------------------
  const [select, setSelect] = useState(isActive);
  // CONDITIONS ---------------------
  // FUNCTIONS ----------------------
  const handleSelect = () => {
    single ? null : setSelect(!select);
    onClick();
  }
  // RETURN -------------------------
  return (
    <div
      onClick={() => handleSelect()}
      className={`
      ${styles.Badge} 
      ${styles[size]}
      ${styles[isRound ? "round" : shape]}
      ${styles[direction]}
      ${isRound ? styles["isRound"] : styles["isNotRound"]}
      ${styles[single ? isActive ? "fill" + "_" + color : "outline" + "_" + color : select ? "fill" + "_" + color : "outline" + "_" + color]}
    `}>
      {isIcon ?
        icon(cFontSize[size])
        : null
      }
      {text ?
        <span className={styles.text}>
          {text}
        </span>
        :
        null
      }
      {single ?
        isActive ?

          <LuCheckSquare size={24} />
          :
          <LuSquare size={24} />
        :
        select ?

          <LuCheckSquare size={24} />
          :
          <LuSquare size={24} />
      }
    </div>
  );
}

export default BadgeActive;