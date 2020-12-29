function random(){
  var num=Math.floor(Math.random()*6+1);
  return num;
}
function call(){
  var num1=random();
  var num2=random();
  var diceimg1= "images/dice"+num1+".png";
  var diceimg2= "images/dice"+num2+".png";
  document.querySelector(".img1").setAttribute("src",diceimg1);
  document.querySelector(".img2").setAttribute("src",diceimg2);
  if(num1>num2){
    document.querySelector("h1").innerHTML="🚩  Player1 Wins";
  }else if(num1===num2){
    document.querySelector("h1").innerHTML="Draw !";
  }else{
    document.querySelector("h1").innerHTML="Player2 Wins  🚩";
  }
}
call();
