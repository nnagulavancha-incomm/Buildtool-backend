const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')(({origin: true}));


// application APIS
const applications = require('./src/api/applications');
const builds = require('./src/api/builds');

admin.initializeApp(functions.config().firebase);

//Authentication

const authenticate = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      res.status(403).send('Unauthorized');
      return;
    }
    const idToken = req.headers.authorization.split('Bearer ')[1];
    admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
      req.user = decodedIdToken;
      next();
    }).catch(error => {
      res.status(403).send('Unauthorized');
    });
  };
  
//   app.use(authenticate);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);

app.use('/applications', applications);
app.use('/builds', builds);

exports.api = functions.https.onRequest(app);