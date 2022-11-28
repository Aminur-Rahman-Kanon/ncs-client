import React from "react";
import { Link } from 'react-router-dom';
import styles from './loggedIn.module.css';

const loggedIn = () => {

    return (
        <div className={styles.main}>
            <p>You are already logged in</p>
            <p>To login with a different user please logout and then login again</p>
            <Link to="/" className={styles.existLoginLink}>Go to Homepage</Link>
        </div>
    )
}

export default loggedIn;
