import React, { useEffect, useState, useMemo, useRef } from "react";
import styles from './howToBuyFromAuction.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFileInvoice, faCreditCard, faGavel } from '@fortawesome/free-solid-svg-icons';
import { countryList, operator } from "../../Data/data";
import Backdrop from "../Others/backdrop/backdrop";
import Modal from "../Others/modal/modal";
import emailjs from 'emailjs-com';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../Others/spinner/spinner';

let target = null;

const HowToBuyFromAuction = () => {

    const formRef = useRef();

    const form = useRef(null);

    const calander = useRef(null);

    const carAuction = useRef(null);

    const [backdrop, setBackdrop] = useState(false);

    const [modal, setModal] = useState(false);

    const [spinner, setSpinner] = useState(false);

    const [make, setMake] = useState('');
    const [makeValidity, setMakeValidity] = useState(true);

    const [model, setModel] = useState('');
    const [modelValidity, setModelValidity] = useState(true);

    const [yearFrom, setYearFrom] = useState('');
    const [yearFromValidity, setYearFromValidity] = useState(true);

    const [yearTo, setYearTo] = useState('');
    const [yearToValidity, setYearToValidity] = useState(true);

    const [budgetFrom, setBudgetFrom] = useState('');
    const [budgetFromValidity, setBudgetFromValidity] = useState(true)
    
    const [budgetTo, setBudgetTo] = useState('');
    const [budgetToValidity, setBudgetToValidity] = useState(true)

    const [userType, setUserType] = useState([]);
    const [userTypeValidity, setUserTypeValidity] = useState(true)

    const [userMsg, setUserMsg] = useState('')
    const [userMsgValidity, setUserMsgValidity] = useState(true)

    const [title, setTitle] = useState('');
    const [titleValidity, setTitleValidity] = useState(true)

    const [name, setName] = useState('');
    const [nameValidity, setNameValidity] = useState(true)

    const [userCountry, setUserCountry] = useState('');
    const [userCountryValidity, setUserCountryValidity] = useState(false);

    const [port, setPort] = useState('')
    const [portValidity, setPortValidity] = useState(true);

    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidity] = useState(true);

    const [phone, setPhone] = useState('');
    const [phoneValidity, setPhoneValidity] = useState(true);

    const [whatsapp, setWhatsapp] = useState('')
    const [whatsappValidity, setWhatsappValidity] = useState(true);

    const [person, setPerson] = useState('')
    const [personValidity, setPersonValidity] = useState(false)

    const [finalValidation, setFinalValidation] = useState(false);

    const [notification, setNotification] = useState('');

    const params = useParams();

    const countriesList = useMemo(() => {
        return countryList.map(item => {
            return <option key={item}>{item}</option>
        })
    }, [] )

    const employeeTable = useMemo(() => {
        return operator.map((item1, index) => {
            return <tbody key={index}>
                <tr className={styles.tRow}>
                    {item1.map((item2, index) => {
                        return <td key={index}>
                            <p className={styles.empName}>{item2.firstName}</p>
                            <br />
                            <p className={styles.empName}>{item2.lastName}</p></td>
                    })}
                </tr>
            </tbody>
        })
    }, [] )
    
    
    useEffect(() => {
        const sessionStorageObj = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;

        if (params) {
            switch(params.search){

                case 'calander':
                    calander.current.scrollIntoView();
                    break;

                case 'auction':
                    formRef.current.scrollIntoView();
                    break;
            }
        }
    
        if (sessionStorageObj) {
            //category: Trader
            if (sessionStorageObj.hasOwnProperty('_id')) {
                //if user comes from displaySubItem we set the state value and scroll to the form
                if (params) {
                    setName(`${sessionStorageObj.firstName} ${sessionStorageObj.lastName}`);
                    setTitleValidity(false);
                    setUserCountry(sessionStorageObj.country);
                    setUserCountryValidity(true);
                    setPhone(sessionStorageObj.phone);
                    setEmail(sessionStorageObj.email);
                    setMake(params.make);
                    setModel(params.model);
                    setYearTo(params.year);
                    formRef.current.scrollIntoView();
                }
                //if user comes from the navbar
                else {
                    setName(`${sessionStorageObj.firstName} ${sessionStorageObj.lastName}`);
                    setTitleValidity(false);
                    setUserCountry(sessionStorageObj.country);
                    setUserCountryValidity(true)
                    setPhone(sessionStorageObj.phone);
                    setEmail(sessionStorageObj.email)
                }
            }
            else {
            //category: Google user
                if (params) {
                    setName(`${sessionStorageObj.given_name} ${sessionStorageObj.family_name}`);
                    setTitleValidity(false);
                    setUserCountry(sessionStorageObj.country);
                    setUserCountryValidity(true)
                    setPhone(sessionStorageObj.phone);
                    setEmail(sessionStorageObj.email);
                    setMake(params.make);
                    setModel(params.model);
                    setYearTo(params.year)
                }
                else {
                    setName(`${sessionStorageObj.name.firstName} ${sessionStorageObj.name.lastName}`)
                    setTitleValidity(false);
                    setEmail(sessionStorageObj.email);
                    setUserCountry(sessionStorageObj.country);
                    setUserCountryValidity(true)
                    setPhone(sessionStorageObj.phone);
                }
            }
        }
        else {
            if (params) {
                setMake(params.make);
                setModel(params.model);
                setYearFrom(params.yearFrom)
                setYearTo(params.yearTo);
                setBudgetFrom(params.priceFrom);
                setBudgetTo(params.priceTo)
            }
        }
    }, [] )

    useEffect(() => {
        switch(target) {
            case 'make':
                make.length > 2 ? setMakeValidity(true) : setMakeValidity(false);
                break;
            
            case 'model':
                model.length > 2 ? setModelValidity(true) : setModelValidity(false);
                break;

            case 'year from':
                yearFrom.length > 3 ? setYearFromValidity(true) : setYearFromValidity(false)
                break;

            case 'year to':
                yearTo.length > 3 ? setYearToValidity(true) : setYearToValidity(false);
                break;

            case 'budget from':
                budgetFrom.length > 2 ? setBudgetFromValidity(true) : setBudgetFromValidity(false);
                break;

            case 'budget to':
                budgetTo.length > 2 ? setBudgetToValidity(true) : setBudgetToValidity(false);
                break;

            case 'message':
                userType.length > 0 ? setUserTypeValidity(true) : setUserTypeValidity(false);
                break;
            
            case 'user msg':
                userType.length > 0 ? setUserTypeValidity(true) : setUserTypeValidity(false);
                userMsg.length >= 5 ? setUserMsgValidity(true) : setUserMsgValidity(false);
                break;

            case 'title':
                title.length > 0 ? setTitleValidity(true) : setTitleValidity(false);
                break;

            case 'name':
                title.length > 0 ? setTitleValidity(true) : setTitleValidity(false);
                name.length >= 4 ? setNameValidity(true) : setNameValidity(false);
                break;

            case 'port':
                port.length > 2 ? setPortValidity(true) : setPortValidity(false);
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
                phone.length >= 11 ? setPhoneValidity(true) : setPhoneValidity(false);
                break;

            case 'whatsapp':
                whatsapp.length >= 11 ? setWhatsappValidity(true) : setWhatsappValidity(false);
                break;

            case 'person':
                person.length > 0 ? setPersonValidity(true) : setPersonValidity(false);
                break;

            default:
                break;
        }
    }, [make, model, yearFrom, yearTo, budgetFrom, budgetTo, userMsg, userType, name, title, userCountry, port, email, phone, whatsapp, person])


    useEffect(() => {
        if (makeValidity === true && modelValidity === true && yearFromValidity === true && yearToValidity === true && budgetFromValidity === true && budgetToValidity
            === true && budgetToValidity === true && userTypeValidity === true && userMsgValidity === true && titleValidity === true && nameValidity === true && userCountryValidity === true && portValidity
            === true && emailValidity === true && phoneValidity === true && whatsappValidity === true && personValidity === true) {
                setFinalValidation(true)
            }
            else {
                setFinalValidation(false)
            }
    }, [makeValidity, modelValidity, yearFromValidity, yearToValidity, budgetFromValidity, budgetToValidity, userTypeValidity, userMsgValidity,
    nameValidity, titleValidity, userCountryValidity, portValidity, emailValidity, phoneValidity, whatsappValidity, personValidity]);

    const inputHandler = (event, id) => {
        switch(id) {
            case 'make':
                setMake(event.target.value);
                target = id;
                break;

            case 'model':
                setModel(event.target.value);
                target = id;
                break;

            case 'year from':
                setYearFrom(event.target.value);
                target = id;
                break;
            
            case 'year to':
                setYearTo(event.target.value);
                target = id;
                break;

            case 'budget from':
                setBudgetFrom(event.target.value);
                target = id;
                break;

            case 'budget to':
                setBudgetTo(event.target.value);
                target = id;
                break;
            
            case 'message':
                const item = event.target.value
                let checkForItem = userType.includes(item)
                target = id;

                if (checkForItem === true){
                    const filter = userType.filter(element => element !== item)
                    setUserType(filter)
                }
                else {
                    setUserType(userType.concat(event.target.value))
                }

                break;

            case 'user msg':
                setUserMsg(event.target.value);
                target = id;
                break;

            case 'title':
                setTitle(event.target.value);
                target = id;
                break;

            case 'name':
                setName(event.target.value);
                target = id;
                title.length !== '' ? setTitleValidity(true) : setTitleValidity(false);
                name.length < 2 ? setNameValidity(false) : setNameValidity(true);
                break;

            case 'country':
                target = id;
                setUserCountry(event.target.value);
                setUserCountryValidity(true);
                break;

            case 'port':
                target = id;
                setPort(event.target.value);
                port.length < 3 ? setPortValidity(false) : setPortValidity(true)
                break;

            case 'email':
                target = id;
                let emailValue = event.target.value;

                let validity1 = emailValue.includes('@')
                let validity2 = emailValue.includes('.com')

                if (validity1 === true && validity2 === true) {
                    setEmail(emailValue);
                    setEmailValidity(true)
                }
                else {
                    setEmailValidity(false)
                }
                break;

            case 'phone':
                target = id;
                let phoneNumber = event.target.value;

                if (phoneNumber.length > 10) {
                    setPhone(phoneNumber);
                    setPhoneValidity(true)
                }
                else {
                    setPhoneValidity(false)
                }
                break;

            case 'whatsapp':
                target = id;
                let whatsappNum = event.target.value;

                if (whatsappNum.length > 10) {
                    setWhatsapp(whatsappNum)
                    setWhatsappValidity(true)
                }
                else {
                    setWhatsappValidity(false)
                }
                break;

            case 'person':
                target = id;
                setPerson(event.target.value)
                setPersonValidity(true);
                break;

            default:
                break;
        }
    }


    const submitForm = (event) => {
        event.preventDefault();
        setSpinner(true);
        fetch('https://ncs-api.onrender.com/submitAuction', {
            method: 'POST',
            crossDomain: true,
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                make,
                model,
                yearFrom,
                yearTo,
                budgetFrom,
                budgetTo,
                userType,
                userMsg,
                title,
                name,
                userCountry,
                port,
                email,
                phone,
                whatsapp,
                person
            })
        }).then(res => res.json()).then(data => {

            setSpinner(false);

            if (data.status === 'submitted'){
                
                setNotification(data.status);

                setBackdrop(true);

                setModal(true);

                emailjs.sendForm('service_prhm0ch', 'template_ufvqddo', formRef.current, '5Oo1_zotWnRtwbXQS')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
            }
            else {
                setNotification(data.status)
                setBackdrop(true);
                setModal(true);
            }
        }).catch(err => {
            setNotification('network error')
            setBackdrop(true);
            setModal(true)
        });
    }

    const closeModal = () => {
        setModal(false);
        setBackdrop(false);
        if (notification === 'submitted') {
            window.location.reload();
        }
    }

    let displayNotification = null;

    if (notification === 'submitted') {
        displayNotification = <div>
            <h3>Your query has been submitted</h3>
            <p>We will get back to you soon</p>
            <button onClick={ closeModal } className={styles.closeModalBtn}>Close</button>
        </div>
    }
    else if (notification === 'failed') {
        displayNotification = <div>
            <p>Failed to submit, try again</p>
            <button onClick={ closeModal } className={styles.closeModalBtn}>Close</button>
        </div>
    }
    else {
        displayNotification = <div>
            <p>Network error</p>
            <p>Check internet connection</p>
            <button onClick={ closeModal } className={styles.closeModalBtn}>Close</button>
        </div>
    }

    return (
        <>
            <Backdrop backdrop={backdrop} closeBackdrop={closeModal}/>
            <Modal toggle={modal}>{displayNotification}</Modal>
            <Spinner spinner={spinner} />

            <div className={styles.Main}>
                <div className={styles.Caution} style={params.search === 'notFound' ? {display: 'none'} : null}>
                    <h4>CAUTION: Never send any payment outside Japan or in the personal name. If you are getting any offer from unauthorised members from your inquiries on this site, please</h4>
                    <Link to="/contactus" className={styles.ContactBtn}>Contact Us</Link>
                </div>


                <div className={styles.Header} style={params.search === 'notFound' ? {display: 'none'} : null}>
                    <p>Japanese used car auctions are very popular all over the world to buy your dream vehicle. Its really very easy, reliable and fast way to buy a vehicle at best competitive prices with all genuine and accurate informations.</p>

                    <p>There are uncountable vehicles all over Japan in more than 100 auctions every week in daily basis.
                        So we help you to have your dream fullfil, if you want to buy any kind of used vehicle from NIHON CHUKOSHA, please fillup JAPAN CARS AUCTION INQUIRY form below and get the best deal. We will follow up your inquiry to match and get it direct from Auction Houses. We do not charge any commission or fee like other portals. It is totally free, safe & secure.</p>
                </div>

                <div className={styles.SendInquiry} style={params.search === 'notFound' ? {display: 'none'} : null}>
                    <p>JAPAN CAR AUCTION</p>
                    <p>GET ACCESS OVER <span style={{color: 'darkred'}}>100,000</span> CARS AT NIHON CHUKO SHA</p>
                </div>

                <div className={styles.hiddenMsg} style={params.search === 'notFound' ? {display: 'flex'}: {display: 'none'}}>
                    <h3 style={{color: 'red'}}>Not Found</h3>
                    <p>If you have query about any car you can send an auction inquiry by filling up the form below or you can contact us by heading to help & support then contact us section and send an email</p>
                </div>
                
                <div className={styles.inquiryFormMain} id={styles.formId} ref={form}>
                    <div className={styles.inquiryForm} style={params.search === 'notFound' ? {width: '60%', margin: '100px auto'}: null}>
                        <form ref={formRef}>
                            <h3>JAPAN CARS AUCTION INQUIRY</h3>
                            <div className={styles.rowMake}>
                                <div className={styles.innerRow}>
                                    <div className={styles.label}>
                                        <label htmlFor="name">Make</label>
                                    </div>
                                    <div className={styles.inputField}>
                                        <input type="text"
                                                ref={form}
                                                id="name" 
                                                name="make"
                                                placeholder="Make"
                                                defaultValue={make}
                                                onChange={(event) => inputHandler(event, 'make')}
                                                style={!makeValidity ? {border: '1px solid red'} : null}
                                                required
                                                />
                                    </div>
                                </div>
                                <div className={styles.innerRow}>
                                    <div className={styles.label}>
                                        <label htmlFor="model">Model</label>
                                    </div>
                                    <div className={styles.inputField}>
                                        <input type="text"
                                                id="model"
                                                name="model"
                                                placeholder="Model"
                                                defaultValue={model}
                                                onChange={(event) => inputHandler(event, 'model')}
                                                style={!modelValidity ? {border: '1px solid red'}: null}
                                                required 
                                                />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rowYear}>
                                <div className={styles.innerRow}>
                                    <div className={styles.label}>
                                        <label htmlFor="yearFrom">Year</label>
                                    </div>
                                    <div className={styles.inputField}>
                                        <input type="number"
                                                id="yearFrom"
                                                name="yearFrom"
                                                maxLength={4}
                                                placeholder="Year From"
                                                defaultValue={yearFrom}
                                                onChange={(event) => inputHandler(event, 'year from')}
                                                style={!yearFromValidity ? {border: '1px solid red'}: null}
                                                required
                                                />
                                        <input type="number"
                                                placeholder="Year To"
                                                name="yearTo"
                                                maxLength={4}
                                                defaultValue={yearTo}
                                                onChange={(event) => inputHandler(event, 'year to')}
                                                style={!yearToValidity ? {border:'1px solid red'} : null}
                                                required
                                                />
                                    </div>
                                </div>
                                <div className={styles.innerRow}>
                                    <div className={styles.label}>
                                        <label htmlFor="budgetFrom">Budget</label>
                                    </div>
                                    <div className={styles.inputField}>
                                        <input type="number"
                                                id="budgetFrom"
                                                name="budgetFrom"
                                                placeholder="From"
                                                defaultValue={budgetFrom}
                                                onChange={(event) => inputHandler(event, 'budget from')}
                                                style={!budgetFromValidity ? {border: '1px solid red'} : null}
                                                required
                                                />
                                        <input type="number"
                                                placeholder="To"
                                                name="budgetTo"
                                                defaultValue={budgetTo}
                                                onChange={(event) => inputHandler(event, 'budget to')}
                                                style={!budgetToValidity ? {border: '1px solid red'} : null}
                                                required
                                                />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rowMessage}>
                                <label id={styles.inqMsg}>Message<br />(<span id={styles.counter}>0</span>/255)</label>
                                <div className={styles.messageForm} style={!userTypeValidity ? {backgroundColor: '#ef000040', borderRadius: '10px'}: null}>
                                    <label htmlFor="tick1"><input type="checkbox"
                                                                    name="userType"
                                                                    id="tick1"
                                                                    value="car dealer"
                                                                    onChange={(event) =>inputHandler(event, 'message')}
                                                                    />I am a car dealer and want to regular buy from auction, please give me your best charges offer.</label>

                                    <label htmlFor="tick2"><input type="checkbox"
                                                                    name="userType"
                                                                    id="tick2"
                                                                    value="send memebership details"
                                                                    onChange={(event) => inputHandler(event, 'message')}
                                                                    />Please send me your free auction site membership detail.</label>

                                    <label htmlFor="tick3"><input type="checkbox"
                                                                    name="userType"
                                                                    id="tick3"
                                                                    value="send auction charges terms&condition"
                                                                    onChange={(event) => inputHandler(event, 'message')}
                                                                    />Please send me your auction charges, terms & conditions.</label>

                                    <textarea id={styles.message}
                                                rows="5"
                                                cols="13"
                                                name="userMsg"
                                                maxLength="255"
                                                placeholder="Write your message here"
                                                onChange={(event) => inputHandler(event, 'user msg')}
                                                style={!userMsgValidity ? {border: '1px solid #f44336a6'} : null}
                                                />
                                </div>
                            </div>
                            <div className={styles.rowName}>
                                <label id={styles.inqName} htmlFor="title">Name</label>
                                <select name="title"
                                        id="title"
                                        defaultValue="Title"
                                        onChange={(event) => inputHandler(event, 'title')}
                                        style={!titleValidity ? {border: '1px solid red'} : null}
                                        >
                                    <option disabled>Title</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Mrs.">Mrs.</option>
                                </select>
                                <input type="text"
                                        id={styles.name}
                                        name="name"
                                        placeholder="Full Name"
                                        onChange={(event) => inputHandler(event, 'name')}
                                        defaultValue={ name }
                                        style={!nameValidity ? {border: '1px solid red'} : null}
                                        required
                                        />
                            </div>
                            <div className={styles.rowCountry}>
                                <label id={styles.inqCountry} htmlFor="country">Country</label>
                                <select id="country"
                                        name="country"
                                        value={userCountry ? userCountry : 'Select a country'}
                                        onChange={(event) => inputHandler(event, 'country')}
                                        required
                                        >
                                    <option disabled>{userCountry ? userCountry : 'Select a country'}</option>
                                    {countriesList}
                                </select>
                            </div>
                            <div className={styles.rowPort}>
                                <label id={styles.inqPort} htmlFor="port">Port</label>
                                <input type="text"
                                        id="port"
                                        name="port"
                                        placeholder="Enter Destination Port"
                                        onChange={(event) => inputHandler(event, 'port')}
                                        style={!portValidity ? {border: '1px solid red'} : null}
                                        required />
                            </div>
                            <div className={styles.rowEmail}>
                                <label id={styles.inqEmail} htmlFor="email">Email</label>
                                <input type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter Your Email"
                                        onChange={(event) => inputHandler(event, 'email')}
                                        defaultValue={ email }
                                        style={!emailValidity ? {border: '1px solid red'} : null}
                                        required />
                            </div>
                            <div className={styles.rowPhone}>
                                <label id={styles.inqPhone} htmlFor="phone">Phone</label>
                                <input type="number"
                                            id="phone"
                                            name="phone"
                                            placeholder="Enter Your Phone Number"
                                            defaultValue={phone}
                                            onChange={(event) => inputHandler(event, 'phone')}
                                            style={!phoneValidity ? {border: '1px solid red'} : null}
                                            required />
                            </div>
                            <div className={styles.rowWhatsapp}>
                                <label htmlFor="whatsapp">Whatsapp</label>
                                <input type="number"
                                        id="whatsapp"
                                        name="whatsapp"
                                        placeholder="Enter Whatsapp Number including country code"
                                        onChange={(event) => inputHandler(event, 'whatsapp')}
                                        style={!whatsappValidity ? {border: '1px solid red'} : null}
                                        />
                            </div>
                            <div className={styles.rowFinal}>
                                <p id={styles.tradeType}>I am</p>
                                <label htmlFor="type1"><input type="radio"
                                                                name="person"
                                                                id="type1"
                                                                value="individual"
                                                                onChange={(event) => inputHandler(event, 'person')}
                                                                />Individual</label>

                                <label htmlFor="type2"><input type="radio"
                                                                name="person"
                                                                id="type2"
                                                                value="car dealer"
                                                                onChange={(event) => inputHandler(event, 'person')}
                                                                />Car Dealer</label>
                                
                            </div>

                            <button type="submit"
                                    disabled={!finalValidation ? true : false}
                                    className={finalValidation ? styles.submitBtn : styles.submitBtnDisable}
                                    onClick={(event) => submitForm(event)}
                                    >Submit inquiry</button>

                        </form>
                    </div>

                    <div className={styles.formHeadingMain} style={params.search === 'notFound' ? {display: 'none'} : null}>
                        <h3>WHY BUY FROM AUCTION??</h3>
                        <div className={styles.formHeadingSub}>
                            <div className={styles.formHeaders}>
                                <h4>1. Accurate Information</h4>
                                <p>All vehicles are checked and inspected by experts and prepared with genuine and accurate auction inspection sheet for each vehicle.</p>
                            </div>

                            <div className={styles.formHeaders}>
                                <h4>2. large Stock</h4>
                                <p>Around more than 50,000 cars everyday available in all auction halls all over Japan. See below auction Calender.</p>
                            </div>

                            <div className={styles.formHeaders}>
                                <h4>3. Easy To Buy</h4>
                                <p>The prosess is very easy to buy vehicles from Auctions and we make it easier to find and win by bidding on behafe of you.</p>
                            </div>
                            
                            <div className={styles.formHeaders}>
                                <h4>4. Easy Access to All Information</h4>
                                <p>All auction vehicles data informations available online and can be accessed from any part of the world.</p>
                            </div>

                            <div className={styles.formHeaders}>
                                <h4>5. Low Charges</h4>
                                <p>We have experts who help us to win the bidding by your budget with best quality can be managed.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.Ncs} style={params.search === 'notFound' ? {display: 'none'} : null}>
                    <h2>HOW TO BUY FROM NIHON CHUKO SHA</h2>

                    <div className={styles.cards}>
                        
                        <div className={styles.card}>
                            <div className={styles.fontAwesome}>
                                <FontAwesomeIcon className={styles.font} icon={faPaperPlane}/>
                            </div>
                            <h4>Submit Above Inquiry Form</h4>
                            <p>Please fillup and submit above inquiry form to contact with NIHON CHUKOSHA for buying purpose.</p>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.fontAwesome}>
                                <FontAwesomeIcon className={styles.font} icon={faCreditCard}/>
                            </div>
                            <h4>Security Deposit</h4>
                            <p>Once we provide the informations based on your quaries, please decide and get the document to make a security deposit before bidding. It will ensure us and you as well that the deal is confirmed by both of us. After auction deposit is received, an auction consultant will start processing to win the bidding of your desire vehicle.</p>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.fontAwesome}>
                                <FontAwesomeIcon className={styles.font} icon={faGavel}/>
                            </div>
                            <h4>Bid Result and Shipment</h4>
                            <p>Here we inform you the bid wining result with reliable documents that proofs the vehicle shipment process is done and send you document to make the Full Payment within time.</p>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.fontAwesome}>
                                <FontAwesomeIcon className={styles.font} icon={faFileInvoice}/>
                            </div>
                            <h4>Courier Documents</h4>
                            <p>If your car is won by us, please make remaining payment. If the bid is unsuccessful then we will inform you as well and go for another car in other days as well, if we fail during your given time duration then security deposit will be refunded or you can use it for another vehicle.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.information} ref={carAuction} style={params.search === 'notFound' ? {display: 'none'} : null}>

                    <h2>JAPANS CARS AUCTION IMPORTANT INFORMATION</h2>

                    <div className={styles.sub}>
                        <h4>What is Japan Cars Auction</h4>
                        <p>There are several Japanese Auction Houses, those who collect local vehicles all over the Japan and prosess for inspection of those vehicles very specifically with care, and also manage their profile known as Auction Sheet for each vehicle to maintian quality with detail of informations, that is why Japan cars industry is one of the largest and most recognized in the world, with over millions of cars produced and exported almost every year. As a result Japanese vehicles are popular across the world as they are reliable, safe, and high on quality. to know more please contact us.</p>
                    </div>

                    <div className={styles.sub}>
                        <h4>Japan Used Cars Auction System</h4>
                        <p>It needs membership to access and benefit from Auction Houses. Each Auction House has its own charging protocol. They have several services also, so that any member can use that and make progress in business, to know more please contact us.</p>
                    </div>

                    <div className={styles.sub}>
                        <h4>Why buying a used car from Japanese auto auctions is preferred?</h4>
                        <p>Japanese auctions were formed in Japan to make the sale and purchase of used cars, SUVs, trucks, buses, machinary, parts and other vehicles faster and easier. As the vehicles are not stuck in a yard as stock and role everyday, the performance of it can maintain the merge. to know more please contact us.</p>
                    </div>

                    <div className={styles.sub}>
                        <h4>Major Auction Houses in Japan</h4>
                        <p>There are large numbers of auction houses located all over Japan. Some of the most popular Auction houses that contribute to Japanese used Auto market are AUCNET, USS Group, BCN Group and several others.to know more please contact us.</p>
                    </div>

                    <div className={styles.sub}>
                        <h4>Advantages and Disadvantages of buying used cars from Japan Auto Auction</h4>
                        <p>Auction houses are mostly preferred by people for purchasing used vehicle. They have gained this stature due to the good condition of the vehicles they offer and the trust & worthiness which has been developed over the time by the auction houses among people across the globe. to understand more please contact us.</p>
                    </div>
                </div>
                <div className={styles.tableCalanderMain} id={styles.tableLink} ref={calander} style={params.search === 'notFound' ? {display: 'none'} : null}>
                    <h2>AUCTION CALANDER</h2>
                    <table>
                        <tbody className={styles.tHeader}>
                            <tr className={styles.tRow}>
                                <td className={styles.tData} >Monday</td>
                                <td className={styles.tData} >Tuesday</td>
                                <td className={styles.tData} >Wednesday</td>
                                <td className={styles.tData} >Thursday</td>
                                <td className={styles.tData} >Friday</td>
                                <td className={styles.tData} >Saturday</td>
                            </tr>
                        </tbody>
                        {employeeTable}
                    </table>
                </div>
            </div>
        </>
    )
}

export default HowToBuyFromAuction;
