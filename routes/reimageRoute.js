const express = require("express");
const reimage = require("../helpers/reimage");
const getCollection = require("../db").getCollection;



const router = express.Router();

router.all("/", (req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	next();
})

router.get("/", (req, res, next) => {
	res.json({
		"Error": "Please enter the room number"
	});
})

router.get("/:roomNum", async (req, res, next) => {
	let collection = await getCollection();
	let cl;
	try {
		cl = await collection.findOne({ "Location": req.params.roomNum });
	} catch (e) {
		console.log(e);
	}
	if (cl) {
		res.json({ "Short Description": reimage.shortDescription(cl), "Work Notes": reimage.workNotes(cl) });
	} else {
		res.json({ "Error": "Invaild Location" });
	}
	// res.end();
})

module.exports = router;
