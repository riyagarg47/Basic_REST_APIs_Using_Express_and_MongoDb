const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const response = require('./../libs/responseLib')
const time = require('./../libs/timeLib')
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')

//importing the model here
const ProductModel = mongoose.model('Product')

/**
 * function to get list of all products
 */
let getAllProducts = (req, res) => {
    ProductModel.find()
    .select('-_v, -_id')
    .lean()
    .exec((err, result) =>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'Product Controller : getAllProducts', 10)
            let apiResponse = response.generate(true, 'Failed to find product details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) { // handling 404 case
            logger.info('No Product Found', 'Product Controller: getAllProducts',7)
            let apiResponse = response.generate(true, 'No Product Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('All Products Found Successfully', 'Product Controller: getAllProducts', 5)
            let apiResponse = response.generate(false, 'All Product details Found', 200, result)
            res.send(apiResponse)
        }
    }) 
} // end get all products

/**
 * function to view a particular product
 */
let viewByProductID = (req, res) => {
    if (check.isEmpty(req.params.productID)) {

        console.log('productID should be passed')
        let apiResponse = response.generate(true, 'productID is missing', 403, null)
        res.send(apiResponse)
    } else{
        ProductModel.findOne({'productID' : req.params.productID}, (err, result) => {
            if (err) {
                console.log(err)
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) { // handling 404 case
                logger.info('No Product Found', 'Product Controller: viewByProductID',7)
                let apiResponse = response.generate(true, 'Product Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Product Found Successfully', 'Product Controller: viewByProductID', 5)
                let apiResponse = response.generate(false, 'Product Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
  }
} 


/**
 * function to edit a particular product
 */
let editProduct = (req, res) => {
    if (check.isEmpty(req.params.productID)) {

        console.log('productID should be passed')
        let apiResponse = response.generate(true, 'productID is missing', 403, null)
        res.send(apiResponse)
    } else{
        let options = req.body
        console.log(options)
        ProductModel.update({'productID' : req.params.productID}, options,{multi: true}).exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) { // handling 404 case
                logger.info('No Product Found', 'Product Controller: editProduct',7)
                let apiResponse = response.generate(true, 'Product Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Product Edited Successfully', 'Product Controller: editProduct', 5)
                let apiResponse = response.generate(false, 'Product Edited Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
  }
} 
/**
 * function to delete a product
 */
let deleteProduct = (req, res) => {
    if (check.isEmpty(req.params.productID)) {

        console.log('productID should be passed')
        let apiResponse = response.generate(true, 'productID is missing', 403, null)
        res.send(apiResponse)
    } else{
            ProductModel.remove({ 'productID': req.params.productID }, (err, result) => {
            if (err) {
                console.log(err)
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Product Found', 'Product Controller: deleteProduct',7)
                let apiResponse = response.generate(true, 'Product Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Product Deleted Successfully', 'Product Controller: deleteProduct', 5)
                let apiResponse = response.generate(false, 'Product Deleted Successfully.', 200, result)
                res.send(apiResponse)

            }
        })
  } 
}

/**
 * function to create a product
 */
let createProduct = (req, res) => {
    var today = time.now()
    let productID = shortid.generate()

    let newProduct =  new ProductModel({
        productID : productID,
        name : req.body.name,
        category : req.body.category,
        price : req.body.price,
        brand : req.body.brand,
        isInStock : true,
        numberOfPiecesAvailable : req.body.numberOfPiecesAvailable,
        addedOn : today
    })

    let sizes = (req.body.sizes != undefined && req.body.sizes != null && req.body.sizes != '')? req.body.sizes.split(',') : []
    newProduct.sizes = sizes

    newProduct.save((err, result) => {
        if (err) {
            console.log(err)
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured', 500, null)
            res.send(apiResponse)
        } else {
            logger.info('Product Created Successfully', 'Product Controller: createProduct', 5)
            let apiResponse = response.generate(false, 'Product Created Successfully.', 200, result)
            res.send(apiResponse)
        }
    })// end new product save
}

module.exports = {
    getAllProducts : getAllProducts,
    viewByProductID : viewByProductID,
    createProduct : createProduct,
    editProduct : editProduct,
    deleteProduct : deleteProduct
}