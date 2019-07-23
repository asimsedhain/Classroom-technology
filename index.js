const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const reimage = require("./reimage.js");
const dbName = "Classroom-Technology";
const dbCollection = "Classrooms";
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://asedhain33:autumnsky100%25@classroom-technology-9sqyb.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
let collection;
client.connect().then(() => {
	collection = client.db(dbName).collection(dbCollection);
});



const hostname = "localhost";
const port = 3000;


const app = express();


app.use(bodyParser.json());

app.all("/", (req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("You have arrived")
})
app.all("/reimage", (req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/json");
	next();
})

app.get("/reimage", (req, res, next) => {
	res.end("Enter the room number");
})

app.get("/reimage/:roomNum", async (req, res, next) => {
	let cl;
	try {
		cl = await collection.findOne({ "Location": req.params.roomNum });
	} catch (e) {
		console.log(e);
	}
	if (cl) {
		res.json({ "Short Description": reimage.shortDescription(cl), "Work Notes": reimage.workNotes(cl) });
	}else{
		res.json({"Error": "Invaild Location"});
	}
	// res.end();
})


app.all("/classroom", (req, res, next)=>{
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/json");
	next();
})

app.get("/classroom", (req, res, next)=>{
	res.end("Enter the Classroom number");
})

app.get("/classroom/:roomNum", async (req, res)=>{
	let cl;
	try{
		cl = await collection.findOne({ "Location": req.params.roomNum });
	}catch(err){
		console.log(err);
	}
	if(cl){
		res.json(cl);
	}else{
		res.json({"Error": "Invalid Location"});
	}
})
const server = http.createServer(app);

server.listen(port, hostname, () => {
	console.log(`Server started at http://${hostname}:${port}`);
})













