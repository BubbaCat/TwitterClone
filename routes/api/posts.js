const express = require('express');
const router = express.Router();

router.get("/",(req,res,next)=>{
});

router.post("/", async (req,res,next) => {
    if(!req.body.content){
        return res.sendstatus(400);
    }
    let postData = {
        contnet = req.body.content,
        author = req.session.user
    }
    let post = await Post.create(postData).catch(err=>{console.log(err) ;return res.send(400)});
    return res.status(201).send(post);
});

module.exports = router;