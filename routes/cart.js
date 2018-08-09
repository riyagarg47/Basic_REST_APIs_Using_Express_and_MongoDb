const express = require('express')
const cartController = require('./../Controllers/cartController')
const appConfig = require('./../Config/appConfig')

let setRouter = (app) =>{
   
    let baseUrl = appConfig.apiVersion + '/cart'

    app.get(baseUrl + '/all', cartController.getAllProductsFromCart)

    /**
     * @api {get} /api/v1/cart/all Get all products from cart
     * @apiVersion 0.0.1
     * @apiGroup read   
     * 
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found",
	    "status": 200,
	    "data": [
					{
						productID: "string",
						name: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */


    app.post(baseUrl +'/:productID/remove', cartController.removeProductFromCart)

    /**
     * @api {post} /api/v1/cart/:productID/remove Remove a product from cart
     * @apiVersion 0.0.1
     * @apiGroup delete   
     * 
     * @apiParam {String} productID the productID should be passed as the URL parameter
     * 
     * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */


    app.put(baseUrl +'/:productID/add', cartController.addProductToCart)

    /**
     * @api {put} /api/v1/cart/:productID/add Add a product to cart
     * @apiVersion 0.0.1
     * @apiGroup edit   
     * 
     * @apiParam {String} productID the productID should be passed as the URL parameter
     * 
     * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found",
	    "status": 200,
	    "data": [
					{
						productID: "string",
						name: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */


}

module.exports = {
    setRouter : setRouter
}