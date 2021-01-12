//RecurrPattern
//Simple demo to show the application of recursive functions
//for procedural pattern generation.

//Recursion Config adjust with sliders
let step = {x: 10, y: 15};      // move the ellipses by dividing L 
let shrink = {x: 100, y: 100};  // scale the ellipses by dividing L
let recurFactor = 0.1;          // divide the L parameter at each recursion 
let single = false;             // 1 or 4 directions
  
// a e s t h e t i c s
let color_1 = "#bbbefe";
let color_2 = "#bbfeed";
let color_3 = "#d9febb";
let color_4 = "#febbf4";
let fills = true;
let fillAlphaMax = "55";
let fillAlpha;
let thickness = 2;
let rotFactor = 0;


function setup() {
  createCanvas(400, 400);
  
  noFill();
  stroke(255);
}

function draw() {
  translate(width/2,height/2);

  background(0);
    
  strokeWeight(thickness);
  
  let l = width * .75;
  recurEllipses(l);
}


function recurEllipses(l) {
  if(fills) {
    fillAlpha = fillAlphaMax;
  } else {
    fillAlpha = 0;
  }
  
  if(single) {
    
    stroke(color_1);
    fill(color_1 + fillAlpha);
    ellipse(0,0,l-l/shrink.x,l-l/shrink.y,detail);  
    
  } else {
    
    //lefty up
    stroke(color_1);
    fill(color_1 + fillAlpha);
    ellipse(0-l/step.x,0+l/step.y,l-l/shrink.x,l-l/shrink.y);
    
    //lefty down
    stroke(color_2);
    fill(color_2 + fillAlpha);
    ellipse(0-l/step.x,0-l/step.y,l-l/shrink.x,l-l/shrink.y);
    
    //righty up
    stroke(color_3);
    fill(color_3 + fillAlpha);
    ellipse(0+l/step.x,0+l/step.y,l-l/shrink.x,l-l/shrink.y);
    
    //righty down
    stroke(color_4);
    fill(color_4 + fillAlpha);
    ellipse(0+l/step.x,0-l/step.y,l-l/shrink.x,l-l/shrink.y); 
  }
  
  l /= abs(recurFactor)+2;
  
  if(l > 0) {
    recurEllipses(l);  
  } 
}


function keyPressed() {
  switch(key) {
    case "s": //save
      save("recurrPattern_"+frameCount+".png");
    break;
    case "m": //toggle single/quadri
      single = !single;
    break;
    default:
      
    break;
}
}