var numbers = new Array(75);
var calledNumbers = new Array(75);
window.onload = fillCard();		//Fill the Bingo card when the window is loaded
var clicks = 0;
var goal;

//Fill the Bingo table with id "card" so that the numbers only appear once per card and there is a free space in the center of the card
function fillCard() {
	var table = document.getElementById("card");
	for (var i = 1; i < table.rows.length; i++) {
		for (var j = 0; j < table.rows[i].cells.length; j++) {
			if (!(i == 3 && j == 2)) {
				var letter = num2letter(j);
				var num = getNum(letter);
				var fill = false;
				while (fill == false){
					if (numbers[num-1] == undefined){
						table.rows[i].cells[j].innerHTML = num;
						numbers[num-1] = 1;
						fill = true;
					}
					else {
						num = getNum(letter);
					}
				}
			}
		}
	}
}

//Return the appropriate letter in BINGO given a number from 0 to 4
function num2letter(num) {
	switch(num) {
		case 0:
			return "B";
		case 1:
			return "I";
		case 2:
			return "N";
		case 3:
			return "G";
		case 4:
			return "O";
	}
}

//Randomly generate the appropriate number given the column letter
function getNum(letter) {
	var randNum = Math.floor(Math.random() * 15);
	switch(letter) {
		//The numbers in the B column are between 1 and 15
		case "B":
			return randNum + 1;
		//The numbers in the I column are between 16 and 30 
		case "I":
			return randNum + 16;
		//The numbers in the N column are between 31 and 45 
		case "N":
			return randNum + 31;
		//The numbers in the G column are between 46 and 60
		case "G":
			return randNum + 46;
		//The numbers in the O column are between 61 and 75.
		case "O":
			return randNum + 61;

	}
}

//Select which goal is the requirement for a valid bingo
function goal(id){
	goal = document.getElementById(id).innerHTML;
	document.getElementById("goal").innerHTML = "Goal: " + goal;
}

//When the user presses a button, a new number is called and displayed on the screen
function caller() {
	clicks++;
	if (clicks <= 75){
		var letter = num2letter(Math.floor(Math.random() * 5));
		var num = getNum(letter);
		var fill = false;
		while (fill == false){
				if (calledNumbers[num-1] == undefined){
					calledNumbers[num-1] = 1;
					fill = true;
				}
				else {
					letter = num2letter(Math.floor(Math.random() * 5));
					num = getNum(letter);
				}
			}
		var call = letter.concat("-").concat(num);
		document.getElementById("callGoesHere").innerHTML = "";
		document.getElementById("callGoesHere").innerHTML = call;
	}
	else{
		window.alert("Out of calls!");
	}
}

//Toggle strikethrough of text when the space is clicked
function marker(id){
	var cell = document.getElementById(id);
	var content = cell.innerHTML;
	if (content.includes("<s>")){
		content = content.substring(3)
		cell.innerHTML = content;
	}
	else{
		cell.innerHTML = "<s>" + content;
	}
}

//Validate the bingo against the numbers that have been called 
function checkIfCalled(checkNums) {
	var numCalled = true;
	var i=0;
	while (numCalled == true && i < checkNums.length) {
		if (checkNums[i].innerHTML.includes("<s>") && !(checkNums[i].innerHTML.includes("FREE"))) {
			var check = checkNums[i].innerHTML.substring(3);
			check = check.replace("</s>", "");
			if (calledNumbers[check-1] == undefined){
				numCalled = false;
			}
		}
		else if (checkNums[i].innerHTML.includes("FREE")){
			numCalled = true;
		}
		else{
			numCalled = false;
		}
		i++;
	}
	return numCalled;
}

//Display congratulatory message if the user wins, or inform user of invalid bingo
function winGame(win) {
	if (win == true){
		var table = document.getElementById("card");
		table.innerHTML = "<p id ='congrats'>Congratulations! <br> You win!<p>";
		table.style.fontSize = "40px";
		table.style.height = "400px";
		table.style.width = "400px";
		document.getElementById("callGoesHere").innerHTML = "";
		var buttons = document.getElementById("buttons");
		buttons.innerHTML = '<button onclick="window.location.reload();">Play Again</button>'
	}
	else {
		window.alert("You don't have a BINGO yet");
	}
}

//Determine whether the user has a BINGO based on their goal for game play
function winOrLose() {
	var win = true;
	if (clicks == 0){
		window.alert("I'm not sure I believe you...");
	}
	else if (goal == "Single Line") {
		//Check vertical columns
		var i = 0;
		while (i < 5){
			var checkNums = Array(5);
			var letter = num2letter(i);
			for (var j = 1; j < 6; j++){
				checkNums[j-1] = document.getElementById(letter + j);
			}
			win = checkIfCalled(checkNums);
			if (win == true){
				i = 5;
				winGame(win);
			}
			else{
				i++;
			}
		}
		if (win == false) {
			//Check horizotal columns
			var i = 1;
			while (i < 6){
				var checkNums = Array(5);
				for (var j = 0; j < 5; j++){
					var letter = num2letter(j);
					checkNums[j] = document.getElementById(letter + i);
				}
				win = checkIfCalled(checkNums);
				if (win == true){
					i = 6;
					winGame(win);
				}
				else{
					i++;
				}
			}
		}
		if (win == false) {
			//Check first diagonal
			var i = 1;
			var checkNums = Array(5);
			while (i < 6){
				var letter = num2letter(i-1);
				checkNums[i-1] = document.getElementById(letter + i);
				i++;
			}
			win = checkIfCalled(checkNums);
			if (win == true){
				winGame(win);
			}
		}
		if (win == false) {
			//Check second diagonal
			var i = 5;
			var j = 0;
			var checkNums = Array(5);
			while (j < 5){
				var letter = num2letter(j);
				checkNums[j] = document.getElementById(letter + i);
				i--;
				j++;
			}
			win = checkIfCalled(checkNums);
			if (win == true){
				winGame(win);
			}
		}
		if (win == false){
			//check four corners
			var checkNums = Array(4);
			checkNums[0] = document.getElementById("B1");
			checkNums[1] = document.getElementById("B5");
			checkNums[2] = document.getElementById("O1");
			checkNums[3] = document.getElementById("O5");
			win = checkIfCalled(checkNums);
			winGame(win);
		}
	}
	else if (goal == "Full Card"){
		var checkNums = document.getElementsByTagName("td");
		win = checkIfCalled(checkNums);
		winGame(win);
	}
	else {
		window.alert("You did not pick a goal. ");
	}
}
