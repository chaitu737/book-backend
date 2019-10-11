const express = require('express');
const Router = express.Router();
const appConfig = require('../config/appConfig');
const bookController = require('../controllers/bookController');
 const auth = require('../middlewares/auth');
const bookSchema = require('../models/book');

module.exports.setRouter=(app)=>{
    let baseUrl = `${appConfig.apiVersion}/books`;


    app.post(`${baseUrl}/create`, bookController.createBook );
    /**
  * @api {post} /api/v1/books/create Create book
  * @apiVersion 0.0.1
  * @apiGroup book
  *
  * @apiParam {String} title Title of the book. (body) (required)
  * @apiParam {String} description Description of book. (body) (required)
  * @apiParam {Number} price of the book. (body) (required)
  *
  * @apiSuccessExample {json} Success-Response:
  *    
  *   {
  *		"error": false,
  *		"message": "Book  Created successfully",
  *		"status": 200,
  *		"data":[
  *                {
  *                    "title": "String",
  *                    "price": "Number",
  *                    "description": "String",
  *                }
  *               ]
  *   }
  * @apiErrorExample {json} Error-Response:
  *
  * {
  *   "error": true,
  *   "message": "Failed to create new Issue",
  *   "status": 500,
  *   "data": null
  * }
  */
    app.get(`${baseUrl}/all`,   bookController.getAllBooks );
   /**
  * @api {get} /api/v1/books/all Get all books
  * @apiVersion 0.0.1
  * @apiGroup book
  *
  * @apiParam {String} authToken The authToken for authentication. (Send authToken as query params)
  * 
  * @apiSuccessExample {json} Success-Response:
  *    
  *   {
  *		"error": false,
  *		"message": "Book Details found",
  *		"status": 200,
  *		"data":[
  *                {
  *                    "title": "String",
  *                    "description": "String",
  *                    "price": "Number",
  *                    "bookId": "String"
  *                },
  *               .......
  *               ]
  *   }
  * @apiErrorExample {json} Error-Response:
  *
  * {
  *   "error": true,
  *   "message": "Failed To Find Book Details",
  *   "status": 500,
  *   "data": null
  * }
  */
    app.post(`${baseUrl}/delete/:id`,  bookController.deleteBook );

/**
  * @api {post} /api/v1/books/delete/:id Delete book by Id
  * @apiVersion 0.0.1
  * @apiGroup books
  *
  * @apiParam {String} authToken The authToken for authentication. (Send authToken as query params)
  * @apiParam {String} bookId The bookId of the issue. (params)
  * 
  * @apiSuccessExample {json} Success-Response:
  *    
  *   {
  *		"error": false,
  *		"message": "Successfully deleted Book",
  *		"status": 200,
  *		"data":[
  *                {
  *                    "title": "String",
  *                    "description": "String",
  *                    "price": "Number",
  *                    "bookId": "String"
  *                }
  *               ]
  *   }
  * @apiErrorExample {json} Error-Response:
  *
  * {
  *   "error": true,
  *   "message": "Failed To Delete Book",
  *   "status": 500,
  *   "data": null
  * }
  */
    
    

 app.get(`${baseUrl}/book/:id`,  bookController.getBookById );
 
 /**
  * @api {get} /api/v1/books/book/:id Get book by Id
  * @apiVersion 0.0.1
  * @apiGroup book
  *
  * @apiParam {String} bookId The bookId of the book. (params)
  * 
  * @apiSuccessExample {json} Success-Response:
  *    
  *   {
  *		"error": false,
  *		"message": "Book Details Found",
  *		"status": 200,
  *		"data":[
  *                {
  *                    "title": "String",
  *                    "description": "String",
  *                    "price": "Number",
  *                    "bookId": "String"
  *                }
  *               ]
  *   }
  * @apiErrorExample {json} Error-Response:
  *
  * {
  *   "error": true,
  *   "message": "Failed To Find Book Details",
  *   "status": 500,
  *   "data": null
  * }
  */

 

    
}