const express = require('express')
const mongoose = require('mongoose')
const response = require('./../libs/responseLib')
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')

//importing the model here
const CartModel = mongoose.model('Cart')
const ProductModel = mongoose.model('Product')

/**
 * function to get all products from cart
 */
let getAllProductsFromCart = (req, res) => {
    CartModel.find()
    .select('-_v, -_id')
    .lean()
    .exec((err, result) =>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'Cart Controller : getAllProductsFromCart', 10)
            let apiResponse = response.generate(true, 'Failed to find product details from cart', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) { // handling 404 case
            logger.info('No Product Found in cart', 'Cart Controller: getAllProductsFromCart',7)
            let apiResponse = response.generate(true, 'No Product Found in cart', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('All Products Found Successfully From Cart', 'Cart Controller: getAllProductsFromCart', 5)
            let apiResponse = response.generate(false, 'All Product details Found from cart', 200, result)
            res.send(apiResponse)
        }
    }) 
} // end get all products

/**
 * function to add a product to cart
 */
let addProductToCart = (req, res) => {
    ProductModel.findOne({'productID' : req.params.productID}, (err, result) => {

        let newCart =  new CartModel({
            productID : req.params.productID,
            name : req.body.name
        })

        newCart.save((err, result) => {
            if (err) {
                console.log(err)
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Failed to add product to cart', 500, null)
                res.send(apiResponse)
            } else {
                logger.info('Product Successfully added to Cart', 'Cart Controller: addProductToCart', 5)
                let apiResponse = response.generate(false, 'Product Successfully added to cart.', 200, result)
                res.send(apiResponse)
            }
        })// end new product save
    })
} 


/**
 * function to remove a product from cart
 */
let removeProductFromCart = (req, res) => {
    CartModel.remove({ 'productID': req.params.productID }, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Failed to remove product from cart', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Product Found in cart', 'Cart Controller: removeProductFromCart',7)
            let apiResponse = response.generate(true, 'No Product Found in cart', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('Product Successfully removed from Cart', 'Cart Controller: removeProductFromCart', 5)
            let apiResponse = response.generate(false, 'Product successfully removed from cart.', 200, result)
            res.send(apiResponse)

        }
    })
}


module.exports = {
    getAllProductsFromCart : getAllProductsFromCart,
    addProductToCart : addProductToCart,
    removeProductFromCart : removeProductFromCart
}