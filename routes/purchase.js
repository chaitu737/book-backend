const express = require('express');
const Router = express.Router();
const appConfig = require('../config/appConfig');
const bookController = require('../controllers/bookController');
const purchaseController = require('../controllers/purchaseController');
 
const bookSchema = require('../models/book');

module.exports.setRouter=(app)=>{
    let baseUrl = `${appConfig.apiVersion}/books`;


    app.post(`${baseUrl}/purchase`,  purchaseController.PurchaseABook );
    

    
}