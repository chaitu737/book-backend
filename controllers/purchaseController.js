const shortId= require('shortid');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerlib');
const time= require('../libs/timeLib');
const check = require('../libs/checklib');
const UserModel = require('../models/user');
const BookModel = require('../models/book');
const PurchaseModel = require('../models/purchase');



let PurchaseABook = (req,res)=>{
  return new Promise((resolve, reject)=>{
    if(req.body.email){
        UserModel.findOne({email:req.body.email}).exec((err, result)=>{
            if(err){
                logger.error(err.message, 'purchaseController: purchaseabook', 10)
                let apiResponse = response.generate(true, 'Failed To Extract User', 500, null)
                reject(apiResponse)
            }else if(check.isEmpty(result)){
                logger.info('No User found', 'PurchaseController: purchaseAbook')
            let apiResponse = response.generate(true, 'Not Authorized to Buy the book', 404, null)
            res.send(apiResponse)
           }else{
               if(req.body.bookId){
                   BookModel.findOne({'bookId':req.body.bookId}).exec((err,result)=>{
                       if(err){
                        logger.error(err.message, 'purchaseController: purchaseabook', 10)
                        let apiResponse = response.generate(true, 'Failed To Extract Book', 500, null)
                        reject(apiResponse)
                       }else if(check.isEmpty(result)){
                        logger.info('No Book found', 'PurchaseController: purchaseAbook')
                        let apiResponse = response.generate(true, 'Not Book with given Id', 404, null)
                        res.send(apiResponse)

                       }else{
                        let newPurchase =new PurchaseModel({
                            bookId:req.body.bookId,
                            email:req.body.email
                        });
                        newPurchase.save((err, newPurchase)=>{
                            if(err){
                                console.log(err)
                logger.error(err.message, 'PurchaseController: purchaseabook', 10)
                let apiResponse = response.generate(true, 'Failed to Save transaction', 500, null)
                res.send(apiResponse)
            }else{
                let apiResponse = response.generate(false, 'Purchase Done successfully', 200, newPurchase)
                res.send(apiResponse)
            }
                        })
                       }
                   })
               }
           }
        })

   }
      
  })
    
    
}

module.exports = {
PurchaseABook:PurchaseABook    
}