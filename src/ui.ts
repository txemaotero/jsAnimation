
var button = document.querySelector(".play-pause-button") as HTMLButtonElement;
button.addEventListener("click", () => {
    button.classList.toggle("paused");
    player.pauseResume();
});

