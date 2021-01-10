const express = require("express");
const router = express.Router();

const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
router.get("/", (req, res, next) => {
  res.status(200).render("register");
});

router.post("/", async (req, res, next) => {
  let { firstName, lastName, login, email, password, passwordConf } = req.body;
  if (
	firstName &&
	lastName &&
	login &&
	email &&
	password &&
	passwordConf &&
	passwordConf == password
  ) {
	let user = await User.findOne({
	  $or: [{ username: login }, { email: email }],
	}).catch(error=>console.log(error));
	if(user==null){
		let data = req.body;
		data.password= await bcrypt.hash(password,10);
		User.create(data).then(data=>{
			req.session.user = user;
			return res.redirect("/");
		});
	}else {
		if(email==user.email){
			req.body.errorMessage = "email already in use";
			res.status(200).render("register", req.body);
		}
	}
  } else {
	req.body.errorMessage = "Make sure all fields has a valid value";
	res.status(200).render("register", req.body);
  }
  res.status(200).render("register");
});

module.exports = router;
