let canvas, canvashd, ctxorig, ctxhd, $createimage, $optionHD, $option43, $imgs,
    $logo, $logoLoaded, $first, $last, $pronouns, $radialParm, $cohort, $school;

// Initialize variable references and load assets
function init () {
    canvas = document.getElementById("cvs");
    canvashd = document.getElementById("cvshd");

    ctxorig = canvas.getContext("2d");
    ctxhd = canvashd.getContext("2d");

    $createimage = document.getElementById("createimage");
    $optionHD = document.getElementById("optionHD");
    $option43 = document.getElementById("option43");

    $imgs = document.getElementById("imgs");

    $first =document.getElementById("first");
    $last = document.getElementById("last");
    $pronouns = document.getElementById("pronouns");
    $school = document.getElementById("school");
    $cohort = document.getElementById("cohort");

    $logoLoaded = false;
    $logo = new Image();
    $logo.onload = function() {
        $logoLoaded = true;
        update();
    }
    $logo.src= "img/cornell_seal_simple_white.svg";

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let firstVal  = urlParams.get('first');
    let lastVal = urlParams.get('last');
    let pronounsVal = urlParams.get('pronouns');
    let schoolsVal = urlParams.get('school');
    let cohortVal = urlParams.get('cohort');

    $radialParm = urlParams.get('r');

    if (firstVal) { $first.value = firstVal }
    if (lastVal) { $last.value = lastVal }
    if (pronounsVal) { $pronouns.value = pronounsVal }
    if (schoolsVal) { $school.value = schoolsVal }
    if (cohortVal) { $cohort.value = cohortVal }

    bind();
    update();
}

// Draw the HD version of the canvas
function drawHD(){
    draw(ctxhd, 1920, 1080);
    document.getElementById("explanation").style.display = "block";

    let type = 'jpg',
        w = 1920,
        h = 1080;
    $imgs.innerHTML = '';
    $imgs.appendChild(Canvas2Image.convertToImage(canvashd, w, h, type))
}

// Draw the 4:3 version of the canvas
function draw43(){
    draw(ctxorig, 1600, 1200);
    document.getElementById("explanation").style.display ="block";

    let type = 'jpg',
        w = 1600,
        h = 1200;
    $imgs.innerHTML = '';
    $imgs.appendChild(Canvas2Image.convertToImage(canvas, w, h, type))
}

// Trigger on any update to the form. This will adjust controls as necessary and re-render the image
function update() {
    // Hide/show controls
    let cohortRow = document.getElementById("cohortRow");

    if($school.value === "JOHNSON") {
        cohortRow.style.display = "table-row";
    } else {
        cohortRow.style.display = "none";
        $cohort.value = "none";
    }

    // Update image
    updateImage();
}

// Update the image based on the selected format
function updateImage(){
    if ($optionHD.checked){
        drawHD();
    }else{
        draw43();
    }

}

// Bind the update and render functions to form controls
function bind () {
    // Set up the "Save Image" button
    $createimage.onclick = function() {
        updateImage();
        if ($optionHD.checked){
            Canvas2Image.saveAsImage(canvashd, 1920, 1080, 'jpg');
        }else {
            Canvas2Image.saveAsImage(canvas, 1600, 1200, 'jpg');

        }
    }

    // Connect the update method to form controls
    $last.oninput = update;
    $first.oninput = update;
    $pronouns.oninput = update;
    $school.onchange = update;
    $cohort.onchange = update;
    $option43.oninput = update;
    $optionHD.oninput = update;
}

// Draw the canvas
function draw(ctx, w, h) {
    let radialGrd = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, h);
    radialGrd.addColorStop(0, "#AAA");
    radialGrd.addColorStop(1, "#000");

    // ctx.fillStyle = '#B31B1B';
    ctx.fillStyle = radialGrd;
    ctx.fillRect(0,0,w,h);

    if($logoLoaded) {
        ctx.fillStyle = '#ffffff';
        ctx.font = "bold 150px Arial";

        let rightMargin = 50;
        let topMargin = 50;
        let verticalLineWidth = $cohort.value === "none" ? 0 : 60;

        let firstLineBase = 160;
        let secondLineBase = 280;
        let thirdLineBase = 360;

        let logoHeight = 150;
        let logoWidth = 150;

        ctx.textAlign = "left";
        ctx.font = "bold 150px Arial";
        ctx.fillText($first.value, 50 + verticalLineWidth, firstLineBase);

        ctx.font = "bold 100px Arial";
        ctx.fillText($last.value, 50 + verticalLineWidth, secondLineBase);

        ctx.font = "normal 50px Arial"
        ctx.fillText($pronouns.value, 50 + verticalLineWidth, thirdLineBase);

        // Add a vertical school name to the right side if selected
        if($school.value !== "") {
            ctx.save();
            ctx.font = "normal 150px Arial"
            ctx.textAlign = "left";
            ctx.translate(w - 70, (h - (logoHeight + 123)));
            ctx.rotate(-Math.PI / 2);
            ctx.letterSpacing = '10px';
            ctx.fillText($school.value, 0, 0);
            ctx.restore();
        }

        // Fill out the Cohort border if an option is selected
        if ($cohort.value !== "none") {
            ctx.fillStyle = $cohort.value;
            ctx.fillRect(0, 0, verticalLineWidth, h);

            let cohortName = $cohort.selectedOptions[0].innerHTML;
            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.font = "bold 40px Arial"
            ctx.textAlign = "right";
            ctx.translate(45, 50);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(cohortName.toUpperCase(), 0, 0, 300);
            ctx.restore();
        } else {
            // Red bar on right side
            ctx.fillStyle = '#B31B1B';
            ctx.fillRect(w - 20, 0, 20, h);
        }

        ctx.drawImage($logo, w - (rightMargin + logoWidth), h - (topMargin + logoHeight), logoWidth, logoHeight);
    } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = "bold 150px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Loading...", w/2, h/2);
    }
}

onload = init;
