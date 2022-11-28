import React, { useEffect, useState } from "react";
import logo from '../../Assets/main_logo.png';
import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from './NavBar.module.css';
import DrawToggle from "../Others/DrawToggle/drawToggle";
import Backdrop from "../Others/backdrop/backdrop";
import { models } from "../../Data/data";

const NavBar = () => {

    const [toggleNav, setToggleNav] = useState(false);

    const [ activeAuction, setActiveAuction ] = useState(false)

    const [activeParts, setActiveParts] = useState(false)
    
    const [ activeSafety, setActiveSafety ] = useState(false)
    
    const [ activeTerms, setActiveTerms ] = useState(false)
    
    const [ activeTestimonial, setActiveTestimonial ] = useState(false)
    
    const [ activeContact, setActiveContact ] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const openNav = () => {
        setToggleNav(true);
    }

    const closeNav = () => {
        setToggleNav(false);
    }

    const preventUpdate = (event) => {
        event.preventDefault();
    }

    const location = useLocation()


    useEffect(() => {
        if (location.pathname === '/auction') setActiveAuction(true);

        else if (location.pathname === '/parts') setActiveParts(true)

        else if (location.pathname === '/safety&advice') setActiveSafety(true)

        else if (location.pathname === '/terms&conditions') setActiveTerms(true)

        else if (location.pathname === '/testimonial') setActiveTestimonial(true)

        else if (location.pathname === '/contactUs') setActiveContact(true);
        
        return () => {
            setToggleNav(false);
            setActiveAuction(false);
            setActiveParts(false);
            setActiveSafety(false);
            setActiveTerms(false);
            setActiveTestimonial(false);
            setActiveContact(false);
        }
    }, [location])
    
    const inputHandler = (event) => {
        setSearchValue(event.target.value);
    }

    const searchForItem = (event) => {
        let queryCategory = null;
        const queryList = ['auction', 'parts', 'help', 'terms', 'calander', 'contact', 'safety', 'feedback', 'review', 'about']
        
        if (event.key === 'Enter') {
            const userInput = searchValue.split(' ');

            const query = queryList.filter(item => userInput.includes(item))[0]

            queryCategory = query ? 'general' : 'others';

            if (queryCategory === 'general'){
                switch(query){
                    case 'auction':
                        return window.location.assign(`/auction/${query}`);

                    case 'parts':
                        return window.location.assign(`/parts`);

                    case 'terms':
                        return window.location.assign('/terms&conditions');

                    case 'calander':
                        return window.location.assign(`/auction/${query}`);

                    case 'contact':
                        return window.location.assign('contactus');

                    case 'safety':
                        return window.location.assign('/safety&advice');

                    case 'feedback':
                        return window.location.assign('/testimonial');

                    case 'review':
                        return window.location.assign('/testimonial');

                    case 'about':
                        return window.location.assign('/aboutus')

                    default:
                        break;
                }
            }

            else if (queryCategory === 'others'){
                const carMake = searchValue.includes(' ') ? searchValue.split(' ').join('').toLowerCase() : searchValue.toLowerCase()
                
                for (let make of Object.keys(models)){
                    const checkForMake = make.toLowerCase() === carMake ? 'make' : 'others'

                    if (checkForMake === 'make'){
                        return window.location.assign(`/displayItem/${make.toLowerCase()}`)
                    }
                    else {
                        for (let model of (models[make])){
                            const extractedModel = model.includes(' ') ? model.split(' ').join('').toLowerCase() : model.toLowerCase();
                            if (extractedModel === carMake){
                                return window.location.assign(`/displayItem/${make}/${extractedModel}`)
                            }
                            else {
                                queryCategory = 'not found'
                            }
                        }
                    }
                }

                if (queryCategory === 'not found'){
                    window.location.assign('/auction/notFound')
                }
            }
        }
    }


    return (
        <>
            <Backdrop backdrop={toggleNav} closeBackdrop={closeNav}/>
            <div className={styles.Main}>
                <Link to="/" className={styles.Logo}>
                    <img src={logo} alt="logo"/>
                </Link>

                <nav className={toggleNav ? styles.toggleNav : null}>
                    <ul className={toggleNav ? styles.toggleList : styles.NavList}>
                        <NavLink to="/" end className={({isActive}) => isActive ? styles.active : null}>Home</NavLink>

                        <NavLink to="" id={styles.howToBuy}
                        className={() => {
                            if (activeAuction) return styles.active
                            if (activeParts) return styles.active
                        }}
                        onClick={(event) => preventUpdate(event)}
                        >How To Buy</NavLink>

                        <ul className={styles.childRoutes1} id={styles.child1}>
                            <NavLink to="auction" 
                            style={({isActive}) => isActive ? {border: '1px solid orange'} : null}
                            >How To Buy From Auction</NavLink>

                            <NavLink to="/parts" className={({isActive}) => isActive ? styles.active : null}>How To Buy Auto Parts</NavLink>
                            
                        </ul>
                        <NavLink to="" id={styles.help}
                        className={() => {
                            if (activeSafety) return styles.active
                            if (activeTerms) return styles.active
                            if (activeTestimonial) return styles.active
                            if (activeContact) return styles.active
                        }}
                        onClick={(event) => preventUpdate(event)}
                        >Help & Support</NavLink>
                        <ul className={styles.childRoutes2}>
                            <NavLink to="/safety&advice" className={({isActive}) => isActive ? styles.active : null}>Safety Tips & Advice</NavLink>
                            <NavLink to="/terms&conditions" className={({isActive}) => isActive ? styles.active : null}>Terms & Conditions</NavLink>
                            <NavLink to="/testimonial" className={({isActive}) => isActive ? styles.active : null}>Testimonial</NavLink>
                            <NavLink to="/contactus" className={({isActive}) => isActive ? styles.active : null}>Contact Us</NavLink>
                        </ul>
                        <NavLink to="/aboutUs" >About Us</NavLink>
                    </ul>

                    <input className={styles.Input}
                            type="text"
                            placeholder="Search"
                            onChange={(event) => inputHandler(event)}
                            onKeyDown={(event) => searchForItem(event)}
                            />
                </nav>

                <DrawToggle toggle={openNav}/>
            </div>
        </>
    )
}

export default NavBar;
