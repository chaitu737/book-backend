//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../models/book');

//Require the dev-dependencies
let chai = require('chai');
let shortId = require('shortid');
let chaiHttp = require('chai-http');
let server = require('../index');
let appConfig = require('../config/appConfig');
let should = chai.should();
let baseUrl = `${appConfig.apiVersion}/books`;



chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
    beforeEach((done) => { //Before each test we empty the database
        Book.remove({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /GET route
  */
  describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request('http://localhost:3000/api/v1/books')
            .get('/all')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  
              done();
            });
      });
  });

  describe('/POST book',()=>{
      it('it should post book with required fields',(done)=>{
          let book = {
              title:"some book",
              price:"499",
              description:"some random",
              
          }
          chai.request('http://localhost:3000/api/v1/books')
          .post('/create')
          .send(book)
          .end((err,res)=>{
              res.should.have.status(200);
              res.should.be.a('object');
              res.body.should.have.property('data')
              .which.is.an('object')
              .and.has.property('bookId');
              res.body.should.have.property('message').eql('Book Created successfully');
              done();

          })
      })
  });


 

});