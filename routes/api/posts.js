const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

router.get("/",(req,res,next)=>{
    res.status(200).render('login');
});

router.post("/", async (req,res,next) => {
    if(!req.body.content){
        console.log("");
        return res.sendstatus(400);
    }
    res.status(200).send("it works"); 
});
module.exports = router;