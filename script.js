(() => {
  const target = new Date("2026-11-05T10:15:00+01:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const pad = (value) => String(value).padStart(2, "0");

  function updateCountdown() {
    const now = Date.now();
    const distance = Math.max(0, target - now);

    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    daysEl.textContent = String(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const audio = document.getElementById("backgroundMusic");
  const button = document.getElementById("musicButton");

  async function playAudio() {
    try {
      await audio.play();
      button.setAttribute("aria-pressed", "true");
      button.setAttribute("aria-label", "Couper la musique");
    } catch (_) {
      // Autoplay may be blocked until the user explicitly clicks the button.
    }
  }

  function pauseAudio() {
    audio.pause();
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", "Activer la musique");
  }

  button.addEventListener("click", async () => {
    if (audio.paused) {
      await playAudio();
    } else {
      pauseAudio();
    }
  });

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
})();
