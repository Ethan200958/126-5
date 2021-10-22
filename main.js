harryPotter = "music.mp3";
peterPan = "music2.mp3";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0; 
leftWristY = 0;

leftWrist_score = 0;
rightWrist_score = 0;

function preload() {
    harryPotter = loadSound("music.mp3");
    peterPan = loadSound("music2.mp3");

}

function setup() {
    canvas = createCanvas(600, 550);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
    }

function modelLoaded() {
    console.log("poseNet Initalization: Verified.");
}
function draw() {
    image(video, 0, 0, 600, 550);
    harryPotter_status = harryPotter.isPlaying();

    fill("#71ed3b");
    stroke("#71ed3b");

    if (leftWrist_score > 0.2) {
        circle(leftWristX, leftWristY, 20);
        peterPan.stop();

        if (harryPotter_status == false) {
            harryPotter.play();
            document.getElementById("song").innerHTML = "Harry Potter Theme Song";
        }
    }

    //All above was in previous project!

    peterPan_status = peterPan.isPlaying();

    if (rightWrist_score > 0.2) {
        circle(rightWristX,rightWristY, 20);
        harryPotter.stop();

        if (peterPan_status == false) {
            peterPan.play();
            document.getElementById("song").innerHTML = "Peter Pan Song";
        }
    } 


}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        leftWrist_score = results[0].pose.keypoints[9].score;
        rightWrist_score = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x:"+leftWristX+"left wrist y:"+leftWristY)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x:"+rightWristX+"right wrist y:"+rightWristY);
    }
}

