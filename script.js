let max = 25;
let min = 25;
const palette = ["#F1C416", "orange", "#F95A76", "#EF9CC7", "#ff1020", "#0456C4", "#9F81CD", "#FE8718", "#20903A", "#007580", "#F1C416"];

function createCircle() {
    document.getElementById("game-container").appendChild(elem);
    elem.classList.add("shape");

    let size = makeRandomSize(min, max);
    elem.style.width = size + "px";
    elem.style.height = size + "px";

    // Randomly decide if the circle comes from the left or right
    let fromLeft = Math.random() < 0.5; // 50% chance

    if (fromLeft) {
        elem.style.left = "-50px"; // Start from left
        elem.style.animation = "moveRight 9s linear infinite";
        elem.style.backgroundColor = palette[Math.floor(Math.random() * palette.length)]; // Random color
    } else {
        elem.style.right = "-50px"; // Start from right
        elem.style.animation = "moveLeft 8s linear infinite";
        elem.style.backgroundColor = "#FFFFFF"; // White color
    }

    // Start at a random vertical position
    elem.style.top = Math.random() * window.innerHeight + "px";

    document.body.appendChild(elem);

    // Remove the element after it exits the screen
    setTimeout(() => {
        elem.remove();
    }, 9000);
}

function makeRandomSize(minSize, maxSize) {
    return minSize + Math.random() * (maxSize - minSize);
}

// Generate circles at intervals
setInterval(createCircle, 200); 