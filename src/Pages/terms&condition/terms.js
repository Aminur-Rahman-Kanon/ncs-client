import React from "react";
import styles from './terms.module.css';

const terms = () => {


    return (
        <div className={StyleSheet.main}>
            <div className={styles.caution}>
                <h3>CAUTION: Never send any payment outside Japan or in the personal name. If you are getting any offer from unauthorised members from your inquiries on this site, please</h3>
                <button className={styles.cautionBtn}>Contact Us</button>
            </div>

            <div className={styles.terms}>
                <h2>Payment</h2>

                <div className={styles.para}>
                    <ol className={styles.lists}>
                        <li>No deposit is required before confirming any vehicle.</li>
                        <li>Full or partial payment is required within three days of confirmation via telegraphic transfer (TT).</li>
                        <li>Original Documents will be released and sent via COURIER SERVICE once the balance is paid in full.</li>
                        <li>Customers can pay in US Dollars, AUD or Japanese Yen</li>
                        <li>Customer must pay remaining balance within seven days from shipment date (Count from the shipment date). Otherwise, NIHON CHUKOSHA has right to re-sell without any notice and no claim will be accepted.</li>
                        <li>Price stated in the Proforma Invoice does not cover any Bank charges or additional charges payable to the Bank. Bank charges and any additional charges must be borne by the customer.</li>
                        <li>Customer must ensure that full amount stated in the Proforma Invoice will be received by NIHON CHUKOSHA.</li>
                    </ol>
                </div>
            </div>


            <div className={styles.liability}>
                <h2>Shipping</h2>

                <div className={styles.para}>
                    <ol className={styles.lists}>
                        <li>Shipping arrangements will be processed upon the receipt of the deposit.</li>
                        <li>Shipping cancellation is no accepted once vehicle/s passed Japanese Customs check.</li>
                        <li>Shipping duration is approximated. NIHON CHUKOSHA is not liable for any delays caused by shipping issues, origin and destination port authority issues and other reasons beyond NIHON CHUKOSHA control.</li>
                    </ol>
                </div>
            </div>

            <div className={styles.others}>
                <h2>Miscellaneous</h2>

                <div className={styles.para}>
                    <ol className={styles.lists}>
                        <li>Customers are expected to be aware of the import regulations and requirements before finalizing any transaction with NIHON CHUKOSHA.</li>
                        <li>NIHON CHUKOSHA does not provide services such as OIL and RADIATOR COOLANT refill. It is therefore recommended that once customers have received the vehicle/s at the port to check and refill, if necessary, at their own expense.</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default terms;
