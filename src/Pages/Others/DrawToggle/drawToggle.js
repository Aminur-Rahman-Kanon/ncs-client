import React from "react";
import styles from './drawToggle.module.css';


const DrawToggle = (props) => {

    return (
        <div className={styles.Main} onClick={props.toggle}>
            <div className={styles.Bar}></div>
            <div className={styles.Bar}></div>
            <div className={styles.Bar}></div>
        </div>
    )
}

export default DrawToggle;
