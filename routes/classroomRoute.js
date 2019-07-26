const express = require("express");
const getCollection = require("../db").getCollection;

const router = express.Router();


router.all("/", (req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	next();
})

router.get("/", (req, res, next) => {
	res.end("Enter the Classroom number");
})

router.get("/:roomNum", async (req, res, next) => {
	let collection = await getCollection();
	let cl;
	try {
		cl = await collection.findOne({ "Location": req.params.roomNum });
	} catch (err) {
		console.log(err);
	}
	if (cl) {
		res.json(cl);
	} else {
		res.json({ "Error": "Invalid Location" });
	}
})

module.exports = router;