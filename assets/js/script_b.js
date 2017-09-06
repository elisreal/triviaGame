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

// Question Arrays
(function() {
  var questions = [{
    question: "What is Michael Scott's middle name?",
    choices: ["Kurt", "Gary", "Devon", "Morgan"],
    correctAnswer: "Garry"
  }, {
    question: "What is the exclusive club that Pam, Oscar, and Toby establish in the episode 'Branch Wars'?",
    choices: ["The Party Planning Committee", "Kevin and the Zits", "The Finer Things Club", "Here Comes Treble"],
    correctAnswer: "The Finer Things Club"
  }, {
    question: "The actor who plays quality-assurance man Creed Bratton is in fact named Creed Bratton in real life. He was also in a band that was popular in the late 1960s and 1970s. Which band was it?",
    choices: ["Lynard Skynard", "The Mamas and the Papas", "The Eagles", "The Grassroots"],
    correctAnswer: "The Grassroots"
  }, {
    question: "Dwight owns and runs a farm in his spare time. What does this farm primarily produce?",
    choices: ["Goats", "Beets", "Corn", "Potatoes"],
    correctAnswer: "Beets"
  }, {
    question: "The members of the Stamford branch play what video game with each other that started as a 'team building exercise'?",
    choices: ["Call of Duty", "Halo", "Battlefield", "Super Smash Bros."],
    correctAnswer: "Call of Duty"
  }, {
    question: "In season 3, what product did Jim tell Dwight he could get at Sharper Image?",
    choices: ["A massage chair", "A Cross-Bow", "Gaydar", "A Pewter Wizard"],
    correctAnswer: "Gaydar"
  }, {
    question: "Jim knows the flavor of yogurt that Pam likes best, but what is it?",
    choices: ["Mixed Berries", "Strawberry", "Vanilla", "Plain"],
    correctAnswer: "Mixed Berries"
  }, {
    question: "In season three's 'Safety Training' episode, what piece of warehouse equipment was Darryl stressing the danger of?",
    choices: ["The forklift", "A trampoline", "A bailer", "A ladder"],
    correctAnswer: "A bailer"
  }, {
    question: "What is Erin Hannon's middle name?",
    choices: ["Ashley", "Erin", "Kelly", "Noel"],
    correctAnswer: "Erin"
  }, {
    question: "What is the name of Michael's favorite cologne?",
    choices: ["Drakkar", "Polo", "Brut", "Nightswept"],
    correctAnswer: "Nightswept"
  }];

// timer
timer = {};
seconds = {};
timeUp = 0;
timeRunning = false;

//Q&A
var questionCounter = 0; 
var selections = []; 
var game = $('#game');

// end game scores
numAnswered = 0;
numCorrect = 0;
numWrong = 0;

// functions ------------------------------------

	displayNext();

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


	// Questions load here
	function createQuestionElement(index) {
	    var questionElement = $('<div>', {
	    	id: 'question'
	    });
	    
	    var question = $('<p>').append(questions[index].question);
	    questionElement.append(question);
	    
	    var radioButtons = createRadios(index);
	    questionElement.append(radioButtons);
	    
	    return questionElement;
	  }
	  
	  // Makes choices radio list
	  function createRadios(index) {
	    var radioList = $('<ul>');
	    var item;
	    var input = '';
	    for (var i = 0; i < questions[index].choices.length; i++) {
	      item = $('<li>');
	      input = '<input type="radio" name="answer" value=' + i + ' />';
	      input += questions[index].choices[i];
	      item.append(input);
	      radioList.append(item);
	    }
	    return radioList;
	  }

	  function choose() {
	    selections[questionCounter] = +$('input[name="answer"]:checked').val();
	  }
	  
	  // Displays next question
	  function displayNext() {
	    game.fadeOut(function() {
	      $('#question').remove();
	      
	      if(questionCounter < questions.length){
	        var nextQuestion = createQuestionElement(questionCounter);
	        game.append(nextQuestion).fadeIn();
	        if (!(isNaN(selections[questionCounter]))) {
	          $('input[value='+selections[questionCounter]+']').prop('checked', true);
	        }
	        
	        // Controls display of 'prev' button
	        if(questionCounter === 1){
	          $('#prev').show();
	        } else if(questionCounter === 0){
	          
	          $('#prev').hide();
	          $('#next').show();
	        }
	      }else {
	        var scoreElem = displayResults();
	        game.append(scoreElem).fadeIn();
	        $('#next').hide();
	        $('#prev').hide();
	        $('#start').show();
	      }
	    });
	  }
	  
	  // Results 
	  function displayResults() {
	    var score = $('<p>',{id: 'question'});
	    
	    var numCorrect = 0;
	    for (var i = 0; i < selections.length; i++) {
	      if (selections[i] === questions[i].correctAnswer) {
	        numCorrect++;
	      }
	    }
	    
	    $('#numAnswered').html(questions.length);
	    $('#numCorrect').html(numCorrect);
	  }
})();