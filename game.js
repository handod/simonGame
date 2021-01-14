var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var numberPressed = 0;

$(".btn").click(function() {
  numberPressed += 1;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(level);
});

function nextSequence() {
  level += 1;
  $("h1").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function(e) {
  if (level == 0) {
    $("h1").text("Level 0");
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  for (var i = 0; i < numberPressed; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      console.log("wrong");
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
      return;
    }
  }
  if (numberPressed == currentLevel) {
    console.log("success");
    numberPressed = 0;
    setTimeout(nextSequence, 1000);
    console.log(userClickedPattern)
    console.log(gamePattern)
    userClickedPattern = [];
  }
}

function startOver() {
  userClickedPattern = []
  gamePattern = []
  level = 0;
  numberPressed = 0;
}
