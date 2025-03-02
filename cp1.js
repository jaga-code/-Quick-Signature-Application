const colorPicker = document.getElementById("colorPicker");
// Gets the color picker element (for selecting the drawing color)
const canvasColor = document.getElementById("canvasColor");
// Gets the color picker element (for selecting the background color of the canvas)
const canvas = document.getElementById("myCanvas");
// Gets the canvas element where the drawing will take place
const clearButton = document.getElementById("clearButton");
// Gets the "Clear" button element
const saveButton = document.getElementById("saveButton");
// Gets the "Save & Download" button element
const retrieveButton = document.getElementById('retrieveButton');
// Gets the "Retrieve saved Signature" button element
const fontPicker = document.getElementById("fontPicker");
// Gets the font picker (select input) for changing the line width
const ctx = canvas.getContext('2d');
// Gets the 2D context of the canvas, which is used for drawing

let isDrawing = false;
// A flag to track whether the user is currently drawing
let lastX = 0;
// Stores the last X position of the mouse when drawing
let lastY = 0;
// Stores the last Y position of the mouse when drawing

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});
// Event listener that stops drawing when the mouse is released

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});
// Event listener that stops drawing when the mouse leaves the canvas

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
    // Starts drawing and sets the starting point of the line to the mouse position
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
        // Draws the line as the mouse moves, starting from the last position to the current position
    }
});

colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});
// Changes the color of the drawing when the user selects a new color from the color picker

canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, 800, 500);
    // Changes the background color of the canvas when the user selects a new background color
    // and fills the entire canvas with the selected color
});

fontPicker.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
    // Changes the width of the drawing line when the user selects a new value from the font picker (select element)
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Clears the entire canvas when the "Clear" button is clicked
});

saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    // Saves the current canvas content as a base64-encoded image in local storage

    let link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
    // Creates an invisible link and triggers the download of the canvas content as a PNG file
});

retrieveButton.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents');
    // Retrieves the saved canvas data from local storage

    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img, 0, 0);
        // If a saved canvas exists, an image is created from the base64 data and drawn onto the canvas
    }
});
