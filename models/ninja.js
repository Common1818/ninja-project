const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create geolocation schema
const GeoSchema= new Schema({
    type:{
        type:String,
        default:"Point"
    },
    coordinates:{
        type:[Number],
        index:"2dsphere"
    }
})

//create ninja Schema & model
const NinjaSchema = new Schema({
    name:{
        type:String,
        required: [true,'Name feild is required']
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    rank:{
        type:String,
    },
    available:{
        type:Boolean,
        default: false
    
    },
    geometry:{
        type:GeoSchema
    }
})
     //model               //collection
const Ninja = mongoose.model('ninja',NinjaSchema)

module.exports=Ninja