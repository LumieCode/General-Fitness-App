class squat {
    constructor() {
        this.noseY;
        this.noseX;
        this.leftShoulderY; // 5
        this.leftShoulderX; // 5
        this.leftHipY; //11
        this.leftHipX;
        this.leftKneeY; //13
        this.leftKneeX; //13
        this.leftAnkleY; //15
        this.leftAnkleX; //15
        this.leftAnkleXBounds = false;
        this.initialLeftAnkleX;
        this.initialPosition = false;
        this.boundVerification = false;
        this.finalPosition = false;
        this.squatCount = 0;
        this.backAngle;
        this.backIs180 = false;
    }

    feedData(keypoints) {
        this.noseY = Math.floor(keypoints[0].y);
        this.noseX = Math.floor(keypoints[0].x);
        this.leftShoulderY = Math.floor(keypoints[5].y); // 5
        this.leftShoulderX = Math.floor(keypoints[5].x); // 5
        this.leftHipY = Math.floor(keypoints[11].y); //11
        this.leftHipX = Math.floor(keypoints[11].x); //11
        this.leftKneeY = Math.floor(keypoints[13].y); //13
        this.leftKneeX = Math.floor(keypoints[13].x); //13
        this.leftAnkleY = Math.floor(keypoints[15].y); //15
        this.leftAnkleX = Math.floor(keypoints[15].x); //15

        this.leftAnkleXMax = this.leftAnkleX + 15;
        this.leftAnkleXMin = this.leftAnkleX - 15;

        console.log("Feed data: ", this);
    }

    updateBackAngle() {
        let angle = (
            Math.atan2(
                this.leftKneeY - this.leftHipY,
                this.leftKneeX - this.leftHipX
            ) - Math.atan2(
                this.leftShoulderY - this.leftHipY,
                this.leftShoulderX - this.leftHipX
            )
        ) * (180 / Math.PI);
        angle = angle % 180;
        this.backAngle = angle;

        if ((this.backAngle < 20) || (this.backAngle > 160)) {
            this.backIs180 = true;
        } else {
            this.backIs180 = false;
        }

        console.log("Update back angle: ", this);
    }

    setInitialPosition() {
        if (this.noseY < this.leftShoulderY && this.leftKneeY > this.leftHipY && this.backIs180) {
            this.initialLeftAnkleX = this.leftAnkleX;
            this.initialPosition = true;
            this.finalPosition = false;
        }
        console.log("Set initial position: ", this);
    }

    setBoundVerification() {
        this.updateBackAngle();
        if (
            (this.initialLeftAnkleX > this.leftAnkleXMax ||
                this.initialLeftAnkleX < this.leftAnkleXMin) && !this.backIs180
        ) {
            this.finalPosition = false;
            this.initialPosition = false;
        } else {
            this.boundVerification = true;
        }
        console.log("Set bound verification: ", this);
    }

    setFinalPosition() {
        if (this.noseX < this.leftHipX && this.leftShoulderY < this.leftKneeY && (this.leftKneeY - this.leftHipY) < 40) {
            this.finalPosition = true;
        } else {
            this.finalPosition = false;
            this.setInitialPosition();
        }
        console.log("Set final position: ", this);
    }

    setSquatStatus() {
        this.setBoundVerification();
        this.setFinalPosition();
        if (this.finalPosition && this.boundVerification && this.initialPosition) {
            this.finalPosition = false;
            this.initialPosition = false;
            this.boundVerification = false;
            this.squatCount += 1;
            console.log('Squat detected! Count:', this.squatCount);
            document.getElementById("squatCount").innerText = this.squatCount;
        }
        console.log("Set squat status: ", this);
    }
}