class situp{
    constructor(){
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
       this.leftKneeXBounds = false;
       this.leftHipXBounds = false;
       this.initialLeftAnkleX;
       this.initialLeftKneeX;
       this.initialLeftHipX;
       this.initialPosition = false;
       this.boundVerification = false;
       this.finalPosition = false;
       this.situpCount = 0;
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
   
       this.leftShoulderXMax = this.leftShoulderX + 40;
       this.leftShoulderXMin = this.leftShoulderX - 40;
       this.leftKneeXMax = this.thileftKneeXv+ 40;
       this.leftKneeXMin = this.thileftKneeX - 40;
       this.leftAnkleXMax = this.leftAnkleX + 40;
       this.leftAnkleXMin = this.leftAnkleX - 40;
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
}

       setInitialPosition(){
        this.updateBackAngle();
        if (this.leftKneeY < this.noseY && this.leftKneeY < this.leftAnkleY && this.leftKneeY < this.leftHipY && this.leftKneeY < this.leftShoulderY) {
        this.initialLeftAnkleX = this.leftAnkleX;
        this.initialLeftKneeX = this.leftKneeX;
        this.initialLeftHipX = this.leftHipX;
       this.initialPosition = true;
       this.finalPosition = false;
       }
    }
     
     setBoundVerification() {
       if (
        this.initialLeftHipX > this.leftHipXMax ||
        this.initialLeftHipX < this.leftHipXMin ||
        this.initialLeftKneeX > this.leftKneeXMax ||
        this.initialLeftKneeX < this.leftKneeXMin ||
           this.initialLeftAnkleX > this.leftAnkleXMax ||
           this.initialLeftAnkleX < this.leftAnkleXMin
       ) {
           this.finalPostion = false;
           this.initialPosition = false;
       } else {
           this.boundVerification = true;
       }
   }
   
       
     setFinalPosition(){
        if (this.noseX  < this.leftHipX && this.leftShoulderY < this.leftKneeY && this.backIs180) {
       this.finalPosition = true;
     } else {
       this.finalPosition = false;
     }
    }
  
     setSitupStatus(){
       this.setInitialPosition();
       this.setBoundVerification();
       this.setFinalPosition();
       if(this.finalPosition &&  this.boundVerification && this.initialPosition){
       this.finalPostion = false;
       this.initialPosition= false;
       this.boundVerification = false;   
       this.situpCount += 1;
       console.log('Sit-up detected!');
       document.getElementById("situpCount").innerText= this.situpCount;
       }
     }
 

}
