// ================================================
// ISI TANGGAL ULANG TAHUN SELI DI BARIS BAWAH INI
// Format: YYYY-MM-DDTHH:MM:SS
// Contoh: 2026-12-20T00:00:00
// ================================================
const birthdayDate = new Date("2026-11-16T00:00:00").getTime();

const byId = (id) => document.getElementById(id);
const countdownIds = ["days", "hours", "minutes", "seconds"];

function updateCountdown() {
  const now = Date.now();
  const validDate = Number.isFinite(birthdayDate);
  if (!validDate) {
    countdownIds.forEach(id => byId(id).textContent = "--");
    byId("countdownNote").textContent = "Isi tanggal ulang tahun di script.js untuk mengaktifkan countdown ♡";
    return;
  }
  const distance = birthdayDate - now;
  if (distance <= 0) {
    countdownIds.forEach(id => byId(id).textContent = "00");
    byId("countdownNote").textContent = "The special day is here! Happy birthday, Seli ♡";
    byId("openBirthday").textContent = "✦ OPEN SELI'S SPECIAL DAY ✦";
    return;
  }
  const values = [
    Math.floor(distance / 86400000),
    Math.floor((distance % 86400000) / 3600000),
    Math.floor((distance % 3600000) / 60000),
    Math.floor((distance % 60000) / 1000)
  ];
  countdownIds.forEach((id, i) => byId(id).textContent = String(values[i]).padStart(2, "0"));
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Tombol countdown membawa pengunjung ke halaman ucapan.
byId("openBirthday").addEventListener("click", () => {
  byId("birthday").scrollIntoView({ behavior: "smooth" });
});

// Kejutan dan confetti.
function openSurprise() {
  byId("surpriseModal").classList.add("show");
  byId("surpriseModal").setAttribute("aria-hidden", "false");
  launchConfetti();
}
function closeSurprise() {
  byId("surpriseModal").classList.remove("show");
  byId("surpriseModal").setAttribute("aria-hidden", "true");
}
byId("surpriseButton").addEventListener("click", openSurprise);
byId("closeModal").addEventListener("click", closeSurprise);
byId("modalDone").addEventListener("click", closeSurprise);
byId("surpriseModal").addEventListener("click", e => {
  if (e.target === byId("surpriseModal")) closeSurprise();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeSurprise(); });

// Buka/tutup surat.
byId("letterButton").addEventListener("click", () => {
  const paper = byId("letterPaper");
  paper.classList.toggle("open");
  byId("letterButton").lastChild.textContent = paper.classList.contains("open")
    ? " CLICK TO CLOSE YOUR LETTER" : " CLICK TO OPEN YOUR LETTER";
  if (paper.classList.contains("open")) paper.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Musik: coba putar otomatis saat website dibuka.
// Catatan: browser dapat memblokir autoplay bersuara sampai ada interaksi pengguna.
const music = byId("birthdayMusic");
const musicButton = byId("musicButton");

function setMusicButton(isPlaying) {
  musicButton.textContent = isPlaying ? "♫ MUSIC: ON" : "♫ MUSIC: OFF";
}

async function startMusic() {
  try {
    await music.play();
    setMusicButton(true);
    return true;
  } catch (error) {
    // Autoplay mungkin diblokir browser; akan dicoba lagi saat pengunjung berinteraksi.
    setMusicButton(false);
    return false;
  }
}

// Percobaan autoplay ketika halaman selesai dimuat.
window.addEventListener("load", () => {
  startMusic();
});

// Jika autoplay diblokir, interaksi pertama pengunjung akan memulai musik.
async function startMusicOnFirstInteraction() {
  if (music.paused) {
    const started = await startMusic();
    if (started) {
      document.removeEventListener("pointerdown", startMusicOnFirstInteraction);
      document.removeEventListener("keydown", startMusicOnFirstInteraction);
    }
  }
}
document.addEventListener("pointerdown", startMusicOnFirstInteraction);
document.addEventListener("keydown", startMusicOnFirstInteraction);

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    const started = await startMusic();
    if (!started) {
      musicButton.textContent = "♫ TAP TO PLAY";
    }
  } else {
    music.pause();
    setMusicButton(false);
  }
});

music.addEventListener("play", () => setMusicButton(true));
music.addEventListener("pause", () => setMusicButton(false));

// Bintang berkelip di latar.
for (let i = 0; i < 85; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.textContent = Math.random() > .45 ? "✦" : "·";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.fontSize = (7 + Math.random() * 12) + "px";
  star.style.animationDelay = Math.random() * 3 + "s";
  byId("starLayer").appendChild(star);
}

// Kelopak kecil jatuh perlahan.
setInterval(() => {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = ["✿", "❀", "♡"][Math.floor(Math.random() * 3)];
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.fontSize = (10 + Math.random() * 14) + "px";
  petal.style.animationDuration = (7 + Math.random() * 6) + "s";
  byId("petalLayer").appendChild(petal);
  setTimeout(() => petal.remove(), 14000);
}, 1100);

function launchConfetti() {
  const symbols = ["✦", "♡", "✿", "♥", "✧"];
  const colors = ["#f4c6da", "#e8c9a7", "#d8b7ee", "#fff0f5"];
  for (let i = 0; i < 55; i++) {
    const item = document.createElement("span");
    item.className = "confetti";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = Math.random() * 100 + "vw";
    item.style.color = colors[Math.floor(Math.random() * colors.length)];
    item.style.fontSize = (12 + Math.random() * 17) + "px";
    item.style.animationDuration = (2.5 + Math.random() * 2) + "s";
    document.body.appendChild(item);
    setTimeout(() => item.remove(), 5000);
  }
}
