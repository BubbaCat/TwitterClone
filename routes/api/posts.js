const express = require('express');
const router = express.Router();

router.get("/",(req,res,next)=>{
});

router.post("/", async (req,res,next) => {
    if(!req.body.content){
        return res.sendstatus(400);
    }

    

    res.status(200).send("it works"); 
});

module.exports = router;