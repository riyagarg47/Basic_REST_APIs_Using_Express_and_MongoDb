const express = require('express')
const productController = require('./../Controllers/productController')
const appConfig = require('./../Config/appConfig')


let setRouter = (app) =>{
   
    let baseUrl = appConfig.apiVersion + '/products'

    app.get(baseUrl + '/all', productController.getAllProducts)

    /**
     * @api {get} /api/v1/products/all Get all products
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
						name: "string",
						category: "string",
						price: number,
						brand: "string",
						isInStock: boolean,
                        sizes: object(type = array),
                        numberOfPiecesAvailable : number,
						addedOn: "date"
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

    app.get(baseUrl +'/view/by/:productID', productController.viewByProductID)

    /**
     * @api {get} /api/v1/products/view/by/:productID Get a particular product
     * @apiVersion 0.0.1
     * @apiGroup read   
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
						name: "string",
						category: "string",
						price: number,
						brand: "string",
						isInStock: boolean,
                        sizes: object(type = array),
                        numberOfPiecesAvailable : number,
						addedOn: "date"
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


    app.post(baseUrl +'/:productID/delete', productController.deleteProduct)

    /**
     * @api {post} /api/v1/products/:productID/delete Delete a particular product by productID
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


    app.put(baseUrl +'/:productID/edit', productController.editProduct)

    /**
     * @api {put} /api/v1/products/:productID/edit Edit a particular product
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
						name: "string",
						category: "string",
						price: number,
						brand: "string",
						isInStock: boolean,
                        sizes: object(type = array),
                        numberOfPiecesAvailable : number,
						addedOn: "date"
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


    app.post(baseUrl +'/create', productController.createProduct)

    /**
     * @api {post} /api/v1/products/create Create a product
     * @apiVersion 0.0.1
     * @apiGroup create   
     * 
     * @apiParam {String} name the product name should be passed as the body parameter
     * @apiParam {String} category the product category should be passed as the body parameter
     * @apiParam {Number} price the product price should be passed as the body parameter
     * @apiParam {String} brand the product brand should be passed as the body parameter
     * @apiParam {Boolean} isInStock the product stock status should be passed as the body parameter
     * @apiParam {Array} sizes the product sizes should be passed as the body parameter
     * @apiParam {Number} numberOfPiecesAvailable the number of available pieces of product should be passed as the body parameter
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
						name: "string",
						category: "string",
						price: number,
						brand: "string",
						isInStock: boolean,
                        sizes: object(type = array),
                        numberOfPiecesAvailable : number,
						addedOn: "date"
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