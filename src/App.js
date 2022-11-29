import TopBar from './Pages/TopBar/TopBar';
import NavBar from './Pages/NavBar/NavBar';
import Footer from './Pages/Footer/Footer';
import HomePage from './Pages/Homepage/Homepage';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import HowToBuyFromAuction from './Pages/HowToBuyFromAuction/howToBuyFromAuction';
import HowToBuyParts from './Pages/howToBuyParts/howToBuyParts';
import Safety from './Pages/safety&advice/safety';
import Terms from './Pages/terms&condition/terms';
import RegisterMain from './Pages/Register/registerMain/registerMain';
import RegisterIndividual from './Pages/Register/registerIndividual/registerIndividual';
import RegisterTrader from './Pages/Register/registerTrader/registerTrader';
import Login from './Pages/login/login';
import ContactUs from './Pages/contactUs/contactUs';
import AboutUS from './Pages/aboutUs/aboutUs';
import Testimonial from './Pages/testimonial/testimonial';
import styles from './App.module.css';
import FeedBack from './Pages/feedBack/feddBack';
import { useState } from 'react';
import Profile from './Pages/profile/profile';
import DisplayItem from './Pages/displayItem/displayItem';
import DisplaySubItem from './Pages/displayItem/displaySubItem/displaySubItem';
import SearchResult from './Pages/searchResult/searchResult';
import facebook from './Assets/facebook.png';
import email from './Assets/email.png';
import twitter from './Assets/twitter.png';
import whatsapp from './Assets/whatsapp.png';
import ReactWhatsapp from 'react-whatsapp';
import sadFace from './Assets/sadFace.png';
import happyFace from './Assets/happyFace.png';
import DefaultRoute from './Pages/Others/defaultRoute/dafultRoute';

function App() {

  const [showContact, setShowContact] = useState(false);
  
  return (
    <div className={styles.App}>
      <BrowserRouter>
      <div className={styles.contactLink}>
        <div className={styles.bot} onMouseOver={() => setShowContact(true)} onMouseOut={() => setShowContact(false)}>
          <img src={sadFace} alt="nihon chuko sha" className={styles.sadFace} style={ !showContact ? {display: 'block'}: {display: 'none'}}/>
          <img src={happyFace} alt="nihon chuko sha" className={styles.happyFace} style={showContact ? {display: 'block'}: {display: 'none'}}/>
        </div>
        <div className={ showContact ? styles.contactGroupActive : styles.contactGroup}>
          <ReactWhatsapp number='+81 80-8997-4031' message="Hi, I need details information about the following car for auction" className={styles.whatsappContainer}>
            <img src={whatsapp} alt="whatsapp" className={styles.contactImg}/>
          </ReactWhatsapp>

          <Link to="https://facebook.com/nihon.chukosha" target="_blank" style={{textDecoration: 'none'}}>
            <img src={facebook} alt="facebook" className={styles.contactImg}/>
          </Link>
          <Link to="#" style={{textDecoration: 'none'}}>
            <img src={twitter} alt="twitter" className={styles.contactImg}/>
          </Link>
          <Link to="/contactus" style={{textDecoration: 'none'}}>
            <img src={email} alt="email" className={styles.contactImg}/>
          </Link>
        </div>
      </div>
        <TopBar />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route path='/searchResult/:make/:model/:yearFrom/:yearTo/:priceFrom/:priceTo' element={<SearchResult />} />
          <Route path='/displayItem/:itemId' element={<DisplayItem />}/>
          <Route path='/displayItem/:itemid/:modelName' element={<DisplaySubItem />}/>
          <Route path='/auction' element={<HowToBuyFromAuction />}/>
          <Route path='/auction/:search' element={<HowToBuyFromAuction />}/>
          <Route path='/auction/:make/:model/:yearTo' element={ <HowToBuyFromAuction /> }/>
          <Route path='/auction/:make/:model/:yearFrom/:yearTo/:priceFrom/:priceTo' element={ <HowToBuyFromAuction /> }/>
          <Route path='/parts' element={<HowToBuyParts />}/>
          <Route path='/safety&advice' element={<Safety />}/>
          <Route path='/terms&conditions' element={<Terms />}/>
          <Route path='/register' element={<RegisterMain />}/>
          <Route path='/register-individual' element={<RegisterIndividual />}/>
          <Route path='/register-trader' element={<RegisterTrader />}/>
          <Route path='/login' element={ <Login />} />
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/testimonial' element={<Testimonial />}/>
          <Route path='/feedback' element={<FeedBack />} />
          <Route path='/contactus' element={<ContactUs />}/>
          <Route path='/aboutus' element={<AboutUS /> } />
          <Route path="*" element={<DefaultRoute />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
