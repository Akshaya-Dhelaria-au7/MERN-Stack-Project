const {body} = require('express-validator')

const categoryValidation = [
    body('Category')
        .not()
        .isEmpty()
        .withMessage('Category cannot be left empty'),
    body('Title')
        .not()
        .isEmpty()
        .withMessage('Title cannot be left empty'),
    body('Link')
        .not()
        .isEmpty()
        .exists()
        .withMessage('Link already exists')
        .isURL({
            protocols:['http','https','ftp'],
            require_protocol:true,
            require_tld:true,
            message:"Must be a valid URL"
        })
        .withMessage('Please enter a valid URL')
]

module.exports = categoryValidation