const { trim, uniq } = require('lodash');
const mongoose =  require('mongoose');
const { type } = require('os');

// Define the  person sechema 

const personSchema = new mongoose.Schema({
    name  : {
        type :  String,
    required : true,
    trim : true
    },
    age : {
        type : Number,
        required : true,
        min : 0,

    },
    work : {
        type : String,
        required :  true,
        enum : ['Chef', 'Manager','worker']
    },
    mobile : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    }
})



// Create the person  model
const person = mongoose.model('Person', personSchema);
module.exports = person;