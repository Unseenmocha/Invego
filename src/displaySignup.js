const signUpWidget = document.getElementById("signup-widget");
const loginWidget = document.getElementById("login-widget");
const signUp = ()=> { 
    signUpWidget.style.visibility = "visible";
    loginWidget.style.visibility = "hidden";
    loginWidget.style.height = "0px";
}

const closeSignUp = ()=> {
    signUpWidget.style.visibility = "hidden";
    loginWidget.style.visibility = "visible";
    loginWidget.style.height = "fit-content";
}

document.getElementById("go-signup").addEventListener("click", signUp);
document.getElementById("go-login").addEventListener("click", closeSignUp);