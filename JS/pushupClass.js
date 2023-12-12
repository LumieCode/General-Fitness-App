class pushup {
    constructor() {
        this.rightWrist;
        this.leftWrist;
        this.nose;
        this.rightElbow;
        this.leftElbow;
        this.rightShoulder;
        this.leftShoulder;
        this.leftHip;
        this.leftKnee;
        this.elbowAngle = 999;
        this.backAngle = 0;
        this.upPosition = false;
        this.downPosition = false;
        this.pushupCount = 0;
        this.highlightBack = false;
        this.backWarningGiven = false;
        // Include any other necessary variables here
    }

    feedData(keypoints) {

        this.rightWrist = keypoints[10];
        this.leftWrist = keypoints[9];
        this.nose = keypoints[0];
        this.rightElbow = keypoints[8];
        this.leftElbow = keypoints[7];
        this.rightShoulder = keypoints[6];
        this.leftShoulder = keypoints[5];
        this.leftHip = keypoints[11];
        this.leftKnee = keypoints[13];

        // Include any other keypoint calculations here
    }

    updateArmAngle() {
        let angle = (
            Math.atan2(
                this.leftWrist.position.y - this.leftElbow.position.y,
                this.leftWrist.position.x - this.leftElbow.position.x
            ) - Math.atan2(
                this.leftShoulder.position.y - this.leftElbow.position.y,
                this.leftShoulder.position.x - this.leftElbow.position.x
            )
        ) * (180 / Math.PI);

    

        if (this.leftWrist.score > 0.3 && this.leftElbow.score > 0.3 && this.leftShoulder.score > 0.3) {
            this.elbowAngle = angle;
        } else {
            //console.log('Cannot see elbow');
        }
    }

    updateBackAngle() {
        let angle = (
            Math.atan2(
                this.leftKnee.position.y - this.leftHip.position.y,
                this.leftKnee.position.x - this.leftHip.position.x
            ) - Math.atan2(
                this.leftShoulder.position.y - this.leftHip.position.y,
                this.leftShoulder.position.x - this.leftHip.position.x
            )
        ) * (180 / Math.PI);

        angle = angle % 180;
        if (this.leftKnee.score > 0.3 && this.leftHip.score > 0.3 && this.leftShoulder.score > 0.3) {
            this.backAngle = angle;
        }

        if ((this.backAngle < 20) || (this.backAngle > 160)) {
            this.highlightBack = false;
        } else {
            this.highlightBack = true;
            if (!this.backWarningGiven) {
                // Optionally include a warning without speech synthesis
                console.log('Keep your back straight');
                this.backWarningGiven = true;
            }
        }
    }

    inUpPosition() {
        if (this.elbowAngle > 170 && this.elbowAngle < 200) {
            if (this.downPosition) {
                // Optionally include a message without speech synthesis
                console.log(`${this.pushupCount + 1} push-up(s) completed`);
                this.pushupCount += 1;
            }
            this.upPosition = true;
            this.downPosition = false;
        }
    }

    inDownPosition() {
        let elbowAboveNose = false;
        if (this.nose.position.y > this.leftElbow.position.y) {
            elbowAboveNose = true;
        }
        console.log(elbowAboveNose);
        if (elbowAboveNose && ((Math.abs(this.elbowAngle) > 70) && (Math.abs(this.elbowAngle) < 100))) {
          
            if (this.upPosition) {
                // Optionally include a message without speech synthesis
                console.log('Up');
            }
            this.downPosition = true;
            this.upPosition = false;
        }
       // console.log(elbowAboveNose);
    }

    setPushupStatus() {
        this.updateArmAngle();
        this.updateBackAngle();
        this.inUpPosition();
        this.inDownPosition();

     console.log(this.elbowAngle);
        //console.log('Up Position:', this.upPosition);
       // console.log('Down Position:', this.downPosition);
   
        document.getElementById("pushupCount").innerText = this.pushupCount;
    }
}
