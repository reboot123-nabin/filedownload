const express=require('express');
const User=require('../models/user_model');

const router=express.Router();


router.post('/teacher/insert',function(req,res){
    const un1= req.body.un;
    const add1=req.body.add;
    const data=new User({username:un1,address:add1});
    data.save();
})


//fetch
router.get('/display',function(req,res){
    User.find().then(function(mydata){
        res.send(mydata)
    })
})


//delete
router.delete("/user/delete/:idddd",function(req,res){
    //id
    //fetching data from url
    const id=req.params.id;
    User.deleteOne({_id:id}).then(function(){
        res.send("deleted!!")
    })
})
//update
router.put("/user/update/:id",function(req,res){
    //id
    //new data
    const id=req.params.id;
    const address=req.body.address;
    //console.log(req.params.id);
    //new data//ayodhya
    User.updateOne({_id:id},{address:address}).then(function(){
        res.send("updated!!")
    })

})


//update
module.exports=router;