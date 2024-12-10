
/**
 * Will You Help Mr.White?
 * Jorane Milot
 * 
 * A game where you help Mr.White and his best friend Jesse, 
 * hide their flour in a hole by filling it up with sand!
 * 
 * Controls: 
 * - Drag your mouse to drop sand in the hole
 * - Avoid getting caugt by the dog til it's full
 * 
 * Uses:
 * p5.js
 * https://p5js.org
 */

//Opening state
let state = "Intro";

//Music Variable
let music

//Image's variables
let walter;
let jesse;
let flour;
let backgroundHole;

//Speech Bubbles and title (Images)
let title;
let text1;
let text2;
let text3;

// variables for the sand
let grid;
const CELL_WIDTH = 10;
let rows;
let cols;

function setup() {
  //Images used
  walter = loadImage('./Assets/Walter White.png');
  jesse = loadImage('./Assets/Jesse Pinkman.png');
  flour = loadImage('./Assets/flour.png');  
  text1 = loadImage('./Assets/Dialogue Bubble 1.png'); 
  text2 = loadImage('./Assets/Dialogue Bubble 2.png'); 
  text3 = loadImage('./Assets/Dialogue Bubble 3.png'); 
  title = loadImage('./Assets/Game Title.png'); 
  lost = loadImage('./Assets/Lost.png'); 
  victory = loadImage('./Assets/Victory.png'); 
  dober = loadImage('./Assets/Police Dog.png'); 
  backgroundHole = loadImage('./Assets/Background.png');

  //Loads the music
  music = loadSound("./Assets/03. smoking jesse's pot (1).mp3");

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

  // Returns a random sand colour from the colour pallette
  return random(sandColors);
}

//Causes music to start once user clicks
function mousePressed() {
  //startes playing music
  if (!music.isPlaying()) {
    music.play(); 
    music.loop(); //Restarts music after finished
    music.setVolume(0.05); //adjust volume
  }
} 

//Controls when sand goes down
function mouseDragged() {
  //Mainting it to stay inside the Canvas, and also within the gameplay state
  if (mouseX >= 0 && mouseX <= 1200 && mouseY >= 0 && mouseY <= 950 && state === "Gameplay") {
    let x = int(mouseY / CELL_WIDTH);
    let y = int(mouseX / CELL_WIDTH);
    grid[x][y] = randomSandColor(); //Assigns the sand colour pallette
  }
}

//Draws the 2D array
function drawSand() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      //Checks if sand exists
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
      //Makes sand fall down
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

function draw() {
  background("gold"); 
  
  //Places the images
  image(backgroundHole, 0, 0, width);
  image(walter, 0, 0, width);
  image(jesse, 0, 0, width);
  image(flour, 0, 0, width);

  noStroke();
  drawSand();
  updateGrid();

  //States order
  if (state === "Intro") {
    showIntro();
  }
  //Next dialogue
  else if (state === "Intro2") {
    intro2();
  }
  //Game title
  else if (state === "Title") {
    titleState();
  }
  //Explains how game works
  else if (state === "Gameplay Intro") {
    gameplayIntro();
  }
  //Gamplay starts
  else if (state === "Gameplay") {
    drawGameplay();
  }
  //if you manage to fill the hole and hide the flour
  else if (state === "Winning Ending") {  
    winningEnding();
  }
  //or
  //if you get caught
  else if (state === "Loser Ending") {
    loserEnding();
  }
}

//All of the state's functions
function showIntro() {
  image(backgroundHole, 0, 0, width);
  image(walter, 0, 0, width);
  image(jesse, 0, 0, width);
  image(flour, 0, 0, width);
  image(text1, 0, 0, width);

  //Change dialogue forward
  if (mouseIsPressed){
    state = "Intro2";
    mouseIsPressed = false;
  }
}

//Second peice of dialogue
function intro2() {
  image(text2, 0, 0, width);

    //Title
    if (mouseIsPressed){
      state = "Title";
      mouseIsPressed = false;
    }
}

//Shows title
function titleState() {
  image(title, 0, 0, width);

    //Introduces how to play game
    if (mouseIsPressed){
      state = "Gameplay Intro";
      mouseIsPressed = false;
    }
}

//Introduces the game instructions
function gameplayIntro() {
  image(text3, 0, 0, width);

   //Turns to the game
   if (mouseIsPressed){
    state = "Gameplay";
    mouseIsPressed = false;
  }
}

//The game itself, sand in hole 
function drawGameplay() {
  drawSand();  
  randomSandColor();
  updateGrid();

}

//Good ending, you won!
function winningEnding() {
  
}

//bad ending, you lost.
function loserEnding() {
  
}

