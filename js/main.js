let canvas, canvashd, ctxorig, ctxhd, $createimage, $optionHD, $option43, $imgs,
    $first, $title, $radialParm, $optionSimple, $option75, $optionGradient, $optionTextured;

// Initialize variable references and load assets
function init () {
  canvas = document.getElementById("cvs");
  canvashd = document.getElementById("cvshd");

  ctxorig = canvas.getContext("2d");
  ctxhd = canvashd.getContext("2d");

  $createimage = document.getElementById("createimage");
  $optionHD = document.getElementById("optionHD");
  $option43 = document.getElementById("option43");

  // $optionSimple = document.getElementById("optionSimple");
  // $option75 = document.getElementById("option75");

  // $optionGradient = document.getElementById("optionGradient");
  // $optionTextured = document.getElementById("optionTextured");

  $imgs = document.getElementById("imgs");
  $first =document.getElementById("first");
  $title = document.getElementById("title");
  // $pronouns = document.getElementById("pronouns");


  $bgImages = document.getElementById("bgImgHD");
  // $bgImages = {
  //   bgImgHD: document.getElementById("bgImgHD"),
  //   bgImg43: document.getElementById("bgImg43"),
  // };
  $activeImg = document.getElementById("bgImgHD");

  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let firstVal  = urlParams.get('first');
  let TitleVal = urlParams.get('title');
  // let pronounsVal = urlParams.get('pronouns');
  let schoolsVal = urlParams.get('school');
  let cohortVal = urlParams.get('cohort');
  let fill_effect = urlParams.get('fill_effect');

  $radialParm = urlParams.get('r');

  if (firstVal) { $first.value = firstVal }
  if (TitleVal) { $title.value = TitleVal }
  // if (pronounsVal) { $pronouns.value = pronounsVal }
  // if (schoolsVal) { $school.value = schoolsVal }
  // if (cohortVal) { $cohort.value = cohortVal }

  bind();
  update();
}

function setActiveImg() {
  // let key = '';
  // // key = ($optionGradient.checked) ? 'grad_' : key;
  // key = ($optionHD.checked) ? key + 'bgImgHD' : key + 'bgImg43';
  // // key = ($option75.checked) ? key + '75' : key;
  $activeImg = $bgImages;
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
  renderBackground(ctxhd, canvashd, 1920, 1080);
}

// Bind the update and render functions to form controls
function bind () {
  // Set up the "Save Image" button
  $createimage.onclick = function() {
    update();
      Canvas2Image.saveAsImage(canvashd, 1920, 1080, 'jpg');
  };
  $title.oninput = update;
  $first.oninput = update;

}

function draw(ctx, w, h) {
  var pat = ctx.createPattern($activeImg, "repeat");
  ctx.fillStyle = pat;
  ctx.fillRect(0,0,w,h);

  ctx.fillStyle = '#ffffff';
  ctx.font = "60px Neutra";
  ctx.textAlign = "right";
  ctx.fillText($first.value.toUpperCase(), 1815, 180, 525);

  ctx.textAlign = "right";
  ctx.font = "50px Asap";
  ctx.fillStyle = "#ea8842";
  ctx.fillText($title.value, 1815, 250, 525);
}

onload = init;
