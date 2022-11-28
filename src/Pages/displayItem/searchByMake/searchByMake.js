import React, { useState } from "react";
import styles from './searchByMake.module.css';
import { modelPic } from "../../../Data/data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp, faAnglesDown } from '@fortawesome/free-solid-svg-icons'

const SearchByMake = (props) => {

    const totalModel = Object.keys(modelPic).length;

    const initialModelDisplay = 6;

    const [expandAllItem, setExpandAllItem] = useState(initialModelDisplay);

    const changeDirectory = (model) => window.location.replace(`/displayItem/${model}`)

    const searchByMake = Object.keys(modelPic).slice(0, expandAllItem).map(model =>{
        return <li key={model} className={styles.searchItems}>
            <div className={ styles.searchItem }
                 onClick={() => changeDirectory(model)} >
                <img src={modelPic[model]} className={ props.params === model ? `${styles.searchItemImg} ${styles.searchItemImgActive}` : styles.searchItemImg}/>
                <p className={ styles.searchItemDetails}
                             style={props.params === model ? {color: 'rgb(224,118,24)'} : null}>
                    {model === "alfaromeo" ? 'Alpha Romeo' : model}
                </p>
            </div>
        </li>
    })

    const paginationHandler = () => {
        
        if ( expandAllItem < 20 ) {
            setExpandAllItem(totalModel);
        }
        else {
            setExpandAllItem(initialModelDisplay);
        }
    }

    return (
        <div>
            <ul className={styles.searchItemContainer}>
                {searchByMake}
            </ul>

            <div className={styles.moreBtnContainer}>
                <div className={styles.moreBtnDiv} onClick={ paginationHandler }>
                    <button className={styles.moreBtn}>
                        {expandAllItem < 20 ? "More" : "Less"}
                    </button>
                    <FontAwesomeIcon icon={faAnglesUp} style={expandAllItem === 20 ? {display: 'inline-block'} : {display: 'none'}}/>
                    <FontAwesomeIcon icon={faAnglesDown} style={expandAllItem < 20 ? {display: 'inline-block'} : {display: 'none'}}/>
                </div>
            </div>

        </div>
    )
}

export default SearchByMake;
