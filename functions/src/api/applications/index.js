var express = require('express');
var applicationRouter = express.Router();

var createApplication=require('./createApplication');
// var findAllApplications=require('./findApplications');
// var deleteApplication=require("./deleteApplication");
// var updateApplication=require("./updateApplication");
// var uploadAssets=require('./uploadAssets');
// var createSpace = require('./createSpace');

applicationRouter.post("/",createApplication);
// applicationRouter.get("/",findAllApplications);
// applicationRouter.delete("/:appID",deleteApplication);
// applicationRouter.put("/:appID/update", updateApplication);
// // applicationRouter.post("/:appID/upload/:assetName/type/:assetType", upload.array('Asset'), uploadAssets);
// applicationRouter.post("/createSpace",  createSpace);

module.exports = applicationRouter;
