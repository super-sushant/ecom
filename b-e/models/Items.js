const mongoose=require('mongoose');
const Schema=mongoose.Schema

ItemSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    date_added:{
        type:Date,
        required:true,
        default:Date.now
    },
})
module.exports = Item =mongoose.model('item',ItemSchema)