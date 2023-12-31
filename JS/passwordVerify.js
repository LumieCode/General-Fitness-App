function verifyPassword() {
   const password = document.getElementById("password").value;
   const repassword = document.getElementById("repassword").value;
   let msgDiv = document.getElementById("msgDiv");
    let AllRequirements = true;
    msgDiv.innerHTML = "";
    // Check if the password contains at least one special character
    var specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharacterRegex.test(password)) {
        msgDiv.innerHTML += "<p>Password must contain at least one special character.</p><br>";
        AllRequirements = false;
    }

    // Check if the password meets the minimum length requirement
    if (password.length < 8) {
        msgDiv.innerHTML += "<p>Password must be at least 8 characters long.</p><br>";
        AllRequirements = false;
    }

    // Check if the passwords match
    if (password !== repassword) {
        msgDiv.innerHTML += "<p>Passwords do not match.</p><br>";
        AllRequirements = false;
    }

    // Password strength check (requires at least one uppercase, one lowercase, and one number)
    var passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordStrengthRegex.test(password)) {
        msgDiv.innerHTML += "<p>Password must include at least one uppercase letter, one lowercase letter, and one number.</p><br>";
        AllRequirements = false;
    }
if(AllRequirements){  document.getElementById("theForm").submit();}

}

function checkForExistingUsernames(){
    $.ajax({url: "passwordExist.php",  data: {attemptedUsername: document.getElementById("username").value}, success: function(result){
    if (result =="Username already exists. Please choose a different username."){
        msgDiv.innerHTML = "<p>Username already exists. Please choose a different username.</p><br>";
    }{
        verifyPassword();
    }
    }});
  }

  function showPassword(passwordInput){
    var x = document.getElementById(passwordInput);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    document.getElementById("toggle_" + passwordInput).classList.toggle("bi-eye");
  }