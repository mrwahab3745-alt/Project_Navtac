const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const digitalClock = document.getElementById('digital-clock');
const toggleBtn = document.getElementById('toggle-btn');
let isAnalog = true; // Yeh track karega ke abhi konsi clock chal rahi hai


// Ghari ka radius set karny k liye canvas ki height ka aadha lete hain
let radius = canvas.height / 2;

// Ghari ke center ko canvas ke center par set karte hain
ctx.translate(radius, radius);

// Ghari ke radius ko thoda chhota kar dete hain taki ghari canvas ke andar fit ho jaye
radius = radius * 0.90;

ctx.arc(0, 0, radius, 0, 2 * Math.PI);

function drawClock() {
    ctx.beginPath();
    ctx.arc(0,0 , radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.fill();
    
}
drawClock();

function drawNumbers() {
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = 'black';
    for (let num = 1; num <= 12; num++) {
        let ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}
drawNumbers();

function drawTime() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // Hour Hand: 12 ghanto mein 2*PI radians
    hour = hour % 12;
    let hourPos = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hourPos, radius * 0.5, radius * 0.07);

    // Minute Hand: 60 minutes mein 2*PI radians
    let minutePos = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minutePos, radius * 0.8, radius * 0.07);

    // Second Hand: 60 seconds mein 2*PI radians
    let secondPos = (second * Math.PI / 30);
    ctx.strokeStyle = "red"; // Second hand ko red kar dete hain look ke liye
    drawHand(ctx, secondPos, radius * 0.9, radius * 0.02);
    ctx.strokeStyle = "blue"; // Wapas blue par reset (jo tumhara clock border hai)
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round"; // Is se sui ke kinare gol (smooth) ho jayenge
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos); // Wapas reset karo taake agli sui sahi draw ho
}

function updateClock() {
    if (isAnalog) {
        // Analog logic
        drawClock();
        drawNumbers();
        drawTime();
    } else {
        // Digital logic
        let now = new Date();
        let h = now.getHours().toString().padStart(2, '0');
        let m = now.getMinutes().toString().padStart(2, '0');
        let s = now.getSeconds().toString().padStart(2, '0');
        
        digitalClock.innerText = h + ":" + m + ":" + s;
    }
}

setInterval(updateClock, 1000); // Har second clock update karo

toggleBtn.addEventListener('click', function() {
    isAnalog = !isAnalog; 

    if (isAnalog) {
        canvas.style.display = "block"; 
        digitalClock.style.display = "none"; 
        toggleBtn.innerText = "Switch to Digital";
    } else {
        canvas.style.display = "none"; 
        digitalClock.style.display = "block"; 
        toggleBtn.innerText = "Switch to Analog";
    }
});
