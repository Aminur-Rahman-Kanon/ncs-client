import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEarthAmericas, faImage, faBuilding, faMapLocationDot, faNetworkWired  } from '@fortawesome/free-solid-svg-icons'
import { countryList } from '../../Data/data';
import styles from './profile.module.css';
import user from '../../Assets/user.png';
import { storage } from '../Others/firebase/firebaseStorage';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import Spinner from '../Others/spinner/spinner';
import Backdrop from '../Others/backdrop/backdrop';
import Modal from '../Others/modal/modal';


const Profile = () => {

    const [firstName, setFirstName] = useState('');

    const [firstNameDisplay, setFirstNameDisplay] = useState('');

    const [lastName, setLastName] = useState('');

    const [lastNameDisplay, setLastNameDisplay] = useState('');

    const [country, setCountry] = useState('');

    const [address, setAddress] = useState('');

    const [phone, setPhone] = useState('');

    const [photo, setPhoto] = useState(null);

    const [company, setCompany] = useState('');

    const [website, setWebsite] = useState('');

    const [email, setEmail] = useState('');

    const [category, setCategory] = useState('');

    const [img, setImg] = useState('');

    const [spinner, setSpinner] = useState(false);

    const [dataUpdate, setDataUpdate] = useState(false);

    const [imgUpload, setImgUpload] = useState('');

    const [backdrop, setBackdrop] = useState(false);

    const [modal, setModal] = useState(false);

    const countryOption = useMemo(() => {
        return countryList.map(item => {
            return <option key={item}>{item}</option>
        })
    }, [])

    
    const sessionStorageObj = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
    
    const downloadUserImg = () => {
        let dir = null;
        if (sessionStorageObj.category === 'individual'){
            dir = 'individualuser';
        }
        else if (sessionStorageObj.category === 'trader'){
            dir = 'traderuser';
        }
        else {
            dir = 'modifieduser';
        }

        const downloadRef = ref(storage, `${dir}/${sessionStorageObj['email']}`);

        getDownloadURL(downloadRef).then((url) => {
            setImg(url);
        }).catch(err => console.log(err));
    }

    console.log(sessionStorageObj)

    useEffect(() => {

        window.scrollTo(0, 0);

        if (sessionStorageObj) {
            if (sessionStorageObj['category'] === 'trader') {
                setFirstName(sessionStorageObj.firstName);
                setLastName(sessionStorageObj.lastName);
                setFirstNameDisplay(sessionStorageObj.firstName);
                setLastNameDisplay(sessionStorageObj.lastName);
                setCountry(sessionStorageObj.country);
                setAddress(sessionStorageObj.address);
                setPhone(sessionStorageObj.phone);
                setCompany(sessionStorageObj.companyName);
                setWebsite(sessionStorageObj.website);
                setEmail(sessionStorageObj.email);
                setCategory(sessionStorageObj.category);
                downloadUserImg();
            }
            else if (sessionStorageObj['category'] === 'individual') {
                setFirstName(sessionStorageObj.firstName);
                setLastName(sessionStorageObj.lastName);
                setFirstNameDisplay(sessionStorageObj.firstName);
                setLastNameDisplay(sessionStorageObj.lastName);
                setCountry(sessionStorageObj.country);
                setCategory(sessionStorageObj.category);
                setAddress(sessionStorageObj.address);
                setPhone(sessionStorageObj.phone);
                setCompany(sessionStorageObj.company);
                setWebsite(sessionStorageObj.website);
                setEmail(sessionStorageObj.email);
                downloadUserImg();
            }
            else {
                setFirstNameDisplay(sessionStorageObj.firstName)
                setLastNameDisplay(sessionStorageObj.lastName)
                setFirstName(sessionStorageObj.firstName)
                setLastName(sessionStorageObj.lastName)
                setCountry(sessionStorageObj.country)
                setAddress(sessionStorageObj.address)
                setPhone(sessionStorageObj.phone)
                setCompany(sessionStorageObj.company)
                setWebsite(sessionStorageObj.website)
                setEmail(sessionStorageObj.email)
                setImg(sessionStorageObj.img)
                setCategory(sessionStorageObj.category)
            }
        }
    }, [] )

    const inputHandler = (event, id) => {
        switch (id) {

            case 'first name':
                setFirstName(event.target.value);
                break;

            case 'last name':
                setLastName(event.target.value);
                break;

            case 'country':
                setCountry(event.target.value);
                break;

            case 'address':
                setAddress(event.target.value);
                break;

            case 'phone':
                setPhone(event.target.value);
                break;
            case 'photo':
                setPhoto(event.target.files[0]);
                break;

            case 'company':
                setCompany(event.target.value);
                break;

            case 'website':
                setWebsite(event.target.value);
                break;

            default:
                break;
        }
    }

    const submitChange = async (event) => {
        event.preventDefault();

        setSpinner(true);

        try {
            fetch('https://ncs-api.onrender.com/updateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category,
                    firstName,
                    lastName,
                    email,
                    country,
                    address,
                    phone,
                    company,
                    website
                })
            }).then(res => res.json()).then(thn => {
                if (thn.status === 'updated'){
                    setDataUpdate(true);

                    //if user select image
                    if (photo !== null) {
                        const storageRef = ref(storage, `${category === 'guest' ? 'modified' : category}user/${email}`);
                        uploadBytesResumable(storageRef, photo).then(res => {
                            if (res.state === 'success') {
                                //display success message
                                setSpinner( false )
                                setImgUpload('updated');
                                openDisplayMsg();
                            }
                        }).catch(err => {
                            //display failed message
                            setSpinner( false );
                            setImgUpload('failed')
                            openDisplayMsg();
                        });

                    }

                    //select no image
                    else {
                        setSpinner( false );
                        setImgUpload('no image selected');
                        openDisplayMsg();
                    }
                }
            }).catch(err => {
                setSpinner(false);
                setDataUpdate(false);
                openDisplayMsg();
            });

        } catch (error) {
            console.error("Error while uploading image to server", error);
        };
    }

    const openDisplayMsg = () => {
        setBackdrop(true);
        setModal(true);
    }

    const closeDisplayMsg = () => {
        setBackdrop(false);
        setModal(false);
    }

    const logout = () => {
        window.sessionStorage.removeItem('user');
        window.location.href = '/';
    }


    if (!sessionStorage.getItem('user')) {
        return <div className={ styles.warningMsg }>
            <h4>You are not logged in</h4>
            <p>Please login and then try again</p>
            <Link to="/login" className={styles.warningBtn}>Login</Link>
        </div>
    }


    let msg = null;

    if (dataUpdate && imgUpload === 'updated') {
        msg = <div className={styles.displayMsg}>
            <h1 className={styles.modalMsgHeader}>Chages applied</h1>
            <p className={styles.modalMsgPara}>Please note that some of the changes will be applied when you relogin</p>
            <div className={styles.msgBtns}>
                <button className={styles.msgBtn} onClick={ logout }>Logout</button>
                <button className={styles.msgBtn} onClick={ closeDisplayMsg }>Never Mind</button>
            </div>
        </div>
    }
    else if (dataUpdate && imgUpload === 'no image selected') {
        msg = <div className={styles.displayMsg}>
            <h1 className={styles.modalMsgHeader}>Chages applied without image</h1>
            <p className={styles.modalMsgPara}>You haven't select an image</p>
            <p className={styles.modalMsgPara}>We recommend you to upload an image when make a change again</p>
            <div className={styles.msgBtns}>
                <button className={styles.msgBtn} onClick={ logout }>Logout</button>
                <button className={styles.msgBtn} onClick={ closeDisplayMsg }>Never Mind</button>
            </div>
        </div>
    }
    else {
        msg = <div className={styles.displayMsg}>
            <h1 className={styles.modalMsgHeader}>Somethong went wrong</h1>
            <p className={styles.modalMsgPara}>Please check your input and then try again</p>
            <div className={styles.msgBtns}>
                <button className={styles.msgBtn} onClick={ logout }>Logout</button>
                <button className={styles.msgBtn} onClick={ closeDisplayMsg }>Never Mind</button>
            </div>
        </div>
    }


    return (
        <>
            <Spinner spinner={spinner} />

            <Backdrop backdrop={backdrop} closeBackdrop={ closeDisplayMsg } />

            <Modal toggle={modal}> {msg} </Modal>

            <div className={styles.main}>

                <div className={styles.profileMain}>
                    <div className={styles.profilePic}>
                        <img src={ img ? img : user } alt="nihon chuko sha user" className={styles.avatar} referrerPolicy="no-referrer" />
                    </div>

                    <div className={styles.profileInfo}>
                        <div className={styles.profileName}>
                            <h4 className={styles.name}>{ firstNameDisplay ? <span style={{textTransform: 'capitalize'}}>{firstNameDisplay}</span> : 'FirstName'}</h4>
                            <h4 className={styles.name}>{ lastNameDisplay ? <span style={{textTransform: 'capitalize'}}>{lastNameDisplay}</span> : 'LastName'}</h4>
                        </div>
                        <p>{email}</p>
                        <div className={styles.profileCategory}>
                            <h4 className={styles.category}>Category : <span style={{textTransform: 'capitalize'}}>{category}</span></h4>
                        </div>
                    </div>
                </div>
                
                <form className={styles.form}>
                    <h3>Edit Profile</h3>

                    <div className={styles.fields}>
                        <div className={styles.field}>
                            <label htmlFor='name' className={styles.label}>
                                <FontAwesomeIcon icon={ faUser } className={styles.fontAwesome}/>
                            </label>

                            <div className={styles.nameInputs}>
                                <input type="text"
                                        className={styles.nameInput}
                                        id="name"
                                        value={firstName}
                                        placeholder='First name'
                                        onChange={(event) => inputHandler(event, 'first name')}
                                        />

                                <input type="text"
                                        className={styles.nameInput}
                                        value={lastName}
                                        placeholder="Last name"
                                        onChange={(event) => inputHandler(event, 'last name')}
                                        />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor='country' className={styles.label}>
                                <FontAwesomeIcon icon={faEarthAmericas} className={styles.fontAwesome}/>
                            </label>
                            
                            <div className={styles.countryInputs}>
                                <select className={styles.countryInput}
                                        // style={{backgroundColor: 'white'}}
                                        value={country ? country : 'Select a country'} id='country'
                                        onChange={(event) => inputHandler(event, 'country')}
                                        >
                                    <option disabled >Select a country</option>
                                    {countryOption}
                                </select>

                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor='address' className={styles.label}>
                                <FontAwesomeIcon icon={ faMapLocationDot } className={styles.fontAwesome}/>
                            </label>

                            <input type="text"
                                    className={styles.input}
                                    id="address"
                                    defaultValue={address}
                                    placeholder='Full address'
                                    onChange={(event) => inputHandler(event, 'address')}
                                    />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor='phone' className={styles.label}>
                                <FontAwesomeIcon icon={faPhone} className={styles.fontAwesome}/>
                            </label>

                            <input type="number"
                                    className={styles.input}
                                    id="phone"
                                    defaultValue={phone}
                                    placeholder='Phone number'
                                    onChange={(event) => inputHandler(event, 'phone')}
                                    />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>
                                <FontAwesomeIcon icon={ faImage } className={styles.fontAwesome}/>
                            </label>
                            <input type="file"
                                    className={styles.inputPhoto}
                                    placeholder="photo"
                                    onChange={(event) => inputHandler(event, 'photo')}
                                    />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor='company' className={styles.label}>
                                <FontAwesomeIcon icon={ faBuilding } className={styles.fontAwesome}/>
                            </label>
                            <input type="text"
                                    className={styles.input}
                                    id="company"
                                    defaultValue={company}
                                    placeholder='Company name'
                                    onChange={(event) => inputHandler(event, 'company')}
                                    />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor='website' className={styles.label}>
                                <FontAwesomeIcon icon={ faNetworkWired } className={styles.fontAwesome}/>
                            </label>
                            <input type="text"
                                    className={styles.input}
                                    id='website'
                                    defaultValue={website}
                                    placeholder='Website'
                                    onChange={(event) => inputHandler(event, 'website')}
                                    />
                        </div>

                        <div className={styles.btn}>
                            <button className={styles.submitBtn} onClick={submitChange}>Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Profile;
