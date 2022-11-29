import React, { useEffect } from "react";
import { Link, NavLink, useActionData } from 'react-router-dom';
import styles from './TopBar.module.css';
import {faUserCircle, faUserPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import actionTypes from "../../reducer/actionTypes";


const TopBar = ( props ) => {

    setInterval(() => {
        let time = new Date().toLocaleTimeString("en-US",  {timeZone:'Asia/Tokyo',timestyle:'full',hourCycle:'h24'})
        document.getElementById("time").innerHTML = time
    }, 1000)

    let loginUser = <div className={styles.Login}>
                    <NavLink to="/login" className={styles.Dock}>
                        <FontAwesomeIcon icon={faUserCircle} className={styles.Font}/>
                        <p className={styles.link}>Login</p>
                    </NavLink>

                    <NavLink to="/register" className={styles.Dock}>
                        <FontAwesomeIcon icon={faUserPlus} className={styles.Font}/>
                        <p className={styles.link}>Register</p>
                    </NavLink>
                </div>

    let userType = JSON.parse(window.sessionStorage.getItem('user'));

    if (userType) {
        //displaying individual user information
        if (userType.category === 'individual') {
            loginUser = <div className={styles.userInfo}>
                <div className={styles.userPicHeader}>
                    <Link to="/profile" style={{display: 'block'}}>
                        {userType.img ? 
                            <img src={userType.img} className={styles.userPic}/>
                            : 
                            <FontAwesomeIcon icon={faUserCircle} className={styles.avatar}/>}
                    </Link>
                </div>
                <div className={styles.profile}>
                    <div className={styles.userBio}>
                        <p className={styles.userDetails}>{userType['firstName']}</p>
                        <p className={styles.userDetails}>{userType['lastName']}</p>

                    </div>
                    <button onClick={() => {
                        props.setloggedOut();
                        sessionStorage.removeItem('user');
                        window.location.reload()
                    }} className={styles.logOutBtn}>Log out</button>
                </div>
            </div>
        }
        //displaying trader user information
        else if (userType['category'] === 'trader') {
            loginUser = <div className={styles.userInfo}>
                <div className={styles.userPicHeader}>
                    <Link to="/profile" style={{display: 'block'}}>
                        {userType.img ? 
                            <img src={userType.img} className={styles.userPic}/>
                            : 
                            <FontAwesomeIcon icon={faUserCircle} className={styles.avatar}/>}
                    </Link>
                </div>
                <div className={styles.profile}>
                    <div className={styles.userBio}>
                        <p className={styles.userDetails}>{userType.firstName}</p>
                        <p className={styles.userDetails}>{userType.lastName}</p>
                    </div>
                    <button onClick={() => {
                        props.setloggedOut()
                        sessionStorage.removeItem('user');
                        window.location.reload()
                    }} className={styles.logOutBtn}>Log out</button>
                </div>
            </div>
        }
        else {
            //displaying google user information
            loginUser = <div className={styles.userInfo}>
                <div className={styles.userPicHeader}>
                    <Link to="/profile"><img src={ userType.picture } alt="user image" className={styles.userPic} referrerPolicy="no-referrer"/></Link>
                </div>
                <div className={styles.profile}>
                    <div className={styles.userBio}>
                        <p className={styles.userDetails}>{userType.given_name}</p>
                        <p className={styles.userDetails}>{userType.family_name}</p>
                    </div>
                    <button onClick={() => {
                        window.sessionStorage.removeItem('user');
                        props.setloggedOut()
                        window.location.assign('/login')
                    }} className={styles.logOutBtn}>Log out</button>
                </div>
            </div>
        }
    }


    return (
        <div className={styles.Main}>
            <div className={styles.Clock}>
                <p className={styles.time}>Time in Tokyo:</p>
                <p id="time" className={styles.time}></p>
            </div>

            <div>
                {loginUser}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setloggedOut: () => dispatch({ type: actionTypes.loggedOut })
    }
}


export default connect( mapStateToProps, mapDispatchToProps ) (TopBar);
