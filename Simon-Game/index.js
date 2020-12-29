
var gamepattern = [];
var userClickedPattern = [];
var started =false;
var buttonColors = ["red","blue","green","yellow"];
var level = 0;
$(".btn").on("click",function(){
  var dataId = $(this).attr("id");
  handler(dataId);
});
$(document).on("keypress",function(){
  nextSequence();
  started=true;
});

function handler(key){
  var userChosenColour=key;
  userClickedPattern.push(userChosenColour);
  $("#"+key).fadeOut(100).fadeIn(100);
  playSound(key);
  animatePress(key);
  checkAnswer(userClickedPattern.length-1);
}

function nextSequence(){
  $("h1").text("Level "+level);
  var random = Math.floor(Math.random()*10)%4;
  var randomchosenColour = buttonColors[random];
  gamepattern.push(randomchosenColour);
  $("#"+randomchosenColour).fadeOut(100).fadeIn(100);
  playSound(randomchosenColour);
  animatePress(randomchosenColour);
  level++;
}

function playSound(key){
  var audio = new Audio('sounds/'+key+'.mp3');audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){$("."+currentColour).removeClass("pressed");},100);
}

function checkAnswer(currentlevel){
  if(userClickedPattern[currentlevel]!==gamepattern[currentlevel]){
    level=0;
    started = false;
    gamepattern=[];
    userClickedPattern=[];
    $("h1").text("Game Over !! Press A Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
  }else{
    if(currentlevel === level-1){
      setTimeout(nextSequence,1000);
      userClickedPattern=[];
    }
  }
}
