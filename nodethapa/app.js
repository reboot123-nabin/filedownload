const express=require('express');
const db=require('./db/db');

const cors=require('cors');
const PORT=process.env.PORT;
const dotenv=require("dotenv");
const router=express.Router();
const mongoose=require('mongoose');
const bodyParser =require('body-parser');
const app=express();

const cookieParser =
require('cookie-parser');
app.use(cookieParser()) ;
app.use(cors);
dotenv.config({path:'../config.env'});
const DB='mongodb+srv://jaden:gameon@cluster0.k5cro.mongodb.net/mywebsite?retryWrites=true&w=majority'
console.log(DB);
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology : true,
    userFindAndModify:false
}).then(()=>{
    console.log(`connection successful online`);
}).catch((err)=>console.log(`no connection onlin2`));

//middleware
// const middleware=(req,res,next)=>{
//     console.log('hello my middleware');
//     next();
// }
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(require('./router/auth'));
// const User=require('./model/userSchema');


// app.get('/',(req,res)=>{
// res.send("hello world")
// });
// app.get('/about',middleware,(req,res)=>{
//     console.log('hello my about');
//     res.send('hello world from server');
// })
// app.get('/contact',(req,res)=>{
//     res.send('hello world from server');
// })

app.listen(PORT,()=>{
    console.log(`server is runnning at port ${PORT}`)
})