//Importing all the needed dependencies

//Importing the packages needed to create and managed the server
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const path = require('path');
const public = path.join(__dirname, 'public');
const cors = require("cors");

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

//enabling cors
app.use(cors());


app.use(session({
	name: 'session-id',
	secret: process.env.SESSIONSECRET,
	saveUninitialized: true,
	resave: true,
	store: new mongoStore({ mongooseConnection: mongoose.connection }),
	// cookie: { expires : new Date(Date.now() + 1800000) }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", loginRouter);
app.use(express.static("public"));

app.use(auth);

//handling the first endpoint
app.get("/", (req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	res.sendFile(path.join(public, "app.html"));
});

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
	if (!req.user) {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/html");
		res.sendFile(path.join(public, "login.html"));
	}
	else {
			next();
	}
}









