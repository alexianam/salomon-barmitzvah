(() => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  function forceTopOnOpen() {
    const isTopHash = !window.location.hash || window.location.hash === "#" || window.location.hash === "#accueil" || window.location.hash === "#top";
    if (isTopHash) {
      window.scrollTo(0, 0);
      if (window.location.hash === "#accueil" || window.location.hash === "#top" || window.location.hash === "#") {
        history.replaceState(null, "", window.location.pathname);
      }
    }
  }

  window.addEventListener("load", forceTopOnOpen);
  window.addEventListener("pageshow", forceTopOnOpen);
})();

(() => {
  const target = new Date("2026-11-05T10:15:00+01:00").getTime();

  const $ = (id) => document.getElementById(id);
  const pad = (v) => String(v).padStart(2, "0");

  function updateCountdown() {
    const distance = Math.max(0, target - Date.now());
    $("days").textContent = Math.floor(distance / 86400000);
    $("hours").textContent = pad(Math.floor((distance % 86400000) / 3600000));
    $("minutes").textContent = pad(Math.floor((distance % 3600000) / 60000));
    $("seconds").textContent = pad(Math.floor((distance % 60000) / 1000));
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const audio = $("backgroundMusic");
  const button = $("musicButton");

  button.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        button.setAttribute("aria-pressed", "true");
        button.setAttribute("aria-label", "Couper la musique");
      } catch (_) {}
    } else {
      audio.pause();
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-label", "Activer la musique");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
})();
