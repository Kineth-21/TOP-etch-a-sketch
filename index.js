const container = document.querySelector("#container");

let isPointerDown = false; // Flag to track pointer (mouse or touch) state
let currentColor = "#000000"; // Initial color (black)
let isEraserOn = false; // Flag to track eraser mode state

function newGrid(num) {
    num = parseInt(num);

    if (isNaN(num) || num > 100 || num < 16) {
        alert("Please choose a number within 16 to 100.");
        return;
    }
    container.textContent = "";

    for (let i = 0; i < num; i++) {
        const div = document.createElement("div");
        div.classList.add("container2");
        for (let j = 0; j < num; j++) {
            const div2 = document.createElement("div");
            div2.classList.add("grid");
            div.appendChild(div2);

            // Add event listeners for both mouse and touch interactions
            div2.addEventListener("mousedown", handleStart);
            div2.addEventListener("mouseenter", handleMove);
            div2.addEventListener("mouseup", handleEnd);

            div2.addEventListener("touchstart", handleStart);
            div2.addEventListener("touchmove", handleMove);
            div2.addEventListener("touchend", handleEnd);
        }
        container.appendChild(div);
    }

    const grid = document.querySelectorAll(".grid");
    const cellContainerWidth = container.clientWidth;
    let cellSize = cellContainerWidth / num;
    grid.forEach((cell) => {
        cell.classList.add("cell");
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
    });
}

function handleStart(event) {
    event.preventDefault(); // Prevent default for both touch and mouse
    isPointerDown = true;
    paintCell(this); // Paint the cell on start
}

function handleMove(event) {
    event.preventDefault(); // Prevent default for both touch and mouse
    if (isPointerDown) {
        paintCell(this); // Paint the cell while moving
    }
}

function handleEnd() {
    isPointerDown = false;
}

function paintCell(cell) {
    if (isEraserOn) {
        cell.style.backgroundColor = "white"; // Set background color to white if eraser is on
    } else {
        cell.style.backgroundColor = currentColor; // Set background color to current color if eraser is off
    }
}

newGrid(16);

const gridSizeChange = document.querySelector("#gridForm");
gridSizeChange.addEventListener("submit", (event) => {
    event.preventDefault();
    const gridSize = document.querySelector("#gridSize").value;
    newGrid(gridSize);
});

const colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("change", function () {
    currentColor = this.value; // Update current color on color picker change
});

// Event listener for eraser button
const eraserButton = document.querySelector("#eraser");
eraserButton.addEventListener("click", function () {
    isEraserOn = !isEraserOn; // Toggle eraser mode on button click
    this.classList.toggle("active", isEraserOn);
});

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
    const gridCells = document.querySelectorAll(".grid");
    gridCells.forEach((cell) => {
        cell.style.backgroundColor = "white"; // Reset all grid cell backgrounds to white
    });
});
