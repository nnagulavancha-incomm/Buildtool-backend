/*
 * @Author: Naresh Kumar Nagulavancha 
 * @Date: 2017-11-04 02:38:51 
 * @Last Modified by: Naresh Kumar Nagulavancha
 * @Last Modified time: 2017-11-05 00:54:45
 */

const admin = require('firebase-admin');

module.exports = (req, res) => {
    const appName = req.params.app;
    admin.firestore().collection('applications').doc(appName).delete()
        .then(() => res.status(200).send('success'))
        .catch(error => res.status(500).send(error));
};