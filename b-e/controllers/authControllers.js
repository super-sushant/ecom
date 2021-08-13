const User = require('../models/User');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup =(req,res)=>{
    const {name,email,password} = req.body;
    console.log(req.body)
    if(!name || !email || !password){
        res.status(400).json({msg:'Please enter the fields b!tch!1'})
    }
    User.findOne({email})
    .then(user =>{
        if(user) return res.status(400).json({msg:'user already exists b!tch'})
        const newUser = new User({name,email,password})
        bcrypt.genSalt(10,(err,hash)=>{
            bcrypt.hash(password,salt,(err,hash=>{
                if(err) throw err;
                newUser.password=hash
                newUser.save()
                .then(user=>{
                    jwt.sign(
                        {
                        id:user._id
                        },
                        config.get('jwtsecret'),
                        {expiresIn:3600},
                        (err,token)=>{
                            if(err) throw err
                            res.json({
                                token,
                                user:{
                                    id:user_id,
                                    name:user.name,
                                    email:user.email
                                }
                            })
                        }
                    )
                })
            }))
        })
    })
}

module.exports.login = async(req,res) =>{
    const{email,password}=req.body
    console.log(password)
    if(!email || !password){
        res.status(400).json({
            msg:'you forgot to enter the fields dumbass'
        })
    }
    User.findOne({email})
    .then(user=>{
        if(!user) return res.status(400).json({msg:"no such user dummy register first!"})
        bcrypt.compare(password,user.password)
        .then(isMatch=>{
            if(!isMatch) return res.status(400).json({msg:'password wrong numbnuts '})
            jwt.sign(
                {id:user._id},
                config.get('jwtsecret'),
                {expiresIn:3600},
                (err,token)=>{
                    if(err) throw err;
                    res.json({
                        token,
                        user:{
                            id:user._id,
                            name:user.name,
                            email:user.email
                        }
                    })
                }

            )


        })
    })
}
module.exports.get_user =(req,res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user=> res.json(user))
}
