const canvas = document.querySelector('#draw');
const inputs = document.querySelectorAll(".controls input");
const ctx = canvas.getContext('2d');

ctx.strokeStyle = '#BADA55'; // Default color
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
    if (!isDrawing) return; // stop the function from running when they are not moused down

    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

function handleUpdates() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    
    // Update properties based on input name
    if (this.name === 'spacing') {
        ctx.lineWidth = this.value; // Update line width based on spacing input
    } else if (this.name === 'base') {
        ctx.strokeStyle = this.value; // Update stroke color based on color input
    }
}

inputs.forEach(input => input.addEventListener("change", handleUpdates));
inputs.forEach(input => input.addEventListener("mousemove", handleUpdates));

// Reset button functionality
document.getElementById('reset').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
});