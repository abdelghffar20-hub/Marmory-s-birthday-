const openBtn = document.getElementById("openBtn");
const gift = document.getElementById("gift");
const playBtn = document.getElementById("playBtn");
const song = document.getElementById("song");
const songStartTime = 95; // 1:35

openBtn.addEventListener("click", async () => {
  gift.scrollIntoView({ behavior: "smooth" });
  burstHearts();

  // Start the song at exactly 1:35 from the same user tap.
  try {
    if (song.readyState < 1) {
      await new Promise((resolve, reject) => {
        const onLoaded = () => { cleanup(); resolve(); };
        const onError = () => { cleanup(); reject(new Error("Audio file could not be loaded.")); };
        const cleanup = () => {
          song.removeEventListener("loadedmetadata", onLoaded);
          song.removeEventListener("error", onError);
        };
        song.addEventListener("loadedmetadata", onLoaded, { once: true });
        song.addEventListener("error", onError, { once: true });
        song.load();
      });
    }
    song.currentTime = songStartTime;
    await song.play();
    playBtn.textContent = "❚❚";
  } catch (e) {
    console.error("Audio playback failed:", e);
    playBtn.textContent = "▶";
  }
});

playBtn.addEventListener("click", async () => {
  try {
    if (song.paused) {
      if (song.readyState < 1) {
        await new Promise((resolve, reject) => {
          const onLoaded = () => { cleanup(); resolve(); };
          const onError = () => { cleanup(); reject(new Error("Audio file could not be loaded.")); };
          const cleanup = () => {
            song.removeEventListener("loadedmetadata", onLoaded);
            song.removeEventListener("error", onError);
          };
          song.addEventListener("loadedmetadata", onLoaded, { once: true });
          song.addEventListener("error", onError, { once: true });
          song.load();
        });
      }
      if (song.currentTime < songStartTime || song.currentTime === 0) {
        song.currentTime = songStartTime;
      }
      await song.play();
      playBtn.textContent = "❚❚";
    } else {
      song.pause();
      playBtn.textContent = "▶";
    }
  } catch (e) {
    console.error("Audio playback failed:", e);
    alert("The song could not be loaded. Make sure those-eyes.mp3 is in the same folder as index.html on GitHub.");
  }
});

song.addEventListener("ended", () => {
  playBtn.textContent = "▶";
});

const target = new Date("2026-09-06T00:00:00");

function updateCountdown() {
  const now = new Date();
  let diff = target - now;

  if (diff < 0) diff = 0;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function burstHearts() {
  const symbols = ["♡", "♥", "💗", "💙"];
  for (let i = 0; i < 18; i++) {
    setTimeout(() => createHeart(symbols[Math.floor(Math.random() * symbols.length)]), i * 90);
  }
}

function createHeart(symbol) {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = symbol;
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = (4 + Math.random() * 4) + "s";
  h.style.fontSize = (14 + Math.random() * 16) + "px";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 9000);
}

setInterval(() => {
  if (Math.random() > 0.45) createHeart("♡");
}, 1800);
