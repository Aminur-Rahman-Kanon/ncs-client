import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';


const firebaseConfigStorage = {
    apiKey: "AIzaSyCdbSm5ySYxXod1Nf4GA608fTjOiQKfQws",
    authDomain: "nihon-chuko-sha-2cc33.firebaseapp.com",
    projectId: "nihon-chuko-sha-2cc33",
    storageBucket: "nihon-chuko-sha-2cc33.appspot.com",
    messagingSenderId: "651628671773",
    appId: "1:651628671773:web:49bc6114e4302725bb67f4"
};

const firebaseConfig = {
    apiKey: "AIzaSyA0yz6dU1Xf5hPrvnM91wPQXdBTGyzNvqU",
    authDomain: "models-8f32e.firebaseapp.com",
    projectId: "models-8f32e",
    storageBucket: "models-8f32e.appspot.com",
    messagingSenderId: "644600265613",
    appId: "1:644600265613:web:c48debd7f67b4f677e5bc4"
};


const storageApp = initializeApp(firebaseConfigStorage, 'storageApp');
const databaseApp = initializeApp(firebaseConfig, 'databaseApp');

export const storage = getStorage(storageApp);
export const database = getDatabase(databaseApp);
