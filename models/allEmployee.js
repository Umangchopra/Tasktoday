// Create setup.js
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

// Setup schema
var createSchema = new Schema({
    firstName: { type: String ,required:true},
    lastName:  { type: String,required:true },
    userName:  { type: String ,required:true},
    email:     { type: String,required:true ,unique:true},
    password:  { type: String,required:true },
    employeeID: { type: String,required:true,unique:true },
    joinDate: { type:[]},
    company: { type: String,required:true },
    designation: { type: String ,required:true},
    phone: { type: String,required:true,unique:true }
});

// Export Create model
var Create = module.exports = mongoose.model('allEmployee', createSchema);
module.exports.get = function (callback, limit) {
    Create.find(callback).limit(limit);
}

//hash password for password field
createSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;

            next();
        });
    });
});