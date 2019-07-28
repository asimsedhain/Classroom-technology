//The db module where fucntions for initializing fetching the db database and the collection

//declaring  the database name and collection
const dbName = "Classroom-Technology";
const dbCollection = "Classrooms";

//getting the database uri as the env varible
const uri = process.env.DBURI;

// getting the mongo client
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });

// private database varible and collection varible
let _db;
let _collection;

// function that initiazling the database and connects to it
async function initDb() {
	if (_db) {
		console.log("DataBase Connected Already");
		return;
	}
	await client.connect();
	_db = client.db(dbName);
	console.log("DataBase Connected")
	return;
}

// function that returns the connected database
async function getDb() {
	if (_db) {
		return _db;
	} else {
		await initDb();
		return _db;
	}
}

// function that returns the initialized collection
async function getCollection() {
	if (_collection) {
		return _collection;
	} else {
		await initCollection();
		return _collection;
	}
}

// function that intializes the collection
async function initCollection() {
	if (_collection) {
		// console.log(_collection);
		console.log("Collection Already Connected");
		return;
	} else {
		_collection = await _db.collection(dbCollection);
		console.log("Collection Connected");
		return;
	}
}

// exporting the functions
module.exports = {
	initDb, initCollection, getDb, getCollection
}
