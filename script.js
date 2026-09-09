(() => {
  // Countdown to the France ceremony, local Paris time.
  // 5 Nov 2026 at 10:15 CET = 09:15 UTC.
  const target = new Date("2026-11-05T09:15:00Z").getTime();

  const ids = ["days","hours","minutes","seconds"];
  const els = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));

  function tick(){
    const diff = Math.max(0, target - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    els.days.textContent = days;
    els.hours.textContent = String(hours).padStart(2,"0");
    els.minutes.textContent = String(minutes).padStart(2,"0");
    els.seconds.textContent = String(seconds).padStart(2,"0");
  }
  tick();
  setInterval(tick, 1000);

  const btn = document.getElementById("musicBtn");
  const music = document.getElementById("bgMusic");
  let playing = false;

  btn.addEventListener("click", async () => {
    try{
      if(!playing){
        await music.play();
        playing = true;
        btn.textContent = "♪";
        btn.setAttribute("aria-label","Couper la musique");
      }else{
        music.pause();
        playing = false;
        btn.textContent = "♫";
        btn.setAttribute("aria-label","Activer la musique");
      }
    }catch(e){
      alert("Le fichier music.m4a doit rester présent dans le dépôt GitHub.");
    }
  });
})();
