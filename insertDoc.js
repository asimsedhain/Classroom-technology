const file = require("fs");
let classroom_raw_data = file.readFileSync("DataBase.json");
let classroom_data = JSON.parse(classroom_raw_data);
const dbName = "Classroom-Technology";
const dbCollection = "Classrooms";

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
	await collection.deleteMany();
	collection.insertMany(classroom_data, (err, result)=>{
		console.log(result.insertedCount);
		console.log(err);
	})
	client.close();
}

doStuff();