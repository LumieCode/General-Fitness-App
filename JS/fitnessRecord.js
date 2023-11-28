document.addEventListener('DOMContentLoaded', (event) => {

let rightWrist;
let leftWrist;
let rightWristMax;
let rightWristMin;
let leftWristMax;
let leftWristMin;
let initPosRightWrist;
let initPosLeftWrist;
let wristSameCord = false;
let nose;
let initialPos;
let landingPos;
let rightElbow;
let leftElbow;
let didInitialPosHppen;
let fullBodyCheck;

  console.log("Initializing...");
        const videoElement = document.getElementById('video');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("Getting user media...");
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then(function (stream) {
                    videoElement.srcObject = stream;
                    console.log("Got user media.");
                })
                .catch(function (error) {
                    console.error('Error accessing the camera:', error);
                });
        } else {
            console.error('getUserMedia is not supported in this browser.');
        }

// this crap accesses the camera


        let net;
        const video = document.getElementById('video');
        const canvas = document.getElementById('output');
        console.log(canvas);
        const ctx = canvas.getContext('2d');
        let pullupCount = 0;

        async function setupCamera() {
            console.log("Setting up camera...");
            const stream = await navigator.mediaDevices.getUserMedia({ 'audio': false, 'video': true });
            video.srcObject = stream;

            return new Promise((resolve) => {
                video.onloadedmetadata = () => {
                    console.log("Camera setup complete.");
                    resolve(video);
                };
            });
        }
        
// this crap maps the camera to the video element

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

        function detectPose() {
       
            if (!net) {
                console.error("PoseNet is not initialized.");
                return;
            }
function repCount(keypoints){


    rightWrist = Math.floor(keypoints[10].position.y);
   leftWrist = Math.floor(keypoints[9].position.y);
   nose = Math.floor(keypoints[0].position.y);
   rightElbow = Math.floor(keypoints[7].position.y);
   leftElbow = Math.floor(keypoints[8].position.y);
 
   rightWristMax = rightWrist + 20;
   rightWristMin = rightWrist - 20;
   leftWristMax = leftWrist + 20;
   leftWristMin = leftWrist - 20;
   
    if(nose < leftWrist && nose < rightWrist){
    initPosRightWrist = Math.floor(keypoints[10].position.y);
     initPosLeftWrist = Math.floor(keypoints[9].position.y);
     didInitialPosHppen = true; 
    // console.log('initialPos');
    }

    if (initPosRightWrist > rightWristMax || initPosRightWrist < rightWristMin || initPosLeftWrist > leftWristMax || initPosLeftWrist < leftWristMin) {
     landingPos = false;
     didInitialPosHppen= false;}
     else
     {wristSameCord = true;
             // console.log('nonInitialPos');
     }
       
    if(nose > leftElbow && nose > rightElbow && nose > rightWrist && nose > leftWrist){
     landingPos = true;
   //  console.log('LandingPos');
    }else{
     landingPos = false;
    }

    if(didInitialPosHppen && landingPos && wristSameCord){
     pullupCount+=1;
     landingPos = false;
     didInitialPosHppen = false;
     wristSameCord = false;
     document.getElementById("pullupCount").innerText= pullupCount;
     console.log('works');
    }
    
   }
   
   

   
   
            net.estimateSinglePose(video).then((pose) => {
              
                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw the video frame on the canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Draw keypoints mapped to the canvas
                for (const keypoint of pose.keypoints) {
                    const { x, y } = keypoint.position;

                    // Map keypoints from the video resolution to the canvas resolution
                    const scaledX = (x / video.width) * canvas.width;
                    const scaledY = (y / video.height) * canvas.height;

                    // Draw a circle at each keypoint
                    ctx.beginPath();
                    ctx.arc(scaledX, scaledY, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = 'red';
                    ctx.fill();
                }
               document.getElementById('video').style.display = 'none';
                // Add your logic to count pull-ups based on the pose
             repCount(pose.keypoints);
                requestAnimationFrame(detectPose);
            });
        }

        startPoseDetection().catch((error) => {
            console.error("Error during initialization:", error);
        });
    });