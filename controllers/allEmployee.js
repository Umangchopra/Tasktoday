var User = require('../models/allEmployee');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SmartHR');

// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, User) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "User retrieved successfully",
            data: User
        });
    });
};

// Handle create User actions
exports.new = function (req, res) {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.employeeID = req.body.employeeID;
    user.joinDate = req.body.joinDate;
    user.company = req.body.company;    
    user.designation = req.body.designation;
    user.phone = req.body.phone;
    user.holidays = req.body.holidays;
    

    // save the User and check for errors
    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            if (err.code == 11000)
                res.status(422).send(['employeeID or mobile number or email address cant be duplicate']);
            else
                return next(err);
        }
    })
}

// delete records from the database for all Employee
exports.delete = (req, res) => {
    req._id = req.body._id
    User.findByIdAndDelete(req._id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params._id
                });
            }
            console.log("here we go", req._id)
            res.send({
                message: "product name deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({

                    message: "product name not found...." + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete.... " + req.params.id
            });
        });
};

//update api for all employee data
exports.update = (req, res) => {
    // Validate Request
    if (!req.body._id) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    console.log("req.params._id", req.body._id);
    User.findOneAndUpdate(req.body._id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,  
            password: req.body.password,
            cPassword: req.body.cPassword,
            employeeID: req.body.employeeID,
            joinDate: req.body.joinDate,
            company: req.body.company,
            designation: req.body.designation,
            phone: req.body.phone
        }, {
            new: true
        })
        .then(_id => {
            if (!_id) {
                return res.status(404).send({
                    message: "User not found with id " + req.params._id
                });
            }
            res.send(_id);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params._id
            });
        });
};

// search api  for first name || Designation || Employee Id
exports.search = (req, res) => {
    p = req.body.firstName;
    q = req.body.designation;
    r = req.body.employee_id;

    console.log(q)
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db, req) {
        if (err) throw err;
        var dbo = db.db("SmartHR");
        dbo.collection("allemployees").find({
            firstName: {
                $regex: new RegExp(p)
            },
            designation: {
                $regex: new RegExp(q)
            },
            employee_id: {
                $regex: new RegExp(r)
            },

        }).toArray(function (err, result) {
            console.log(q, "data here")
            if (err) throw err;
            res.json(result);
            console.log(result);
            db.close();
        });
    });
}

//sort all the data
exports.sortasec = (req, res) => {

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db, req) {
        if (err) throw err;
        var dbo = db.db("SmartHR");
        //Sort the result by name:
        var sort = {
            firstName: 1
        };
        dbo.collection("allemployees").find().sort(sort).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
            console.log(result);
            db.close();
        });
    });
}

exports.sortdesc = (req, res) => {

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db, req) {
        if (err) throw err;
        var dbo = db.db("SmartHR");
        //Sort the result by name:
        var sort = {
            firstName: -1
        };
        dbo.collection("allemployees").find().sort(sort).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
            console.log(result);
            db.close();
        });
    });
}

// dbo.collection("allemployees").find({designation:{$regex: new RegExp(q)}}).toArray(function(err, result) {