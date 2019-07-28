// Helper module for roomcheck short description and work notes

const building = require("./NameSpliter").building;
const roomNum = require("./NameSpliter").roomNumber;
const projectorArray = require("./NameSpliter").projectorArray;
const projectorLampHours = require("./NameSpliter").projectorLampHours;
const projectorLampReplacement = require('./NameSpliter').projectorLampReplacement;

class roomCheck {

	static shortDescription(cl) {
		let currentDate = new Date();
		return `Room Check | CL PC | ${building(cl["Location"])} | ${roomNum(cl["Location"])} | ${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} |`;
	}

	static workNotes(cl) {
		let currentDate = new Date();
		return `I went by | ${building(cl["Location"])} | ${roomNum(cl["Location"])} | ${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} | Last Checked: ${cl["Last Checked"] || "N/A"} | and did a room check of its contents: 

		Projector – The projector image is bright and aligned 
		Projector Model: ${cl["Projector Model"].length>=2? (cl["Projector Model"].length): ""} ${cl["Projector Model"][0]||"N/A"} | Inv. #: ${projectorArray(cl["Projector UTT Tag"])} | S/N: ${projectorArray(cl["Projector Serial Number"])} | Lamp Hours: ${projectorLampHours(cl["Lamp Hours(1)"], cl["Lamp Hours(2)"])} | Air Filter Hours: ${cl["Filter Hours"]} | Lamp Hours ${projectorLampReplacement(cl["Lamp Hours(1)"], cl["Lamp Hours(2)"])}
		
		Computer- 
		Computer Model: ${cl["Computer Model"]} | Inv. #: ${cl["Computer UTT Tag"]} | S/N: ${cl["Computer Service Tag"]} | Name: ${cl["Computer Name"]} | OS: ${cl["OS"]} | 
		
		${cl["Notes"]}
		
		Functionality- 
		• All of the sources are working correctly and I was able to view and hear a YouTube video on the Computer source 
		• I cleaned the station and made sure it was organized  
		
		Updating the Combined Room Check Excel Spreadsheet on Teams 
		
		Waiting to resolve the incident until the issue with the mics is fixed. 
		
		Ashim S`;
	}

}

module.exports = roomCheck;