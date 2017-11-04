/*
 * @Author: Naresh Kumar Nagulavancha 
 * @Date: 2017-11-04 02:38:12 
 * @Last Modified by: Naresh Kumar Nagulavancha
 * @Last Modified time: 2017-11-04 14:31:08
 */

const admin = require('firebase-admin');

module.exports = (req, res) => {
    
    const appID = req.params.app;
    if(appID){
        admin.database().ref('/applications/' + appID).once("value", (data) => {
            res.status(200).send(data);
        }, (error) => {
            res.status(500).send(error);
        });
    } 
    else{
        admin.database().ref('/applications').once("value", (data) => {
            res.status(200).send(data);
        }, (error) => {
            res.status(500).send(error);
        }
    );
}};