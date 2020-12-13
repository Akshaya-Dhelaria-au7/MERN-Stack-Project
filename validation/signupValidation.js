const {body} = require('express-validator')

const signup = [
    body('Name')
        .not()
        .isEmpty()
        .isLength({
            min:6,
            max:256
        })
        .withMessage("Name should be minimum 6 characters"),

    body('Email')
        .exists()
        .withMessage('')
        .isEmail()
        .withMessage('Please enter your email'),

    body('Password')
        .not()
        .isEmpty()
        .isLength({
            min:5,
            max:256
        })
        .withMessage('Password should contain minimum 5 characters')
]

const login  = [
    body('Email')
        .exists()
        .withMessage('This email already exists')
        .isEmail()
        .withMessage('Please enter your email'),
        
    body('Password')
        .not()
        .isEmpty()
        .isLength({
            min:5,
            max:256
        })
        .withMessage('Password should contain minimum 5 characters')
]

module.exports = {signup,login}