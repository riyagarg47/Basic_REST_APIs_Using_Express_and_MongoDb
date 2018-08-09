const mongoose = require('mongoose')
//const Product = require("../models/Product");
const Schema =  mongoose.Schema;
//const ProductModel = mongoose.model('Product')

let cartSchema = new Schema(
    {
    
        productID : {
            type : String,
            unique : true
        },
        name : {
            type : String,
            default : ''
        }
    }
)
    
mongoose.model('Cart', cartSchema);