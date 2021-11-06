noseX = 0;
noseY = 0;
RightWristX = 0;
LeftWristX = 0;
Difference = 0;

function preload() {
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.position(870, 225);
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.position(200, 200)

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResults); 
}

function modelLoaded() {
    console.log("Model has been initialized");
}

function gotResults(results, error) {
    if (results.length > 0) {
       console.log(results);

       noseX = results[0].pose.nose.x;
       noseY = results[0].pose.nose.y;
       console.log("Nose X = " + noseX + ", Nose Y = " + noseY);

       RightWristX = results[0].pose.rightWrist.x;
       LeftWristX = results[0].pose.leftWrist.x;
       Difference = floor(LeftWristX - RightWristX);
       console.log("Right Wrist X = " + RightWristX + ", Left Wrist X = " + LeftWristX + ", Difference = " + Difference);

       document.getElementById("text_font_size_realtime_data").innerHTML = "Font Size of Current text is = " + Difference + "px"
    } else {
        console.error(error);
    }
}

function draw() {
    background('#eb8810');
    textSize(Difference);   
    text('Sharvil', noseX, noseY);
    fill('#800080')
}