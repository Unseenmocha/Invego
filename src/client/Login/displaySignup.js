const signUpWidget = document.getElementById("signup-widget");
const loginWidget = document.getElementById("login-widget");

const signUp = ()=> { 
    loginWidget.style.animation = "fadeout";
    loginWidget.style.animationDuration = "1s";
    loginWidget.style.animationFillMode = "both";
    loginWidget.style.animationPlayState = "running";
    
    signUpWidget.style.animation = "fadein";
    signUpWidget.style.animationDuration = "1s";
    signUpWidget.style.animationFillMode = "both";
    signUpWidget.style.animationPlayState = "running";
}

const closeSignUp = ()=> {
    signUpWidget.style.animation = "fadeout";
    signUpWidget.style.animationDuration = "1s";
    signUpWidget.style.animationFillMode = "both";
    signUpWidget.style.animationPlayState = "running";

    loginWidget.style.animation = "fadein";
    loginWidget.style.animationDuration = "1s";
    loginWidget.style.animationFillMode = "both";
    loginWidget.style.animationPlayState = "running";
    loginWidget.style.animationFillMode = "both";
}

document.getElementById("go-signup").addEventListener("click", signUp);
document.getElementById("go-login").addEventListener("click", closeSignUp);

export {signUp, closeSignUp};