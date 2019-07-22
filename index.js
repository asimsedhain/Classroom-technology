const express = require("express");
const http = require("http");
const file = require("fs");
const bodyParser = require("body-parser");


const hostname = "localhost";
const port = 3000;


let classroom_raw_data = file.readFileSync("test.json");
let classroom_data = JSON.parse(classroom_raw_data);
// console.log()

const app = express();


app.use(bodyParser.json());

app.all("/", (req, res, next)=>{
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("You have arrived")
})
app.all("/reimage", (req, res, next)=>{
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/json");
	next();
})

app.get("/reimage", (req, res, next)=>{
	res.end("Enter the room number");
})

app.get("/reimage/:roomNum", (req, res, next)=>{
	res.json({"Short Description": reimageShortDescription(classroom_data[req.params.roomNum]), "Work Notes": reimageWorkNotes(classroom_data[req.params.roomNum])});
	// res.end();
})
const server = http.createServer(app);

server.listen(port, hostname, ()=>{
	console.log(`Server started at http://${hostname}:${port}`);
})














function reimageShortDescription(cl) {
	let currentDate = new Date();
	let items = ["Name", "UTT Tag"];
	return `Reimage | CL PC | ${cl[items[0]]} | Computer Inv. #: ${cl[items[1]]} | ${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} |`
}

function reimageWorkNotes(cl) {
	let items = ["Name", "Model #", "UTT Tag", "Service Tag", "OS:"];
	let image = "1809 Win 10(x64) Classroom Instructor Image";
	return `I went into ${cl[items[0]]} to reimage the teacher station Computer: 

	Computer- 
	Computer Model: ${cl[items[1]]} | Inv. #: ${cl[items[2]]} | S/N: ${cl[items[3]]}| Name: ${cl[items[0]]} | OS: ${cl[items[0]]} | 
	
	With the Ver. ${cl[items[1]]||image}
	
	After the reimaging was complete, I ran windows update, changed the display settings, checked zoom, installed vlc, epiphan drivers, adobe reader, deep freeze, redirected the new created users to the thawspace and froze the computer. 
	
	Thank you 
	
	Ashim S`;
}
