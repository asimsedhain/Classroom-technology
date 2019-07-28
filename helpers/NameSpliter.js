// Helper module


// Helper function that gets building name from the given string
function building(s) {
	return s.match(/^[A-Za-z]+/)[0];
}


// Helper function that gets the room number from the given string
function roomNumber(s) {
	return s.match(/\d+/)[0];
}


// returns a formatted string from a given projector array
function projectorArray(arr) {
	if (arr.length == 0) {
		return "N/A";
	} else if (arr.length == 1) {
		return arr[0];
	} else {
		let temp = arr[0];
		for (let i = 1; i < arr.length; i++) {
			temp += " and " + arr[i];
		}
		temp += ", respectively";
		return temp;
	}
}


// returns a formatted string from a given 2 lamp hours
function projectorLampHours(a, b) {
	if (b) {
		return a + " and " + b + " Hours";
	} else {
		return a + " Hours";
	}
}

// returns a formatted string from a given 2 lamp hours
function projectorLampReplacement(a, b){
	if(b){
		if(Number.parseInt(a)<4000&&Number.parseInt(b)<4000){
			return "< 4000, Lamp replacement is not currently warranted";
		}else{
			return "> 4000, Lamp replacement is might be warranted";
		}
	}else{
		if(Number.parseInt(a)<4000){
			return "< 4000, Lamp replacement is not currently warranted";
		}else{
			return "> 4000, Lamp replacement is might be warranted";
		}
	}
}

// exporting all the modules
module.exports = {
	building,
	roomNumber,
	projectorArray,
	projectorLampHours,
	projectorLampReplacement
}