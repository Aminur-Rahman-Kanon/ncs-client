import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './login.module.css';
import Backdrop from "../Others/backdrop/backdrop";
import Modal from "../Others/modal/modal";
import google from '../../Assets/google.png';
import Spinner from "../Others/spinner/spinner";
import {storage} from "../Others/firebase/firebaseStorage";
import { ref, getDownloadURL } from 'firebase/storage'


const Login = () => {

    const [spinner, setSpinner] = useState(false);

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidity] = useState(true);

    const [password, setPassword] = useState('');

    const [btnDisable, setBtnDisable] = useState(true);

    const [notification, setNotification] = useState(null);

    useEffect(() => {

        if (email.length >= 5 && password.length >=8) {
            setBtnDisable(false);
        }
        else {
            setBtnDisable(true);
        }

    }, [email, password]);

    useEffect(() => {

        if (email.length > 0) {
    
            const check1 = email.includes('@');
            const check2 = email.includes('.com');
    
            const checkIndex1 = email.indexOf('@') + 1;
            const checkindex2 = email.indexOf('.com')
    
            const domain = email.slice(checkIndex1, checkindex2);
    
            if (check1 && check2 && domain.length >= 1) {
                setEmailValidity(true);
            }
            else {
                setEmailValidity(false)
            }
        }
    }, [email])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const inputHandler = (event, id) => {

        switch(id) {

            case 'email':
                setEmail(event.target.value);
                break;

            case 'password':
                setPassword(event.target.value);
                break;

            default:
                break;
        }
    }

    const showModal = () => {
        setModal(true);
        setBackdrop(true);
    }

    const closeModal = () => {
        if (notification === 'ok') {
            window.location.reload();
        }
        else {
            setModal(false);
            setBackdrop(false);
        }
    }

    const wrongInputAnimation = (id) => {
        const email = document.getElementById('email')
        const password = document.getElementById('password')

        if (id === 'email') {
            email.style.borderRadius = '8px'
            email.style.transform = 'scale(1.2)';

            setTimeout(() => {
                email.style.transform = 'scale(1.0)';
            }, 300)
        }
        else if (id === 'password') {
            password.style.borderRadius = '8px';
            password.style.transform = 'scale(1.2)';

            setTimeout(() => {
                password.style.transform = 'scale(1.0)'
            }, 300)
        }
    }

    const submitLogin = (event) => {
        event.preventDefault();
        
        setSpinner(true);

        fetch('https://ncs-api.onrender.com/login', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                email,
                password
            })
        }).then(res => res.json()).then(data => {
            setSpinner(false);

            switch(data.status) {
                case "password doesn't match":
                    setNotification(data.status);
                    wrongInputAnimation('password');
                    break;

                case "user not found":
                    setNotification(data.status);
                    wrongInputAnimation('email');
                    break;

                case 'ok':
                    const downloadRef = ref(storage, `${data.category}user/${data.email}`);
                    getDownloadURL(downloadRef).then(url => {
                        console.log(url)
                        data['img'] = url
                        sessionStorage.setItem('user', JSON.stringify(data));
                        window.location.href = '/';
                    }).catch(err => {
                        sessionStorage.setItem('user', JSON.stringify(data));
                        window.location.href = '/';
                    })
                    break;

                default:
                    break;
            }
        }).catch(err => {
            setNotification('network error');
            setSpinner(false);
            showModal();
        });
    }

    const googleSignIn = () => {
        setSpinner(true);
        window.location.href = 'https://ncs-api.onrender.com/auth/google';
    }

    const msg = notification === 'network error' ? <div>
        <p>Something went wrong, please reload the page</p>
        <button className={styles.modalBtn} onClick={ () => window.location.reload() }>Reload</button>
    </div> : null;

    const emailErrorHandler = notification === 'user not found' ? "User doesn't exist" : null
    let passwordErrorHandler = notification === "password doesn't match" ? "Password didn't match" : null

    if (sessionStorage.getItem('user')) {
        return (
            <div className={styles.existLogin}>
                <p>You are logged in</p>
                <p>To login with a different user, please logout and the n login again</p>
                <Link to="/" className={styles.existLoginLink}>Never mind</Link>
            </div>
        )
    }

    return (
        <>
            <Backdrop backdrop={ backdrop } closeBackdrop={ closeModal }/>
            <Modal toggle={ modal } >{msg}</Modal>
            <Spinner spinner={spinner} />

            <div className={styles.main}>
                <div className={styles.backgroundMain}>

                </div>
                
                <form className={styles.form} onSubmit={(event) => submitLogin(event)}>
                    <div className={styles.fields}>
                        <label htmlFor="email" className={styles.label}>Email Address</label>
                        <div className={styles.inputField} id="email">
                            <input type="text"
                                    id="email"
                                    // style={emailValidity ? {border: '1px solid grey'} : {border: '1px solid red'}}
                                    className={notification === "user not found" || !emailValidity? `${styles.input} ${styles.wrongInput}` : styles.input}
                                    onChange={(event) => inputHandler(event, 'email')}
                                    />
                            <p style={{color: 'red', margin: '2px'}}>{emailErrorHandler}</p>

                        </div>
                    </div>

                    <div className={styles.fields}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <div className={styles.inputField} id="password">
                            <input type="password"
                                    id="password"
                                    className={notification === "password doesn't match" ? `${styles.input} ${styles.wrongInput}` : styles.input}
                                    onChange={(event) => inputHandler(event, 'password')}
                                    />
                            <p style={{color: 'red', margin: '2px'}}>{passwordErrorHandler}</p>

                        </div>
                    </div>

                    <div className={styles.submit}>
                        <button disabled={btnDisable} className={!btnDisable ? styles.btn : styles.btnDisable}>Login</button>

                        <div className={styles.google} onClick={googleSignIn}>
                            <img src={google} alt="google" className={styles.googleFont}/>
                            <p className={styles.googleSignIn}>Login with Google</p>
                        </div>

                        <div className={styles.msg}>
                            <p className={styles.account}>Dont have an Account?</p>
                            <Link to="/register" className={styles.link}>Sign Up</Link>
                        </div>
                    </div>
                    
                </form>
            </div>
        </>
    )
}


export default Login;
