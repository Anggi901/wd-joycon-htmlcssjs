// Tombol & text info
const textScreen = document.getElementById('textScreen');
const sprite = document.getElementById('sprite');
const textLabel = document.getElementById('textLabel');
const buttons = document.querySelectorAll('button');

// Sprite URLs
const sprites = {
  Atas: 'gambar/ataspng.png',
  Bawah: 'gambar/bawahpnggg.png',
  Kiri: 'gambar/kiripng.png',
  Kanan: 'gambar/kananpng.png',
  A: 'gambar/Apng.png',
  B: 'gambar/Bpng.png'
};

buttons.forEach(btn => {
  btn.addEventListener('click', () => handleAction(btn.dataset.action));
});

document.addEventListener('keydown', (e) => {
  let action = '';
  switch (e.key) {
    case 'ArrowUp': action = 'Atas'; break;
    case 'ArrowDown': action = 'Bawah'; break;
    case 'ArrowLeft': action = 'Kiri'; break;
    case 'ArrowRight': action = 'Kanan'; break;
    case 'a': case 'A': action = 'A'; break;
    case 'b': case 'B': action = 'B'; break;
  }
  if (action) handleAction(action);
});

function handleAction(action) {
  textLabel.textContent = action;
  sprite.src = sprites[action] || '';
  textScreen.classList.remove('animate');
  void textScreen.offsetWidth;
  textScreen.classList.add('animate');

  waveAmp += 5; // boosting wave effect
}

// Background bintang
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5, r: Math.random()*2+0.5 });
}

canvas.addEventListener('click', e => {
  for (let i = 0; i < 10; i++) {
    stars.push({ x: e.clientX, y: e.clientY, vx: (Math.random()-0.5)*1, vy: (Math.random()-0.5)*1, r: Math.random()*2+0.5 });
  }
});

function animateStars() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;
    if (s.x < 0 || s.x > canvas.width || s.y < 0 || s.y > canvas.height) {
      s.x = Math.random() * canvas.width;
      s.y = Math.random() * canvas.height;
    }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Ocean Canvas
const ocean = document.getElementById('oceanCanvas');
const octx = ocean.getContext('2d');
let waveAmp = 20;
let waveOffset = 0;

function drawOcean() {
  octx.clearRect(0, 0, ocean.width, ocean.height);
  octx.fillStyle = '#00aaff';
  octx.beginPath();
  octx.moveTo(0, ocean.height/2);

  for (let x = 0; x <= ocean.width; x++) {
    let y = ocean.height/2 + Math.sin((x+waveOffset)*0.05) * waveAmp;
    octx.lineTo(x, y);
  }

  octx.lineTo(ocean.width, ocean.height);
  octx.lineTo(0, ocean.height);
  octx.closePath();
  octx.fill();

  waveOffset += 2;
  waveAmp *= 0.99; // decay back to normal
  requestAnimationFrame(drawOcean);
}
drawOcean();