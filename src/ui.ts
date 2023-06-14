
var button = document.querySelector(".play-pause-button") as HTMLButtonElement;
button.addEventListener("click", () => {
    button.classList.toggle("paused");
    player.pauseResume();
});

window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.code === 'Space') {
        button.click();
    } else if (event.key === 'l') {
        player.oneForward();
    } else if (event.key === 'h') {
        player.oneBack();
    } else if (event.key === 'r') {
        player.start();
    }
});


window.addEventListener("resize", () => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    player.refresh();
});

