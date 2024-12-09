
// For variation jam assignement//
//Title: Will you Help Mr.White?//
//bye: Jorane Milot//

//Can you help Walter and his friend Jess hide his flour?//

//Opening state
let state = "Intro";

//Music
let music

// image variables
let walter;
let jesse;
let flour;
let backgroundHole;

//Speech Bubbles and title
let title;
let text1;
let text2;
let text3;

// Variables for the dialogue bubbles
let dialogue = [];
let dialogueIndex = 0;

// variables for the sand
let grid;
const CELL_WIDTH = 10;
let rows;
let cols;

function setup() {
  //Images
  walter = loadImage('./Assets/Walter White.png');
  jesse = loadImage('./Assets/Jesse Pinkman.png');
  flour = loadImage('./Assets/flour.png');  
  text1 = loadImage('./Assets/Dialogue Bubble 1.png'); 
  text2 = loadImage('./Assets/Dialogue Bubble 2.png'); 
  text3 = loadImage('./Assets/Dialogue Bubble 3.png'); 
  title = loadImage('./Assets/Game Title.png'); 
  backgroundHole = loadImage('./Assets/Background.png');

  //Music
  music = loadSound("./Assets/03. smoking jesse's pot (1).mp3");

  //Speech bubbles for intro state
  dialogue = [text1, text2, title];   

  createCanvas(1200, 950);
  createGrid();
}

//Creates the 2D array for the falling sand
function createGrid() { 
  cols = width / CELL_WIDTH;
  rows = height / CELL_WIDTH;

  //Outer array
  grid = []; 
  for (let i = 0; i < rows; i++) {
    //Inner array (for the sand)
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
    
}

// //Button to move into gameplay
// function help(){
//   state = "Gameplay";
// }

// //Button to move into gameplay
// function noHelp(){
//   state = "Loser Ending";
// }

// Generates grain of sand's colour pallette
function randomSandColor() {
  const sandColors = [
    color(227, 184, 140), // Lightest sand
    color(223, 181, 141), // Less light sand
    color(225, 172, 114), // Orange-ish Sand
    color(207, 158, 105), // darker orange-ish sand
    color(208, 172, 129), // Soft dark sand
    color(173, 134, 85)  // darkest sand
  ];

  // Return a random sand colour from teh colour pallette
  return random(sandColors);
}

function mousePressed() {
  // Advance the dialogue in the Intro state
  if (state === "Intro") {
    dialogueIndex++;

  //startes playing music
  if (!music.isPlaying()) {
    music.play(); 
    music.loop(); //Restarts music 
    music.setVolume(0.05); //Volume 
  }
  // Reset to 0 if we've gone through all dialogue images
  if (dialogueIndex >= dialogue.length) {
    dialogueIndex = 3; //limits the dialogue array
    state === "Gameplay";
  }
  //    //hide
  // if (dialogue[dialogueIndex] === (text1)) {
  //     helpButton.hide();
  //     noHelpButton.hide(); 
  //  } 
  } 
}

//Controls when sand goes down
function mouseDragged() {
  //Mainting it to stay inside the Canvas
  if (mouseX >= 0 && mouseX <= 1200 && mouseY >= 0 && mouseY <= 950 && state === "gameplay") {
    let x = int(mouseY / CELL_WIDTH);
    let y = int(mouseX / CELL_WIDTH);
    grid[x][y] = randomSandColor(); //Assigns the sand colour pallette
  }
}

//Draws the 2D array
function drawSand() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      //Check if sand exists
      if (grid[i][j] != 0) {
        fill(grid[i][j]);
        square(j * CELL_WIDTH, i * CELL_WIDTH, CELL_WIDTH);
      }
    }
  }
}

//Updates the grid to move the sand
function updateGrid() {
  for (let i = rows - 2; i >= 0; i--) {
    for (let j = cols - 1; j >= 0; j--) {
      //Sand falls down
      if (grid[i][j] != 0) {
        let below = grid[i + 1][j];
        if (below == 0) {
          grid[i + 1][j] = grid[i][j];
          grid[i][j] = 0;
        }
      }
    }
  }
}

// function drawButtons() {
//   //Buttons to start
//   let helpButton = createButton ("Help Mr.White");
//   helpButton.position (1170, 710);
//   helpButton.mousePressed(help);

//   //styling the button
//   helpButton.style("font-size", "40px");
//   helpButton.style("background-color", "#4CAF50");
//   helpButton.style("color", "white");

//   //Button to... lose
//   let noHelpButton = createButton ("Don't help Mr.White");
//   noHelpButton.position (1170,790);
//   noHelpButton.mousePressed(noHelp);

//   //styling the button
//   noHelpButton.style("font-size", "40px");
//   noHelpButton.style("background-color", "#4CAF50");
//   noHelpButton.style("color", "white"); 
// }

//Sets images
function draw() {
  background("gold"); 
  
  image(backgroundHole, 0, 0, width);
  image(walter, 0, 0, width);
  image(jesse, 0, 0, width);
  image(flour, 0, 0, width);

  noStroke();
  drawSand();
  updateGrid();

  //Current dialogue
  let currentDialogue = dialogue [dialogueIndex];

  // drawButtons();
  //   //shows buttons once on the title
  // if (dialogue[dialogueIndex] === (title)) {
  //     helpButton.show();
  //     noHelpButton.show(); 
  //}
  
  //Displays dialogue
  push();
    image(currentDialogue, 0, 0, width);
  pop();

  //States order
  if (state === "Intro") {
    showIntro();
  }
  else if (state === "Gameplay") {
    gameplay();
  }
  //if you manage to fill the hole and hide the flour
  else if (state === "Winning Ending") {  
    winningEnding();
  }
  //or
  //if you get caught or say no
  else if (state === "Loser Ending") {
    loserEnding();
  }
}

function showIntro() {

  image(backgroundHole, 0, 0, width);
  image(walter, 0, 0, width);
  image(jesse, 0, 0, width);
  image(flour, 0, 0, width);

  // Display current dialogue bubbles
  let currentDialogue = dialogue[dialogueIndex];

  push();
    image(currentDialogue, 0, 0, width);
  pop();
}

function Gameplay() {
  
}

function winningEnding() {
  
}

function loserEnding() {
  
}
