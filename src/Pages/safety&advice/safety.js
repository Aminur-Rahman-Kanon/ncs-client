import React from 'react';
import inspect from '../../Assets/inspect.png';
import caution from '../../Assets/caution.png';
import bank from '../../Assets/bank.jpg';
import search from '../../Assets/search.png';
import clipboard from '../../Assets/clipboard.png';
import howToBuy from '../../Assets/howTobuy.png'
import portal from '../../Assets/websites_main.jpg';
import scamer from '../../Assets/scamer.png';
import trap from '../../Assets/money_trap.png';
import terms from '../../Assets/terms2.png';
import styles from './safety.module.css';

const safety = () => {
    return (
        <div className={styles.Main}>
            <div className={styles.intro}>
                <h2>Safety Tips To Avoid Fraud and Scams</h2>
                <img src={caution} alt="caution" style={{height: '150px', width: '150px'}}/>
                <div className={styles.para}>
                    <p>Japan is known for its quality, durability, technology and trust. Mostly all Japan Used Cars Exporters or Dealers are doing business since long and have good reputation in market. But there are few cons and scammers due to which all Japanese Dealer community gets challenged.</p>
                    <p>In Used Car market it is very evident to fall a prey to low prices and wrong vehicles. We are listing some of the best safety tips that are very useful to avoid fraud while purchasing a used car from Japan. Be Alert! Before you get scammed or cheated.</p>
                </div>
            </div>

            <div className={styles.displayMain}>
                <div className={styles.display}>
                    <img src={howToBuy} alt="how to buy car"/>
                    <div className={styles.details}>
                        <h3>How You Should Order !</h3>
                        <p>Always order single unit, If you are dealing for the first time. It is never recommended to order many units from an unknown dealer, you may find yourself in a trap and end up in big loss.</p>
                        <ol>
                            <li>Check your countries import regulations, duties and taxes to calculate the final car price.</li>
                            <li>Check freight rates applied by the seller, sometimes the freight are charged higher than the current rates.</li>
                            <li>Ocean Freight rates keep changing, so try to take the best rate possible.</li>
                            <li>Check for the Marine Insurance to be on safer side.</li>
                            <li>Confirm for any extra cost other then FOB, Freight and Insurance from the Dealer.</li>
                            <li>Check about the pre-inspection of car and Required Inspection in your destination country.</li>
                            <li>Check Vehicle Inspection sheet carefully. Ask for the translated inspection sheet from Sellers in language that you understand.</li>
                            <li>Take Free Quotes from different Dealers to get the best deal. Compare the offer with market price if you find it too low, avoid making any transaction till you are completely satisfied.</li>
                            <li>Take your time to research about the Seller, do not make any transaction in hurry even if the seller is pushing you.</li>
                        </ol>
                        <p>Always feel free to ask us before making any payment.</p>
                    </div>
                </div>

                <div className={styles.display}>
                    <div className={styles.details}>
                        <h3>Vehicles Are 100% Inspected</h3>
                        <p>We maintain the Inspection process for stock vehicle units and in Japan Auction they also maintain Inspection protocol, but we also recheck through our inspection team, and for the countries where there are Inspection rules before shipment, we follow up that policies and in case of any problem we also solve that by useing our company workshop and ready the vehcile for shipment. we also send the inspection documents via courier in terms of clearnece in clients given port(policy countries).  so please avoid fraud or scamer those who don't introduce them regarding Inspection protocols or don't go through this process.</p>
                    </div>
                    <img src={inspect} alt="Vehivle 100% inspected"/>
                </div>

                <div className={styles.display}>
                    <img src={clipboard} alt="Translated Auction Sheet"/>
                    <div className={styles.details}>
                        <h3>Translated Auction Sheet</h3>
                        <p>We help our client to assure the vehciles authenticity by the real Japan Auction Sheet, so that makes the deal transparent for clients to trust us, so please avoide the fraud and scamer regarding this to order, if they try to ignor about Auction Sheet.</p>
                    </div>
                </div>

                <div className={styles.display}>
                    <div className={styles.details}>
                        <h3>Complete Company Details or Existence</h3>
                        <p>Always try to collect and cross verify all possible details of used car exporters like company existence, postal address, information available on their website, email, telephone number.</p>
                        <p>To verify company existence, check company name, email, phone number online at different platforms, search company name on google and try to research about company. You can also dial a call on their registered phone number.</p>
                        <ol>
                            <li>Read their reviews available from former customers.</li>
                            <li>Check their social media accounts and pages.</li>
                            <li>Call on their phone number if they are reachable.</li>
                            <li>4 Check if they have membership with other companies</li>
                            <li>5 Try to verify their email address</li>
                            <li>Check if the postal address is available on google map</li>
                        </ol>
                    </div>
                    <img src={search} alt="auction" />
                </div>

                <div className={styles.display}>
                    <img src={portal} alt="portal"/>
                    <div className={styles.details}>
                        <h3>Used Car Auction Portal</h3>
                        <p>Try to ensure that the Company you are dealing with has a valid membership at Auction Houses.
                        which means the company has verified Account or membership to proof to you, if they don't have any then it is a fraud activity.
                        If you are dealing with a Exporter directly who is not member at any other platform, you are at a higher risk.
                        </p>
                        <p>Check certifications, reviews, membership type of information in their introduced informations.
                        Goodwill and brand value of the company in past years
                        Number of customers the company served from the established year.</p>
                    </div>
                </div>

                <div className={styles.display}>
                    <div className={styles.details}>
                        <h3>Low Price Trap</h3>
                        <p>Getting very low price offers for the used cars with nice images might be a trap. Practically it is impossible to source high quality, excellent condition cars in very low price. In many cases the vehicle is not available or the photos shared are of some other vehicle that is already sold or is available at high price. Make sure to check below points if you are offered a low price vehicle:</p>
                        <ol>
                            <li>Take as much as possible information like: Chassis number, Year, Accessories, etc., photos, videos of the vehicle as you can.</li>
                            <li>Check the Chassis Number on internet to see if the vehicle exists in reality or not. If you find other dealers advertising the same vehicle take quotes from them too. Sometimes the vehicle are present in the Auctions or Dealer's shared inventory which is accessible to all dealers.</li>
                            <li>Check Market price of the Vehicle with its Make, Model, Year and Grade. It will give you a idea about the vehicle's approximate price. If your offered price is too low from this market price then its surely a scam.</li>
                            <li>Take Free Quotes from the other Dealers for the similar type of vehicle to compare the offered price.</li>
                        </ol>
                    </div>
                    <img src={trap} alt="price trap"/>
                </div>

                <div className={styles.display}>
                    <img src={terms} alt="terms&condition"/>
                    <div className={styles.details}>
                        <h3>Terms & Condition</h3>
                        <p>Check all the terms and conditions of the company, available on their website or on the invoice shared with you during the deal. Go through the terms carefully regarding the Payment, Refunds,  Order Cancellation and Shipments in order to be secure from any frauds later on.</p>
                        <ol className={styles.termsLists}>
                            <li className={styles.termsList}>Read all the terms and conditions carefully.</li>
                            <li className={styles.termsList}>Check if you have any sales contracts or legal bindings with the Dealer.</li>
                            <li className={styles.termsList}>Understand all the taxes and deductions, if applicable on purchase and payments.</li>
                            <li className={styles.termsList}>Check if the company abide by the law of their country.</li>
                        </ol>
                    </div>
                </div>

                <div className={styles.display}>
                    <div className={styles.details}>
                        <h3>Company's Bank Account</h3>
                        <p>Always make sure that the Dealer gives you Bank details of his company in respective country from where he is exporting your vehicle. Never make any payment in a personal name or bank accounts in other countries.</p>
                        <p>For example: If you are buying a car from Japan, you should make payment in Dealers company bank account in Japan only. 
                        You should not make payment in individual/personal bank account or any bank account outside Japan. </p>
                    </div>
                    <img src={bank} alt="payment"/>
                </div>

                <div className={styles.display}>
                    <img src={scamer} alt="scamer"/>
                    <div className={styles.details}>
                        <h3>Non-Members</h3>
                        <p>NIHON CHUKOSHA never shares the inquiries with any Non-Members (not listed on our portal website). Also your contact details are not shared with the NCS (NIHON CHUKOSHA) Free Members also.</p>
                        <p>However, as we are forwarding the inquiry to hundreds of free, Premium & Gold members there might be some staff misusing the NCS inquiries and passing on to Non-Member dealers, it is difficult to track the source from where these inquiries are passed.</p>
                        <p>If you are buying used cars from NIHON CHUKOSHA.com, Do Not make payment to any non-NCS (NIHON CHUKOSHA) / individual person / members.
                        If you get any kind of offer from non-NCS (NIHON CHUKOSHA) member, always contact us to check the existence and reputation
                        of the company.</p>
                        <p>Contact us before making any payment, if you have any doubt or want to know the dealer credibility.</p>
                        <button className={styles.btn}>Contact Us</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default safety;
