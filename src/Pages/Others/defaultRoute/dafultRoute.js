import React from 'react';
import styles from './defaultRoute.module.css';
import defaultRouteImg from '../../../Assets/defaultRoute.gif';
import { Link } from 'react-router-dom';

function dafultRoute() {
  return (
    <div className={styles.defaultRouteMain}>
        <h2>Ooops not found</h2>
        <Link to="/" className={styles.returnLink}>Take me out of here</Link>
        <img src={defaultRouteImg} className={styles.defaultRouteImgContainer}/>
    </div>
  )
}

export default dafultRoute
