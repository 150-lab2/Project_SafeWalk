import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    //sdk configuration not posted on git
};

const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);

module.exports.db = db;