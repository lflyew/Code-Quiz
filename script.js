/// Quiz Questions ///
var questions = [
    {
      title: "Which primitive type can have only the values true or false? 💡",
      choices: ["Number", "String", "Boolean", "Undefined"],
      answer: "Boolean"
    },
    {
      title: "The first Index of an Array is ___ 💡",
      choices: ["1", "0", "Customized", "3"],
      answer: "0"
    },
    {
      title: "Which of these is not a loop type in Java? 💡",
      choices: ["For", "While", "Foreach", "Loop"],
      answer: "Loop"
    },
    {
      title: "What stops the exeecution of a function? 💡",
      choices: ["Go", "Stop", "Function", "Return"],
      answer: "Return"
    },
    {
      title: "Which operator takes numerical values their operands and returns a single numerical value? 💡",
      choices: ["Assignment", "Arithmetic", "Logical", "Comparison"],
      answer: "Arithmetic"
    },
    
  ];

  document.addEventListener('DOMContentLoaded', (event) => {

// Timer Variables 
	const initialTime = 45;
	var time = 45;
	var score = 0;
	var qCount = 0;
	var timeset;
	var answers = document.querySelectorAll('#quizSection button');

// FUNCTION to set the question data in questionHolder section
	var setQuestionData = () => {
		queryElement('#quizSection p').innerHTML = questions[qCount].title;
		queryElement('#quizSection button:nth-of-type(1)').innerHTML = `1. ${questions[qCount].choices[0]}`;
		queryElement('#quizSection button:nth-of-type(2)').innerHTML = `2. ${questions[qCount].choices[1]}`;
		queryElement('#quizSection button:nth-of-type(3)').innerHTML = `3. ${questions[qCount].choices[2]}`;
		queryElement('#quizSection button:nth-of-type(4)').innerHTML = `4. ${questions[qCount].choices[3]}`;
	}

// Use of queryElement to prevent dry code
	var queryElement = (element) => {
		return document.querySelector(element);
	}

	var onlyDisplaySection = (element) => {
		var sections = document.querySelectorAll("section");
		Array.from(sections).forEach((userItem) => {
			userItem.classList.add('hide');
		});
		queryElement(element).classList.remove('hide');
	}

// Reset HTML for scores
	var recordsHtmlReset = () => {
		queryElement('#highScores div').innerHTML = "";
		var i = 1;
		recordsArray.sort((a, b) => b.score - a.score);
		Array.from(recordsArray).forEach(check =>
		{
			var scores = document.createElement("div");
			scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
			queryElement('#highScores div').appendChild(scores);
			i = i + 1
		});
		i = 0;
		Array.from(answers).forEach(answer => {
			answer.classList.remove('disable');
		});
	}

//Changes the question
	var quizUpdate = (answerCopy) => {
		queryElement('#scoreIndicator p').innerHTML = answerCopy;
		queryElement('#scoreIndicator').classList.remove('invisible', scoreIndicator());
		Array.from(answers).forEach(answer =>
		{
			answer.classList.add('disable');
		});

// Exit quiz once questions have been answered
		setTimeout(() => {
			if (qCount === questions.length) {
				onlyDisplaySection("#finish");
				time = 0;
				queryElement('#time').innerHTML = time;
			} else {
				setQuestionData();
				Array.from(answers).forEach(answer => {
					answer.classList.remove('disable');
				});
			}
		}, 1000);
	}

// Timer function
	var myTimer = () => {
		if (time > 0) {
			time = time - 1;
			queryElement('#time').innerHTML = time;
		} else {
			clearInterval(clock);
			queryElement('#score').innerHTML = score;
			onlyDisplaySection("#finish");
		}
	}

// Begins quiz and timer
	var clock;
	queryElement("#intro button").addEventListener("click", (e) => {
		setQuestionData();
		onlyDisplaySection("#quizSection");
		clock = setInterval(myTimer, 1000);
	});

// Clears timer
	var scoreIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
		    queryElement('#scoreIndicator').classList.add('invisible');
		}, 1000);
	}

// Answer Controls
	Array.from(answers).forEach(check => {
		check.addEventListener('click', function (event) {
			// If question is answered correctly!
			if (this.innerHTML.substring(3, this.length) === questions[qCount].answer) {
				score = score + 5;
				qCount = qCount + 1;
				quizUpdate("Great Job 👏");
			}else{
			// If question is answered incorrectly!
				time = time - 10;
				qCount = qCount + 1;
				quizUpdate("Incorrect ❌");
			}
		});
	});

// Error message for initials if criteria not met
	var errorIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
			queryElement('#errorAlert').classList.add('invisible');
		}, 3000);
	}

// Error handling for submitting high scores
	queryElement("#records button").addEventListener("click", () => {
		var initialsRecord = queryElement('#initials').value;
		if (initialsRecord === ''){
			queryElement('#errorAlert p').innerHTML = "You need at least 1 character";
			queryElement('#errorAlert').classList.remove('invisible', errorIndicator());
		} else {
			recordsArray.push({
				"initialRecord": initialsRecord,
				"score": score
			});
			//Sends value to local storage for later use.
			localStorage.setItem('recordsArray', JSON.stringify(recordsArray));
			queryElement('#highScores div').innerHTML = '';
			onlyDisplaySection("#highScores");
			recordsHtmlReset();
			queryElement("#initials").value = '';
		}
	});

// Clears High scores
	queryElement("#clearScores").addEventListener("click", () => {
		recordsArray = [];
		queryElement('#highScores div').innerHTML = "";
		localStorage.removeItem('recordsArray');
	});

// Reset quiz
	queryElement("#reset").addEventListener("click", () => {
		time = initialTime;
		score = 0;
		qCount = 0;
		onlyDisplaySection("#intro");
	});

// Takes to high scores
	queryElement("#scores").addEventListener("click", (e) => {
		e.preventDefault();
		clearInterval(clock);
		queryElement('#time').innerHTML = 0;
		time = initialTime;
		score = 0;
		qCount = 0;
		onlyDisplaySection("#highScores");
		recordsHtmlReset();
	});

var recordsArray = [];
(localStorage.getItem('recordsArray')) ? recordsArray = JSON.parse(localStorage.getItem('recordsArray')): recordsArray = [];
    
});