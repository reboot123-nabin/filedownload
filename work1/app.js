const express=require('express');
const {query}=require('express');//third party
const app=express();
const path=require('path');
const bodyParser=require('body-parser')//core module
//parsin
app.use(bodyParser.urlencoded({extended:false}))
const mysql=require('mysql');
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mysql2'
})
conn.connect(function(arr){
    console.log("connected!!!");
})


const hbs=require("hbs");//handlebars--third party
const { connect } = require('http2');
const publicDirectory=path.join(__dirname,"public");//root//root/test

//to let system know where the partials are
const partials=path.join(__dirname,'/views/partials')

hbs.registerPartials(partials);

app.use(express.static(publicDirectory));
app.set('view engine','hbs');//we are using our templates
//app.get('/contact',function(req,res){
  //  res.render('contact',{user:"shyam"});
//})





//app.get('/',function(req,res){
  //  const temp="50"
    //res.render('home',{t:temp})    
//})


app.get('/home',function(req,res){
    res.sendFile(__dirname+'/home.html');
})
app.get('/second',function(req,res){
    res.sendFile(__dirname+'/about.html')
})

app.get('/third',function(req,res){
    res.sendFile(__dirname+'/third.html')
})


app.get('/',function(req,res){
    res.render('index');
})

app.get('/elements',function(req,res){
    res.render('elements');
})

app.get('/index',function(req,res){
   

    res.render('index');
})

app.post('/insert111',function(req,res){
    const email=req.body.em;
    const username=req.body.us;
    const address=req.body.add;
    const sql="insert into tbl_register values(Null,'"+username+"','"+email+"','"+address+"')";
    conn.query(sql);
    
    //console.log(req.body.us)
})

app.get('/display',function(req,res){
    const sql2="select * from tbl_register";
    conn.query(sql2,function(err,data,fields){
        res.render('display',{data:data})
    })
 
    //conn.query(sql2,function(err,data,fields));

    //res.render('display')

})

app.get('/display',function(req,res){
    const sql2="select * from tbl_register";
    conn.query(sql2,function(err,data,fields){
        res.render('display',{data:data})
    })
 
    //conn.query(sql2,function(err,data,fields));

    //res.render('display')

})
app.listen(3000);