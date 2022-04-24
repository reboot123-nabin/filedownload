
const express=require('express');
const router=express.Router();
const Teacher=require('../models/teacher_model');
router.post('/user/insert1',function(req,res){
    console.log(req.body)
    const tn1= req.body.tn;
    const tp1=req.body.tp;
    const data=new Teacher({tname:tn1,tphone:tp1});
    data.save();
})

router.get('/display1',function(req,res){
    Teacher.find().then(function(mydata){
        res.send(mydata)
    })
})

module.exports=router;