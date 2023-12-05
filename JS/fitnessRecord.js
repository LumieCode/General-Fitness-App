document.addEventListener('DOMContentLoaded', (event) => {
    let pullups = new pullup();
    let pushups = new pushup();
    const videoElement = document.getElementById('video');
    const canvas = document.getElementById('output');
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
  
    async function loadPoseNet() {
      console.log("Loading PoseNet...");
      net = await posenet.load();
      console.log("PoseNet loaded.");
    }
  
    async function startPoseDetection() {
      await setupCamera();
      await loadPoseNet();
      console.log("Initialization complete. Starting pose detection.");
      detectPose();
    }
  

    function countRepetitions(keypoints) {
     pullups.feedData(keypoints);
     pullups.setPullUpStatus();
     pushups.feedData(keypoints);
     pushups.setPushupStatus();
    }


    async function detectPose() {
      if (!net) {
        console.error("PoseNet is not initialized.");
        return;
      }
  
      net.estimateSinglePose(videoElement).then((pose) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
        for (const keypoint of pose.keypoints) {
          const { x, y } = keypoint.position;
          const scaledX = (x / videoElement.width) * canvas.width;
          const scaledY = (y / videoElement.height) * canvas.height;
  
          ctx.beginPath();
          ctx.arc(scaledX, scaledY, 5, 0, 2 * Math.PI);
          ctx.fillStyle = 'red';
          ctx.fill();
        }
  
        document.getElementById('video').style.display = 'none';
        countRepetitions(pose.keypoints);
        requestAnimationFrame(detectPose);
      });
    }
  
    startPoseDetection().catch((error) => {
      console.error("Error during initialization:", error);
    });
  });