document.addEventListener('DOMContentLoaded', (event) => {
  let pullups = new pullup();
  let pushups = new pushup();
  const videoElement = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let net;

  console.log("Initializing...");

  async function setupCamera() {
      console.log("Setting up camera...");
      const stream = await navigator.mediaDevices.getUserMedia({ 'audio': false, 'video': true });
      videoElement.srcObject = stream;

      return new Promise((resolve) => {
          videoElement.onloadedmetadata = () => {
              console.log("Camera setup complete.");
              resolve(videoElement);
          };
      });
  }

  async function loadMoveNet() {
      console.log("Loading MoveNet...");
      net = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER
      });
      console.log("MoveNet loaded.");
  }

  async function startPoseDetection() {
      await setupCamera();
      await loadMoveNet();
      console.log("Initialization complete. Starting pose detection.");
      detectPose();
  }

  function countRepetitions(keypoints) {
      // Your implementation for counting repetitions based on keypoints
      // Modify this function according to your specific requirements
  }

  async function detectPose() {
      if (!net) {
          console.error("MoveNet is not initialized.");
          return;
      }

      net.estimatePoses(videoElement).then((poses) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

          if (poses && poses.length > 0) {
              const keypoints = poses[0].keypoints;
              for (const keypoint of keypoints) {
                  const { x, y, name, score } = keypoint;

                  // Draw a circle for each keypoint
                  ctx.beginPath();
                  ctx.arc(x, y, 5, 0, 2 * Math.PI);
                  ctx.fillStyle = 'red';
                  ctx.fill();

                  // Display the name and score near each keypoint
                  ctx.fillStyle = 'black';
                  ctx.fillText(`${name} (${Math.round(score * 100)}%)`, x + 10, y - 5);
              }

              // Assuming you are working with the first pose in the array
              countRepetitions(keypoints);
          }

          document.getElementById('video').style.display = 'none';
          requestAnimationFrame(detectPose);
      });
  }
  function countRepetitions(keypoints) {
    pullups.feedData(keypoints);
    pullups.setPullUpStatus();
    pushups.feedData(keypoints);
    pushups.setPushupStatus();
   }

  startPoseDetection().catch((error) => {
      console.error("Error during initialization:", error);
  });
});
