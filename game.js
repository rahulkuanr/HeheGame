let buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

//checking the answer when user clicks a button
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 500);
    $("h1").text("Game Over, Press any key to restart");
    startOver();
  }
}

//called to restat the game
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
}

//called first time when game starts then if user enters correct sequence
function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randonchosenColor = buttonColors[randomNumber];
  gamePattern.push(randonchosenColor);
  $("#" + randonchosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randonchosenColor);
  level++;
  $("h1").text("Level " + level);
}

//everytime when user click a button
$(".btn").click((event) => {
  let userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  let audio = new Audio("assets/sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Start the game
$(document).on("keypress", () => {
  if (!started) {
    nextSequence();
    started = true;
  }
});
