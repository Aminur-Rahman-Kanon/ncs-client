import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from './searchResult.module.css';
import { database } from '../Others/firebase/firebaseStorage';
import { ref, onValue } from 'firebase/database'
import SearchByMake from '../displayItem/searchByMake/searchByMake';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'


const SearchResult = () => {

    const [make, model, yearFrom, yearTo, priceFrom, priceTo] = Object.values(useParams()).map(item => item.toLowerCase());

    const [data, setData] = useState(null);

    const [auctionMsg, setAuctionMsg] = useState(null)

    useEffect(() => {
        const searchRef = ref(database, `${make}/${model}`)
        onValue(searchRef, (snapshot) => {
            console.log(snapshot.val())
            setData(snapshot.val())
        }, (err) => {
            console.log(err);
        })
    }, [] )

    const displayAuctionMsg = (model) => {
        setAuctionMsg(model)
    }

    const closeAuctionMsg = () => {
        setAuctionMsg(null);
    }

    let display = null;

    console.log(data)

    if (data) {
        const result = data.filter(items => items.year >= yearFrom && items.year <= yearTo);

        if (result.length > 0) {
            display = <div className={styles.mainContainer}>
                <div className={styles.resultCount}>
                    <h4 className={styles.resultCountHeader}>{`${result.length} Cars found based on your result`}</h4>
                </div>
                <div className={styles.resultContainer}>
                    {result.map((item, index) => {
                        return <Link to={`/auction/${item.make}/${item.model}/${yearFrom}/${yearTo}/${priceFrom}/${priceTo}`} key={index} className={styles.modelLink}>
                            <div className={styles.cards} onMouseOver={ () => displayAuctionMsg(index) } onMouseOut={ () => closeAuctionMsg() }>
                                <div className={ auctionMsg === index ? `${styles.sendAuctionContainer} ${styles.auctionActive}` : styles.sendAuctionContainer}>
                                    <p className={styles.auctionMsg}>Send Auction Inquiry</p>
                                    <FontAwesomeIcon icon={ faPaperPlane } className={styles.sendAuctionFont}/>
                                </div>
                                <img src={item.img} alt={item.model} className={styles.img}/>
                                <div className={styles.detailsMain}>
                                    <div className={styles.details}>
                                        <h4 className={styles.h4}>{`Make: ${item['make']}`}</h4>
                                        <h4 className={styles.h4}>{`Model: ${item['model']}`}</h4>
                                        <h4 className={styles.h4}>{`Year: ${item['year']}`}</h4>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    })}
                </div>
            </div>
        }
        else {
            display = <div className={styles.noResult}>
                <h4>Sorry, no result found</h4>
            </div>
        }
    }
    else {
        display = <div>
            <h4>Sorry, no result found</h4>
        </div>
    }

    return (
        <div className={styles.main}>
            <div className={styles.sidePanel}>
                <SearchByMake params={make} />
            </div>
            {display}
        </div>
    )
}

export default SearchResult;
