
//const mongoose = require('mongoose');//third party --for connecting with mongodb
const express = require('express');//third party
const bodyParser =require('body-parser');//core module







const db=require('./database/db');
const user_route=require('./routes/user_route');
const teacher_route=require('./routes/teacher_route');


const app=express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(user_route);
app.use(teacher_route);

//const data=new User({username:'Singh',address:'Patan'})
//data.save();





app.listen(90);