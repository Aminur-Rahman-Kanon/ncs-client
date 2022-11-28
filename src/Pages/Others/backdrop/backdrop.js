import React, { useEffect } from "react";
import styles from './backdrop.module.css';

const Backdrop = (props) => {
    
    const disableScroll = () => {
        document.body.style.overflow = 'unset';
    }
    
    const enableScroll = () => {
        document.body.style.overflow = 'hidden'
    }

    if (!props.backdrop) {
        return disableScroll();
    }
    else {
        enableScroll();
    }


    return (
        <div className={styles.main} onClick={props.closeBackdrop}>

        </div>
    )
}


export default Backdrop;
