import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { database } from '../../Others/firebase/firebaseStorage';
import { ref, onValue } from 'firebase/database'
import styles from './displaySubItem.module.css';
import { SpinnerDotted } from 'spinners-react';
import SearchByMake from "../searchByMake/searchByMake";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'


const DisplaySubItem = () => {

    const [make, model] = Object.values(useParams()).map(item => item.toLowerCase())
    
    const [models, setModels] = useState(null);

    const [spinner, setSpinner] = useState(true);

    const [AuctionMsg, setAuctionMsg] = useState(null);

    useEffect(() => {
        const modelRef = ref(database, `${make}/${model}`);

        onValue(modelRef, (snapshot) => {
            setModels(snapshot.val());
            setSpinner(false);
        }, (err) => console.log(err));

        window.scrollTo(0, 0)

    },  [] )

    const changeParams = (query) => {
        window.location.replace(`/displayItem/${query}`)
    }

    const displayAuctionMsg = (model) => {
        setAuctionMsg(model)
    }

    const closeAuctionMsg = () => {
        setAuctionMsg(null);
    }

    let display = <div className={styles.defaultDisplay} style={!models ? {height: '100vh'}: {height: 'auto'}}>
        <h3>Nothing to display</h3>
        <p>Please check your input and try again</p>
    </div>

    if (models) {
        display = models.map((item, index) => {
            return <Link to={`/auction/${item['make']}/${item['model']}/${item['year']}`} key={index} className={styles.modelLink}>
                <div className={styles.cards} onMouseOver={ () => displayAuctionMsg(index) } onMouseOut={ () => closeAuctionMsg() }>
                    <div className={ AuctionMsg === index ? `${styles.sendAuctionContainer} ${styles.auctionActive}` : styles.sendAuctionContainer}>
                        <p className={styles.auctionMsg}>Send Auction Inquiry</p>
                        <FontAwesomeIcon icon={ faPaperPlane } className={styles.sendAuctionFont}/>
                    </div>
                    <img src={item['img']} alt={item['model']} className={styles.img}/>
                    <div className={styles.detailsMain}>
                        <div className={styles.details}>
                            <h4 className={styles.h4}>{`Make: ${item['make']}`}</h4>
                            <h4 className={styles.h4}>{`Model: ${item['model']}`}</h4>
                            <h4 className={styles.h4}>{`Year: ${item['year']}`}</h4>
                        </div>
                    </div>
                </div>
            </Link>
        })
    }

    return (
        <div className={styles.main}>
            <div className={styles.spinner} style={spinner ? {display: 'flex'} : {display: 'none'}}>
                <SpinnerDotted  size={90} thickness={100} speed={100} color="rgba(224, 118, 24, 1)" />
                <p style={{color: 'rgb(224, 118, 24)'}}>Please wait...</p>
            </div>

            <div className={styles.sidePanel}>
                <SearchByMake params={make} changeParams={changeParams}/>
            </div>

            <div className={styles.displayMain}>
                {display}
            </div>
        </div>
    )
}

export default DisplaySubItem;
