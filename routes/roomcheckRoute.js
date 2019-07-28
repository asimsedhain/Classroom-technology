//importing the express module
const express = require("express");

// getting the helper function from the roomcheck mudual function
const roomcheck = require("../helpers/roomCheck");

// getting the collection from the db module
const getCollection = require("../db").getCollection;

// declaring the router
const router = express.Router();


// handling all the request for this endpoint and passing to the next handling function
router.all('/', (req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	next();
})

// handling the GET request
router.get("/", (req, res, next)=>{
	res.json({
		"Error": "Please enter the room number"
	});
})

// handling the GET with the room number
router.get("/:roomNum", async (req, res, next) => {
	let collection = await getCollection();
	let cl;
	try {
		cl = await collection.findOne({ "Location": req.params.roomNum });
	} catch (e) {
		console.log(e);
	}
	if (cl) {
		res.json({ "Short Description": roomcheck.shortDescription(cl), "Work Notes": roomcheck.workNotes(cl) });
	} else {
		res.json({ "Error": "Invaild Location" });
	}
})

// exporting the router
module.exports = router;