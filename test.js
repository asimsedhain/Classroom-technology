const mongoose = require('mongoose');
const classrooms = require("./models/classrooms");

mongoose.connect('mongodb+srv://asedhain33:autumnsky100%25@classroom-technology-9sqyb.mongodb.net/Classroom-Technology?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(async()=>{
	let t = await classrooms.findOne({"Location": "COB321"});
	console.log(t);
})
