const invegoButton = document.getElementById('invego');
const profile = document.getElementById('profile');
const logout = document.getElementById('logout');


invegoButton.addEventListener("click", async () => {
    window.location.href = "http://localhost:5000/page/discovery";
  });

profile.addEventListener('click', () => {
    window.location.href = "http://localhost:5000/page/userProfile";
});

logout.addEventListener('click', () => {
    window.location.href = "http://localhost:5000/page/login";
})