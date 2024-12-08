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
  walter = loadImage('./Assets/Walter White.png');
  jesse = loadImage('./Assets/Jesse Pinkman.png');
  flour = loadImage('./Assets/flour.png');  
  backgroundHole = loadImage('./Assets/Background.png');

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

  // Return a random sand colour from the list
  return random(sandColors);
}


//Controls when sand goes down
function mouseDragged() {
  //Mainting it to stay inside the Canvas
  if (mouseX >= 0 && mouseX <= 1200 && mouseY >= 0 && mouseY <= 950) {
    let x = int(mouseY / CELL_WIDTH);
    let y = int(mouseX / CELL_WIDTH);
    grid[x][y] = randomSandColor(); // Assign a random beige color to the sand;
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

function draw() {
  background("gold");
  image(backgroundHole, 0, 0, width);
  image(walter, 0, 0, width);
  image(jesse, 0, 0, width);
  image(flour, 0, 0, width);


  noStroke();
  drawSand();
  updateGrid();
}
