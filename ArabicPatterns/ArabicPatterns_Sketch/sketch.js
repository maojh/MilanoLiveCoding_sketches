//Islamic Pattern demo
//Octagonal grid
/*Options: press... 
v  to View mode: single/tessellation 
g  to View Grid overlay
p  to View Pattern
s  to Save view
c  to Change palette
Move mouseX to change module size in Tessellation Mode
*/

//Add your palettes here as:
//Background color, layer 1, layer2, grid
let palettes = [
  ['#e44256', '#ffd166','#ff9360','#00b1b0'], 
  ['#006d77', '#ffddd2','#83c5be','#e29578'],
  ['#6930c3', '#48bfe3','#80ffdb','#ffc8dd'],
  ['#333', '#eee','#333','#fff']
];
let cID = 0;
let cols = palettes[cID];

//UI variables
let viewMode = false
let patternRatio = 4;
let showLayers = [true, true, true]; //1, 2, 3
let patternOn = true; //0: none, 1: grid
let gridOn = true; //0: none, 1: pattern

function setup() {
  createCanvas(400, 400);

  moduleSize = width / 2;
  patternSize = width / patternRatio;
}

function draw() {
  background(255);

  if (viewMode) {
    showModule();
  } else {
    showGrid();
  }

  patternRatio = int(map(mouseX, 0, width, 2, 10))
  
  // noLoop();
}


function showModule() {

  push();
  translate(width / 2, height / 2);
  scale(0.5);
  background(250);
  drawModule();
  pop();
}

function showGrid() {
  push();
  // translate(-width/4,-height/4);
  drawGrid();
  pop();
}

function drawModule() {

  let side1 = width;
  let side2 = width / sqrt(PI / 1.85)
  let side3 = width / sqrt(PI / 0.9)
  let fct3 = sqrt(2)
  let v = 250;
  let a = 250;

  push();
  if (showLayers[0]) {
    //layer 1
    rotate(0);
    if (patternOn) {
      // noStroke();
      fill(red(cols[0]), green(cols[0]), blue(cols[0]), a);
    } else {
      noFill()
    }
    if (gridOn) {
      stroke(red(cols[3]), green(cols[3]), blue(cols[3]), a);
      strokeWeight(4);
    } else {
      noStroke()
    }
    rect(-side1 / 2, -side1 / 2, side1, side1);

  }
  pop();

  push();
  if (showLayers[1]) {
    //layer 2
    rotate(PI / 8);

    if (patternOn) {
      fill(red(cols[1]), green(cols[1]), blue(cols[1]), a)
    } else {
      noFill()
    }
    if (gridOn) {

      strokeWeight(4);
      //diagonals
      stroke(red(cols[3]), green(cols[3]), blue(cols[3]), a);
      line(-side2 / 2, -side2 / 2, side2 / 2, side2 / 2);
      line(side2 / 2, -side2 / 2, -side2 / 2, side2 / 2);
    } else {
      noStroke()
    }

    rect(-side2 / 2, -side2 / 2, side2, side2)

  }
  pop();

  push();
  if (showLayers[2]) {
    //layer 3
    rotate(PI / 4 + PI / 8);

    if (patternOn) {
      noStroke()
      fill(red(cols[2]), green(cols[2]), blue(cols[2]), a)
      rect(-side3 / 2, -side3 / 2, side3, side3);
    } else {
      noFill()
    }

    if (gridOn) {
      // diagonals
      strokeWeight(2);
      stroke(red(cols[3]), green(cols[3]), blue(cols[3]), a);
      line(-side3 / fct3, -side3 / fct3, side3 / fct3, side3 / fct3);
      line(side3 / fct3, -side3 / fct3, -side3 / fct3, side3 / fct3);

      stroke(red(cols[3]), green(cols[3]), blue(cols[3]), a);
      line(-side3 / 2, -side3 * 1.2, -side3 / 2, side3 * 0.8)
      line(side3 / 2, -side3 * 0.8, side3 / 2, side3 * 1.2)

      rotate(PI / 2)
      line(-side3 / 2, -side3 * 1.2, -side3 / 2, side3 * 0.8)
      line(side3 / 2, -side3 * 0.8, side3 / 2, side3 * 1.2)
    } else {
      noStroke();
    }
    

  }
  pop();


}

function drawGrid() {

  push()
  scale(1 / patternRatio);
  translate(moduleSize, moduleSize);
  let h = 0;
  for (let i = 0; i < patternRatio; i++) {
    push()
    translate(0, i * moduleSize * 2);

    if(i % 2 == 0) {
      scale(1,-1)
      for (let j = 0; j < patternRatio; j++) {
        push()
        translate(j * moduleSize * 2, 0)
        if (h % 2 == 0) {
          drawModule();
        } else {
          scale(-1, 1);
          drawModule();
        } 
        h++;
        pop()
      }      
    } else {
            for (let j = 0; j < patternRatio; j++) {
        push()
        translate(j * moduleSize * 2, 0)
        if (h % 2 == 0) {
          drawModule();
        } else {
          scale(-1, 1);
          drawModule();
        } 
        h++;
        pop()
      }      
    }
    
    pop()
  }
  pop()
}

function keyPressed() {
  if (key == "s") {
    save();

  } else if (key == "v") {
    viewMode = !viewMode;
  
  } else if(key == "g") {
    gridOn = !gridOn;
  
  } else if(key === "p") {
    patternOn = !patternOn;
  
  } else if(key==1) {
   showLayers[key-1] = !showLayers[key-1] 
  
  } else if(key==2) {
   showLayers[key-1] = !showLayers[key-1] 
  
  } else if(key==3) {
   showLayers[key-1] = !showLayers[key-1] 
  
  } else if (key=="c") {
    cID++;
  
    if(cID >= palettes.length) cID = 0;
    
    cols = palettes[cID];
    print("changed palette " + cID )
  }
}