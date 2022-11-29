import React, { useEffect, useState } from 'react';
import styles from './testimonial.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCircle, faX, faMoneyBill1Wave, faShieldHalved, faHeadset, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Spinner from '../Others/spinner/spinner';
import Modal from '../Others/modal/modal';

const Testimonial = () => {

    const [data, setData] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(0);
    
    const [showFeedback, setShowFeedback] = useState(true);
    
    const [spinner, setSpinner] = useState(false)
    
    const [error, setError] = useState(false);

    useEffect(() => {
        setSpinner(true);
        fetch('https://ncs-api.onrender.com/requestUserReview')
            .then(res => res.json()).then(data => {
                setSpinner(false);
                setData(data.data)
            })
            .catch(err => {
                setSpinner(false);
                setError(true)
            })

    }, [])

    const itemPerView = 3;
    let totalPage = Math.ceil(data.length / itemPerView);

    const currentPageHandler = (type) => {

        console.log(type);
        if (type === 'next'){
            setCurrentPage(currentPage + 1)
        }
        else {
            setCurrentPage(currentPage -1)
        }
    }
    
    const display = data.slice(currentPage * itemPerView, (currentPage * itemPerView) + itemPerView).map(item => {
        return <div key={item._id} className={styles.comment}>
            <h3 className={styles.commentHeader}>{item.category}</h3>
            <p className={styles.commentPara}>
                {item.feedBack}
            </p>
            
            <div className={styles.review}>
                {[...Array(item.satisfy).keys()].map(item => {
                    return <FontAwesomeIcon key={item} icon={ faStar } className={`${styles.starFont} ${styles.starFontActive}`}/>
                })
                }
                {item.satisfy < 5 ? [...Array(5 - item.satisfy).keys()].map(item => {
                    return <FontAwesomeIcon key={item} icon={ faStar } className={styles.starFont} />
                })
                 : null}
            </div>
    
            <div className={styles.user}>
                <p className={styles.userName}>{item['name']}</p>
            </div>
        </div>
    })

    let page = 0

    const pageMarker = totalPage > 4 ? [...Array(4).keys()].map(item => {
        return <FontAwesomeIcon key={item}
                            icon={ faCircle }
                            className={currentPage === page ++ ? `${styles.circle} ${styles.circleActive}` : styles.circle} />
    })
    : [...Array(totalPage).keys()].map(item => {
        return <FontAwesomeIcon key={item}
                                icon={ faCircle }
                                className={currentPage === page ++ ? `${styles.circle} ${styles.circleActive}` : styles.circle} />
    })

    const displayError = <div className={styles.errorMsg}>
        <h3>Something went wrong</h3>
        <h4>Please check your internet connection</h4>
        <button onClick={() => window.location.reload()} className={styles.errorMsgBtn}>Retry</button>
    </div>

    return (
        <div className={styles.main}>
            <Modal toggle={error}>
                {displayError}
            </Modal>

            <div className={styles.feedback} style={showFeedback ? {display: 'flex'} : {display: 'none'}}>
                <FontAwesomeIcon icon={ faX } className={styles.xBtn} onClick={() => setShowFeedback(false)}/>
                <Link to="/feedback" className={styles.feedbackLink}>Leave a feedback</Link>
            </div>

            <div className={styles.heading}>
                <h2>5 Reasons to choose Nihon Chuko Sha</h2>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <FontAwesomeIcon icon={faCar} className={styles.fontAwesome}/>
                        <h3 className={styles.header}>Best Quality</h3>
                    </div>

                    <div className={styles.card}>
                        <FontAwesomeIcon icon={faShieldHalved} className={styles.fontAwesome}/>
                        <h3 className={styles.header}>Secure Payment</h3>
                    </div>

                    <div className={styles.card}>
                        <FontAwesomeIcon icon={faMoneyBill1Wave} className={styles.fontAwesome}/>
                        <h3 className={styles.header}>Best Price</h3>
                    </div>

                    <div className={styles.card}>
                        <FontAwesomeIcon icon={faHeadset} className={styles.fontAwesome}/>
                        <h3 className={styles.header}>Live Support</h3>
                    </div>

                    <div className={styles.card}>
                        <FontAwesomeIcon icon={faCertificate} className={styles.fontAwesome}/>
                        <h3 className={styles.header}>Govt Approved</h3>
                    </div>
                </div>
            </div>


            <div className={styles.reviews}>
                <h2>Customer Reviews</h2>

                <Spinner spinner={spinner}/>

                <div className={styles.reviewList}>
                    {display}
                </div>

                <div className={styles.pagination}>
                    <button disabled={currentPage === 0 ? true : false}
                            className={currentPage === 0 ? styles.paginationBtnDisable : styles.paginationBtn}
                            onClick={() => currentPageHandler('previous')}>Previous</button>
                    <div className={styles.pageMarker}>{pageMarker} {totalPage > 4 ? `+ ${totalPage - 4}` : null}</div>
                    
                    <button disabled={currentPage + 1 === totalPage ? true : false}
                            className={currentPage + 1 === totalPage ? styles.paginationBtnDisable : styles.paginationBtn}
                            onClick={() => currentPageHandler('next')}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default Testimonial;
