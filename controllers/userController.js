const mongoose = require('mongoose');
const UserModel= require('../models/user');
const AuthModel = require('../models/auth');
const shortId= require('shortid');
const tokenLib = require('../libs/tokenlib');
const validateInput = require('../libs/paraValidlib');
const check = require('../libs/checklib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerlib');

const passwordLib = require('../libs/passwordlib');
const time= require('../libs/timeLib');


let signUpFunction = (req,res)=>{
    let validateUserInput = ()=>{
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not met the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, "Password parameter is missing", 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })

    }
    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        let newUser = new UserModel({
                            userId: shortId.generate(),
                            email: req.body.email.toLowerCase(),
                            username:req.body.username,
                            password: passwordLib.hashpassword(req.body.password),
                        
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// 


let generateToken = (userDetails) => {
    console.log("generate token");
    return new Promise((resolve, reject) => {
        tokenLib.generateToken(userDetails, (err, tokenDetails) => {
            if (err) {
                console.log(err)
                let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                reject(apiResponse)
            } else {
                tokenDetails.userId = userDetails.userId
                tokenDetails.userDetails = userDetails
                resolve(tokenDetails)
            }
        })
    })
}
let saveToken = (tokenDetails) => {
    console.log("save token");
    return new Promise((resolve, reject) => {
        AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
            if (err) {
                console.log(err.message, 'userController: saveToken', 10)
                let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                reject(apiResponse)
            } else if (check.isEmpty(retrievedTokenDetails)) {
                let newAuthToken = new AuthModel({
                    userId: tokenDetails.userId,
                    authToken: tokenDetails.token,
                    tokenSecret: tokenDetails.tokenSecret,
                    tokenGenerationTime: time.now()
                })
                newAuthToken.save((err, newTokenDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'userController: saveToken', 10)
                        let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                        reject(apiResponse)
                    } else {
                        let responseBody = {
                            authToken: newTokenDetails.authToken,
                            userDetails: tokenDetails.userDetails
                        }
                        resolve(responseBody)
                    }
                })
            } else {
                retrievedTokenDetails.authToken = tokenDetails.token
                retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                retrievedTokenDetails.tokenGenerationTime = time.now()
                retrievedTokenDetails.save((err, newTokenDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'userController: saveToken', 10)
                        let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                        reject(apiResponse)
                    } else {
                        let responseBody = {
                            authToken: newTokenDetails.authToken,
                            userDetails: tokenDetails.userDetails
                        }
                        resolve(responseBody)
                    }
                })
            }
        })
    })
}


validateUserInput(req,res)
.then(createUser)
.then(generateToken)
.then(saveToken)
.then((resolve)=>{
    
    delete resolve.password
    let apiResponse = response.generate(false,'User Registered',200, resolve)
    res.send(apiResponse);
})
.catch((err)=>{
    console.log(err);
    res.send(err);
})


}

// start of login function 
let loginFunction = (req, res) => {

    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email}, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });
               
            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (retrievedUserDetails) => {
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
   

    findUser(req,res)
        .then(validatePassword)
        .then(generateToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}



// end of the login function 

module.exports = {
    signUpFunction:signUpFunction,
    loginFunction:loginFunction
}
