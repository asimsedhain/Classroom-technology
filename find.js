const dbName = "Classroom-Technology";
const dbCollection = "Classrooms";
let reimage = require("./reimage.js");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://asedhain33:autumnsky100%25@classroom-technology-9sqyb.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
// 	const collection = client.db(dbName).collection(dbCollection);
// 	console.log(collection)
// 	// perform actions on the collection object
// 	client.close();
// });

async function doStuff(){
	await client.connect();
	const collection = client.db(dbName).collection(dbCollection);
	cl = await collection.findOne({"Location": "COB321"});

	console.log({"Short Description": reimage.shortDescription(cl), "Work Notes": reimage.workNotes(cl)});
	client.close();
}

doStuff();