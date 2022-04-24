const mongoose=require('mongoose');

const Teacher=mongoose.model('Teacher',{
    tname:{
        type:String

    },
    tphone:{
        type:String
    }
})
module.exports=Teacher;