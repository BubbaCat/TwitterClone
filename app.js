//libs
const express = require("express");
const middleware = require("./middleware");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require("./database");
//Routes
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");

//Config stuff
const app = express();
const port = 3005;
//set up the server
const server = app.listen(port, () => {
	console.log("fine");
});

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
let payload = {
	pageTitle: "Home", 
};
	res.status(200).render("home", payload);
});