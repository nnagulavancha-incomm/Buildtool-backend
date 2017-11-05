/*
 * @Author: Naresh Kumar Nagulavancha 
 * @Date: 2017-11-04 02:58:37 
 * @Last Modified by: Naresh Kumar Nagulavancha
 * @Last Modified time: 2017-11-05 01:26:55
 */

var admin = require('firebase-admin');

module.exports = (req, res) => {
    let appName = req.params.app;
    let body = req.body;

    let app = {
        author: body.author,
        name: body.name,
        version: body.version,
        uatAnalyticsId: body.uatAnalyticsId,
        prodAnalyticsId: body.prodAnalyticsId,
        mobileAppUat: body.mobileAppUat,
        mobileAppProd: body.mobileAppProd,
        mobileAppCmsId: body.mobileAppCmsId,
        updatedDate: new Date(),
        isAvailableForUse: body.isAvailableForUse,
        androidBundleId: body.androidBundleId,
        iosBundleId: body.iosBundleId
    };
    var ref = admin.firestore().collection('applications').doc(appName);
    ref.update(app)
        .then(() => {
            ref.get()
                .then(a => {
                    if(a.exists){
                        res.status(200).send(a.data());
                    }
                })
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
};