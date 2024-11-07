const { trim, uniq } = require('lodash');
const mongoose =  require('mongoose');
const { type } = require('os');
const menuItemSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    price : {
        type : Number,
        require : true,
    }, 
    test : {
        type : String,
        require : true,
enum : ['Spicy', 'sweet', 'sour'],
        require : true
    },
    is_drink : {
        type : Boolean,
        default : false
    },
    ingredients : {
        type : [String],
        default : [],
    },
    num_sales : {
        type : Number,
        default : 0
    }
});
 const menuItem =  mongoose.model('MenuItem', menuItemSchema);
 module.exports = menuItem;