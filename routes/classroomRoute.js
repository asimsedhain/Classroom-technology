//importing the express module
const express = require("express");

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
		if (req.user.admin) {
			cl = await collection.findOne({ "Location": req.params.roomNum.toUpperCase() });
		} else {
			cl = await collection.findOne({ "Location": "Dummy123" });
		}
	} catch (err) {
		console.log(err);
	}
	if (cl) {
		res.json(cl);
	} else {
		res.statusCode = 401;
		res.json({ "Error": "Invalid Location" });
	}
})

router.post("/", async (req, res) => {
	res.statusCode = 401;
	res.json({ "Error": "Enter room number" });
})

//complete this code
router.post("/:roomNum", async (req, res) => {

})

// exporting the router
module.exports = router;