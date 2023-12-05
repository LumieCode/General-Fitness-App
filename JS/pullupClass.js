class pullup{
     constructor(){
        this.rightWristY;
        this.leftWristY;
        this.noseY;
        this.rightElbowY;
        this.leftElbowY;
        this.rightElbowYBounds = false;
        this.leftElbowYBounds;
        this.initialPosition = false;
        this.boundVerification = false;
        this.landingPosition = false;
        this.initialRightWristY;
        this.initialLeftWristY;
        this.pullupCount = 0;
     }

    // Method to calculate min and max values for keypoints
    feedData(keypoints) {

        this.rightWristY = Math.floor(keypoints[10].position.y);
        this.leftWristY = Math.floor(keypoints[9].position.y);
        this.noseY = Math.floor(keypoints[0].position.y);
        this.rightElbowY = Math.floor(keypoints[7].position.y);
        this.leftElbowY = Math.floor(keypoints[8].position.y);
    
        // Use this.rightWristY and this.leftWristY instead of rightWrist and leftWrist
        this.rightWristMax = this.rightWristY + 20;
        this.rightWristMin = this.rightWristY - 20;
        this.leftWristMax = this.leftWristY + 20;
        this.leftWristMin = this.leftWristY - 20;
    }
    

        setInitialPosition(){if (this.noseY > this.leftWristY && this.noseY > this.rightWristY) {
        this.initialRightWristY = this.rightWristY;
        this.initialLeftWristY = this.leftWristY;
        this.initialPosition = true;
        
      }}
      
      setBoundVerification() {
        if (
            this.initialRightWristY > this.rightWristMax ||
            this.initialRightWristY < this.rightWristMin ||
            this.initialLeftWristY > this.leftWristMax ||
            this.initialLeftWristY < this.leftWristMin
        ) {
            this.landingPosition = false;
            this.initialPosition = false;
        } else {
            this.boundVerification = true;
        }
    }
    
        
      setLandingPosition(){if (this.noseY < this.leftElbowY && this.noseY < this.rightElbowY && this.noseY < this.rightWristY && this.noseY < this.leftWristY) {
        this.landingPosition = true;
      } else {
        this.landingPosition = false;
      }}
   
      setPullUpStatus(){
        this.setInitialPosition();
        this.setBoundVerification();
        this.setLandingPosition();
        if(this.landingPosition == true &&  this.boundVerification == true && this.initialPosition == true){
        this.landingPosition = false;
        this.initialPosition= false;
        this.boundVerification = false; 
        this.pullupCount += 1;
        console.log('Pull-up detected!');
        document.getElementById("pullupCount").innerText= this.pullupCount;
        }
      }
  

}
