
//-----------------------------------VARIABLES------------------------------
var playerTurn
var gameStateArray

//-----------------------------------FUNCTIONS------------------------------
function init(){
  playerTurn = 1
  //in gameStateArray, 0 is unclaimed, 1 is pl1, -1 is pl2
  gameStateArray = [[0,0,0],[0,0,0],[0,0,0]]
}
function checkWin(){
  let sum = 0
  //sum through 8 loops
  //returns 0 for no winner, 1 for p1, -1 for p2

  //for each of x, each of y and each of z (rows)
  for (eachRow of gameStateArray){
    sum = 0
    for (eachVal of eachRow){
      sum += eachVal
    }
    if (sum == 3) return 1
    if (sum == -3) return -1
  }
  //for each of nth element of x and y and z (columns)
  for (let i=0; i<3; i++){
    sum = 0
    for (let j=0; j<3; j++){
      sum += gameStateArray[j][i]
     }
    if (sum == 3) return 1
    if (sum == -3) return -1
  }
  //for each nth(n+1 each loop) -negative diag
  sum = 0
  for (let k=0; k<3; k++){
    sum += gameStateArray[k][k]
  }
  if (sum == 3) return 1
  if (sum == -3) return -1
  sum = 0
  //for each nth(n+1) (2-n,n) -positive diag
  for (let l=0; l<3; l++){
    sum += gameStateArray[2-l][l]
  }
  if (sum == 3) return 1
  if (sum == -3) return -1
  else return 0
  //else return 0 if no winners
}

//Check tie
function checkTie(){
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      if (gameStateArray[i][j] === 0)return false;
    }
  }
  return true;
}

//Render Function
function render(){
  //----------render of grid----------------------------
  //loop through each row and column of game state array
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      //convert index of game state array to an ID - to target the ID of button being rendered
      let buttonID = `${i},${j}`;
      //render button depending on value at the game state array index (X for 1, 0 for -1, blank for 0)
      if (gameStateArray[i][j] === 0){
        document.getElementById(buttonID).innerHTML = "";
      }
      if (gameStateArray[i][j] === 1){
        document.getElementById(buttonID).innerHTML = "X";
      }
      if (gameStateArray[i][j] === -1){
        document.getElementById(buttonID).innerHTML = "O"
      }
    }
  }
  //-------------render of Player turn-----------------
  const player1Tag = document.getElementById("player1");
  const player2Tag = document.getElementById("player2");
  if (playerTurn===1){
    player1Tag.setAttribute("class", "player-turn-on");
    player2Tag.setAttribute("class", "player-turn-off");
  } else {
    player1Tag.setAttribute("class", "player-turn-off");
    player2Tag.setAttribute("class", "player-turn-on");
  }
}

init()
//-----------------------------------EVENT LISTENERS------------------------------
const buttons = document.getElementById("buttons-container")
//Winner popups
var popup1 = document.getElementById("popup1");
var popup2 = document.getElementById("popup2");
var popup3 = document.getElementById("popup3");

//event listener for player place choice.  Function updates game state and calls render
buttons.addEventListener("click", function(evt){
  // console.log("Button listener code running")
  const button = evt.target
  //getting coordinates and converting to ints
  let buttonCo = evt.target.id
  let temp = buttonCo.split(",")
  
  temp[0] = parseInt(temp[0])
  temp[1] = parseInt(temp[1])
  //check if already selected
  if (gameStateArray[temp[0]][temp[1]] !== 0) return
 
  //adjust game state
  gameStateArray[temp[0]][temp[1]] = playerTurn
  //alternate player turn
  playerTurn = playerTurn * -1

  render();
  //check if winner, init if true
  let win = checkWin()
  
  if (win == 1) {
    popup1.style.display = "block";
    init()
  }
  if (win == -1){
    popup2.style.display = "block";
    init()
  }
  //----------testing tie--------------------
  if (checkTie()){
    popup3.style.display = "block";
    init()
  }
})

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  popup1.style.display = "none";
  render()
}

var span = document.getElementsByClassName("close")[1];
span.onclick = function() {
  popup2.style.display = "none";
  render()
}

var span = document.getElementsByClassName("close")[2];
span.onclick = function() {
  popup3.style.display = "none";
  render()
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
  if (event.target == popup1) {
    popup1.style.display = "none";
  }
  if (event.target == popup2) {
    popup2.style.display = "none";
  }
  if (event.target == popup3) {
    popup3.style.display = "none";
  }
}

//Reset Button- resets game variables and renders
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function(evt){
  init();
  render();
});

