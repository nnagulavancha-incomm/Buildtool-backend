const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest((request, response) => {

admin.database().ref('/applications').push(app).then(snapshot => {
    response.send(app);
}).catch(error => {
    response.status(500).send({'error': 'internal error in firebase'});
});
});
