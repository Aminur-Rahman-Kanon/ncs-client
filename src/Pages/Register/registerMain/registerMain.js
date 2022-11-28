import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import styles from './registerMain.module.css';


const registerMain = () => {

    return (
        <div className={styles.main}>
            <div className={styles.registerType}>
                <Link to="/register-individual" className={styles.type}>
                    <FontAwesomeIcon icon={faUserLarge} className={styles.fontAwesome}/>
                    <p className={styles.details}>Register as Individual</p>
                </Link>

                <Link to="/register-trader" className={styles.type}>
                    <FontAwesomeIcon icon={faUserTie} className={styles.fontAwesome}/>
                    <p className={styles.details}>Register as Trader</p>
                </Link>
            </div>
        </div>
    )
}


export default registerMain;
