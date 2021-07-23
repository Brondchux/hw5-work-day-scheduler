// PSEUDO CODE =============================================

// DEPENDENCIES (DOM Elements) =============================

// DATA ====================================================
let currentHour = moment().format("HH");
console.log(currentHour);

// FUNCTIONS ===============================================
// Display the current day
function displayCurrentDay() {
	let initMoment = moment().format("dddd Do, MMMM YYYY");
	$("#currentDay").text(initMoment);
}

// Create a timeblock
function createTimeBlock(theTime) {
	// Create
	let timeBlockRow = $("<div class='row'>");
	let timeBlockHourCol = $(
		"<div class='col-1 hour d-flex justify-content-end'>"
	);
	let timeBlockHour = $("<span class='hour-area'></span>");
	let timeBlockTextareaCol = $("<div class='col-10 past px-0'>");
	let timeBlockTextarea = $(
		"<textarea name='' class='task-area description' id='' rows='4'></textarea>"
	);
	let timeBlockSaveCol = $("<div class='col-1 save-btn d-flex'>");
	let timeBlockSave = $("<i class='fas fa-save m-auto fa-lg'></i>");

	// Add classes based on current hour

	let militaryTime = moment(theTime).format("HH");
	if (currentHour === militaryTime) {
		timeBlockTextarea.addClass("present");
	} else if (militaryTime > currentHour) {
		timeBlockTextarea.addClass("future");
	} else {
		// Not relevant as we already defaulted the class to past
		timeBlockTextarea.addClass("past");
	}

	// Build
	timeBlockHourCol = timeBlockHourCol
		.append(timeBlockHour)
		.text(`${moment(theTime).format("hA")}`);
	timeBlockTextareaCol = timeBlockTextareaCol.append(timeBlockTextarea);
	timeBlockSaveCol = timeBlockSaveCol.append(timeBlockSave);

	// Place
	timeBlockRow.append(timeBlockHourCol);
	timeBlockRow.append(timeBlockTextareaCol);
	timeBlockRow.append(timeBlockSaveCol);
	$(".container").append(timeBlockRow);
}

// Display work hours
function workingHours() {
	for (let i = 0; i < 8; i++) {
		let dateVal = moment().add(i, "hours").format();
		createTimeBlock(dateVal);
	}
}

// INITIALIZATION ==========================================
displayCurrentDay();
workingHours();
