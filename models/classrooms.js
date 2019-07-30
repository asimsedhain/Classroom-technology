const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
	Location: {
		type: String,
		required: true,
		unique: true
	},
	OS:{
		 type: String,
		 required: true,
		 unique: false
	},
	"Computer Model": {
		type: String,
		required: true,
		default: null
	},
	"Computer Service Tag": {
		type: String,
		required: true,
		default: null
	},
	"Computer Warranty Satus": {
		type: String,
		required: true,
		default: null
	},
	"Comuter Purchase Date": {
		type: String,
		required: true,
		default: null
	},
	"Computer UTT Tag": {
		type: String,
		required: true,
		default: null
	},
	"Computer Name": {
		type: String,
		required: true,
		default: null
	},
	"Lamp Hours(1)": {
		type: String,
		required: true,
		default: null
	},
	"Lamp Hours(2)": {
		type: String,
		required: true,
		default: null
	},
	"Projector Type": {
		type: String,
		required: true,
		default: null
	},
	"Filter Hours": {
		type: String,
		required: true,
		default: null
	},
	"Last Checked": {
		type: String,
		required: true,
		default: null
	},
	"Control Mode": {
		type: String,
		required: true,
		default: null
	},
	"Control IP": {
		type: String,
		required: true,
		default: null
	},
	"Control FW": {
		type: String,
		required: true,
		default: null
	},
	"AMX IP": {
		type: String,
		required: true,
		default: null
	},
	"Notes": {
		type: String,
		required: true,
		default: null
	},
	"Projector Model": [],
	"Projector UTT Tag": [],
	"Projector Serial Number": [],
	"Projector Mfg Date": [],
	"Projector Purchase Date": []
});

module.exports = mongoose.model("Classroom", classroomSchema, "Classrooms");