import React, { useEffect, useState, useMemo, useRef } from "react";
import styles from './howToBuyParts.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText, faCreditCard, faBox } from '@fortawesome/free-solid-svg-icons';
import { faWpforms } from '@fortawesome/free-brands-svg-icons';
import {countryList} from '../../Data/data';
import Modal from '../Others/modal/modal';
import Backdrop from '../Others/backdrop/backdrop';
import emailjs from 'emailjs-com';
import Spinner from "../Others/spinner/spinner";
import { Link } from 'react-router-dom';

let globalInputId = null

const HowToBuyParts = (props) => {

    const formRef = useRef();

    const [backdrop, setBackdrop] = useState(false);

    const [modal, setModal] = useState(false);

    const [spinner, setSpinner] = useState(false);

    const [make, setMake] = useState('');
    const [makeValidity, setMakeValidity] = useState(true);

    const [model, setModel] = useState('');
    const [modelValidity, setModelValidity] = useState(true);

    const [mfgYear, setMfgYear] = useState('');
    const [mfgYearValidity, setMfgYearValidity] = useState(true);

    const [chasisNo, setChasisNo] = useState('');
    const [chasisValidity, setChasisValidity] = useState(true);

    const [engineModel, setEngineModel] = useState('');
    const [engineModelValidity, setEngineModelValidty] = useState(true);

    const [condition, setCondition] = useState('');
    const [conditionValidity, setConditionValidity] = useState(true);

    const [shippingMethod, setShippingMethod] = useState('');
    const [shippingMethodValidity, setShippingMethodValidity] = useState(true);

    const [msgType, setMsgType] = useState([]);
    const [msgTypeValidity, setMsgTypeValidity] = useState(true);

    const [userMsg, setUserMsg] = useState('');
    const [userMsgValidity, setUserMsgValidity] = useState(true);

    const [title, setTitle] = useState('');
    const [titleValidity, setTitleValidity] = useState(true)

    const [name, setName] = useState('');
    const [nameValidity, setNameValidity] = useState(true);

    const [country, setCountry] = useState('');
    const [countryValidity, setCountryValidity] = useState(true);

    const [port, setPort] = useState('');
    const [portValidity, setPortValidity] = useState(true);

    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidity] = useState(true);

    const [phone, setPhone] = useState('');
    const [phoneValidity, setPhoneValidity] = useState(true);

    const [whatsapp, setWhatsapp] = useState('');
    const [whatsappValidity, setWhatsappValidity] = useState(true);

    const [person, serPerson] = useState('');
    const [personValidity, setPersonValidity] = useState(false);

    const [submitBtn, setSubmitBtn] = useState(true);

    const [notification, setNotification] = useState('');

    const countryListMemo = useMemo(() => countryList.map(item => {
        return <option key={item}>{item}</option>
    }), [])

    useEffect(() => {

        switch(globalInputId) {
            case 'make':
                make.length > 2 ? setMakeValidity(true) : setMakeValidity(false)
                break;

                
            case 'model':
                model.length >= 2 ? setModelValidity(true) : setModelValidity(false)
                break;

            case 'mfg year':
                mfgYear.length >= 4 ? setMfgYearValidity(true) : setMfgYearValidity(false);
                console.log(mfgYear)
                break;

            case 'chasis no':
                chasisNo.length >= 5 ? setChasisValidity(true) : setChasisValidity(false)
                break;

            case 'engine model':
                engineModel.length >= 4 ? setEngineModelValidty(true) : setEngineModelValidty(false);
                break;

            case 'shipping method':
                shippingMethod.length > 0 ? setShippingMethodValidity(true) : setShippingMethodValidity(false);
                break;

            case 'condition':
                condition.length > 0 ? setConditionValidity(true) : setConditionValidity(false);
                break;

            case 'msg type':
                msgType.length > 0 ? setMsgTypeValidity(true) : setMsgTypeValidity(false);
                break;

            case 'user msg':
                msgType.length > 0 ? setMsgTypeValidity(true) : setMsgTypeValidity(false);
                userMsg.length >= 5 ? setUserMsgValidity(true) : setUserMsgValidity(false);
                break;
            
            case 'title':
                title.length > 0 ? setTitleValidity(true) : setTitleValidity(false);
                break;

            case 'name':
                title.length > 0 ? setTitleValidity(true) : setTitleValidity(false);
                name.length >= 4 ? setNameValidity(true) : setNameValidity(false);
                break;

            case 'country':
                country.length > 0 ? setCountryValidity(true) : setCountryValidity(false);
                break;

            case 'port':
                port.length >= 3 ? setPortValidity(true) : setPortValidity(false);
                break;

            case 'email':
                let validity1 = email.includes('@');
                let validity2 = email.includes('.com');

                if (validity1 === true && validity2 === true && email.length >= 10) {
                    setEmailValidity(true);
                }

                else setEmailValidity(false);

                break;

            case 'phone':
                phone.length >= 11 || phone.includes('+')? setPhoneValidity(true) : setPhoneValidity(false);
                break;

            case 'whatsapp':
                whatsapp.length >= 11 || whatsapp.includes('+') ? setWhatsappValidity(true) : setWhatsappValidity(false);
                break;

            case 'person':
                person.length > 0 ? setPersonValidity(true) : setPersonValidity(false);
                break;
            
            default:
                break;
        }

    }, [make, model, mfgYear, chasisNo, engineModel, condition, shippingMethod, msgType, userMsg, title, name, country, port, email, phone, whatsapp, person])

    useEffect(() => {
        if ((makeValidity === true && make.length !== 0) && (modelValidity === true && model.length !== 0) && (mfgYearValidity === true && mfgYear.length !== 0)
        && (chasisValidity === true && chasisNo.length !== 0) && (engineModelValidity === true && engineModel.length !== 0) && (conditionValidity === true && condition.length !== 0)
        && (shippingMethodValidity === true && shippingMethod.length !== 0) && (msgTypeValidity === true && msgType.length !== 0) && (userMsgValidity === true && userMsg.length !== 0)
        && nameValidity === true && (countryValidity === true && country.length !== 0) && (portValidity === true && port.length !== 0) && emailValidity === true
        && (phoneValidity === true && phone.length !== 0) && (whatsappValidity === true && whatsapp.length !== 0) && (personValidity === true && person.length !== 0)) {
            setSubmitBtn(false)
            }
        else {
            setSubmitBtn(true);
        }
        
    }, [makeValidity, modelValidity, mfgYearValidity, chasisValidity, engineModelValidity, conditionValidity, shippingMethodValidity, msgTypeValidity, userMsgValidity, nameValidity, countryValidity, portValidity,
        emailValidity, phoneValidity, whatsappValidity, personValidity])

    const sessionStorageObj = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;

    if (sessionStorageObj && !name) {
        if (sessionStorageObj.hasOwnProperty('_id')) {
            setName(`${sessionStorageObj['firstName']} ${sessionStorageObj['lastName']}`)
            setTitleValidity(false);
            setEmailValidity(true);
            setEmail(sessionStorageObj['email'])
        }
        else {
            setName(`${sessionStorageObj.given_name} ${sessionStorageObj.family_name}`)
            setTitleValidity(false);
            setEmailValidity(true)
            setEmail(sessionStorageObj['email']);
        }
    }

    const inputHandler = (event, id) => {

        switch(id) {
            case 'make':
                setMake(event.target.value);
                globalInputId = id
                break;

            case 'model':
                setModel(event.target.value)
                globalInputId = id;
                break;

            case 'mfg year':
                setMfgYear(event.target.value);
                globalInputId = id;
                break;

            case 'chasis no':
                setChasisNo(event.target.value);
                globalInputId = id;
                break;

            case 'engine model':
                setEngineModel(event.target.value);
                globalInputId = id;
                break;
            
            case 'condition':
                setCondition(event.target.value);
                globalInputId = id;
                break;

            case 'shipping method':
                setShippingMethod(event.target.value);
                globalInputId = id;
                break;

            case 'msg type':
                const item = event.target.value

                let checkForItem = msgType.includes(item);

                globalInputId = id;


                if (checkForItem === true){
                    const filter = msgType.filter(element => element !== item)
                    setMsgType(filter)
                }
                else {
                    setMsgType(msgType.concat(event.target.value))
                }
                break;

            case 'user msg':
                setUserMsg(event.target.value);
                globalInputId = id;
                break;

            case 'title':
                globalInputId = id;
                setTitle(event.target.value);
                break;


            case 'name':
                setName(event.target.value);
                globalInputId = id;
                break;

            case 'country':
                setCountry(event.target.value);
                globalInputId = id;
                break;

            case 'port':
                setPort(event.target.value);
                globalInputId = id;
                break;

            case 'email':
                setEmail(event.target.value);
                globalInputId = id;
                break;

            case 'phone':
                setPhone(event.target.value);
                globalInputId = id;
                break;

            case 'whatsapp':
                setWhatsapp(event.target.value);
                globalInputId = id;
                break;

            case 'person':
                serPerson(event.target.value);
                globalInputId = id;
                break;

            default:
                break;

        }
    }

    const submitParts = (event) => {

        event.preventDefault();

        setSpinner(true);

        fetch('https://ncs-api.onrender.com/submitParts', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                make,
                model,
                mfgYear,
                chasisNo,
                engineModel,
                condition,
                shippingMethod,
                msgType,
                userMsg,
                title,
                userName: name,
                country,
                port,
                email,
                phone,
                whatsapp,
                person
            })
        }).then( res => res.json()).then( data => {

            setSpinner(false);

            if (data.status === 'submitted') {
                setNotification(data.status);
                setModal(true);
                setBackdrop(true);
                

                emailjs.sendForm('service_prhm0ch', 'template_padq03b', formRef.current, '5Oo1_zotWnRtwbXQS')
                .then(res => console.log(res.text)).catch(err => console.log(err))
                
                window.addEventListener('click', () => window.location.reload());
            }
            else {
                setNotification('failed');
                setModal(true);
                setBackdrop(true);
            }
            
        }).catch( err => {
            setNotification('Network Error')
        });
    }

    const closeModal = () => {
        setBackdrop(false);
        setModal(false);
        if (notification === 'submitted') {
            window.location.reload();
        }
    }

    let submittedMsg = null;

    if (notification === 'submitted') {
        submittedMsg = <div>
            <h3>Your query has been submitted</h3>
            <p>We will get back to you soon</p>
            <button onClick={closeModal} className={styles.closeModalBtn}>Close</button>
        </div>
    }

    else if (notification === 'failed'){
        submittedMsg = <div>
            <p>Failed, try again</p>
            <button onClick={closeModal} className={styles.closeModalBtn}>Close</button>
        </div>
    }
    else {
        submittedMsg = <div>
            <p>Network error</p>
            <p>check internet connection</p>
            <button onClick={closeModal} className={styles.closeModalBtn}>Close</button>
        </div>
    }

    return (
        <>
            <div className={styles.Main}>
                <Backdrop backdrop={backdrop} closeBackdrop={closeModal}/>
                <Modal toggle={modal}>{submittedMsg}</Modal>
                <Spinner spinner={spinner} />

                <div className={styles.Caution}>
                    <h4>CAUTION: Never send any payment outside Japan or in the personal name. If you are getting any offer from unauthorised members from your inquiries on this site, please</h4>
                    <Link to="/contactus" className={styles.ContactBtn}>Contact Us</Link>
                </div>

                <div className={styles.inquiryFormMain}>
                    <div>

                    </div>
                    <div className={styles.inquiryForm}>
                        <form ref={formRef}>
                            <h3>SPARE PARTS INQUIRY</h3>
                            <div className={styles.rowMake} id={styles.makeModelParts}>
                                <div className={styles.innerRow}>
                                    <div className={styles.label}>
                                        <label className={styles.redLabel} htmlFor="make">Make</label>
                                    </div>
                                    <div className={styles.inputField}>
                                        <input type="text"
                                                id="make"
                                                name='make'
                                                className={makeValidity ? styles.userInput : styles.wrongInput}
                                                placeholder="Make"
                                                onChange={(event) => inputHandler(event, 'make')}
                                                required />
                                    </div>
                                </div>
                                <div className={styles.innerRow}>
                                    <div className={styles.label}>
                                        <label className={styles.redLabel} htmlFor="model">Model</label>
                                    </div>
                                    <div className={styles.inputField}>
                                        <input type="text"
                                                id="model"
                                                name='model'
                                                className={modelValidity ? styles.userInput: styles.wrongInput}
                                                placeholder="Model"
                                                onChange={(event) => inputHandler(event, 'model')}
                                                required />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rowYear}>
                                <div className={styles.innerRow}>
                                    <div className={styles.label}>
                                        <label className={styles.redLabel} htmlFor="mfg">Mfg Year</label>
                                    </div>
                                    <div className={styles.inputField} id={styles.mfcYear}>
                                        <input id="mfg"
                                                className={mfgYearValidity ? styles.userInput : styles.wrongInput}
                                                name='mfgYear'
                                                type="number"
                                                placeholder="Manufactured Year"
                                                onChange={(event) => inputHandler(event, 'mfg year')}
                                                required />
                                    </div>
                                </div>
                                <div className={styles.innerRow}>
                                    <div className={styles.label}>
                                        <label className={styles.redLabel} htmlFor="chasis">Chasis No</label>
                                    </div>
                                    <div className={styles.inputField} id={styles.chasisNo}>
                                        <input type="text"
                                                id="chasis"
                                                name='chasisNo'
                                                className={chasisValidity ? styles.userInput : styles.wrongInput}
                                                placeholder="Chassis No"
                                                onChange={(event) => inputHandler(event, 'chasis no')}
                                                required />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rowEngine}>
                                <div className={styles.innerRow}>
                                    <div className={styles.label}>
                                        <label className={styles.redLabel} htmlFor="engine">Engine Model</label>
                                    </div>
                                    <div className={styles.inputField} id={styles.engineModel}>
                                        <input type="text"
                                                id="engine"
                                                name='engineModel'
                                                className={engineModelValidity ? styles.userInput : styles.wrongInput}
                                                placeholder="Engine Model"
                                                onChange={(event) => inputHandler(event, 'engine model')}
                                                required />
                                    </div>
                                </div>
                                <div className={conditionValidity ? styles.innerRow : styles.wrongRadioBtn}>
                                    <div className={styles.labelCondition}>
                                        <label className={styles.redLabel}>Condition</label>
                                    </div>
                                    <div className={styles.condition}>
                                        <label htmlFor="type3"><input type="radio"
                                                                    name="condition"
                                                                    value='New'
                                                                    id="type3"
                                                                    required
                                                                    onChange={(event) => inputHandler(event, 'condition')}
                                                                    />New</label>
                                        <label htmlFor="type4"><input type="radio"
                                                                    name="condition"
                                                                    value='Used'
                                                                    id="type4"
                                                                    onChange={(event) => inputHandler(event, 'condition')}
                                                                    required
                                                                    />Used</label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rowShipping}>
                                <div className={shippingMethodValidity ? styles.innerRow : styles.wrongRadioBtn}>
                                    <div className={styles.labelShipping}>
                                        <label className={styles.redLabel}>Shipping Method</label>
                                    </div>
                                    <div className={styles.inputField} id={styles.shippingMethod}>
                                        <label htmlFor="type5"><input type="radio"
                                                                    id="type5"
                                                                    name="shippingMethod"
                                                                    value='Any'
                                                                    onChange={(event) => inputHandler(event, 'shipping method')}
                                                                    required/>Any</label>
                                        <label htmlFor="type6"><input type="radio"
                                                                    id="type6"
                                                                    name='shippingMethod'
                                                                    value="DHL"
                                                                    onChange={(event) => inputHandler(event, 'shipping method')}
                                                                    required />DHL</label>
                                        <label htmlFor="type7"><input type="radio"
                                                                    id="type7"
                                                                    name="shippingMethod"
                                                                    value="EMS"
                                                                    onChange={(event) => inputHandler(event, 'shipping method')}
                                                                    required />EMS</label>
                                        <label htmlFor="type8"><input type="radio"
                                                                    id="type8"
                                                                    name="shippingMethod"
                                                                    value="OCS"
                                                                    onChange={(event) => inputHandler(event, 'shipping method')}
                                                                    required />OCS</label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rowMessage}>
                                <label className={styles.redLabel}>Message<br />{`${userMsg.length}/255`}</label>
                                <div className={styles.messageForm}>
                                    <div className={msgTypeValidity ? styles.msgType : styles.wrongRadioBtn}>
                                        <label htmlFor="tick1"><input type="checkbox"
                                                                        name="userType"
                                                                        className={styles.tick}
                                                                        id="tick1"
                                                                        value="Car Dealer"
                                                                        onChange={(event) => inputHandler(event, 'msg type')}
                                                                        />I am a car dealer and want to regular buy from auction, please give me your best charges offer.</label>
                                        <label htmlFor="tick2"><input type="checkbox"
                                                                        name="userType"
                                                                        className={styles.tick}
                                                                        id="tick2"
                                                                        value="send memebership details"
                                                                        onChange={(event) => inputHandler(event, 'msg type')}
                                                                        />Please send me your free auction site membership detail.</label>
                                        <label htmlFor="tick3"><input type="checkbox"
                                                                        name="userType"
                                                                        className={styles.tick}
                                                                        id="tick3"
                                                                        value="send auction charges terms&condition"
                                                                        onChange={(event) => inputHandler(event, 'msg type')}
                                                                        />Please send me your auction charges, terms & conditions.</label>
                                    </div>
                                    <textarea id={styles.messsage}
                                                className={!userMsgValidity ? styles.wrongTextarea : null}
                                                name='userMsg'
                                                rows="5"
                                                cols="13"
                                                maxLength="255"
                                                onChange={(event) => inputHandler(event, 'user msg')}
                                                required></textarea>
                                </div>
                            </div>
                            <div className={styles.rowName}>
                                <label className={styles.redLabel} htmlFor="title">Name</label>

                                <div className={styles.nameInputField}>
                                    <select id="title"
                                            className={titleValidity ? styles.title : styles.wrongInput}
                                            name='title'
                                            onChange={(event) => inputHandler(event, 'title')}
                                            defaultValue="Title"
                                            required
                                            >
                                        <option disabled>Title</option>
                                        <option value="Mr.">Mr.</option>
                                        <option value="Ms.">Ms.</option>
                                        <option value="Mrs.">Mrs.</option>
                                    </select>
                                    <input type="text"
                                            id={styles.name}
                                            name='name'
                                            className={nameValidity ? styles.inputFields : styles.wrongInputs}
                                            placeholder="Full Name"
                                            onChange={(event) => inputHandler(event, 'name')}
                                            defaultValue={ name }
                                            required />
                                </div>
                            </div>
                            <div className={styles.rowCountry}>
                                <label className={styles.redLabel} id={styles.countryLabel} htmlFor="country">Country</label>
                                <select className={countryValidity ? styles.countries  : styles.wrongInput}
                                        id="country"
                                        name='country'
                                        onChange={(event) => inputHandler(event, 'country')}
                                        defaultValue="Select a Country"
                                        required>
                                    <option disabled value="Select a Country">Select a Country</option>
                                    {countryListMemo}
                                </select>
                            </div>
                            <div className={styles.rowPort}>
                                <label className={styles.redLabel} id={styles.portLabel} htmlFor="port">Port</label>
                                <input type="text"
                                        id="port"
                                        name='port'
                                        className={portValidity ? styles.inputFields : styles.wrongInputs}
                                        placeholder="Enter Destination Port"
                                        onChange={(event) => inputHandler(event, 'port')}
                                        required />
                            </div>
                            <div className={styles.rowEmail}>
                                <label className={styles.redLabel} id={styles.emailLabel} htmlFor="email">Email</label>
                                <input type="email"
                                        id="email"
                                        name='email'
                                        className={emailValidity ? styles.inputFields : styles.wrongInputs}
                                        placeholder="Enter Your Email"
                                        onChange={(event) => inputHandler(event, 'email')}
                                        defaultValue={ email }
                                        required />
                            </div>
                            <div className={styles.rowPhone}>
                                <label className={styles.redLabel} id={styles.phoneLabel} htmlFor="phone">Phone</label>
                                <input type="number"
                                        id="phone"
                                        name='phone'
                                        className={phoneValidity ? styles.inputFields : styles.wrongInputs}
                                        placeholder="Enter Your Phone Number"
                                        onChange={(event) => inputHandler(event, 'phone')}
                                        required />
                            </div>
                            <div className={styles.rowWhatsapp}>
                                <label className={styles.redLabel} id={styles.whatsappLabel} htmlFor="whatsapp">Whatsapp</label>
                                <input type="number"
                                        id="whatsapp"
                                        name='whatsapp'
                                        className={whatsappValidity ? styles.inputFields : styles.wrongInputs}
                                        placeholder="Enter Whatsapp Number"
                                        onChange={(event) => inputHandler(event, 'whatsapp')}
                                        />
                            </div>
                            <div className={styles.rowFinal}>
                                <label className={styles.redLabel}>I am</label>

                                <div className={styles.personInputField}>
                                    <label className={styles.personValue} htmlFor="type1"><input type="radio"
                                                                    name="person"
                                                                    id="type1"
                                                                    value="individual"
                                                                    onChange={(event) => inputHandler(event, 'person')}
                                                                    required />Individual</label>
                                    <label className={styles.personValue} htmlFor="type2"><input type="radio"
                                                                    name="person"
                                                                    id="type2"
                                                                    value="car dealer"
                                                                    onChange={(event) => inputHandler(event, 'person')}
                                                                    required />Car Dealer</label>
                                </div>
                                
                            </div>
                            <button disabled={submitBtn}
                                    className={!submitBtn ? styles.submitBtn : styles.submitBtnDisabled}
                                    onClick={(event) => submitParts(event)}
                                    >Submit inquiry</button>
                        </form>

                        
                    </div>

                    <div className={styles.formHeadingMain}>
                        <h3>Buy Japan Used Vehicle Parts & Accessories from NCS</h3>
                        <div className={styles.partsImg}>
                            
                        </div>
                        <p>NIHON Chuko-Sha has a level of comfort and convenience that is rivaled all over the world. As you may know, NIHON Chuko-Sha costs less than comparable others yet tend to retain their value longer which results in a higher resale value.
                            In these reasons, NIHON Chuko-Sha parts are indispensable for your customers who drive Japanese cars.</p>
                    </div>
                </div>


                <div className={styles.Ncs}>
                    <h2>HOW TO BUY PARTS FROM NCS</h2>

                    <div className={styles.cards}>
                        
                        <div className={styles.card}>
                            <div className={styles.fontAwesome}>
                                <FontAwesomeIcon className={styles.font} icon={faEnvelopeOpenText}/>
                            </div>
                            <h4>Submit Above Inquiry Form</h4>
                            <p>Submit above inquiry form to get contacted by NIHON CHUKO-SHA Auction.</p>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.fontAwesome}>
                                <FontAwesomeIcon className={styles.font} icon={faWpforms}/>
                            </div>
                            <h4>Security Deposit</h4>
                            <p>Once you decided to buy particular car, please make security deposit before bidding. After auction deposit is received, an auction consultant will start locating your target car from auctions.</p>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.fontAwesome}>
                                <FontAwesomeIcon className={styles.font} icon={faCreditCard}/>
                            </div>
                            <h4>Bidding Price</h4>
                            <p>You have to be careful while deciding the price of your car. Once car price is determined, the auctioneer will bid on car at your price budget.</p>
                        </div>


                        <div className={styles.card}>
                            <div className={styles.fontAwesome}>
                                <FontAwesomeIcon className={styles.font} icon={faBox}/>
                            </div>
                            <h4>Vehicle Shipment</h4>
                            <p>Once all payment is confirmed, NIHON CHUKO-SHA will ship the car to the your port with all the necessary documents</p>
                        </div>
                    </div>
                </div>

                

            </div>
        </>
    )
}

export default HowToBuyParts;
