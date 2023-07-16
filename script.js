var colors = ["green", "red", "yellow", "blue"];
var userClickedPattern = [];
var gamePattern = [];
var count = 0;

function animatePress(current) {
  $(`#${current}`).addClass("pressed");
  setTimeout(function () {
    $(`#${current}`).removeClass("pressed");
  }, 100);
}
function playSound(sound) {
  new Audio(`./sounds/${sound}.mp3`).play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("h1").text("Game Over, Press Start button to Restart");
    new Audio("./sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    count = 0;
    gamePattern = [];
    userClickedPattern = [];
  }
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  count += 1;
  $("h1").text(`Level ${count}`);
  var randomNum = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNum];
  gamePattern.push(randomColor);

  $(`#${gamePattern[gamePattern.length - 1]}`)
    .fadeOut(100)
    .fadeIn(100);

  playSound(gamePattern[gamePattern.length - 1]);
}

$("#start").click(function () {
  if (count === 0) {
    nextSequence();
  }
});

$("#reset").click(function () {
  count = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("h1").text("Press Start Button to Play");
});
