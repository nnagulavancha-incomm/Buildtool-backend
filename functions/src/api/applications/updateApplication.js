/*
 * @Author: Naresh Kumar Nagulavancha 
 * @Date: 2017-11-04 02:58:37 
 * @Last Modified by: Naresh Kumar Nagulavancha
 * @Last Modified time: 2017-11-05 01:44:52
 */

var admin = require('firebase-admin');

module.exports = (req, res) => {
    let appName = req.params.app;
    let body = req.body;

    var ref = admin.firestore().collection('applications').doc(appName);
    
    if(body.cmsNameChanged) {
        
        ref.get()
            .then(a => {
                var app = a.data();
                var tempAssets = app.assets;
                tempAssets = tempAssets.filter(e => {
                    return e.name === "UatAES" || e.name === "ProdAES";
                });
                app.assets = tempAssets;
                ref.update(app);
            })
            .catch(error => console.error(error));
    }

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