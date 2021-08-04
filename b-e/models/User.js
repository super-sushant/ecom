const mongoose =require('mongoose');
const schema = mongoose.Schema
const {isEmail}= require('validator');

const UserSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,'Please enter your Email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter a valid password'],
        minlength:[8,'Too small bitchass password']
    },
    registry_date:{
        type:Date,
        default:Date.now
    }
})
module.exports = User =mongoose.model('user',UserSchema)
