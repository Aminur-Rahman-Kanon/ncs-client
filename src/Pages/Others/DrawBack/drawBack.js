import React from "react";
import styles from './drawBack.module.css';


const DrawBack = (props) => {

    return (
        <div className={props.drawBack ? styles.Main : styles.Off} onClick={props.clickToChange}>

        </div>
    )
    
}

export default DrawBack;
