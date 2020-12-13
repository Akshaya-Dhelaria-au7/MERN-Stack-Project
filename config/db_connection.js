const {connect} = require('mongoose')
var dotenv = require('dotenv')

dotenv.config({
    path:"./config/configure.env"
})

const db_connection = connect(process.env.mongo_url,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log("Connected to database"))
.catch((err) => console.log("Error while connecting to DB" , err))

module.exports =  db_connection;

