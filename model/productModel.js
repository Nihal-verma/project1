const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productImage:{
       type:Array
    
    },
    description:{
        type:String,
        required:true
    },
    pdf:{
        type:Array
     
    },
    front_image:{
        type:Array
    }
})
const productData = new mongoose.model("productData",productSchema)
module.exports = productData