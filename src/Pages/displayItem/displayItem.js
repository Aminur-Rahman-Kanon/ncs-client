import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import styles from './displayItem.module.css';
import { database } from '../Others/firebase/firebaseStorage'
import { ref, onValue} from 'firebase/database';
import Spinner from "../Others/spinner/spinner";
// import { modelPic } from '../../Data/data';
import SearchByMake from "./searchByMake/searchByMake";

const DisplayItem = () => {

    const params = useParams().itemId.toLowerCase()

    const [data, setData] = useState({});

    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
        const dbRef = ref(database, `${params}`);
    
        onValue(dbRef, (snapshot) => {
            setData(snapshot.val());
            setSpinner(false);
        }, (err) => {
            console.log(err);
        })

    }, [params] )

    const changeParams = (query) => {
        window.location.replace(`/displayItem/${query}`);
    }

    let display = <div className={styles.defaultDisplay}>
        <h3>Nothing to display</h3>
        <p>Please check your input and try again</p>
    </div>

    let checkForData = Object.values(data).length > 0 ? true : false;

    if ( checkForData ) {
        console.log('foo')
        display = Object.values(data).map(items => {
            return Object.values(items).slice(0, 1).map((item, index) => {
                return <Link key={index} to={`${item['model']}`} className={styles.modelLink}>
                    <div className={styles.cars}>
                            <img src={item['img']} className={styles.img}/>
                            <div className={styles.carDetails}>
                                <div className={styles.details}>
                                    <h4 className={styles.carDetailsHeader}>{`Make: ${item['make']}`}</h4>
                                    <h4 className={styles.carDetailsHeader}>{`Model: ${item['model']}`}</h4>
                                </div>
                            </div>
                        </div>
                </Link>
            })
        })
    }

    // const searchByMake = Object.keys(modelPic).map(model =>{
    //     return <li key={model} className={styles.searchItems}>
    //         <div className={ styles.searchItem }
    //              onClick={() => changeParams(model)} >
    //             <img src={modelPic[model]} className={ params === model ? `${styles.searchItemImg} ${styles.searchItemImgActive}` : styles.searchItemImg}/>
    //             <p className={ styles.searchItemDetails}
    //                          style={params === model ? {color: 'rgb(224,118,24)'} : null}>
    //                 {model === "alfaromeo" ? 'Alpha Romeo' : model}
    //             </p>
    //         </div>
    //     </li>
    // })



    return (
        <div className={styles.main}>
            <Spinner spinner={spinner}/>

            <div className={styles.intro}>
                
            </div>

            <div className={styles.sidePanel}>
                <h3>Search by Make</h3>
                <div className={styles.searchCategory}>
                    <SearchByMake params={params} />
                </div>
            </div>
            <div className={styles.carMain} style={checkForData ? {height: 'auto'} : {height: '100vh'}}>
                {display}
            </div>
        </div>
    )
}

export default DisplayItem;
