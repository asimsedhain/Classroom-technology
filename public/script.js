
if (document.getElementById("logout")) {
	document.getElementById("logout").addEventListener("click", logout);
	document.getElementById("formGet").addEventListener("submit", submit);
}
if (document.getElementById("formLogin")) {
	document.getElementById("formLogin").addEventListener("submit", login);
}

async function logout() {
	const url = "https://classroom-technology.herokuapp.com/user/logout";
	const statusBar = document.getElementById('status');
	statusBar.innerText = "Processing";
	let res = await fetch(url);
	if (res.status == 200) {
		statusBar.innerText = "Logged Out";
		window.location = res.url;
	} else {
		statusBar.innerText = "Failed";
	}
}


async function login(e) {
	e.preventDefault();
	let statusBar = document.getElementById('status');
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let url = "https://classroom-technology.herokuapp.com/user/login";

	statusBar.innerText = "Processing";
	let req = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": 'application/json'
		},
		redirect: "follow",
		body: JSON.stringify({ "username": username, "password": password })
	})
	if (req.status == 200) {
		statusBar.innerText = "Success";
		window.location = req.url;
	} else {
		statusBar.innerText = "Failed";
	}
}

async function submit(e) {
	e.preventDefault();
	let option = document.getElementById('option').value;
	let location = document.getElementById("location").value;
	let shortDescription = document.getElementById("Short Description");
	let workNotes = document.getElementById("Work Notes");
	let url = `https://classroom-technology.herokuapp.com/${option}/${location}`;
	shortDescription.innerText = "Processing";
	workNotes.innerText = "";
	let req = await fetch(url);
	let rJson = await req.json();
	console.log(rJson);
	if (req.status == 200 && option === "classroom") {
		shortDescription.innerText = JSON.stringify(rJson, null, 2);
		workNotes.innerText = "";
		return;
	}
	if (req.status == 200) {
		shortDescription.innerText = rJson["Short Description"];
		workNotes.innerText = rJson["Work Notes"];
	} else {
		shortDescription.innerText = "Failed";
		workNotes.innerText = rJson["Error"];
	}

	// console	
}