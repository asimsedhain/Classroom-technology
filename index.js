//Importing all the needed dependencies

//Importing the packages needed to create and managed the server
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

//Importing mongoose to control mongodb
const mongoose = require("mongoose");

const passport = require('passport');
const authenticate = require("./authenticate");

//sessions
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);



//importing the routers for each of the endpoint
const loginRouter = require("./routes/userRoute");
const reimageRouter = require("./routes/reimageRoute");
const classroomRouter = require("./routes/classroomRoute");
const roomcheckRouter = require("./routes/roomcheckRoute");

//setting up the hostname and the port for the server
const hostname = "localhost";
const port = process.env.PORT || 3000;

//initializatin the app which will run on the server
const app = express();

//initializing the database and the collection at the start
// initDb().then(() => {
// 	initCollection();
// });

mongoose.connect(process.env.DBURI, { useNewUrlParser: true });

//the app using middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(session({
	name: 'session-id',
	secret: process.env.SESSIONSECRET,
	saveUninitialized: false,
	resave: false,
	store: new mongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", loginRouter);


//handling the first endpoint
app.all("/", (req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("You have arrived")
});

app.use(auth);

app.use("/reimage", reimageRouter);
app.use("/classroom", classroomRouter);
app.use("/roomcheck", roomcheckRouter);



//creating the server
const server = http.createServer(app);

//the server starts listening
server.listen(port, () => {
	console.log(`Server started at http://${hostname}:${port}`);
})



function auth (req, res, next) {
	console.log(req.user);
	if (!req.user) {
	  res.statusCode = 401;
	  res.setHeader("Content-Type", "application/json");
	  res.json({"Error": "Authentication error"});
	}
	else {
			next();
	}
}









