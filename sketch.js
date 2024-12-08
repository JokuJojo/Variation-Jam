
// For variation jam assignement//
//Title: Walter the Explorer//
//bye: Jorane Milot//

//Can you help Walter and his friend Jess hide his flour?//

//Opening state
let state = "Menu Screen";


//Music
let music


// image variables
let walter;
let jesse;
let flour;
let backgroundHole;

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
  backgroundHole = loadImage('./Assets/Background.png');

  //Music
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

  // Return a random sand colour from teh colour pallette
  return random(sandColors);
}

function mousePressed() {
  if (!music.isPlaying()) {
    music.play(); // Start playing the music when the user clicks
    music.loop(); //Restarts music 
  }
}



//Controls when sand goes down
function mouseDragged() {
  //Mainting it to stay inside the Canvas
  if (mouseX >= 0 && mouseX <= 1200 && mouseY >= 0 && mouseY <= 950) {
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


  //States order
  if (state === "Menu screen") {
    showMenuScreen();
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

function showMenuScreen() {
  image(backgroundHole, 0, 0, width);
  // text("Help Mr.White.", width / 2, height / 2);
}

function gameplay() {
  
}

function winningEnding() {
  
}

function loserEnding() {
  
}
