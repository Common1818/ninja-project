// why do we have to use get request for rendering an href page now? why not when we made wheather here app and data selfies app nav bar ???// what is the difference between the app.get and router.get
const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

//requiring routes
const ninja = require('./routes/ninja/ninja')
const index = require('./routes/index')
const register = require('./routes/ninja/register')
const login = require('./routes/ninja/login/login')
const book = require('./routes/book')

//set up express app
const app = express()
mongoose.set('useFindAndModify', false)
app.set('view engine', 'ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(express.static('public'))

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 
 })
mongoose.Promise = global.Promise

app.use(express.json())
app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

//initialise routes
app.use('/',index)
app.use('/register',register)
app.use('/ninja', ninja)
app.use('/login', login)
app.use('/book', book)

//error handling
app.use((err,req,res,next)=>{
    res.status(422).send({error: err.message})
})

//listen for request
app.listen(process.env.port||3000,()=>{
    console.log("Listening for request")
})