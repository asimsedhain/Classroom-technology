const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const initDb = require("./db").initDb;
const initCollection = require("./db").initCollection;

const reimageRouter = require("./routes/reimageRoute");
const classroomRouter = require("./routes/classroomRoute");
const roomcheckRouter = require("./routes/roomcheckRoute");

initDb().then(() => {
	initCollection();
});

// const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use("/reimage", reimageRouter);
app.use("/classroom", classroomRouter);
app.use("/roomcheck", roomcheckRouter);

app.all("/", (req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("You have arrived")
});


const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server started at http://${hostname}:${port}`);
})













