// PSEUDO CODE =============================================

// DEPENDENCIES (DOM Elements) =============================

// DATA ====================================================

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
		"<textarea name='' class='task-area description todoBlock' id='' rows='4'></textarea>"
	);
	let timeBlockSaveCol = $("<div class='col-1 save-btn d-flex'>");
	let timeBlockSave = $("<i class='fas fa-save m-auto fa-lg'></i>");

	// Add classes based on current hour

	let militaryTime = parseInt(moment().format("HH"));
	theTime = parseInt(theTime);

	if (theTime === militaryTime) {
		timeBlockTextarea.addClass("present");
	} else if (theTime > militaryTime) {
		timeBlockTextarea.addClass("future");
	} else {
		// Not relevant as we already defaulted the class to past
		timeBlockTextarea.addClass("past");
	}

	// Build
	timeBlockHourCol = timeBlockHourCol
		.append(timeBlockHour)
		.text(`${theTime > 11 ? `${theTime} PM` : `${theTime} AM`}`);
	timeBlockTextareaCol = timeBlockTextareaCol.append(timeBlockTextarea);
	timeBlockSaveCol = timeBlockSaveCol.append(timeBlockSave);

	// Place
	timeBlockRow.append(timeBlockHourCol);
	timeBlockRow.append(timeBlockTextareaCol);
	timeBlockRow.append(timeBlockSaveCol);
	$(".container").append(timeBlockRow);

	// Add action to save btn
	timeBlockSave.on("click", saveTask);
}

// Display work hours
function workingHours() {
	for (let i = 9; i <= 17; i++) {
		createTimeBlock(i);
	}
}

// Save task to local storage
function saveTask() {
	let textAreaVal = $(".todoBlock").val();
	let hourVal = $(".hour-area").text();
	console.log("you typed: ", textAreaVal, " at ", hourVal);
}

// INITIALIZATION ==========================================
displayCurrentDay();
workingHours();
