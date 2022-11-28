import React from "react";
import styles from './modal.module.css';


const Modal = (props) => {

    if (!props.toggle) return true;

    return (
        <div className={styles.main}>
            {props.children}
        </div>

    )
}


export default Modal;
