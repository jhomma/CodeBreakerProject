const answer = document.getElementById('answer');
const attempt = document.getElementById('attempt');
const message = document.getElementById('message');
const results = document.getElementById('results');
const code = document.getElementById('code');
const guessingDiv = document.getElementById('guessing-div');
const replayDiv = document.getElementById('replay-div');

function guess() {
	let input = document.getElementById('user-guess');
	//add functionality to guess function here
	if(answer.value === '' && attempt.value === '') {
		setHiddenFields();
	}

	if (validateInput(input.value)) {
		attempt.value ++;
		const result = getResults(input.value);
		console.log(result, attempt.value);
		if (attempt.value >= 10 && result === false){
			setMessage('You Lose! :(');
			showAnswer(false);
			showReplay();
		} else if (attempt.value < 10 && result === false){
			setMessage('Incorrect, try again.');
		} else if (attempt.value < 10 && result === true) {
			setMessage('You Win! :)');
			showAnswer(true);
			showReplay();
		}
	} else {
		return false;
	}
}

//implement new functions here
function setHiddenFields() {
	let randomValue = '';
	while ( randomValue.length < 4) {
		randomValue = Math.floor(Math.random()*10000, 4).toString();
	}
	answer.value = randomValue;
	attempt.value = 0;
}

function setMessage(value) {
	message.innerHTML = value;
}

function validateInput(value) {
	if (value.length === 4) {
		return true;
	} else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults(value) {
	let answerHTML = '';
	let correctly = 0;
	for (let i = 0; i < 4; i++) {
		if (value[i] === answer.value[i]) {
			answerHTML += '<span class="glyphicon glyphicon-ok"></span>';
			correctly++;
		} else if ((answer.value).indexOf(value[i]) !== -1) {
			answerHTML += '<span class="glyphicon glyphicon-transfer"></span>';
		} else {
			answerHTML += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}
	results.innerHTML += `
		<div class="row">
			<span class="col-md-6">
				${value}
			</span>
			<div class="col-md-6">
				${answerHTML}
			</div>
		<div class="col-md-6">`;
	return correctly === 4;
}

function showAnswer(value) {
	if (value === true) {
		code.className = 'code success';
		code.innerHTML = `${answer.value}`;
	} else {
		code.className = 'code failure';
		code.innerHTML = `${answer.value}`;
	}
}

function showReplay() {
	guessingDiv.style.display = 'none';
	replayDiv.style.display = 'block';
}