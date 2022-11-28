import React, { useMemo, useState, useEffect, createRef } from "react"
import styles from './registerTrader.module.css'
import { Link } from "react-router-dom";
import { countryList } from '../../../Data/data';
import Backdrop from "../../Others/backdrop/backdrop";
import Modal from "../../Others/modal/modal";
import Spinner from "../../Others/spinner/spinner";


const specialCharRegex = new RegExp(/[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/);
const UppercaseRegex = new RegExp(/[A-Z]/)
let target = null;

const RegisterTrader = () => {

    const [companyName, setCompanyName] = useState('');
    const [companyNameValidity, setCompanyNameValidity] = useState(true);

    const [address, setAddress] = useState('');
    const [addressValidity, setAddressValidity] = useState(true);

    const [country, setCountry] = useState('');
    const [countryValidity, setCountryValidity] = useState(true);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberValidity, setPhoneNumberValidity] = useState(true);

    const [website, setWebsite] = useState('');

    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidity] = useState(true);

    const [userName, setUserName] = useState('');
    const [userNameValidity, setUserNameValidity] = useState(true);

    const [designation, setDesignation] = useState('');
    const [establishYear, setEstablishYear] = useState('');
    
    const [password, setPassword] = useState('');
    const [passwordValidity, setPasswordValidity] = useState(true);

    const [repeatPassword, setRepeatPassword] = useState('');
    const [repeatPasswordValidity, setRepeatPasswordValidity] = useState(true);

    const [aboutCompany, setAboutCompany] = useState('');

    const [btnDisable, setBtnDisable] = useState(true);

    const [userExist, setUserExist] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [modal, setModal] = useState(false);

    const [spinner, setSpinner] = useState(false);

    const [message, setMessage] = useState('');

    const countryOptions = useMemo(() => countryList.map(item => {
        return <option key={item} className={styles.option}>{item}</option>
    }), [])


    useEffect(() => {
        switch(target) {
            case 'company name':
                companyName.length >= 3 ? setCompanyNameValidity(true) :setCompanyNameValidity(false);
                break;

            case 'address':
                address.length >= 5 ? setAddressValidity(true) : setAddressValidity(false);
                break;

            case 'phone number':
                phoneNumber.length >= 11 ? setPhoneNumberValidity(true) : setPhoneNumberValidity(false);
                break;

            case 'email':
                const check1 = email.includes('@');
                const check2 = email.includes('.com');

                const check1Index = email.indexOf('@');
                const check2Index = email.indexOf('.com');

                const domainLength = email.slice(check1Index, check2Index);

                if (check1 && check2 && domainLength.length > 2) {
                    setEmailValidity(true)
                }
                else {
                    setEmailValidity(false);
                }
                break;

            case 'user name':
                userName.length >= 3 ? setUserNameValidity(true): setUserNameValidity(false);
                break;

            case 'password':
                if (password.length >= 8 && specialCharRegex.test(password) && UppercaseRegex.test(password)) {
                    if (password === repeatPassword){
                        setPasswordValidity(true);
                        setRepeatPasswordValidity(true);
                    }
                    setPasswordValidity(true);
                }
                else {
                    setPasswordValidity(false);
                }
                break;
            
            case 'repeat password':
                if (password === repeatPassword) {
                    setRepeatPasswordValidity(true)
                }
                // else if ()
                else {
                    setRepeatPasswordValidity(false);
                }
                break;
            
            default:
                break;
        }
    }, [companyName, address, country, phoneNumber, website, email, userName, designation, establishYear, password, repeatPassword, aboutCompany])

    useEffect(() => {
        if ((companyName.length > 0 && companyNameValidity) && (address.length > 0 && addressValidity) && (country.length > 0 && countryValidity)
            && (phoneNumber.length > 0 && phoneNumberValidity) && (email.length >= 10 && emailValidity) && (userName.length > 0 && userNameValidity)
            && (password.length > 0 && passwordValidity) && (repeatPassword.length > 0 && repeatPasswordValidity)) {
                setBtnDisable(false)
            }
            else {
                setBtnDisable(true);
            }
    }, [companyNameValidity, addressValidity, countryValidity, phoneNumberValidity, emailValidity, userNameValidity, passwordValidity, repeatPasswordValidity])


    const inputHandler = (event, id) => {
        switch (id) {
            case 'company name':
                setCompanyName(event.target.value);
                target = id;
                break;

            case 'address':
                setAddress(event.target.value);
                target = id;
                break;

            case 'country':
                setCountry(event.target.value);
                target = id;
                break;

            case 'phone number':
                setPhoneNumber(event.target.value);
                target = id;
                break;

            case 'website':
                setWebsite(event.target.value);
                target = id;
                break;

            case 'email':
                setEmail(event.target.value);
                target = id;
                break;

            case 'user name':
                setUserName(event.target.value);
                target = id;
                break;

            case 'designation':
                setDesignation(event.target.value);
                target = id;
                break;

            case 'establish year':
                setEstablishYear(event.target.value);
                target = id;
                break;

            case 'password':
                setPassword(event.target.value);
                target = id;
                break;

            case 'repeat password':
                setRepeatPassword(event.target.value);
                target = id;
                break;

            case 'about company':
                setAboutCompany(event.target.value);
                target = id;
                break;
            
            default:
                break;
        }
    }

    const openModal = () => {
        setBackdrop(true);
        setModal(true);
    }
    
    const closeModal = () => {
        if (message === 'user created' || message === 'network error') {
            console.log('')
            window.location.reload();
        }
        else {
            setSpinner(false);
            setModal(false);
            setBackdrop(false);
        }
    }

    let userChoice = null;

    if (message === 'user created') {
        userChoice = <div className={styles.userChoiceMain}>
            <p>Registered!!!</p>
            <div className={styles.userChoiceBtns}>
                <Link to="/login" className={styles.userChoiceBtn}>Login</Link>
                <p>or</p>
                <Link to="/" className={styles.userChoiceBtn}>Homepage</Link>
            </div>
        </div>
    } else if (message === 'failed') {
        userChoice = <div className={styles.userChoiceMain}>
            <p>Failed, check your input and try again</p>
            <button onClick={ closeModal } className={styles.submitBtn}>Try again</button>
        </div>
    
    } else {
        userChoice = <div className={styles.userChoiceMain}>
        <p>Somwthing went wrong, please reload the page</p>
        <button onClick={ closeModal } className={styles.reloadBtn}>Reload</button>
    </div>
    }

    


    const wrongEmailFocus = () => {
        const div = document.querySelector(`.${styles.emailFields}`).children[1];

        div.style.transform = 'scale(1.5)';
        div.style.backgroundColor = '#f9b9b9';
        div.style.borderRadius = '8px'

        setTimeout(() => {
            div.style.transform = 'scale(1.0)'
        }, 200)
    }
    
    const submitForm = (event) => {    
        event.preventDefault();
        setSpinner(true);

        fetch('https://ncs-api.onrender.com/signUpTrader', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                companyName,
                address,
                country,
                phoneNumber,
                website,
                email,
                userName,
                designation,
                establishYear,
                password,
                aboutCompany
            })
        }).then(res => res.json()).then(data => {
            setSpinner(false);

            if (data.status === 'user email exist') {
                setUserExist(true)
                wrongEmailFocus()
            }
            else if ( data.status === 'user created'){
                setUserExist(false);
                setMessage(data.status);
                openModal();
            }
            else {
                setMessage(data.status);
                openModal();
            }
        })
        .catch(err => {
            setMessage('network error');
            openModal();
        })
    }

    const existingUser = userExist ? <p className={styles.userExist}>User email exist</p> : null;
    
    return (
        <>
            <Backdrop  backdrop={backdrop} closeBackdrop={closeModal}/>
            <Modal toggle={modal} >{userChoice}</Modal>
            <Spinner spinner={spinner} />

            <div className={styles.main}>
                <div className={styles.caution}>
                    <h4 className={styles.cautionHeader}>Caution: Never send any payment outside Japan or in the personal name. If you are getting any offer from unauthorised members from your inquiries on this site, please</h4>
                    <button className={styles.cautionBtn}>Contact Us</button>
                </div>

                <div className={styles.registration}>
                    <h2 className={styles.registrtionHeader}>Trader Registration</h2>
                    <p className={styles.regMsg}>Free Registration form for Worldwide Used Vehicle, Machinery, Truck, Parts, Engines Exporters, Importers & Dealers.</p>
                    
                    <form className={styles.form} onSubmit={(event) => submitForm(event)}>
                        <div className={styles.formSection}>
                            <div className={styles.form1}>
                                <div className={styles.fields}>
                                    <label htmlFor="company" id={styles.required} className={styles.label}>Company Name</label>
                                    <input type="text"
                                            id="company"
                                            placeholder="Company Name"
                                            className={companyNameValidity ? styles.input : styles.wrongInput}
                                            onChange={(event) => inputHandler(event, 'company name')}
                                            />
                                </div>

                                <div className={styles.fields}>
                                    <label htmlFor="address" id={styles.required} className={styles.label}>Address</label>
                                    <input type="text"
                                            id="address"
                                            placeholder="Address"
                                            className={addressValidity ? styles.input : styles.wrongInput}
                                            onChange={(event) => inputHandler(event, 'address')}
                                            />
                                </div>

                                <div className={styles.fields}>
                                    <label id={styles.required} className={styles.label}>Country</label>
                                    <select className={styles.country}
                                            defaultValue="Select a Country"
                                            onChange={(event) => inputHandler(event, 'country')}
                                            >
                                        <option disabled>Select a Country</option>
                                        {countryOptions}
                                    </select>
                                </div>

                                <div className={styles.fields}>
                                    <label id={styles.required} htmlFor="phone" className={styles.label}>Phone Number</label>
                                    <input type="number"
                                            id="phone"
                                            placeholder="Phone Number"
                                            className={phoneNumberValidity ? styles.input : styles.wrongInput}
                                            onChange={(event) => inputHandler(event, 'phone number')}
                                            />
                                </div>
                            </div>

                            <div className={styles.form2}>
                                <div className={styles.fields}>
                                    <label htmlFor="website" className={styles.label}>Website</label>
                                    <input type="text"
                                            id="website"
                                            placeholder="Website"
                                            className={styles.input}
                                            onChange={(event) => inputHandler(event, 'website')}
                                            />
                                </div>

                                <div className={styles.emailFields}>
                                    <label id={styles.required} htmlFor="email" className={styles.label}>Email</label>
                                    <div className={styles.emailField}>
                                        <input type="email"
                                                id="email"
                                                style={userExist ? {border: '1px solid red'}: null}
                                                placeholder="Email Address"
                                                className={emailValidity ? styles.emailInput : styles.wrongEmailInput}
                                                onChange={(event) => inputHandler(event, 'email')}
                                                />
                                        {existingUser}
                                    </div>
                                </div>

                                <div className={styles.fields}>
                                    <label id={styles.required} htmlFor="userName" className={styles.label}>Full Name</label>
                                    <input type="text"
                                            id="userName"
                                            placeholder="Full Name"
                                            className={userNameValidity ? styles.input : styles.wrongInput}
                                            onChange={(event) => inputHandler(event, 'user name')}
                                            />
                                </div>

                                <div className={styles.fields}>
                                    <label htmlFor="designation" className={styles.label}>Designation</label>
                                    <input type="text"
                                            id="designation"
                                            placeholder="Designation"
                                            className={styles.input}
                                            onChange={(event) => inputHandler(event, 'designation')}
                                            />
                                </div>
                            </div>

                            <div className={styles.form3}>
                                <div className={styles.fields}>
                                    <label htmlFor="estYear" className={styles.label}>Establish Year</label>
                                    <input type="text"
                                            id="estYear"
                                            placeholder="Establish Year"
                                            className={styles.input}
                                            onChange={(event) => inputHandler(event, 'establish year')}
                                            />
                                </div>

                                <div className={styles.passwordField}>
                                    <label id={styles.required} htmlFor="password" className={styles.label}>Password</label>
                                    <div className={styles.passwordFields}>
                                        <input type="password"
                                                id="password"
                                                placeholder="Password"
                                                className={passwordValidity ? styles.passwordInput : styles.wrongPasswordInput}
                                                onChange={(event) => inputHandler(event, 'password')}
                                                />
                                        <p className={styles.passwordMsg}>At least 8 character including 1 uppercase and 1 special chracter</p>
                                    </div>
                                </div>

                                <div className={styles.fields}>
                                    <label id={styles.required} htmlFor="repeatPassword" className={styles.label}>Repeat Password</label>
                                    <input type="password"
                                            id="repeatPassword"
                                            placeholder="Repeat Password"
                                            className={repeatPasswordValidity ? styles.input : styles.wrongInput}
                                            onChange={(event) => inputHandler(event, 'repeat password')}
                                            />
                                </div>
                            </div>

                            <div className={styles.form4}>
                                <label htmlFor="aboutCompany" className={styles.textAreaLabel}>About Your Company<br />{`(${aboutCompany.length}/2000)`}</label>
                                <textarea id="aboutCompany"
                                            className={styles.textarea}
                                            rows="10"
                                            cols="90"
                                            maxLength="2000"
                                            placeholder="Write something about your company"
                                            onChange={(event) => inputHandler(event, 'about company')}
                                            />
                            </div>
                        </div>

                        <div className={styles.submit}>
                            <button disabled={btnDisable} className={!btnDisable ? styles.submitBtn : styles.submitBtnDisable}>Register Now</button>
                            <p className={styles.or}>Or</p>
                            <Link to="/login" className={styles.login}>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterTrader;
