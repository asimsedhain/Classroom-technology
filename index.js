//Importing all the needed dependencies

//Importing the packages needed to create and managed the server
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

//Importing mongoose to control mongodb
const mongoose = require("mongoose");


//importing the routers for each of the endpoint
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

mongoose.connect(process.env.DBURI, {useNewUrlParser: true});

//the app using middlewares
app.use(bodyParser.json());

app.use("/reimage", reimageRouter);
app.use("/classroom", classroomRouter);
app.use("/roomcheck", roomcheckRouter);

//handling the first endpoint
app.all("/", (req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("You have arrived")
});

//creating the server
const server = http.createServer(app);

//the server starts listening
server.listen(port, () => {
	console.log(`Server started at http://${hostname}:${port}`);
})













