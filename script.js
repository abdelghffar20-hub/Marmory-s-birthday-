const openBtn = document.getElementById("openBtn");
const gift = document.getElementById("gift");
const playBtn = document.getElementById("playBtn");
const song = document.getElementById("song");
const songStartTime = 95; // 1:35

openBtn.addEventListener("click", () => {
  gift.scrollIntoView({ behavior: "smooth" });
  burstHearts();

  // Play automatically from 1:35 because this runs directly from the user's tap.
  song.currentTime = songStartTime;
  song.play().then(() => {
    playBtn.textContent = "❚❚";
  }).catch((error) => {
    console.error("Audio playback failed:", error);
  });
});

playBtn.addEventListener("click", () => {
  if (song.paused) {
    if (song.currentTime < songStartTime) {
      song.currentTime = songStartTime;
    }
    song.play().then(() => {
      playBtn.textContent = "❚❚";
    }).catch((error) => {
      console.error("Audio playback failed:", error);
    });
  } else {
    song.pause();
    playBtn.textContent = "▶";
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
  const container = document.querySelector(".hearts");
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.textContent = ["♡", "♥", "❤"][Math.floor(Math.random() * 3)];
    heart.style.left = (45 + Math.random() * 10) + "%";
    heart.style.top = (50 + Math.random() * 10) + "%";
    heart.style.setProperty("--x", ((Math.random() - 0.5) * 300) + "px");
    heart.style.setProperty("--y", (-(100 + Math.random() * 300)) + "px");
    heart.style.animationDelay = (Math.random() * 0.2) + "s";
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 1800);
  }
}
