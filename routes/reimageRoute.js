//importing the express module
const express = require("express");

// getting the helper function from the reimage mudual function
const reimage = require("../helpers/reimage");

// getting the collection from the models folder
const collection = require("../models/classrooms");

// declaring the router
const router = express.Router();


// handling all the request for this endpoint and passing to the next handling function
router.all("/", (req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	next();
})

// handling the GET request
router.get("/", (req, res, next) => {
	res.statusCode = 401;
	res.json({ "Error": "Enter room number" });
})

// handling the GET with the room number
router.get("/:roomNum", async (req, res, next) => {
	let cl;
	try {
		cl = await collection.findOne({ "Location": req.params.roomNum.toUpperCase() });
	} catch (e) {
		console.log(e);
	}
	if (cl) {
		res.json({ "Short Description": reimage.shortDescription(cl), "Work Notes": reimage.workNotes(cl) });
	} else {
		res.statusCode = 401;
		res.json({ "Error": "Invaild Location" });
	}
	// res.end();
})

// exporting the router
module.exports = router;
