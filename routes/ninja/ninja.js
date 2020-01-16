const express = require('express')
const router = express.Router()
const Ninja = require('../../models/ninja')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

// find the details
router.get('/details/:id',async(req,res)=>{
    const ninja = await Ninja.findById(req.params.id)
    res.render('addNinja/edit.ejs',{
        Ninja : ninja
    })
})
// edit link
router.get('/edit/:id',async(req,res)=>{
    const ninja = await Ninja.findById(req.params.id)
    res.render("addNinja/edit.ejs",{Ninja: ninja })
})
//Update a ninja in the db
router.put('/update/:id',async(req,res,next)=>{

    try{
        await Ninja.findByIdAndUpdate({_id : req.params.id },req.body)
        const ninja = await Ninja.findOne({_id:req.params.id})
        console.log(ninja)
        res.send(ninja)
    }catch{
        next()
    }

})

//Delete a ninja from the db
router.delete('/delete/:id',async(req,res,next)=>{
    console.log("request recived")
    console.log(req.params.id)
    try{
        const ninja = await Ninja.findByIdAndRemove({
            _id:req.params.id
        })
        res.render('index.ejs')
    }catch{
        next()
    }

})

module.exports= router