
if (document.getElementById("logout")) {
	document.getElementById("logout").addEventListener("click", logout);
	document.getElementById("formGet").addEventListener("submit", submit);


	let shortDescription = document.getElementById("Short Description");
	let workNotes = document.getElementById("Work Notes");
	workNotes.addEventListener("click", () => {
		navigator.clipboard.writeText(workNotes.innerText);
	})
	shortDescription.addEventListener("click", () => {
		navigator.clipboard.writeText(shortDescription.innerText);
	})
}
if (document.getElementById("formLogin")) {
	document.getElementById("formLogin").addEventListener("submit", login);
}



async function logout() {
	// const url = "http://localhost:5000/user/logout";
	const url = "https://classroom-technology.herokuapp.com/user/logout";
	let res = await fetch(url);
	if (res.status == 200) {
		window.location = res.url;
	} else {
		console.log(res);
	}
}


async function login(e) {
	e.preventDefault();
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	// const url = "http://localhost:5000/user/login";

	let url = "https://classroom-technology.herokuapp.com/user/login";

	let req = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": 'application/json'
		},
		redirect: "follow",
		body: JSON.stringify({ "username": username, "password": password })
	})
	if (req.status == 200) {
		window.location = req.url;
	} else {
		console.log(req);
	}
}

async function submit(e) {
	e.preventDefault();

	let shortDescription = document.getElementById("Short Description");
	let workNotes = document.getElementById("Work Notes");
	let option = document.getElementById('option').value;
	let location = document.getElementById("location").value;
	// let url = `http://localhost:5000/${option}/${location}`;
	let url = `https://classroom-technology.herokuapp.com/${option}/${location}`;
	shortDescription.innerText = "Processing";
	workNotes.innerText = "";
	document.getElementById("data").classList.add("card","bg-light", "mb-3");
	shortDescription.classList.add("card-header")
	let req = await fetch(url);
	let rJson = await req.json();
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

}
