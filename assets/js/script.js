// 1. opening page loads
// 2. read instructions then click start to start game
// 3. intro is hidden and playArea is shown results are hidden
// 4. timer starts
// 5. user will answer multiple choice questions
// 6. 4 choices will be displayed, if the users choice is correct, a point is awarded in the background
// 7. if answer is incorrect, no points will be awarded, number of wrong answers are recorded. 
// 8. number of questions answered are recorded in the background
// 9. when time runs out, resultScreen will be displayed tallying all of the results
// 10. if user finishes answering the questions, resultScreen will be displayed tallying the results
// 11. click restart and restart the game 

// variables------------------------------------

// Question Arrays

questions = [{
    question: "What is Michael Scott's middle name?",
    choices: [" Kurt", " Gary", " Devon", " Morgan"],
    correctAnswer: 1
  }, {
    question: "What is the exclusive club that Pam, Oscar, and Toby establish in the episode 'Branch Wars'?",
    choices: [" The Party Planning Committee", " Kevin and the Zits", " The Finer Things Club", " Here Comes Treble"],
    correctAnswer: 2
  }, {
    question: "The actor who plays quality-assurance man Creed Bratton is in fact named Creed Bratton in real life. He was also in a band that was popular in the late 1960s and 1970s. Which band was it?",
    choices: [" Lynard Skynard", " The Mamas and the Papas", " The Eagles", " The Grassroots"],
    correctAnswer: 3
  }, {
    question: "Dwight owns and runs a farm in his spare time. What does this farm primarily produce?",
    choices: [" Goats", " Beets", " Corn", " Potatoes"],
    correctAnswer: 1
  }, {
    question: "The members of the Stamford branch play what video game with each other that started as a 'team building exercise'?",
    choices: [" Call of Duty", " Halo", " Battlefield", " Super Smash Bros."],
    correctAnswer: 0
  }, {
    question: "In season 3, what product did Jim tell Dwight he could get at Sharper Image?",
    choices: [" A massage chair", " A Cross-Bow", " Gaydar", " A Pewter Wizard"],
    correctAnswer: 2
  }, {
    question: "Jim knows the flavor of yogurt that Pam likes best, but what is it?",
    choices: [" Mixed Berries", " Strawberry", " Vanilla", " Plain"],
    correctAnswer: 0
  }, {
    question: "In season three's 'Safety Training' episode, what piece of warehouse equipment was Darryl stressing the danger of?",
    choices: [" The forklift", " A trampoline", " A bailer", " A ladder"],
    correctAnswer: 2
  }, {
    question: "What is Erin Hannon's middle name?",
    choices: [" Ashley", " Erin", " Kelly", " Noel"],
    correctAnswer: 1
  }, {
    question: "What is the name of Michael's favorite cologne?",
    choices: [" Drakkar", " Polo", " Brut", " Nightswept"],
    correctAnswer: 3
  }];

// timer
timer = {};
seconds = {};
timeUp = 0;
timeRunning = false;

//Q&A
currentQuestion = 0;
correctAnswers = 0;
quizOver = false;

// end game scores
numAnswered = 0;
numCorrect = 0;
numWrong = 0;

// functions ------------------------------------

$(document).ready(function() {


// start button
	$(function () {
	    $("#playArea").hide();
	    $("#resultScreen").hide();
	 });


	$("#startBtn").click(function() {
	    $("#startPage").hide();
	    $("#playArea").show();
	    count = 90;
	    timer();
	});


// timer here	
	var count = 90;
	var counter = setInterval(timer, 1000);

	function timer() {
  		count = count - 1;
  		if (count <= 0) {
  			$('#playArea').hide();
    		$('#resultScreen').show();
    		$('#numAnswered').html(questions.length);
    		$('#numCorrect').html(correctAnswers);
    		$('numWrong').html(numWrong);
  		}

  	$('#timerDisplay').html(count);
	}

// Display the first question
    displayCurrentQuestion();

    $(this).find('#message').hide();


    $(this).find('#nextButton').on("click", function() {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

//if you dont make a selection a message will display
            if (value == undefined) {
                $(document).find('#message').text("Please select an answer");
                $(document).find('#message').show();
            } 
            else {
// dont show message if you select a choice
                $(document).find('#message').hide();

// if you get the question right you get a point and a message lets you know its correct
                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                    $(document).find('#message').text("Correct Answer!!");
                    $(document).find('#message').show();
                }

// if you get the question wrong your wrong answers score goes up, you dont get a point
// and a message pops up telling you that it was a wrong answer
                else if(value != questions[currentQuestion].correctAnswer) {
                	numWrong++;
                	$(document).find('#message').text("Wrong Answer!!");
                    $(document).find('#message').show();
                }

// If the current question is answered, display the next question

                currentQuestion++; 
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } 
// If you're done answering the questions...
                else {  
                    displayScore()
                    $(document).find('#nextButton').text("FINISH GAME");
                    quizOver = true;
                    $("#playArea").hide();
                    $("#resultScreen").show();
                }
            }
        } else { 
            quizOver = false;
            $(document).find('#nextButton').text("NEXT QUESTION");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("Displaying current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find("#questions");
    var choiceList = $(document).find("#choices");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

//Display all scores (answered questions, correct answers, wrong answers)
function displayScore() {
    $("#numAnswered").html(questions.length);
    $("#numCorrect").html(correctAnswers);
    $("#numWrong").html(numWrong);
}

//hides the results screen 
function hideScore() {
    $("#resultScreen").hide();
}

//resets the score values and questions
function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    numAnswered = 0;
    numWrong = 0;
    count = 0
}

//click the again button and reset the game
$('#againBtn').click(function() {
	$('resultScreen').hide()
	resetQuiz();
	hideScore();
	$('#startPage').show();
	displayCurrentQuestion();
	count = 90;
})
	



