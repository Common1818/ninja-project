const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")
const Ninja = require('../../../models/ninja')

//log in a ninja page
router.get('/',(req,res)=>{
   
    res.render('addNinja/login.ejs')
})
router.post('/enter',async(req,res,next)=>{
    // console.log('request recieved')
    const user = await Ninja.findOne({email:req.body.email})
    if (user== null){
        res.send('Cant find user')
    }else{
        try{
            const check = await bcrypt.compare(req.body.password, user.password)  
            console.log(user)
            console.log(check)
            console.log(req.body.password)
            console.log(user.password)
            if (check){
                res.render('addNinja/showNinja.ejs',{Ninja : user})
            }else{
                res.send("password is wrong")
            }
        }catch{
            next()
        }
    }
})


module.exports= router