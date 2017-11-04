/*
 * @Author: Naresh Kumar Nagulavancha 
 * @Date: 2017-11-04 03:09:14 
 * @Last Modified by: Naresh Kumar Nagulavancha
 * @Last Modified time: 2017-11-04 03:14:04
 */

 var buildRouter = require('express').Router();

 var createBuild=require('./createBuild');
 var findBuilds = require('./findBuilds');
 var updateBuild = require('./updateBuild');
 var validateBuild = require('./validateBuild');

 buildRouter.post("/",createBuild);
 buildRouter.get("/",findBuilds);
 buildRouter.put("/:buildId", updateBuild);
 buildRouter.post("/validate", validateBuild);
 
 module.exports=buildRouter;
 

 