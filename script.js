(() => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const forceTop = () => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    const active = document.activeElement;
    if (active && typeof active.blur === "function" && active !== document.body) {
      active.blur();
    }

    document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  };

  // Some mobile browsers restore position after fonts/images/layout are finished.
  // Keep pinning the initial page to the top for the first 2 seconds only.
  const delays = [0, 25, 75, 150, 300, 600, 1000, 1500, 2000];

  forceTop();

  document.addEventListener("DOMContentLoaded", () => {
    delays.forEach((delay) => setTimeout(forceTop, delay));
  }, { once: true });

  window.addEventListener("load", () => {
    delays.forEach((delay) => setTimeout(forceTop, delay));
  }, { once: true });

  window.addEventListener("pageshow", () => {
    delays.forEach((delay) => setTimeout(forceTop, delay));
  });

  window.addEventListener("popstate", () => {
    setTimeout(forceTop, 0);
  });
})();


(() => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const forceTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // On a fresh/opened link, always start at the top.
  if (location.hash) {
    history.replaceState(null, "", location.pathname + location.search);
  }

  forceTop();
  document.addEventListener("DOMContentLoaded", forceTop, { once: true });
  window.addEventListener("load", () => {
    forceTop();
    requestAnimationFrame(forceTop);
    setTimeout(forceTop, 0);
    setTimeout(forceTop, 100);
    setTimeout(forceTop, 350);
  }, { once: true });

  window.addEventListener("pageshow", () => {
    forceTop();
    setTimeout(forceTop, 50);
  });
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
