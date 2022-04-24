
const mongoose = require('mongoose');//third party --for connecting with mongodb
const express = require('express');//third party
const bodyParser =require('body-parser');//core module

const app=express();


mongoose.connect('mongodb://127.0.0.1:27017/batch19d',{
    useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology : true
})

const User=mongoose.model('User',{
    username:{
        type:String

    },
    address:{
        type:String
    }
})



const data=new User({username:'Singh',address:'Patan'})
data.save();


app.listen(90);