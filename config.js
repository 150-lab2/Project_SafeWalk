const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


const serviceAccount = require('./serviceAccountKey.json');

var admin = require("firebase-admin");

initializeApp({
    //credential: cert(serviceAccount)
    credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();


module.exports = db;
