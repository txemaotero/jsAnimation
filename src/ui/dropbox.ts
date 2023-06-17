function handleFileDrop(event: DragEvent) {
    event.preventDefault();

    const file = event.dataTransfer?.files[0];
    if (file) {
        readFile(file);
    }
}

// Function to handle file selection from the computer
function handleFileSelect(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (file) {
        readFile(file);
    }
}

// Function to read the contents of the file
function readFile(file: File) {
    const reader = new FileReader();

    reader.onload = function(e) {
        const contents = e.target?.result as string;
        console.log("File contents:", contents);
        // Hide the container
        const drop = document.getElementsByClassName("dropbox_container")[0] as HTMLElement;
        const dropbox = document.getElementsByClassName("dropbox")[0] as HTMLElement;
        if (!drop) {
            return;
        }
        drop.hidden = true;
        dropbox.hidden = true;
        const anim = document.getElementById("animation");
        if (anim) {
            anim.hidden = false;
            player.start();
        }
    };

    reader.readAsText(file);
}

function initializeDropbox() {
    const dropzone = document.getElementById("drop_file") as HTMLInputElement;

    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.style.backgroundColor = "#202020";
    });

    dropzone.addEventListener("dragleave", function(event) {
        event.preventDefault();
        dropzone.style.backgroundColor = "";
    });

    dropzone.addEventListener("drop", handleFileDrop);

    var fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.style.display = "none";
    fileInput.addEventListener("change", handleFileSelect);

    dropzone.addEventListener("click", function(event) {
        event.preventDefault();
        fileInput.click();
    });

    document.body.appendChild(fileInput);
}

window.addEventListener("load", initializeDropbox);
