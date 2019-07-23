class reimage {
	static shortDescription(cl) {
		let currentDate = new Date();
		let items = ["Location", "UTT Tag"];
		return `Reimage | CL PC | ${cl[items[0]]} | Computer Inv. #: ${cl[items[1]]} | ${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} |`;
	}
	static workNotes(cl) {
		let items = ["Location", "Model #", "UTT Tag", "Service Tag", "OS:"];
		let image = "1809 Win 10(x64) Classroom Instructor Image";
		return `I went into ${cl[items[0]]} to reimage the teacher station Computer: 
	
		Computer- 
		Computer Model: ${cl[items[1]]} | Inv. #: ${cl[items[2]]} | S/N: ${cl[items[3]]}| Name: ${cl[items[0]]} | OS: ${cl[items[0]]} | 
		
		With the Ver. ${cl[items[1]]||image}
		
		After the reimaging was complete, I ran windows update, changed the display settings, checked zoom, installed vlc, epiphan drivers, adobe reader, deep freeze, redirected the new created users to the thawspace and froze the computer. 
		
		Thank you 
		
		Ashim S`;
	}
}

module.exports = reimage;