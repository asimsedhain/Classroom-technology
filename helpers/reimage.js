// Helper module for reimage short description and work notes 


const building = require("./NameSpliter").building;
const roomNum = require("./NameSpliter").roomNumber;


class reimage {
	static shortDescription(cl) {
		let currentDate = new Date();
		return `Reimage | CL PC | ${building(cl["Location"])} | ${roomNum(cl["Location"])} | Computer Inv. #: ${cl["Computer UTT Tag"]} | ${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} |`;
	}
	static workNotes(cl) {
		let items = ["Location", "Computer Model", "Computer UTT Tag", "Computer Service Tag", "OS"];
		let image = "1809 Win 10(x64) Classroom Instructor Image";
		return `I went into ${cl["Location"]} to reimage the teacher station Computer: 
	
		Computer- 
		Computer Model: ${cl["Computer Model"]} | Inv. #: ${cl["Computer UTT Tag"]} | S/N: ${cl["Computer Service Tag"]}| Name: ${cl["Computer Name"]} | OS: ${cl["OS"]} | 
		
		With the Ver. ${image}
		
		After the reimaging was complete, I ran windows update, changed the display settings, checked zoom, installed vlc, epiphan drivers, adobe reader, deep freeze, redirected the new created users to the thawspace and froze the computer. 
		
		Thank you 
		
		Ashim S`;
	}
}

module.exports = reimage;