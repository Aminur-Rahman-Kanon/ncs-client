import React from "react";
import styles from './errorMsg.module.css';


const ErrorMsg = (props) => {

    return (
        <div className={styles.main}>
            <p>Caution: you are already logged in</p>
        </div>
    )
}

export default ErrorMsg;
