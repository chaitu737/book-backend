process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let User = require('../models/user');


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let appConfig = require('../config/appConfig');


chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();           
        });        
    });

    describe('/POST signup',()=>{
        it('it should register user with given fields',(done)=>{
            let user= {
                email:"email@gmail.com",
                password:"santhu",
                username:"santhu",
                
            }
            chai.request('http://localhost:3000/api/v1/users')
            .post('/signup')
            .send(user)
            .end((err,res)=>{
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('data')
                .which.is.an('object')
                .and.has.property('authToken');
                res.body.should.have.property('message').eql('User Registered');
                done();
  
            })
        })
    });
  
    

})