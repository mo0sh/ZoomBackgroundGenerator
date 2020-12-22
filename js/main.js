let canvas, canvashd, ctxorig, ctxhd, $createimage, $optionHD, $option43, $imgs,
    $first, $last, $pronouns, $radialParm, $optionSimple, $option75, $optionGradient, $optionTextured;

// Initialize variable references and load assets
function init () {
  canvas = document.getElementById("cvs");
  canvashd = document.getElementById("cvshd");

  ctxorig = canvas.getContext("2d");
  ctxhd = canvashd.getContext("2d");

  $createimage = document.getElementById("createimage");
  $optionHD = document.getElementById("optionHD");
  $option43 = document.getElementById("option43");

  $optionSimple = document.getElementById("optionSimple");
  $option75 = document.getElementById("option75");

  $optionGradient = document.getElementById("optionGradient");
  $optionTextured = document.getElementById("optionTextured");

  $imgs = document.getElementById("imgs");

  $first =document.getElementById("first");
  $last = document.getElementById("last");
  $pronouns = document.getElementById("pronouns");

  $bgImages = {
    bgImgHD: document.getElementById("bgImgHD"),
    bgImg43: document.getElementById("bgImg43"),
    bgImgHD75: document.getElementById("bgImgHD75"),
    bgImg4375: document.getElementById("bgImg4375"),
    grad_bgImgHD: document.getElementById("grad_bgImgHD"),
    grad_bgImg43: document.getElementById("grad_bgImg43"),
    grad_bgImgHD75: document.getElementById("grad_bgImgHD75"),
    grad_bgImg4375: document.getElementById("grad_bgImg4375")
  };
  $activeImg = $bgImages['bgImgHD'];

  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let firstVal  = urlParams.get('first');
  let lastVal = urlParams.get('last');
  let pronounsVal = urlParams.get('pronouns');
  let schoolsVal = urlParams.get('school');
  let cohortVal = urlParams.get('cohort');
  let fill_effect = urlParams.get('fill_effect');

  $radialParm = urlParams.get('r');

  if (firstVal) { $first.value = firstVal }
  if (lastVal) { $last.value = lastVal }
  if (pronounsVal) { $pronouns.value = pronounsVal }
  if (schoolsVal) { $school.value = schoolsVal }
  if (cohortVal) { $cohort.value = cohortVal }

  bind();
  update();
}

function setActiveImg() {
  let key = '';
  key = ($optionGradient.checked) ? 'grad_' : key;
  key = ($optionHD.checked) ? key + 'bgImgHD' : key + 'bgImg43';
  key = ($option75.checked) ? key + '75' : key;
  $activeImg = $bgImages[key];
  return true;
}

// Draw the HD version of the canvas
function drawHD(){
  renderBackground(ctxhd, canvashd, 1920, 1080);
}

// Draw the 4:3 version of the canvas
function draw43(){
  renderBackground(ctxorig, canvas, 1600, 1200);
}

function renderBackground(context, canvasObj, w, h, type='jpg') {
  draw(context, w, h);
  document.getElementById("explanation").style.display ="block";
  $imgs.innerHTML = '';
  $imgs.appendChild(Canvas2Image.convertToImage(canvasObj, w, h, type))
}

// Update the image based on the selected format
function update() {
  setActiveImg();
  ($optionHD.checked) ? drawHD() : draw43();
}

// Bind the update and render functions to form controls
function bind () {
  // Set up the "Save Image" button
  $createimage.onclick = function() {
    update();
    if ($optionHD.checked){
      Canvas2Image.saveAsImage(canvashd, 1920, 1080, 'jpg');
    } else {
      Canvas2Image.saveAsImage(canvas, 1600, 1200, 'jpg');
    }
  }

  // Connect the update method to form controls
  $last.oninput = update;
  $first.oninput = update;
  $pronouns.oninput = update;
  $option43.oninput = update;
  $optionHD.oninput = update;
  $optionSimple.oninput = update;
  $option75.oninput = update;
  $optionGradient.oninput = update;
  $optionTextured.oninput = update;
}

function draw(ctx, w, h) {
  var pat = ctx.createPattern($activeImg, "repeat");
  ctx.fillStyle = pat;
  ctx.fillRect(0,0,w,h);

  ctx.fillStyle = '#ffffff';
  ctx.font = "bold 150px Replica";

  let rightMargin = 50;
  let topMargin = 50;
  let verticalLineWidth = 0;

  let firstLineBase = 160;
  let secondLineBase = 280;
  let thirdLineBase = 360;

  let logoHeight = 150;
  let logoWidth = 150;

  ctx.textAlign = "left";
  ctx.font = "bold 150px Replica";
  ctx.fillText($first.value, 50 + verticalLineWidth, firstLineBase);

  ctx.font = "bold 125px Replica";
  ctx.fillText($last.value, 50 + verticalLineWidth, secondLineBase, 600);

  ctx.font = "normal 50px Replica"
  ctx.fillText($pronouns.value, 50 + verticalLineWidth, thirdLineBase);
}

onload = init;
