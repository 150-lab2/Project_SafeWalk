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
const registrationToken = "dlHVpQTySfaR1isG4rfESz:APA91bHHNESe0X8k1wuymybY9m8GQviEJpGlle8V-12WEOHoVf0DnAA6A32QedVBIrrvtLm2M-cI6-I3q3RbGuImuXUVRc6UJGPs8yxcRWKuo4aP2_oTRve5DtTv5i5KwneZAt3zYLC8";

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
const messaging = admin.messaging();

function sendFirebaseMessage(message) {
  return messaging.send(message);
}

module.exports = {
  sendFirebaseMessage,
  db,
};
