const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

router.get("/",(req,res,next)=>{
    res.status(200).render('register');
});

router.post("/",(req,res,next)=>{
   let {firstName,lastName,login,email,password,passwordConf} = req.body;
   if(firstName && lastName && login && email && password && passwordConf && passwordConf==pass){

   }
   else{
    req.body.errorMessage = "Make sure all fields has a valid value";
    res.status(200).render('register',req.body);
   }
    res.status(200).render('register');
});

module.exports = router;