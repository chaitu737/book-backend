const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController.js');
const appConfig = require('../config/appConfig');

module.exports.setRouter=(app)=>{
    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.


    app.post(`${baseUrl}/signup`, userController.signUpFunction);
     /**
    * @api {post} /api/v1/users/signup Signup
    * @apiGroup users
    * @apiVersion  1.0.0
    *
    * @apiParam {string} email Email of the user. (body params) (required)
    * @apiParam {string} password password of the user. (body params) (required)
    * @apiParam {string} username Username of the user. (body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    *     {
    *        "error": false,
    *        "message": "User created",
    *        "status": 200,
    *        "data": {
    *           "authToken": "String",
    *            "userDetails": {
    *            "email": "String",
    *            "username": "String",
    *            "userId": "String"
    *       }
    * 
    *    }
    * @apiErrorExample {json} Error-Response:
	*
	* {
	*   "error": true,
	*   "message": "Failed To Create User",
	*   "status": 500,
	*   "data": null
	* }
    */

        // params: email, password.

    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
	* @api {post} /api/v1/users/login Login
    * @apiVersion 0.0.1
    * @apiGroup users
	*
	* @apiParam {string} email email of the user. (body params) (required)
    * @apiParam {string} password password of the user. (body params) (required)
    *
	* @apiSuccessExample {json} Success-Response:
	*    
	*   {
	*		"error": false,
	*		"message": "Login Successful",
	*		"status": 200,
	*		"data":  {
    *                "authToken": "String",
    *                "userDetails": {
    *                    "email": "String",
    *                    "username": "String",
    *                    "userId": "String",
    *                }
	*   }
	*
	* @apiErrorExample {json} Error-Response:
	*
	* {
	*   "error": true,
	*   "message": "Error in Login",
	*   "status": 500,
	*   "data": null
	* }
	*/
 


}