// 1. opening page loads
// 2. read instructions then click start to start game
// 3. intro is hidden and playArea is shown
// 4. timer starts
// 5. user will answer multiple choice questions
// 6. 4 answers will be displayed, if the users choice is correct, a point is awarded.
// 7. if answer is incorrect, no points will be awarded, number of wrong answers are recorded. 
// 8. number of questions answered are recorded
// 9. when time runs out, resultScreen will be displayed tallying all of the results
// 10. if user finishes answering the questions, resultScreen will be displayed tallying the results
// 11. click restart and restart the game 

// variables------------------------------------

// timer
timer = {};
seconds = {};
timeUp = 0;
timeRunning = false;

var intervalId;

// questions & answers
wrongAnswer = "";
rightAnswer = "";

// end game scores
numAnswered = 0;
numCorrect = 0;
numWrong = 0;

// functions ------------------------------------

$(document).ready(function() {

// // start button
// $(function () {
//     $("#playArea").hide();
//     music.play()
//     music.addEventListener('ended', function() {
//     this.currentTime = 0;
//     this.play();
// 	}, false);
//  });


// $("#startbtn").click(function() {
//     $("#startPage").hide();
//     $("#playArea").show();
// });


// timer here	
	var count=90;
	var counter=setInterval(timer, 1000);

	function timer() {
  		count=count-1;
  		if (count <= 0) {
    	//clearInterval(counter);
    	$("#resultScreen").show();
  		}

  	$('#timerDisplay').html(count);
	}


// answers

	function submitAnswers(){

		var q1 = document.forms["quizForm"]["q1"].value;
		$('#submitBtn').click(function() {
			alert(q1);
		});

	}



	// correctAnswer = ('#caQ1');

	// function correctAnswer() {
	// 	$('#caQ1').click(function() {
	// 		if(correctAnswer === true) {
	// 			numCorrect += 1;
	// 			$('#numCorrect').html(numCorrect);
	// 			numAnswered += 1;
	// 			$('#numAnswered').html(numAnswered);
	// 		}
	// 	})
	// }


});