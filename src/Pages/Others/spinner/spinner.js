import React from 'react';
import { SpinnerDotted } from 'spinners-react';
import styles from './spinner.module.css';

function spinner(props) {
  return (
    <div className={styles.spinner} style={props.spinner ? {display: 'flex'} : {display: 'none'}}>
        <SpinnerDotted  size={90} thickness={100} speed={100} color="rgba(224, 118, 24, 1)" />
        <p style={{color: 'rgb(224, 118, 24)'}}>Please wait...</p>
    </div>
  )
}

export default spinner;
