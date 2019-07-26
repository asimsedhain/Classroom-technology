const dbName = "Classroom-Technology";
const dbCollection = "Classrooms";
const uri = process.env.DBURI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });

let _db;
let _collection;

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

async function getDb() {
	if (_db) {
		return _db;
	} else {
		await initDb();
		return _db;
	}
}
async function getCollection() {
	if (_collection) {
		return _collection;
	} else {
		await initCollection();
		return _collection;
	}
}
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

module.exports = {
	initDb, initCollection, getDb, getCollection
}
