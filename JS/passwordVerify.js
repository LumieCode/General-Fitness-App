function verifyPassword() {
    password1 = document.getElementById("password").value;
    password2 = document.getElementById("repassword").value;
    if(password1 == password2){
        document.getElementById('theForm').submit();
    } else {
        msgDiv = document.getElementById("msgDiv");
        msgDiv.innerText = "The 2 passwords you entered don't match."
    }
}