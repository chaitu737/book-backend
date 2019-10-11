const shortId= require('shortid');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerlib');
const time= require('../libs/timeLib');
const BookModel = require('../models/book');
const check = require('../libs/checklib');


let getAllBooks = (req,res)=>{

    BookModel.find()
    .select('title price description')
    .exec((err, result)=>{
        if(err){
            console.log(err)
            logger.error(err.message, 'BookController: getAllBooks', 10)
                            let apiResponse = response.generate(true, 'Failed To Find Book Details', 500, null)
                            res.send(apiResponse)
        }else if(check.isEmpty(result)){
            logger.info('No Books found', 'BookController: getAllBooks')
            let apiResponse = response.generate(true, 'No Books found', 404, null)
            res.send(apiResponse)
        }else{
            let apiResponse = response.generate(false, 'All Book Details Found', 200, result);
            
            res.send(apiResponse);
        }
    })
};


let createBook = (req,res)=>{
    let newProduct = new BookModel({
                bookId:shortId.generate(),
                title:req.body.title,
                price:req.body.price,
                description:req.body.description
        })
           newProduct.save((err, newProduct)=>{
               if(err){
                console.log(err)
                logger.error(err.message, 'BookController: createBook', 10)
                let apiResponse = response.generate(true, 'Failed to create new Book', 500, null)
                res.send(apiResponse)
               }else{
                 let apiResponse = response.generate(false, 'Book Created successfully', 200, newProduct)
                res.send(apiResponse)
               }
           })
        };

 let getBookById = (req, res) => {
            BookModel.findOne({ bookId: req.params.id })
             .exec((err, result) => {
            
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'BookController: getSingleBook', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Book Details', 500, null)
                        res.send(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Book Found', 'BookController:getSingleBook')
                        let apiResponse = response.generate(true, 'No Book Found', 404, null)
                        res.send(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Book Details Found', 200, result)
                        res.send(apiResponse)
                    }
                })
        }// end get single Issue


let deleteBook =(req,res)=>{
    BookModel.findOneAndRemove({bookId:req.params.id}).exec((err,result)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'BookController: deleteBook', 10)
            let apiResponse = response.generate(true, 'Failed To delete Book', 500, null)
            res.send(apiResponse)
        }else if(check.isEmpty(result)){
            logger.info('No Book Found', 'BookController: deleteIssue')
            let apiResponse = response.generate(true, 'No Book Found', 404, null)
            res.send(apiResponse)
     }else{
            let apiResponse = response.generate(false, 'Deleted the Book successfully', 200, result)
            res.send(apiResponse)
        }
    })
}
    
module.exports = {
    getAllBooks:getAllBooks,
    createBook:createBook,
    getBookById:getBookById,
    deleteBook:deleteBook
    
}