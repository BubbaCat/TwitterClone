const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

router.get("/",(req,res,next)=>{
    res.status(200).render('login');
});

router.post("/", async (req,res,next) => {
    if(req.body.logUsername && req.body.logPassword)
    {   
        let user = await User.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logUsername }
            ]
            }).catch(err=> {
            console.log(err);
            req.body.errorMessage="something went wront";
            res.status(200).render("login", req.body.errorMessage);
        })
        console.log(user);
        if(user != null){
            var isPassConfirmed = await bcrypt.compare(req.body.logPassword ,user.password)
            if(isPassConfirmed === true)
            {
                req.session.user = user;
                return res.redirect("/");
            }
        }
        req.body.errorMessage = "Login failed";
        res.status(200).render('login',req.body.errorMessage);
    }
    res.status(200).render('login');
});


module.exports = router;