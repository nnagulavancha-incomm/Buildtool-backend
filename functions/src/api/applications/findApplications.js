/*
 * @Author: Naresh Kumar Nagulavancha 
 * @Date: 2017-11-04 02:38:12 
 * @Last Modified by:   Naresh Kumar Nagulavancha 
 * @Last Modified time: 2017-11-04 02:38:12 
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

module.exports = (req, res) => {
    var app = JSON.stringify(req.body);
    res.send('Findapplications executed');
};