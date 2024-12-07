// image variables
let backgroundBB;

// variables for the sand
let grid;
const CELL_WIDTH = 10;
let rows;
let cols;

function setup() {
  backgroundBB = loadImage('./Assets/bg_bb.png');
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

//Controls when sand goes down
function mouseDragged() {
  //Mainting it to stay inside the Canvas
  if (mouseX >= 0 && mouseX <= 1200 && mouseY >= 0 && mouseY <= 950) {
    let x = int(mouseY / CELL_WIDTH);
    let y = int(mouseX / CELL_WIDTH);
    grid[x][y] = "gold";
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

}

function draw() {
  background("brown");
  image(backgroundBB, 0, 0, width);

  noStroke();
  drawSand();
  updateGrid();
}
