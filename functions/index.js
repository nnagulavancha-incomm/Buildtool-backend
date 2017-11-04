const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const applications = require('./src/api/applications');
const bodyParser = require('body-parser');

admin.initializeApp(functions.config().firebase);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/applications', applications);

exports.api = functions.https.onRequest(app);