const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


const serviceAccount = require('./serviceAccountKey.json');

var admin = require("firebase-admin");

initializeApp({
    //credential: cert(serviceAccount)
    credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();


/*
const registrationToken = "";

const message = {
    notification: {
      title: 'Title of your notification',
      body: 'Body of your notification',
    },
    data: {
      key1: 'value1',
      key2: 'value2',
    },
    token: registrationToken, // Specify the FCM token here
  };

admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.error('Error sending message:', error);
  });
*/

module.exports = db;
