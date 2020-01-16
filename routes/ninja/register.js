const express = require('express')
const router = express.Router()
const Ninja = require('../../models/ninja')
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
mongoose.set('useFindAndModify', false)

//add a new ninja page
router.get('/',(req,res)=>{
    console.log("register recieved")
    res.render('addNinja/register.ejs',{Ninja : new Ninja()})
})

//Add a new ninja to the db
router.post('/',async(req,res,next)=>{
    
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    try{
        const ninja = await new Ninja({
            name : req.body.name,
            email: req.body.email,
            password: hashedPassword,
            rank : req.body.rank,
            available : req.body.availability,
            geometry : {
                coordinates: [parseFloat(req.body.lon),parseFloat(req.body.lat)]
            }
        })
        ninja.save()
        // res.send("Ninja Created")
        res.render('addNinja/login.ejs')
            
    }catch{
        next()
    }

})

module.exports= router