const { validationResult } = require ('express-validator')

//Checking for the validation. If error occurs, it will send the error else the controller will move to next()
const validationResults = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(422).json({
        errors:errors.array()[0].msg
      })
    }
    next()
  }

module.exports = validationResults