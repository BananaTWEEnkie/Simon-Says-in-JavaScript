// help from: http://codeplanet.io/building-simon-says-javascript/
// https://github.com/jonathandiep/simon-says
var interval;
var buttonsState = document.getElementsByTagName("button");

function startGame() {
	document.getElementById("start").style.visibility = "hidden";
	trigger = true;

	for(var n = 0; n < buttonsState.length; n++){
		if(buttonsState[n].type == 'button'){
			buttonsState[n].disabled = false;
		}
	}

	var difficulty = checkDifficulty('difficulty');
	
	if(difficulty == "Easy") {
		timer = 3000;
	} else if(difficulty == "Medium") {
		timer = 2000;
	} else {
		timer = 500;
	}

	game(timer);
}

function game() {
	rounds += 1;
	document.getElementById("displayRounds").innerHTML = "Rounds: " + rounds;
	randomSides();
	
	if(rounds == 1) {
		blink(pattern);
	} else {
		blink(pattern);
		setTimeout(function() {
			var interval = setInterval(function() {
				var oldColor = document.getElementById(pattern[i]).style.backgroundColor;
				
				document.getElementById(pattern[i]).style.backgroundColor = 'grey';
	 
				// Get function similiar http://stackoverflow.com/questions/1141302/is-there-a-sleep-function-in-javascript 
				setTimeout(function(j){ 
					document.getElementById(pattern[j]).style.backgroundColor = oldColor;
					console.log(j);
				}, timer, i);
	 
				i++;

				if (i >= pattern.length) {
					i = clearInterval(interval);
				}
			}, timer);
		} , timer);
	}
	
}

function randomSides() {
	// Random Generator: http://www.w3schools.com/jsref/jsref_random.asp
	var random = Math.floor((Math.random() * 4) + 1);
	// Switch statement: http://www.w3schools.com/js/js_switch.asp
	switch(random) {
		case 1:
			selectedDiv = "top";
			break;
		case 2:
			selectedDiv = "right";
			break;
		case 3:
			selectedDiv = "bottom";
			break;
		case 4:
			selectedDiv = "left";
			break;
	}
	
	pattern.push(selectedDiv);
	
	return pattern;
}

function buttonPress(side) {
	if(trigger != false) {
		setTimeout(function() {
			userClicks.push(side);
			verifyClicks(userClicks);
		}, 300);
	}
}

function verifyClicks() {
	if(userClicks[count] === pattern[count]) {
		count++;
	
		if(count < pattern.length) {
			//do nothing
		} else if(trigger != false) {
			alert("All correct! Congratulations, you get to move on to the next round!");
			count = 0;
			i = 0;
			userClicks = [];
			game();
		}
		
	} else {
		alert("Wrong! You clicked " + userClicks[count] + " but the correct one was " + pattern[count] + ".");
		lose();
	}
}

// Learn to change background color: http://www.w3schools.com/jsref/prop_style_backgroundcolor.asp 
function lose() {
	document.body.style.backgroundColor = "#7f0000";
	setTimeout(function(){ 
		document.body.style.backgroundColor = "#fff";
	}, 1000);
	
	document.getElementById("start").style.visibility = "visible";
	if(rounds <= 1) {
		alert("Congratulations! You have failed and only made it to " + rounds + " round, completing none.");
	}
	else {
		alert("Nice! You made it to " + (rounds-1) + " rounds!");
	}

	trigger = false;
	selectedDiv = [];
	pattern = [];
	userClicks = [];
	rounds = 0;
	count = 0;
	i = 0;

	document.getElementById("start").style.visibility = "visible";
	document.getElementById("start").innerHTML = "Retry";
	document.getElementById("top").style.backgroundColor = "red";
	document.getElementById("right").style.backgroundColor = "blue";
	document.getElementById("bottom").style.backgroundColor = "green";
	document.getElementById("left").style.backgroundColor = "yellow";
	
	for(var n = 0; n < buttonsState.length; n++){
		if(buttonsState[n].type == 'button'){
			buttonsState[n].disabled = true;
		}
	}

	document.getElementById("start").disabled = false;
}

// Finding radio button value help from: http://stackoverflow.com/questions/604167/how-can-we-access-the-value-of-a-radio-button-using-the-dom
function checkDifficulty(difficulty) {
    var elements = document.getElementsByName(difficulty);
    for (var x = 0, l = elements.length; x < l; x++) {
        if (elements[x].checked)
        {
            return elements[x].value;
        }

	}
}

// Help from: http://www.webdeveloper.com/forum/showthread.php?261613-RESOLVED-Image-scale-onclick by using this as a parameter
function changeImage(it) {
	if(trigger != false) {
		it.src = "images/orgasm_face.png";
		setTimeout(function(){
			it.src = "images/smiling_face.png";
		}, 300);
	}
}
	
function blink(pattern) {
	var oldColor = document.getElementById(pattern[i]).style.backgroundColor;

	document.getElementById(pattern[i]).style.backgroundColor = "grey";

	// Get function similiar http://stackoverflow.com/questions/1141302/is-there-a-sleep-function-in-javascript
	setTimeout(function(j){ 
		document.getElementById(pattern[j]).style.backgroundColor = oldColor;
		console.log(j);
	}, timer + 100, i);
 
    i++;

    if (i >= pattern.length) {
		i = clearInterval(interval);
    }
}