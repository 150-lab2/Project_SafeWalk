const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


const serviceAccount = require('./serviceAccountKey.json');

var admin = require("firebase-admin");

initializeApp({
    //credential: cert(serviceAccount)
    credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();


const messaging = admin.messaging();

//this is the function to send message with the token to cloud messaging.
function sendFirebaseMessage(message) {
  return messaging.send(message);
}

module.exports = {
  sendFirebaseMessage,
  db,
};
