/*
 * @Author: Naresh Kumar Nagulavancha 
 * @Date: 2017-11-04 02:38:30 
 * @Last Modified by: Naresh Kumar Nagulavancha
 * @Last Modified time: 2017-11-04 03:05:09
 */


var express = require('express');
var applicationRouter = express.Router();
var multer  = require('multer');
var upload = multer();

var createApplication=require('./createApplication');
var findAllApplications=require('./findApplications');
var deleteApplication=require("./deleteApplication");
var updateApplication=require("./updateApplication");
var uploadAssets=require('./uploadAssets');
var createSpace = require('./createSpace');

applicationRouter.post("/",createApplication);
applicationRouter.get("/",findAllApplications);
applicationRouter.delete("/:appID",deleteApplication);
applicationRouter.put("/:appID", updateApplication);
applicationRouter.post("/:appID/upload/:assetName/type/:assetType", upload.array('Asset'), uploadAssets);
applicationRouter.post("/createSpace",  createSpace);

module.exports = applicationRouter;
