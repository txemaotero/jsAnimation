
var button = document.querySelector(".play-pause-button") as HTMLButtonElement;
button.addEventListener("click", () => {
    button.classList.toggle("paused");
    player.pauseResume();
});

window.addEventListener("resize", () => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    player.refresh();
});

