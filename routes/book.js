const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

router.get('/',(req,res)=>{
    res.render("bookNinja/book.ejs",{ninjas : null})
})
//Get a list of ninjas from the db
let ninjas
// router.get('/ninjaMap',async(req,res,next)=>{
//     console.log("request recieved ninjaMap")
//     ninjas= await ninjaList(req.query.lat,req.query.lon)
//     await res.json(ninjas)
// })
router.get('/ninjaList',async(req,res,next)=>{
    
    try {
        if(req.query.lat!=null && req.query.lon!= null ){
            console.log("request recieved ninjaList")
            let data= await ninjaList(req.query.lat,req.query.lon)
            ninjas = await res.json(data)
            console.log(ninjas)
            res.render("bookNinja/book.ejs",{
            ninjas: ninjas
            })
        }
    } catch(error)  {
        console.log(error)
    }
        
})
async function ninjaList(lat,lon){
    const ninjaList= await Ninja.aggregate([{
        $geoNear:{
            near:{
                type:"Point",
                coordinates:[parseFloat(lat),parseFloat(lon)]
            },
        distanceField:"dist.calculated",
        maxDistance: 10000000,
        spherical:true 
        }
    }])
    return ninjaList
}
module.exports= router