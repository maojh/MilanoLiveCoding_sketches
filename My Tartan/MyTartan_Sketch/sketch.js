//Procedural tartan experiment
// by Alka Cappellazzo and Matteo Testa

//change this to TRUE for animation mode
let animation = true;
//Press 's' to save the pattern

let colors = ['#000254','#006534','#990000','#ff9999','#029d29','#0197d0','#ec2023','#1a1850','#023233','#ec2023','#d2a385'];
let currColors = [];

function setup() {
  createCanvas(400, 400);
  background(255);
  // noLoop();
  frameRate(10);

  pickColors();
  
  background(currColors[3]);
}

let c = 0;
let cend = 600;

function draw() {
  if(animation) {
  // Vertical large lines with opacity
    let s = 30+4*c;
    stroke(currColors[0]+'99');
    strokeWeight(20);
    line(s - 10, 0, s - 10, 600);
    
    // Horizontal large ellipse with opacity
    for (var sx = 0; sx < 600; sx += 4) {
      stroke(currColors[1]+'88');
      strokeWeight(1);
      fill(255,15);
      arc(sx,s, 20, 20, QUARTER_PI, HALF_PI+PI);
      // ellipse(sx, s, 20, 20);
    }
  
  // Vertical small black lines
    let ff = c*4 +10;
    stroke(currColors[0]+'88');
    strokeWeight(1);
    line(ff, 0, ff, 600);

  
  // Horizontal large lines
     let hl = c*8 + 30;
      strokeWeight(10);
      stroke(currColors[1]+'88');
      line(0, hl, 600, hl);      
  
     // Horizontal white lines
    let f = c*4 + 10;
    stroke(currColors[2]+'88');
    strokeWeight(2);
    line(0, f, 600, f);

    // Vertical large lines
      let d = 30+c*8;
      stroke(currColors[0]+'88');
      strokeWeight(10);

      for (var dx = 0; dx < 600; dx += 3) {
        stroke(currColors[1]+'88');
        strokeWeight(1);
        // fill(currColors[1]+'88');
        ellipse(d, dx, 10, 10);
      }
  
  c += 10;
  if(c>cend) {
    print("end");
    noLoop();
  }
    
    
  } else {
    
    
      background(currColors[3]+'77');
      // Vertical large lines with opacity
  for (var s = 0; s < 600; s += 40) {
    stroke(currColors[0]+'88');
    strokeWeight(20);
    line(s - 10, 0, s - 10, 600);
    
    // Vertical large ellipse with opacity
    for (var sx = 0; sx < 600; sx += 3) {
      stroke(currColors[1]+'88');
      strokeWeight(1);
      fill(currColors[3]+'33')
      ellipse(sx, s, 20, 20);
    }
  }
  
  // Horizontal white lines
  for (var f = 17; f < 600; f += 80) {
    stroke(currColors[0]+'88');
    strokeWeight(1);
    line(0, f, 600, f);
  }
  
  // Veritcal small lines
  for (var f = 10; f < 600; f += 40) {
    stroke(currColors[1]+'88');
    strokeWeight(1);
    line(f, 0, f, 600);
  }
  
  // Horizontal large lines
  for (var i = 30; i < 600; i += 80) {
    stroke(currColors[2]+'44');
    strokeWeight(10);
    //ellipse(i, i, 10, i);
    line(0, i, 600, i);
  }
  
  // Vertical large lines
  for (var d = 30; d < 600; d += 80) {
    stroke(currColors[1]+'88');
    strokeWeight(10);
    
    // Vertical small ellipse 
    for (var dx = 0; dx < 600; dx += 3) {
      stroke(currColors[0]+'88');
      strokeWeight(1);
      noFill();
      // fill(currColors[1]+'77')
      ellipse(d, dx, 10, 10);
    }
  }
    noLoop();
  }
}



function keyPressed() {
  if(key=="s")  save("myTartan.png");
}

function pickColors() {
    currColors[0]  = colors[int(random(0,colors.length))];
  currColors[1]  = colors[int(random(0,colors.length))];
  if(currColors[0]==currColors[1]) {
      currColors[1]  = colors[int(random(0,colors.length))];
  }
  
  currColors[2]  = colors[int(random(0,colors.length))];
  if(currColors[0]==currColors[2]) {
      currColors[2]  = colors[int(random(0,colors.length))];
  } else if(currColors[2]==currColors[1]) {
      currColors[2]  = colors[int(random(0,colors.length))];
  }
  
    currColors[3]  = colors[int(random(0,colors.length))]; //back
  
    if(currColors[3]==currColors[0]) {
      currColors[3]  = colors[int(random(0,colors.length))];
      
  } else if(currColors[3]==currColors[1]) {
      currColors[3]  = colors[int(random(0,colors.length))];
    
  } else if(currColors[3]==currColors[2]) {
      currColors[3]  = colors[int(random(0,colors.length))];
  }
}