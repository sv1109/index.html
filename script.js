const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

function moveNo() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

["mouseover", "mousedown", "touchstart", "click"].forEach(evt => {
  noBtn.addEventListener(evt, moveNo);
});

function airhorn() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(110, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.6);

  gain.gain.setValueAtTime(1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.7);
}

yesBtn.addEventListener("click", () => {
  airhorn();
  document.body.innerHTML = `
    <div style="
      height:100vh;
      background:radial-gradient(circle,#a80000,#1a0000);
      display:flex;
      justify-content:center;
      align-items:center;
      color:white;
      font-family:Arial;">
      <h1>Thank you for saying yes ❤️🔥</h1>
    </div>
  `;
});
