import React from "react";
import styles from './aboutUs.module.css';

const AboutUS = () => {

    return (
        <div className={styles.main}>
            <div className={styles.mission}>
                <h2>Our Mission</h2>
                <p>The mission of NiHON ChukoSha is to introduce every induvidual people along with dealers and brokers around the world with the whole Japanese Auction Houses and let them understand the capacity of Japanese auction Houses and it's felxibility and  facilities that assure, to have own dream car with the best quality at the reasonable price limit.</p>
            </div>

            <div className={styles.vision}>
                <h2>Our Vision</h2>
                <p>The vision of NiHON CHUKOSHA is to have branches in every country and make the clients as family and satisfy them with the service of  NiHON CHUKOSHA along with JAPAN.</p>
            </div>

            <div className={styles.overview}>
                <h2>Overview</h2>
                <p>NiHON CHUKOSHA  is a automobile trading company from Japan, where you can buy your requiered vehicle. We are providing our services to most of the countries around the world with our extensive experiences in the automotive field. We have wholesell services, retail services,workshop services,local transport services,local bulk based purchase services, all auction houses based purchase services,containers process services for cars,bikes,boats,buses,truckes,contruction mechinaries,heavy mechinaries,genatretors,and other facilities to provide best supports for our cliets with quality service from japan. Flexible payment method is another key point for our customers to come back to us in a repetitive manner. We have a very suitable payment plan for our customer to ensure maximum clarity and swift transaction. Moreover, we secure our shipping options as well to satisfy our clients . We always chose the best shipping companies to export our vehicles to our respective clients. Once a customer buys our automobile, it is sent to the customer in the shortest possible time through our smooth and prompt procedures.</p>
            </div>
        </div>
    )
}


export default AboutUS;
