import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../Assets/footer_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'
import styles from './Footer.module.css';
import ReactWhatsapp from 'react-whatsapp';


const Footer = () => {

    return (
        <div className={styles.Main}>
            <div className={styles.Category}>
                <h4>Search By Make</h4>
                <ul>
                    <Link to="/displayItem/toyota">Toyota</Link>
                    <Link to="/displayItem/nissan">Nissan</Link>
                    <Link to="/displayItem/honda">Honda</Link>
                    <Link to="/displayItem/mitsubishi">Mitsubishi</Link>
                    <Link to="/displayItem/mercedesbenz">Mercedes benz</Link>
                    <Link to="/displayItem/bmw">BMW</Link>
                    <Link to="/displayItem/mazda">Mazda</Link>
                    <Link to="/displayItem/subaru">Subaru</Link>
                    <Link to="/displayItem/volkswagen">Volkswagen</Link>
                    <Link to="/displayItem/suzuki">Suzuki</Link>
                    <Link to="landrover">Land Rover</Link>
                    <Link to="/displayItem/isuzu">Isuzu</Link>
                    <Link to="/displayItem/audi">Audi</Link>
                    <Link to="/displayItem/ford">Ford</Link>
                    <Link to="/displayItem/daihatsu">Daihatsu</Link>
                    <Link to="/displayItem/lexus">Lexus</Link>
                </ul>
            </div>

            <div className={styles.Category}>
                <h4>Search By Bodystyle</h4>
                <ul>
                    <Link to="">SUV</Link>
                    <Link to="">Truck</Link>
                    <Link to="">Van/Minivan</Link>
                    <Link to="">Sedan</Link>
                    <Link to="">Bus</Link>
                    <Link to="">Hetchback</Link>
                    <Link to="">Coupe</Link>
                    <Link to="">Convertible</Link>
                    <Link to="">Wagon</Link>
                    <Link to="">Machinery</Link>
                    <Link to="">Mini Vehicle</Link>
                </ul>
            </div>

            <div className={styles.socialCategory}>
                <h4>Contact Us</h4>
                <div className={styles.ContactUs}>
                    <img src={logo} alt="nihon chuko sha"/>
                    <h4>Nihon Chuko Sha</h4>
                </div>

                <ul className={styles.SocialLink}>
                    <a href="https://www.facebook.com/nihon.chukosha" target="_blank"><FontAwesomeIcon className={styles.Font} icon={faFacebook}/></a>
                    <ReactWhatsapp number='+81 80-8997-4031' message="Hi, I need details information about the following car for auction" className={styles.whatsappContainer}>
                        <a href=""><FontAwesomeIcon className={styles.Font} icon={ faWhatsapp }/></a>
                    </ReactWhatsapp>
                    <a href="/contactus"><FontAwesomeIcon className={styles.Font} icon={ faEnvelope }/></a>
                    <a href=""><FontAwesomeIcon className={styles.Font} icon={ faTwitter }/></a>
                </ul>
            </div>
        </div>
    )
}

export default Footer;
