$(document).on('ready',function(){
	console.log(data);
	var competitors = [];
	var score;
	var questionValue;
	currentPlayer = 0;
	counter = 0;
	turn = 1;

$('form').on('submit',function(e){ // Inputing the team names without Dulpicates in the competitors array
	e.preventDefault();
	console.log("it's working!");
	var teamname = $('#teamname').val();
	score = 0;
	function hasDuplicates(){ //checking if there are duplicates
		var teamname = $('#teamname').val();
		console.log(teamname);
		if (jQuery.inArray(teamname, competitors) === -1){
			competitors.push(teamname);
			$('#teamnames').append('<span data-num=' + counter + " class='list-group-item' id=" + teamname +' > ' + teamname + ' Score: ' + "<span class='score'>" +  score + '</span></span>');
			$('#addPoints').append('<button data-num=' + counter + ' type="button" class="btn btn-success addScore" id='+ teamname + ' data-dismiss="modal"> '+ teamname + '</button>');
			$('#subtractPoints').append('<button data-num=' + counter + ' type="button" class="btn btn-danger subtractScore" id=' + teamname +'>'+ teamname + '</button>');
			console.log("poo");
		}
		else { alert("Pick another team name!")};
	}
	hasDuplicates();
	function max5(){  //max to 5 players!
		if (competitors.length == 5) {
			alert("Start Game!");
		}
		return competitors.length;
		console.log(competitors.length);
	}
	max5();
	counter++;
	$('#teamname').val(""); // clear the value of the teamname input
});  // ending of the inputing the Team Name functions

$('#startgame').on('click', function(g) {  // Starting the Game!
	g.preventDefault();
	console.log("Game Starts!");
	$('nav').hide();
	$('span').first().addClass('active');
	boardGame();
}); // Ending of start game


function boardGame() {
	$('.question').click(function(){
		questionValue = this.innerText;
		console.log(questionValue);
		$(this).addClass("activate");
 	$('#question-Modal').modal('show');//fire modal
 	console.log("MODAL POPS UP");
 	$('#foot').append('<span id="timer" style="float:left; font-size: 20px"></span>');
 	var catagory1 = $(this).parent().attr("id");
 	console.log(catagory1);
 	var score1 = $(this).text();
 	console.log(score1);
 	$('.modal-title').text(catagory1 +'       '+ score1 +' pts');
		function showQuestion(){ //pushing the question to the MODAL
			for (var i = 0; i < data.length; i++) {
					// for (var p = 0; p < data.length; p++) {
						if (data[i].score == score1 && data[i].catagory == catagory1) {
							$('p.question').text(data[i].question);
							$('#vid').html(data[i].vid);
							$('p.answer').text(data[i].answer);

							$('#vanswer').html(data[i].vidanswer);
							var count = (data[i].count);
							var countdown=setInterval(timer, 1000); //1000 will  run it every 1 second
        					function timer()//function for the timer
        					{
        						$('#timer').text(count + " secs");
        						count--;
        						if (count <= -1)
        						{
        							clearInterval(countdown);
        						}
								} //<-----Ending of timer
								timer();
								$('#showAnswer').click(function(n){ //fires the answer modal
									n.preventDefault();
									clearInterval(countdown);
									console.log("Answer is Shown!");
    								});//<---- Ending showAnswer
								console.log(data[i].question);
								console.log("it works");

						} //<------end of data conditional
					}//<----end of for loop conditonal

			}//<----Ending of showQuestion
			showQuestion();
}); //<------Ending .question.click


$('.addScore').off('click').click(function(h) { //button that adds points to the player
	score = $(".score")[parseInt(this.getAttribute("data-num"))].innerText;

	$(".score")[parseInt(this.getAttribute("data-num"))].innerText = parseInt(score) + parseInt(questionValue);
	h.preventDefault();

	console.log("Remove Question!");
	$('.activate').empty().removeClass('active').css({'cursor':'not-allowed', 'pointer-events': 'none'}).prop('disabled', true);
	switchTurn();
	$('.embed-responsive').remove();
	$('.subtractScore').removeAttr('disabled');
	}); //<---- End adding points



$(".close").off('click').click(function(r){
	r.preventDefault();
	console.log("Closing the Modal");
	$('.activate').empty().removeClass('active').css({'cursor':'not-allowed', 'pointer-events': 'none'}).prop('disabled', true);
	switchTurn();
	$('.embed-responsive').remove();
	$('.subtractScore').removeAttr('disabled');

	});//<-----Ending of close



function switchTurn() { //changing the players as they go down!
	if (turn < competitors.length){
		$(".list-group-item").removeClass('active');
		$("span[data-num='" + turn + "']").addClass('active');
		turn ++;
	}
	else{
		$(".list-group-item").removeClass('active');  //resetting the active class
		$('span').first().addClass('active');
		turn = 1;
	}

}//<----Ending of switchTurn


$('.subtractScore').off('click').click(function(j) { //button that substract points to the player
	j.preventDefault();
	score = $(".score")[parseInt(this.getAttribute("data-num"))].innerText;
	$(".score")[parseInt(this.getAttribute("data-num"))].innerText = parseInt(score) - parseInt(questionValue);
	$(this).prop('disabled', true);
}); //<----End of Subtracting points



} //<------Ending boardGame
}); // Ending of docready