let facemesh;
let video;
let predictions = [];
let pointsToConnect = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  image(video, 0, 0, width, height);
  drawFacemesh();
}

function drawFacemesh() {
  if (predictions.length > 0) {
    let keypoints = predictions[0].scaledMesh;

    stroke(255, 0, 0); // 紅色
    strokeWeight(5); // 線條粗細
    noFill();

    beginShape();
    for (let i = 0; i < pointsToConnect.length; i++) {
      let index = pointsToConnect[i];
      let [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
