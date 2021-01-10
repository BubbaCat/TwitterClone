//libs
const express = require("express");
const middleware = require("./middleware");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require("./database");
const session = require("express-session");
//Routes
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");

//Config stuff
const app = express();
const port = 3000;
//set up the server
const server = app.listen(port, () => {
	console.log("fine");
});

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
app.use(session({
	secret:"dasdsaftq3edsxcfgedsgfa asdsadsad",
	resave:true,
	saveUninitialized:false,
}));
app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {

    var payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user
    }

    res.status(200).render("home", payload);
})