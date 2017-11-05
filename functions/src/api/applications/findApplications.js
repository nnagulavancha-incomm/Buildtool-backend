/*
 * @Author: Naresh Kumar Nagulavancha 
 * @Date: 2017-11-04 02:38:12 
 * @Last Modified by: Naresh Kumar Nagulavancha
 * @Last Modified time: 2017-11-04 23:50:48
 */

const admin = require('firebase-admin');

module.exports = (req, res) => {

    const appName = req.params.app;
    // firestore database
    const db = admin.firestore().collection('applications');

    if (appName) {
        db.doc(appName).get()
            .then(doc => {
                if(!doc.exists){
                    res.status(404).send('No document found');
                }
                else {
                    res.send(doc.data());
                }
            })
            .catch(error => res.status(500).send(error));
    } else {
        var docs = [];
        db.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    docs.push(doc.data());
                });
                res.send(docs);
            }
            )
            .catch(error => res.status(500).send(error));
    }
};