const express = require('express');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require("../model/userSchema");

const authenticate = require("../middleware/authenticate");

// router.post('/register',(req,res)=>{
//     const { name, email, phone, work, password, cpassword} = req.body;
// console.log(req.body.name)

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: "plz fill the field properly"});
//     }

//     User.findOne({email:email})
//         .then((userExist)=>{
//             if(userExist){
//                 return res.status(422).json({error:"email already exist"});
//             }
//             const user=new User({name,email,phone,work,password,cpassword})
//             user.save().then(()=>{
//                 res.status(201).json({message:"user registered success"});
//             })
//             .catch((err)=>res.status(500).json({error:"registered failed"}))
//                 })
//                 .catch(err=>{console.log(err);});
// })



router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill the field properly" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "email already registered" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" });
        }
        else {
            const user = new User({ name, email, phone, work, password, cpassword });
            const userRegistered = await user.save();

            if (userRegistered) {
                res.status(201).json({ message: "user registered successful" });
            }
            else {
                res.status(500).json({ error: "failed to registered" });

            }
        }

    } catch (err) {
        console.log(err);
    }

})


router.post('/login', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "plz fill the data" })
        }
        const userLogin = await User.findOne({ email: email });
        console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 545454000),
                httpOnly: true
            });
            if (!isMatch) {
                res.status(400).json({ message: "invalid credentials *" });


            }
            else {
                res.json({ message: "user signin successfully" });
            }
        }

        else {
            res.status(400).json({ error: "invalid credeeentials" });
        }


    }
    catch (err) {
        console.log(err);
    }
})

router.post('/sigin',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"plz filled the data"})
        }

        const userLogin=await User.findOne({email:email});

        if(!userLogin){
            res.status(400).json({error:"user error"});

        }
        else{
            res.json({message:"user signin successfully"});
        }
    }
    catch(err){
        console.log(err);
    }
})



router.get('/about', authenticate, (req, res) => {
    console.log('hello my about');
    // res.cookie("test","thapa");
    res.send(req.rootUser);
})

router.get('/getdata', authenticate, (req, res) => {
    console.log('hello my about');
    res.send(req.rootUser);
})


router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        //  if(!name || !email || !phone  || !message){
        //      console.log("error in contact form");
        //      return res.json({error:"plz fill the contact form"});
        //  }
        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {

            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();
            res.status(201).json({ message: "user contact successfuly" });
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/logout', (req, res) => {

    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send('user logout');
})

//get user data for contact us and home page
// router.get('/getData',authenticate,()=>{
//     console.log('hello my about');

//     res.send(req.rootUser);
// })

module.exports = router;