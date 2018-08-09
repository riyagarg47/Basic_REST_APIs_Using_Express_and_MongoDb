const mongoose = require('mongoose')
const Schema =  mongoose.Schema;

let productSchema = new Schema(
{

    productID : {
        type : String,
        unique : true
    },
    name : {
        type : String,
        default : ''
    },
    category : {
        type : String,
        default : ''
    },
    price : {
        type : Number,
        default : ''
    },
    brand : {
        type : String,
        default : ''
    },
    isInStock : {
        type : Boolean,
        default : true
    },
    sizes: [],
    numberOfPiecesAvailable : {
        type : Number,
        default : ''
    },
    addedOn : {
        type : Date,
        default : Date.now
    }
  }
)

mongoose.model('Product', productSchema);