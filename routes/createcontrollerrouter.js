//declare routes for Employee details (createController component)

const express = require('express');
const router = express.Router();

// (new) is for post data of add client button && (index) is for get data of AllEmployee
var createController = require('../controllers/allEmployee');
router.route('/createlogin')
    .post(createController.new)
    .get(createController.index)

//delete Employee records
var createController = require('../controllers/allEmployee');
router.route('/deletedata')
    .post(createController.delete)


//post for search with Employee id(search api) &&  get for getting result in ascending order
var createController = require('../controllers/allEmployee');
router.route('/searchdata')
    .post(createController.search)
    .get(createController.sortasec)

//here get for getting result in decending order
var createController = require('../controllers/allEmployee');
router.route('/searchdatadesc')
    .get(createController.sortdesc)

//update is for update records 
var createController = require('../controllers/allEmployee');
router.route('/updatecreatedata')
    .post(createController.update)

module.exports = router;
