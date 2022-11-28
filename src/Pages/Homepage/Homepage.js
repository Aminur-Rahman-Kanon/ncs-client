import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import { models } from "../../Data/data";
import { modelPic } from "../../Data/data";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {

    const makeOption = useMemo(() => {
        return Object.keys(models).map((item, index) => {
            return item === 'AlfaRomeo' ? <option key={index} value="AlfaRomeo">Alfa Romeo</option> : <option key={index} value={item}>{item}</option>
        })
    }, [] )
    
    useEffect(() => {
        AOS.init({duration: 1300})
    }, [])

    const navigate = useNavigate();

    const [make, setMake] = useState('')

    const [model, setModel] = useState('')

    const [yearFromData, setYearFromData] = useState([]);
    const [yearFromIndex, setYearFromIndex] = useState(0);
    const [yearFrom, setYearFrom] = useState('')

    const [yearToData, setYearToData] = useState([]);
    const [yearTo, setYearTo] = useState('')

    const [priceFromData, setPriceFromData] = useState([]);
    const [priceFromIndex, setPriceFromIndex] = useState(0);
    const [priceFrom, setPriceFrom] = useState('');
    
    const [priceToData, setPriceToData] = useState([]);
    const [priceTo, setPriceTo] = useState('');

    const [validity, setValidity] = useState(false)


    useEffect(() => {
        if (make.length != 0 && model.length != 0 && yearFrom.length != 0 && yearTo.length != 0 && priceFrom.length != 0 && priceTo.length != 0) {
            console.log('matched')
            setValidity(true);
        }
    })

    let modelOption = make ? models[make].map((item, index) => {
        return <option key={index}
                        
                        className={styles.modelOption}>{item}</option>
    }) : null
    

    useEffect(() => {
        for (let i=2023; i>=1960; i--) {
            setYearFromData(yearFromData => [...yearFromData, i])
            setYearToData(yearToData => [...yearToData, i])
        }

        const priceData = [500, 1000, 1500, 2000, 2500, 5000, 10000, 15000, 20000];
    
        for (const price of priceData) {
            setPriceFromData(priceFromData => [...priceFromData, price])
            setPriceToData(priceToData => [...priceToData, price])
        }
    }, [] )


    const inputHandler = (event, id) => {
        
        switch(id) {
            case 'make':
                setMake(event.target.value);
                break;

            case 'model':
                const rawData = event.target.value;
                if (rawData.includes(' ')){
                    const split = rawData.split(' ').join('').toLowerCase()
                    setModel(split)
                }
                else {
                    setModel(event.target.value)
                }
                break;

            case 'year from':
                const yearFromIndex = yearFromData.findIndex(data => String(data) === event.target.value);
                setYearFromIndex(yearFromIndex);
                setYearFrom(event.target.value)
                break;

            case 'year to':
                setYearTo(event.target.value);
                break;

            case 'price from':
                const priceFromIndex = priceFromData.findIndex(element => String(element) === event.target.value)
                setPriceFromIndex(priceFromIndex);
                setPriceFrom(event.target.value)
                break;

            case 'price to':
                setPriceTo(event.target.value)
                break;
        }
    }

    const yearFromOption = yearFromData.map((yearFrom, index) => <option key={index}>{yearFrom}</option>)

    const yearToOption = yearToData.slice(0, yearFrom === '2023' ? yearFromIndex + 1 : yearFromIndex).map((yearTo, index) => <option key={index}>{yearTo}</option>)

    const priceFromOption = priceFromData.map((priceFrom, index) => <option key={index}>{priceFrom}</option>)

    const priceToOption = priceToData.slice(priceFromIndex, priceToData.length) .map((priceTo, index) => <option key={index}>{priceTo}</option>)

    const searchForCars = (event) => {
        event.preventDefault();
        navigate(`/searchResult/${make}/${model}/${yearFrom}/${yearTo}/${priceFrom}/${priceTo}`);
    }
    

    return (
        <div className={styles.Main}>
            <div className={styles.BackgroundPic}>

            </div>

            <div className={styles.TableMain}>
                <table data-aos="zoom-in-up">
                    <tbody>
                        <tr>
                            {Object.keys(models).map(item => {
                                return <td key={item} className={styles.table}>
                                        <Link to={`/displayItem/${item}`} className={styles.itemLink}>
                                            <img src={modelPic[item.toLowerCase()]} alt={item}/>
                                            <p style={{textTransform: 'capitalize'}}>{item === 'AlfaRomeo' ? 'Alfa Romeo' : item}</p>
                                        </Link>
                                    </td>
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>

            <form className={styles.Search}>
                <div className={styles.Input}>
                    <div className={styles.Groups}>
                        <div className={styles.SubGroup}>
                            <label htmlFor="make">Make</label>
                            <select id="make" onChange={(event) => inputHandler(event, 'make')} defaultValue="Make">
                                <option disabled>Make</option>
                                {makeOption}
                            </select>
                        </div>

                        <div className={styles.SubGroup}>
                            <label htmlFor="model">Model</label>
                            <select id="model" onChange={(event) => inputHandler(event, 'model')} defaultValue="Model">
                                <option disabled>Model</option>
                                {modelOption}
                            </select>
                        </div>
                    </div>

                    <div className={styles.Groups}>
                        <div className={styles.SubGroup}>
                            <label htmlFor="year-from">Year From</label>
                            <select id="year-from" onChange={(event) => inputHandler(event, 'year from')} defaultValue="Year From">
                                <option disabled>Year From</option>
                                {yearFromOption}
                            </select>
                        </div>

                        <div className={styles.SubGroup}>
                            <label htmlFor="year-to">Year To</label>
                            <select id="year-to" onChange={(event) => inputHandler(event, 'year to')} defaultValue="Year To">
                                <option disabled>Year To</option>
                                {yearToOption}
                            </select>
                        </div>
                    </div>

                    <div className={styles.Groups}>
                        <div className={styles.SubGroup}>
                            <label htmlFor="price-from">Price From</label>
                            <select id="price-from" onChange={(event) => inputHandler(event, 'price from')} defaultValue="Price From">
                                <option disabled>Price From</option>
                                {priceFromOption}                                
                            </select>
                        </div>

                        <div className={styles.SubGroup}>
                            <label htmlFor="price-to">Price To</label>
                            <select id="price-to" onChange={(event) => inputHandler(event, 'price to')} defaultValue="Price To">
                                <option disabled>Price To</option>
                                {priceToOption}
                            </select>
                        </div>
                    </div>
                </div>

                <button className={validity ? styles.Btn : styles.BtnDisabled}
                        disabled={!validity ? true : false}
                        onClick={searchForCars}
                        >Search
                        </button>
            </form>
        </div>
    )
}


export default HomePage;
