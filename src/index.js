var grid;
var columns; 
var rows;
var counter;  
var resolution = 20;
var state = false;
var fr = 10;
var generation = 0;

function gameBoard(columns, rows){
    var arr = new Array(columns);
    for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
        }
    return arr
}

function changeState() {
    state = !state;
}

function clearBoard() {
    columns = width / resolution;
    rows = height / resolution;
    grid = gameBoard(columns, rows);
  
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = 0;
            generation = 0 
        }
    }
 }

 function resetCanvas(){
    columns = width / resolution;
    rows = height / resolution;
    grid = gameBoard(columns, rows);
    
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
            }
    }
 }

function setup() {
    createCanvas(800, 600);
    resetCanvas()// create a ramdom pattern of squares 
    frameRate(fr);
     
    button = createButton("Start/Stop");
    button.mousePressed(changeState); 
    
    clear = createButton("Clear")
    clear.mousePressed(clearBoard)
    
    scramble = createButton("Random")
    scramble.mousePressed(resetCanvas)
  
    glider = createButton("Glider")
    glider.mousePressed(createGlider)

    tetrotmino = createButton("Tetromino")
    tetrotmino.mousePressed(createTetromino)   
    
    spaceship = createButton("Spaceship")
    spaceship.mousePressed(createSpaceship)
}

function draw() {
    frameRate(fr);
    background(190,190,190);
  
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            var x = i * resolution;
            var y = j * resolution;
            
            if (grid[i][j] == 1) {
                fill(0,0,0);
                stroke(255);
                rect(x, y, resolution - 1, resolution - 1);
                text("Frame Rate: " + fr, 120, 90);
                text("Generation: " + generation,  520, 90);
                textSize(20);
            }
        }
    }

    if(state == true) {
        start();
    }
}
  
function start() {
    var next = gameBoard(columns, rows);
        for (var i = 0; i < columns; i++) {
            for (var j = 0; j < rows; j++) {
                var state = grid[i][j];
                // Evaluate neighbors
                var neighbors = countNeighbors(grid, i, j);
            
                if (state == 0 && neighbors == 3) {
                    next[i][j] = 1;
                } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
            }
        }

    grid = next;
    generation ++;
    console.log(generation)
}

function countNeighbors(grid, x, y) {
    var sum = 0;
    
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            var col = (x + i + columns) % columns;
            var row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function touch() {
    var x = floor(mouseX / resolution);
    var y = floor(mouseY / resolution);
    console.log(x)
    //toggle squares

    if( x < 44) {
        if(grid[x][y] == 1) {
            grid[x][y] = 0;
        } else if(grid[x][y] == 0) {
            grid[x][y] = 1;
            console.log(x)
        }
    } else {
        //keep it blank
    }
}

function mouseClicked() {
    touch();
}

function keyPressed(){
    if(keyCode === UP_ARROW) {
        fr++;
    } else if(keyCode === DOWN_ARROW) {
        fr--;
    }
}

function createGlider() {
    grid[floor(columns/2) -1][floor(rows/2) -1] = 1;
    grid[floor(columns/2) -1][floor(rows/2)   ] = 1;
    grid[floor(columns/2) -1][floor(rows/2) +1] = 1;
    grid[floor(columns/2)   ][floor(rows/2) +1] = 1;
    grid[floor(columns/2) +1][floor(rows/2)   ] = 1;
}

function createTetromino() {
    grid[floor(columns/6) -1][floor(rows/3) +3] = 1;
    grid[floor(columns/6) -2][floor(rows/3) +3] = 1;
    grid[floor(columns/6) -3][floor(rows/3) +3] = 1;
    grid[floor(columns/6) -2][floor(rows/3) +2] = 1; 
}

function createSpaceship() {
    grid[floor(columns/8) +3][floor(rows/3) -3] = 1;
    grid[floor(columns/8) +3][floor(rows/4) -2] = 1;
    grid[floor(columns/8) -1][floor(rows/4) -2] = 1;
    grid[floor(columns/9) -1][floor(rows/7) +2] = 1;
    grid[floor(columns/7) +1][floor(rows/5) +2] = 1;
    grid[floor(columns/7) +1][floor(rows/5) +2] = 1;
    grid[floor(columns/6) +1][floor(rows/6) +3] = 1;
    grid[floor(columns/6) -2][floor(rows/6) +3] = 1;
    grid[floor(columns/6) -3][floor(rows/6) +3] = 1;
    grid[floor(columns/6) -3][floor(rows/6) +2] = 1;
    grid[floor(columns/6) -1][floor(rows/6) +3] = 1;
}