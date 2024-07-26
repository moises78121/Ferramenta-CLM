function setIntervalTimes(parent, value) {
	parent.childNodes.forEach((item) => {
		if((item.classList != null) && (item.classList.contains("prescription-table__data--times"))) {
			switch(value) {
				case "04/04H":
					item.innerText = "12    16    20    24    04    08";
					break;
				case "06/06H":
					item.innerText = "12        18        24        06";
					break;
				case "08/08H":
					item.innerText = "12             20             04";
					break;
				case "12/12H":
					item.innerText = "06                            18";
					break;
				case "24/24H":
					item.innerText = "06";
					break;
			}
		}
	});
}

function exportPrescription() {
	const prescriptionList = [];

	// Add selected prescription lines to list
	document.querySelectorAll(".prescription-table__data").forEach((data) => {
		if((data.classList != null) && (data.classList.contains("prescription-table__data--checkbox"))) {
			if((data.childNodes[0] != null) && data.childNodes[0].checked) {
				prescriptionList.push(data.parentElement);
			}
		}
	});

	// Generate final string
	var index = 1;
	var prescriptionString = "";
	prescriptionList.forEach((row) => {
		prescriptionString += index.toString() + "\t";
		prescriptionString += row.childNodes[3].innerText + "\t";

		if(row.childNodes[5].childNodes[1] != null) prescriptionString += row.childNodes[5].childNodes[1].value + "\t";
		else prescriptionString += row.childNodes[5].innerText + "\t";

		if(row.childNodes[7].childNodes[1] != null) prescriptionString += row.childNodes[7].childNodes[1].value + "\t";
		else prescriptionString += row.childNodes[7].innerText + "\t";

		prescriptionString += row.childNodes[9].innerText + "\n";

		index++;
	});

	// Copy string to clipboard
	navigator.clipboard.writeText(prescriptionString)
		.then(() => {
			/* clipboard successfully set */
		},
		() => {
			/* clipboard write failed */
			window.alert("Erro ao copiar");
		});
}
