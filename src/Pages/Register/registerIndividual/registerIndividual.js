import React, { useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import styles from './registerIndividual.module.css';
import Backdrop from "../../Others/backdrop/backdrop";
import Modal from "../../Others/modal/modal";
import { countryList } from '../../../Data/data';
import Spinner from "../../Others/spinner/spinner";

const specialCharRegex = new RegExp(/[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/);
const UppercaseRegex = new RegExp(/[A-Z]/);
let target = null;

const Register = () => {

    const [spinner, setSpinner] = useState(false);
    
    const [userExist, setUserExist] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [modal, setModal] = useState(false);

    const [message, setMessage] = useState('');

    const [firstName, setFirstName] = useState('');
    const [firstNameValidity, setFirstNameValidity] = useState(true);

    const [lastName, setLastName] = useState('');
    const [lastNameValidity, setLastNameValidity] = useState(true);

    const [country, setCountry] = useState('');
    const [countryValidity, setCountryValidity] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberValidity, setPhoneNumberValidity] = useState(true);

    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidity] = useState(true);

    const [password, setPassword] = useState('');
    const [passwordValidity, setPasswordValidity] = useState(true);

    const [reTypePassword, setReTypePassword] = useState('');
    const [reTypePasswordValidity, setReTypePasswordValidity] = useState(true);
    
    const [btnDisable, setBtnDisable] = useState(true);

    const countryLists = useMemo(() => {
            return countryList.map(item => {
                return <option key={item} className={styles.country}>{item}</option>
            })
    }, [])


    useEffect(() => {

        switch(target) {
            case 'firstName':
                firstName.length >= 3 ? setFirstNameValidity(true) : setFirstNameValidity(false);
                break;

            case 'lastName':
                lastName.length >= 3 ? setLastNameValidity(true) : setLastNameValidity(false);
                break;

            case 'country':
                country.length > 0 ? setCountryValidity(true) : setCountryValidity(false);
                break;

            case 'phone':
                phoneNumber.length >= 11 ? setPhoneNumberValidity(true) : setPhoneNumberValidity(false)
                break;

            case 'email':
                const check1 = email.includes('@');
                const check2 = email.includes('.com')

                const checkForindex1 = email.indexOf('@') + 1
                const checkForindex2 = email.indexOf('.com')

                const check3 = email.slice(checkForindex1, checkForindex2)

                if (email.length >= 10 && check1 && check2 && check3.length > 0) {
                    setEmailValidity(true)
                }
                else {
                    setEmailValidity(false)
                }
                break;

            case 'password':
                if (password.length >= 8 && specialCharRegex.test(password) && UppercaseRegex.test(password)) {
                    if (password === reTypePassword){
                        setPasswordValidity(true);
                        setReTypePasswordValidity(true);
                    }
                    else {
                        setPasswordValidity(true);
                    }
                }
                else {
                    setPasswordValidity(false);
                }
                break;

            case 'reTypePassword':
                reTypePassword === password ? setReTypePasswordValidity(true) : setReTypePasswordValidity(false);
                break;

            default:
                break;
        }

    }, [firstName, lastName, phoneNumber, email, password, reTypePassword])



    useEffect(() => {
        if ((firstName.length >= 3 && firstNameValidity === true) && (lastName.length >= 3 && lastNameValidity === true) &&
            (phoneNumber.length >= 11 && phoneNumberValidity === true) && (email.length >= 10 && emailValidity === true) &&
            (password.length >= 8 && passwordValidity === true) && reTypePassword.length >= 8 && reTypePasswordValidity === true) {
                setBtnDisable(false);
        }
        else {
            setBtnDisable(true);
        }
        
    }, [firstNameValidity, lastNameValidity, phoneNumberValidity, emailValidity, passwordValidity, reTypePasswordValidity])

    const inputHandler = (event, id) => {
        switch(id) {
            case 'firstName':
                setFirstName(event.target.value);
                target = id;
                break;

            case 'lastName':
                setLastName(event.target.value);
                target = id;
                break;

            case 'country':
                setCountry(event.target.value);
                target = id;
                break;

            case 'phone':
                setPhoneNumber(event.target.value);
                target = id;
                break;

            case 'email':
                setEmail(event.target.value);
                target = id;
                break;

            case 'password':
                setPassword(event.target.value);
                target = id;
                break;

            case 'reTypePassword':
                setReTypePassword(event.target.value);
                target = id;
                break;

            default:
                break;
        }
    }

    const openModal = () => {
        setBackdrop(true);
        setModal(true)
    }
    
    const closeModal = () => {   
        if (message === 'user registered' || message === 'network error') {
            window.location.reload();
        }
        else {
            setModal(false);
            setBackdrop(false);
        }
    }

    const emailAnimation = () => {
        const div = document.querySelector(`.${styles.emailFields}`)
        div.style.backgroundColor = '#f9b9b9';
        div.style.borderRadius = '8px'
        div.style.transform = 'scale(1.2)';

        setTimeout(() => {
            div.style.transform = 'scale(1.0)';
        }, 300)
    }

    const submitForm = (event) => {
        
        event.preventDefault();
        
        setSpinner(true);

        fetch('https://ncs-api.onrender.com/signupIndividual', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                firstName,
                lastName,
                country,
                phoneNumber,
                email,
                password
            })
        }).then((res) => res.json()).then(data => {

            setSpinner(false);
            console.log(data)

            if (data.status === 'user registered') {
                setMessage(data.status);
                openModal();
            }
            else if (data.status === 'user exist') {
                setUserExist(true);
                emailAnimation();
            }
            else {
                setMessage(data.status);
                openModal()
            }
        })
        .catch(err => {
            setMessage('network error');
            openModal()
        })
    }

    let userChoice = null;

    if (message === 'user registered') {
        userChoice = <div className={styles.userChoiceMain}>
            <p className={styles.successMsg}>Registered!!!</p>
            <div className={styles.userChoiceBtns}>
                <Link to="/login" className={styles.userChoiceBtn}>Login</Link>
                <p>or</p>
                <Link to="/" className={styles.userChoiceBtn}>Homepage</Link>
            </div>
        </div>
    }
    else if (message === 'failed') {
        userChoice = <div className={styles.userChoiceMain}>
            <p>Failed, try again</p>
            <button className={styles.btn} onClick={closeModal}>Try again</button>
        </div>
    }
    else {
        userChoice = <div className={styles.userChoiceMain}>
            <p>Something went wrong, please reload the page</p>
            <button className={styles.btn} onClick={closeModal}>Reload</button>
        </div>
    }


    return (
        <>
            <Backdrop backdrop={backdrop} closeBackdrop={closeModal} />
            <Modal toggle={modal}>{userChoice}</Modal>
            <Spinner spinner={spinner}/>

            <div className={styles.main}>
                <div className={styles.backgroundMain}>

                </div>
                <form onSubmit={(event) => submitForm(event)} className={styles.form}>
                    <div className={styles.fields}>
                        <label htmlFor="firstName" className={styles.label}>First Name</label>
                        <input id="firstName"
                                className={firstNameValidity ? styles.input : styles.wrongInput}
                                type="text"
                                placeholder="First Name"
                                onChange={(event) => inputHandler(event, 'firstName')}
                                />
                    </div>

                    <div className={styles.fields}>
                        <label htmlFor="lastName" className={styles.label}>Last Name</label>
                        <input id="lastName"
                                className={lastNameValidity ? styles.input: styles.wrongInput}
                                type="text"
                                placeholder="Last Name"
                                onChange={(event) => inputHandler(event, 'lastName')}
                                />
                    </div>

                    <div className={styles.fields}>
                        <label htmlFor="country" className={styles.label}>Country</label>

                        <select className={ countryValidity ? styles.countryInput : `${styles.countryInput} ${styles.wrongCountryInput}`}
                                id="country"
                                defaultValue="Select a country"
                                onChange={(event) => inputHandler(event, 'country')}>
                            <option disabled >Select a country</option>
                            {countryLists}
                        </select>
                    </div>

                    <div className={styles.fields}>
                        <label htmlFor="phone" className={styles.label}>Phone Number</label>
                        <input type="number"
                                id="phone"
                                className={phoneNumberValidity ? styles.input : styles.wrongInput}
                                placeholder="Phone Number"
                                onChange={(event) => inputHandler(event, 'phone')}
                                />
                    </div>

                    <div className={styles.fields}>
                        <label htmlFor="email" className={styles.label}>Email Address</label>
                        <div className={styles.emailFields}>
                            <input id="email"
                                    style={userExist ? {border: '1px solid #e9aeae'} : null}
                                    className={emailValidity ? styles.emailInput : styles.wrongEmailInput}
                                    type="email"
                                    placeholder="Email Address"
                                    onChange={(event) => inputHandler(event, 'email')}
                                    />
                            <p style={userExist ? {display: 'block', color: 'black'} : {display: 'none'}} className={styles.error}>User email exists</p>

                        </div>
                    </div>

                    <div className={styles.fields}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <div className={styles.password}>
                            <input id="password"
                                    className={passwordValidity ? styles.passwordInput : styles.wrongPasswordInput}
                                    type="password"
                                    onChange={(event) => inputHandler(event, 'password')}
                                    placeholder="Password"/>
                            <p className={styles.warning}>Should be at least 8 character long including 1 Uppercase and 1 special character</p>

                        </div>
                    </div>

                    <div className={styles.fields}>
                        <label htmlFor="retypePassword" className={styles.label}>Retype Password</label>
                        <input id="retypePassword"
                                className={reTypePasswordValidity ? styles.input : styles.wrongInput}
                                type="password"
                                placeholder="Retype Password"
                                onChange={(event) => inputHandler(event, 'reTypePassword')}
                                />
                    </div>

                    <div className={styles.submit}>
                        <button disabled={btnDisable ? true : false}
                                type="submit"
                                className={!btnDisable ? styles.btn : styles.btnDisable}>Register</button>
                        <div className={styles.msg}>
                            <p>Already registered?</p>
                            <Link to="/login" className={styles.login}>Login</Link>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}


export default Register;
