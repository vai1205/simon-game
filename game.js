var gamePattern = [];
var userPattern = [];
var colorArray = ["green", "red", "blue", "yellow"];
var level = 0;
var scoreCounter;
var starter = true;
var previouslyPlayed = false;
$("body").on("keypress", function() {
  if (starter) {
    if (previouslyPlayed){
      if(!scoreCounter){
        $("#score-display").text("Last score: "+ 0);
      } else {
        $("#score-display").text("Last score: "+ scoreCounter);
      }
    }
    starter = false;
    nextSequence();
  }
});

function nextSequence() {
  level++;
  userPattern = [];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colorArray[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomColor);
}

function makeSound(randomColor) {
  var audio = new Audio("sounds/" + randomColor + ".mp3");
  audio.play();
}

function animateButton(selectedColor) {
  $("#" + selectedColor).addClass("pressed");
  setTimeout(function() {
    $("#" + selectedColor).removeClass("pressed");
  }, 100);
}

$(".btn").on("click", function() {
  var selectedColor = $(this).attr("id");
  userPattern.push(selectedColor);
  makeSound(selectedColor);
  animateButton(selectedColor);
  checkAnswer(userPattern.length - 1);
});

function checkAnswer(index) {
if (gamePattern[index]===userPattern[index]){
  console.log("success");
  if (gamePattern.length === userPattern.length){
    setTimeout(function(){
      nextSequence();
    },500);
  }
}
else{
  alert ("wrong move buddy!");
  $("#level-title").text("Game over. Press any key to restart!");
  previouslyPlayed = true;
  $("#score-display").css("visibility","visible");
  if (level === 1){
  $("#score-display").text("Your score: "+ 0);
} else{
  scoreCounter = level -1;
  $("#score-display").text("Your score: "+ scoreCounter);
}
  var audio = new Audio ("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
  $("body").removeClass("game-over");
  },200);
  startAgain();
}
}
function startAgain (){
  starter = true;
  level = 0;
  gamePattern = [];
}
