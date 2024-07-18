const container = document.querySelector("#container");

let isMouseDown = false; // Flag to track mouse button state
let currentColor = "#000000"; // Initial color (black)
let isEraserOn = false; // Flag to track eraser mode state

function newGrid(num){
    num = parseInt(num);

    if(isNaN(num) || num > 100 || num < 16){
        alert("Please choose a number within 16 to 100.");
        return;
    }
    container.textContent = "";

    for(let i = 0; i < num; i++){
        const div = document.createElement("div");
        div.classList.add("container2");
        for(let j = 0; j < num; j++){
            const div2 = document.createElement("div");
            div2.classList.add("grid")
            div.appendChild(div2);

            // Add event listeners for mouse interactions
            div2.addEventListener("mousedown", function() {
                isMouseDown = true;
                if (isEraserOn && isMouseDown) {
                    div2.style.backgroundColor = "white"; // Set background color to white if eraser is on
                } else if (!isEraserOn && isMouseDown) {
                    div2.style.backgroundColor = currentColor; // Set background color to current color if eraser is off
                }
            });

            div2.addEventListener("mouseenter", function() {
                if (isMouseDown) {
                    if (isEraserOn) {
                        div2.style.backgroundColor = "white"; // Set background color to white if eraser is on and dragging
                    } else {
                        div2.style.backgroundColor = currentColor; // Set background color to current color if eraser is off and dragging
                    }
                }
            });

            // Reset mouse state when releasing anywhere on the document
            document.addEventListener("mouseup", function() {
                isMouseDown = false;
            });
        }
        container.appendChild(div);
    }

    const grid = document.querySelectorAll(".grid");
    cellContainerWidth = container.clientWidth;
    let cellSize = cellContainerWidth / num;
    grid.forEach(cell => {
        cell.classList.add("cell");
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
});
}

newGrid(16);

gridSizeChange = document.querySelector("#gridForm");
gridSizeChange.addEventListener("submit", (event) => {
    event.preventDefault();
    const gridSize = document.querySelector("#gridSize").value;
    newGrid(gridSize);
});

const colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("change", function() {
    currentColor = this.value; // Update current color on color picker change
});

// Event listener for eraser button
const eraserButton = document.querySelector("#eraser");
eraserButton.addEventListener("click", function() {
    isEraserOn = !isEraserOn; // Toggle eraser mode on button click
    this.classList.toggle("active", isEraserOn)
});


const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
    const gridCells = document.querySelectorAll(".grid");
    gridCells.forEach(cell => {
        cell.style.backgroundColor = "white"; // Reset all grid cell backgrounds to white
    });
})

