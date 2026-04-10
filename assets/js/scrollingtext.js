const canvas = document.getElementById('scrollingCanvas');
const ctx = canvas.getContext('2d');
const text = "hello";
let x = canvas.width;

function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
}

resize();
window.addEventListener('resize', resize);

function draw() {
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.width / dpr;
    const cssHeight = canvas.height / dpr;

    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, cssHeight / 2);

    x -= 2;
    if (x < -ctx.measureText(text).width) {
        x = cssWidth;
    }
    requestAnimationFrame(draw);
}

draw();