//Recurr Pattern 
//Complete version
//Simple demo to show the application of recursive functions
//for procedural pattern generation.

/* Camera Commands 
LMB:     Drag to Orbita camera
RMB:     Drag to Zoom in/out
2xClick: Reset camera 
*/

//Recursion Config adjust with sliders
let step = {x: 10, y: 15};  // move the ellipses by dividing L 
let shrink = {x: 100, y: 100}; // scale the ellipses by dividing L
let recurFactor = 0.1; // divide the L parameter at each recursion 
let single = false; // 1 or 4 directions
  
// a e s t h e t i c s
let thickness = 4;
let rotFactor = 00;
let colors = ["#bbbefe","#bbfeed","#d9febb","#febbf4"];
let currColor = colors[0];

//utils
let detail = 30; //polygon sides
let stepxSlider, stepySlider, shrinkxSlider, shrinkySlider, colorSel, extrudeSlider, thickSlider, polygonSlider;
let easycam;

function setup() {
  createCanvas(400, 400,WEBGL);
  
  noFill();
  stroke(255);
  
  createP("Step values \(x,y,z\)")
  stepxSlider = createSlider(1,150,110,0.1);
  stepySlider = createSlider(1,150,110,0.1);
  extrudeSlider = createSlider(0,10,10,0.1); 
  createP("Shrink values")
  shrinkxSlider = createSlider(1,25,25,0.1);
  shrinkySlider = createSlider(1,25,25,0.1);
  let polLabel = createP("Polygon"); polLabel.position(333,height+75);
  polygonSlider = createSlider(3,30,30,1);
  createP("Color")
  colorSel = createSelect();
  colorSel.option('1');
  colorSel.option('2');
  colorSel.option('3');
  colorSel.option('4');
  colorSel.selected('1');
  colorSel.changed(updateSliders);
  let thickLabel = createP("Thickness");
  thickLabel.position(170,height+155);
  thickSlider = createSlider(1,15,2);
  thickSlider.position(170,height+210);
  
  easycam = createEasyCam();
  document.oncontextmenu = ()=>false;
}

function draw() {
  
  // orthographicProj();  
  background(0);
  // lights();
  // box(100);
  
  updateSliders();
  
  let l = width*1;
  recurEllipses(l);
  
  // ellipse(0,0,l,l,detail);
}

function recurEllipses(l) {
  translate(0,0,l/step.z);
  
  push()
  rotate(sin(l*rotFactor))

  if(single) {
    stroke(currColor + "ff");

    ellipse(0,0,l-l/shrink.x,l-l/shrink.y,detail);      
  } else {
    stroke(currColor + "ff");

    //lefty up
    translate(0,0,1);
    ellipse(0-l/step.x,0+l/step.y,l-l/shrink.x,l-l/shrink.y,detail);
    
    //lefty down
    translate(0,0,2);
    ellipse(0-l/step.x,0-l/step.y,l-l/shrink.x,l-l/shrink.y,detail);
    
    //righty up
    translate(0,0,3);
    ellipse(0+l/step.x,0+l/step.y,l-l/shrink.x,l-l/shrink.y,detail);
    
    //righty down
    translate(0,0,4);
    ellipse(0+l/step.x,0-l/step.y,l-l/shrink.x,l-l/shrink.y,detail); 
  }
  pop()
  
  l /= abs(recurFactor)+2;
  
  if(l > 0) {
    recurEllipses(l);  
  } else {
    // print("Recursion ended after " + frameCount + " calls.");
  }
}

function updateSliders() {
  step = {x: stepxSlider.value(), y: stepySlider.value(), z: extrudeSlider.value()};
  shrink = {x: shrinkxSlider.value(), y: shrinkySlider.value()};
  switch(colorSel.value()) {
    case '1':
      currColor = colors[0];
    break;
    case '2':
      currColor = colors[1];
    break;
    case '3':
      currColor = colors[2];
    break;
    case '4':
      currColor = colors[3];
    break;
    default:
      currColor = colors[0];
    break;
  }
  strokeWeight(thickSlider.value());
  detail = polygonSlider.value();
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

function orthographicProj() {
  // projection
  var cam_dist = easycam.getDistance();
  var oscale = cam_dist * 0.001;
  var ox = width  / 2 * oscale;
  var oy = height / 2 * oscale;
  ortho(-ox, +ox, -oy, +oy, -10000, 10000);
  easycam.setPanScale(0.004 / sqrt(cam_dist));
}