import React, { useEffect, useState, useRef } from "react";
import contactImg from '../../Assets/contact.png';
import styles from './contactUs.module.css';
import Backdrop from '../Others/backdrop/backdrop';
import Modal from '../Others/modal/modal';
import { SpinnerDotted } from 'spinners-react';
import emailjs from 'emailjs-com';

let target = null;

const ContactUs = () => {

    const formRef = useRef();

    const [name, setName] = useState('');
    const [nameValidity, setNameValidity] = useState(true);

    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidity] = useState(true);

    const [message, setMessage] = useState('');
    const [messageValidity, setMessageValidity] = useState(true);

    const [btnDisable, setBtnDisable] = useState(true);

    const [spinner, setSpinner] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [modal, setModal] = useState(false);

    const [notification, setNotification] = useState('');

    const sessionStorageObj = JSON.parse(sessionStorage.getItem('user'));

    if ( sessionStorageObj && !name && !email ) {
        if (sessionStorageObj.hasOwnProperty('_id')) {
            const name = `${sessionStorageObj['firstName']} ${sessionStorageObj['lastName']}`
            setName(name);
            setEmail(sessionStorageObj['email'])
        }
        else {
            const name = `${sessionStorageObj.name.firstName} ${sessionStorageObj.name.lastName}`
            setName(name);
            setEmail(sessionStorageObj['email']);
        }
    }

    const inputHandler = (event, id) => {
        switch(id) {
            case 'name':
                setName(event.target.value);
                target = id;
                break;

            case 'email':
                setEmail(event.target.value);
                target = id;
                break;

            case 'message':
                setMessage(event.target.value);
                target = id;
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        switch(target) {
            case 'name':
                name.length >= 3 ? setNameValidity(true) : setNameValidity(false);
                break;

            case 'email':
                const check1 = email.includes('@');
                const check2 = email.includes('.com')

                const check1Index = email.indexOf('@');
                const check2Index = email.indexOf('.com');

                const checkDomain = email.slice(check1Index+1, check2Index);

                if ( check1 && check2 && checkDomain ) {
                    setEmailValidity(true)
                }
                else {
                    setEmailValidity(false)
                }
                break;

            case 'message':
                message.length >= 5 ? setMessageValidity(true) : setMessageValidity(false);
                break;
        }

    }, [name, email, message])

    useEffect(() => {
        if ((name.length > 0 && nameValidity) && (email.length > 0 && emailValidity) && (message.length > 0 && messageValidity)) {
            setBtnDisable(false)
        }
        else {
            setBtnDisable(true)
        }
    }, [nameValidity, emailValidity, messageValidity])

    const openModal = () => {
        setModal(true);
        setBackdrop(true)
    }

    const closeModal = () => {
        
        if (notification === 'submitted' || notification === 'network error') {
            window.location.reload()
        }
        else {
            setModal(false);
            setBackdrop(false)
        }
    }



    const submitQuery = (event) => {
        event.preventDefault();

        setSpinner(true);

        fetch('https://ncs-api.onrender.com/contactQuery', {
            method: 'POST',
            crossDoman: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        }).then(res => res.json()).then(data => {

            setSpinner(false)

            if (data.status === 'submitted'){
                setNotification(data.status)
                openModal();

                emailjs.sendForm('service_hdt52li', 'template_muufs3o', formRef.current ,'fe1-dXxBlt8NJeM9U')
                .then(res => console.log(res.text)).catch(err => console.log(err));
            }
            else {
                setNotification(data.status);
                openModal()
            }
        })
        .catch(err => {
            setNotification('network error');
            openModal();
        });
    }

    let msg = null;

    if (notification === 'submitted') {
        msg = <div className={styles.success}>
            <p className={styles.msg}>Query has been sent. We will get back to you very soon.</p>
            <button className={styles.finishBtn} style={{width: '150px'}} onClick={ closeModal }>Have a nice day</button>
        </div>
    }
    else if (notification === 'failed') {
        msg = <div className={styles.success}>
            <p className={styles.msg}>Failed, try again</p>
            <button className={styles.finishBtn} onClick={ closeModal }>Try again</button>
        </div>
    }
    else if(notification === 'network error') {
        msg = <div className={styles.success}>
            <p className={styles.msg}>Something went wrong, please reload the page</p>
            <button className={styles.finishBtn} onClick={ closeModal }>Reload</button>
        </div>
    }

    return (
        <>
            <Backdrop backdrop={backdrop} toggleBackdrop={closeModal}/>
            <Modal toggle={modal} >{msg}</Modal>

            <div className={styles.spinner} style={spinner ? {display: 'flex'} : {display: 'none'}}>
                <SpinnerDotted size={90} thickness={100} speed={100} color="rgba(224, 118, 24, 1)" />
                <p style={{color: 'rgb(224, 118, 24)'}}>Please wait...</p>
            </div>

            <div className={styles.main}>
                <div className={styles.img}>
                    <img src={contactImg} className={styles.contactImg}/>
                </div>

                <form className={styles.form} ref={formRef} >

                    <div className={styles.formInput}>
                        <input type="text"
                                name='name'
                                defaultValue={name}
                                className={nameValidity ? styles.input : styles.wrongInput}
                                placeholder="Your Name"
                                onChange={(event) => inputHandler(event, 'name')}/>
                        <input type="email"
                                name='email'
                                defaultValue={email}
                                className={emailValidity ? styles.input : styles.wrongInput}
                                placeholder="Your Email"
                                onChange={(event) => inputHandler(event, 'email')}/>
                        <textarea className={messageValidity ? styles.textArea : styles.wrongTextAreaInput}
                                    name='message'
                                    placeholder="Message"
                                    onChange={(event) => inputHandler(event, 'message')}/>
                    </div>

                    <button className={!btnDisable ? styles.submitBtn : styles.submitBtnDisable}
                            disabled={btnDisable} onClick={submitQuery}>Submit</button>
                </form>
            </div>
        </>
    )
}


export default ContactUs;
