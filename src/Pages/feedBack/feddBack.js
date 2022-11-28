import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from './feedBack.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faFaceSmile, faFaceMeh, faFaceGrinStars, faFaceMehBlank } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Others/modal/modal';
import Backdrop from '../Others/backdrop/backdrop';
import { SpinnerDotted } from 'spinners-react';


const satisfyObject = {
    worse: {
        image: faFaceFrown,
        point: 1
    },
    bad: {
        image: faFaceMehBlank,
        point: 2
    },
    ok: {
        image: faFaceMeh,
        point: 3
    },
    good: {
        image: faFaceSmile,
        point: 4
    },
    excelent: {
        image: faFaceGrinStars,
        point: 5
    }
}

let target = null;


const FeedBack = (props) => {

    const [satisfy, setSatisfy] = useState('')
    const [satisfyValidity, setSatisfyValidty] = useState(false);

    const [category, setCategory] = useState('');
    const [categoryValidity, setCategoryValidty] = useState(false);

    const [feedBack, setFeedBack] = useState('');
    const [feedBackValidity, setFeedBackValidity] = useState(true);

    const [name, setName] = useState('')

    const [btnDisable, setBtnDisable] = useState(true);

    const [notification, setNotification] = useState('');

    const [modal, setModal] = useState(false);

    const [backDrop, setBackdrop] = useState(false);

    const [spinner, setSpinner] = useState(false);

    useEffect(() => {

        window.scrollTo(0, 0);

        return () => {
            setSatisfy('')
            setSatisfyValidty(false);
            setCategory('')
            setCategoryValidty(false);
            setFeedBack('')
            setFeedBackValidity(true);
            setBtnDisable(true)
        }
    }, [])


    const satisfaction = Object.values(satisfyObject).map(item => {
        return <FontAwesomeIcon key={item['point']}
                                icon={item['image']}
                                className={satisfy === item.point ? `${styles.fontAwesome} ${styles.fontAwesomeActive}` : styles.fontAwesome}
                                onClick={() => inputHandler('satisfy', item.point)}
                                />
    })

    const inputHandler = (id, value) => {
        switch(id) {
            case 'satisfy':
                target = id;
                setSatisfy(value);
                break;

            case 'category':
                target = id;
                setCategory(value);
                break;
            
            case 'feedBack':
                target = id;
                setFeedBack(value.target.value);
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        switch(target) {
            case 'satisfy':
                satisfy ? setSatisfyValidty(true) : setSatisfyValidty(false);
                break;

            case 'category':
                category ? setCategoryValidty(true) : setCategoryValidty(false);
                break;
            
            case 'feedBack':
                feedBack.length >= 5 ? setFeedBackValidity(true) : setFeedBackValidity(false)
                break;

            default:
                break;
        }
    }, [satisfy, category, feedBack])

    useEffect(() => {
        if (satisfyValidity && categoryValidity && (feedBackValidity && feedBack)) {
            setBtnDisable(false);
        }
        else {
            setBtnDisable(true)
        }

    }, [satisfyValidity, categoryValidity, feedBackValidity])

    const sessionStorageObj = JSON.parse(sessionStorage.getItem('user'));

    if (sessionStorageObj && name === '') {
        console.log('parent');
        if (sessionStorageObj.hasOwnProperty('_id')) {
            console.log('child1');
            setName(sessionStorageObj['firstName'] + ' ' + sessionStorageObj['lastName'])
        }
        else {
            console.log('child2');
            setName(sessionStorageObj['name'][0] + ' ' + sessionStorageObj['name'][1])
        }
    }

    const openModal = () => {
        setModal(true);
        setBackdrop(true);
    }

    const closeModal = () => {

        if (notification === 'submitted' || notification === 'network error') {
            window.location.reload();
        }
        else {
            setModal(false);
            setBackdrop(false);
        }
    }

    const submitForm = (event) => {
        event.preventDefault();

        setSpinner(true);

        fetch('https://ncs-api.onrender.com/userFeedback', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                satisfy,
                category,
                feedBack,
                name
            })
        }).then(res => res.json()).then(data => {

            setSpinner(false);

            if (data.status === 'submitted') {
                setNotification(data.status);
                openModal();
            }
            else if (data.status === 'failed') {
                setNotification(data.status);
                openModal();
            }
        }) .catch(err => {
            setNotification('network error');
            openModal();
        })
    }


    let submitMsg = null;

    if (notification === 'submitted') {
        submitMsg = <div>
            <h3>Thanks for your fedback</h3>
            <div className={styles.btnGroup}>
                <button className={styles.closeBtn} onClick={ closeModal }>Stay here</button>
                <Link to="/testimonial" className={styles.forwardLink}>Take me to testimonial page</Link>
            </div>
        </div>
    }
    else if (notification === 'failed') {
        submitMsg = <div>
            <p>Failed, try again</p>
            <button className={styles.closeBtn} onClick={ closeModal }>Try again</button>
        </div>
    }
    else if (notification === 'network error'){
        submitMsg = <div>
            <p>Something went wrong, please reload the page</p>
            <button className={styles.closeBtn} onClick={ closeModal }>Reload</button>
        </div>
    }


    if (!sessionStorage.getItem('user')){
        return (
            <>
                <Backdrop />
                <Modal>
                    <div className={styles.loginPrompt}>
                        <h3>You are not logged in</h3>
                        <p>Please login to continue</p>
                        <div className={styles.promptLink}>
                            <Link to="/login" className={styles.loginPromptLink} >Login</Link>
                            <p>or</p>
                            <Link to="/" className={styles.loginPromptLink} >Homepage</Link>
                        </div>
                    </div>
                </Modal>
                <div className={styles.displayError}>
                    <h3>Nothing to display</h3>
                    <p>PLease login to continue using our site</p>
                    <Link to="/login" className={styles.loginLink} >Go to login</Link>
                </div>
            </>
        )
    }

    return (
        <>
            <Backdrop backdrop={backDrop} />
            <Modal toggle={modal} >{submitMsg}</Modal>

            <div className={styles.spinner} style={spinner ? {display: 'flex'} : {display: 'none'}}>
                <SpinnerDotted size={90} thickness={100} speed={100} color="rgba(224, 118, 24, 1)" />
                <p style={{color: 'rgb(224, 118, 24)'}}>Please wait...</p>
            </div>
            
            <div className={styles.main}>
                <form className={styles.intro}>
                    <h3 className={styles.h3}>We would like your feedback to improve our service</h3>

                    <div className={styles.star}>
                        <h3 className={styles.h3}>How satisfied you are</h3>

                        <div className={styles.faces}>
                            {satisfaction}
                        </div>
                    </div>

                    <div className={styles.categories}>
                        <h3 className={styles.h3}>Please select an category</h3>

                        <div className={styles.chooseCategory}>
                            <div className={category === 'Disappointed' ? `${styles.category} ${styles.categoryActive}` : styles.category}
                                onClick={() => inputHandler('category', 'Disappointed')}>
                                <p className={styles.categoryPara}>Disappopinted</p>
                            </div>

                            <div className={category === 'Need Improvement' ? `${styles.category} ${styles.categoryActive}` : styles.category}
                                onClick={() => inputHandler('category', 'Need Improvement')}>
                                <p className={styles.categoryPara}>Need Improvement</p>
                            </div>

                            <div className={category === 'Its Okay' ? `${styles.category} ${styles.categoryActive}` : styles.category}
                                    onClick={() => inputHandler('category', 'Its Okay')}>
                                <p className={styles.categoryPara}>Its okay</p>
                            </div>

                            <div className={category === 'Excelent Service' ? `${styles.category} ${styles.categoryActive}` : styles.category}
                                    onClick={() => inputHandler('category', 'Excelent Service')}>
                                <p className={styles.categoryPara}>Execelent service</p>
                            </div>
                        </div>

                    </div>

                    <div className={styles.feedBack}>
                        <h3 className={styles.h3}>Please leave your feedback below</h3>
                        <strong>{`You are currently logged in as ${name}`}</strong>
                    <p>Please Note that your name will displayed with your feedBack</p>
                        <div className={styles.feedBackForm}>
                            <textarea id={styles.message} className={feedBackValidity ? styles.userFeedback : styles.wrongUserFeedback}
                                                        maxLength="255"
                                                        placeholder="Write your feedback here"
                                                        onChange={(event) => inputHandler('feedBack', event)}
                                                        />
                        </div>
                    </div>

                    <button disabled={btnDisable ? true : false}
                            className={!btnDisable ? styles.btn : styles.btnDisable}
                            onClick={(event) => submitForm(event)}
                            >Send</button>
                </form>
            </div>
        </>
    )
}


export default FeedBack;
