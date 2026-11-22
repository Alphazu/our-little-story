// Personalize these two dates before sharing your page. Times use the visitor's local time zone.
const LOVE_START_DATE = "2026-04-02T00:00:00";
const PROPOSAL_DATE = "2026-12-04T18:00:00";

const memories = [
  ["assets/memories/memory-01.jpeg", "Us, exactly where we belong"],
  ["assets/memories/memory-02.jpeg", "One of my favorite smiles"],
  ["assets/memories/memory-03.jpeg", "A little moment, just ours"],
  ["assets/memories/memory-04.jpeg", "Together is my favorite place"],
  ["assets/memories/memory-05.jpeg", "Another story in a photo"],
  ["assets/memories/memory-06.jpeg", "My favorite kind of company"],
  ["assets/memories/memory-07.jpeg", "One for our scrapbook"],
  ["assets/memories/memory-08.jpeg", "An ordinary day made golden"],
  ["assets/memories/memory-09.jpeg", "Always my favorite person"],
  ["assets/memories/memory-10.jpeg", "A memory I want to keep"],
  ["assets/memories/memory-11.jpeg", "Our kind of happy"],
  ["assets/memories/memory-12.jpeg", "Somewhere, sometime, us"],
  ["assets/memories/memory-13.jpeg", "One more reason to smile"],
  ["assets/memories/memory-14.jpeg", "Life is sweeter with you"],
  ["assets/memories/memory-15.jpeg", "Little moments, big love"],
  ["assets/memories/memory-16.jpeg", "Just us being us"],
  ["assets/memories/memory-17.jpeg", "One of those days"],
  ["assets/memories/memory-18.jpeg", "Written in our own little way"],
  ["assets/memories/memory-19.jpeg", "More memories to come"],
  ["assets/memories/memory-20.jpeg", "Made better by you"],
  ["assets/memories/memory-21.jpeg", "Us, in a little moment"]
];

const reasons = [
  "Your smile", "Your kindness", "Your laugh", "Your strength", "Your patience",
  "The way you listen", "Your wonderfully weird jokes", "Your brave heart", "Your warm hugs", "Your curiosity",
  "How you make me feel at home", "Your thoughtful little gestures", "Your bright ideas", "The way you care",
  "Your gentle honesty", "Your happy dance", "How you see the good", "Your big dreams", "Your cozy company",
  "Your generous heart", "How you cheer me on", "Your contagious excitement", "The way you say my name",
  "Your quiet courage", "Your silly side", "Every adventure with you", "Your beautiful mind", "Your soft heart",
  "The way you choose us", "Simply, all of you"
];

const quotes = [
  ["I didn't want an arranged marriage because I wanted to fall madly in love with my best friend.", "Anurag, for Gargi"],
  ["Your hand in mine can turn an ordinary day into a place I want to stay.", "Our little truth"],
  ["Wherever our days take us, I hope we keep finding our way back to each other.", "A promise to keep"],
  ["I found my favorite kind of home in the quiet moments we share.", "The simplest kind of magic"],
  ["I love the person I am in the joyful little world we make together.", "A note from my heart"],
  ["You make the future feel less like a mystery and more like an invitation.", "A little reminder"],
  ["Somehow, even the smallest errands become adventures when you're there.", "Everyday wonder"],
  ["My favorite plans always leave room for one more moment with you.", "A thought for us"],
  ["I still get butterflies—and I'd still choose you, every time.", "Always, your person"],
  ["Of all the beautiful things ahead, sharing them with you is my favorite.", "For all our tomorrows"]
];

const funnyMessages = ["Are you sure? 😘", "Try again ❤️", "Nice try 😄", "That button is shy!", "One more little think?"];
const pastelCards = ["#fbeaf0", "#f0eafa", "#fff1e2", "#eaf4f2", "#f9e9e1", "#f2edf8"];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderMemories() {
  const grid = document.getElementById("memory-grid");
  const shuffledMemories = [...memories];
  for (let index = shuffledMemories.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledMemories[index], shuffledMemories[randomIndex]] = [shuffledMemories[randomIndex], shuffledMemories[index]];
  }
  if (shuffledMemories.every(([photoSrc], index) => photoSrc === memories[index][0])) {
    [shuffledMemories[0], shuffledMemories[1]] = [shuffledMemories[1], shuffledMemories[0]];
  }

  shuffledMemories.forEach(([photoSrc, caption], index) => {
    const button = document.createElement("button");
    button.className = "memory-card";
    button.type = "button";
    button.style.setProperty("--rotate", `${(Math.random() * 10 - 5).toFixed(1)}deg`);
    button.style.setProperty("--jump", `${Math.round(Math.random() * 40 - 20)}px`);
    button.style.setProperty("--ratio", index % 4 === 1 ? "1" : ".88");
    button.setAttribute("aria-label", `View memory: ${caption}`);
    const image = document.createElement("img");
    image.src = photoSrc;
    image.alt = `Shared memory ${String(index + 1).padStart(2, "0")} of Anurag and Gargi: ${caption}`;
    image.loading = "lazy";
    image.decoding = "async";
    const label = document.createElement("span");
    label.className = "memory-caption";
    label.textContent = caption;
    button.append(image, label);
    button.addEventListener("click", () => openLightbox(image.src, caption));
    grid.append(button);
  });
}

function openLightbox(src, caption) {
  const dialog = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-image");
  image.src = src;
  image.alt = caption;
  document.getElementById("lightbox-caption").textContent = caption;
  dialog.showModal();
}

function renderReasons() {
  const grid = document.getElementById("reasons-grid");
  reasons.forEach((reason, index) => {
    const card = document.createElement("div");
    card.className = "reason-card reveal";
    card.textContent = reason;
    card.style.setProperty("--card-bg", pastelCards[index % pastelCards.length]);
    card.style.setProperty("--delay", `${(index % 5) * 55}ms`);
    grid.append(card);
  });
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reducedMotion) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: "0px 0px -35px 0px" });
  elements.forEach((element) => observer.observe(element));
}

function addMonths(date, amount) {
  const result = new Date(date);
  const day = result.getDate();
  result.setDate(1);
  result.setMonth(result.getMonth() + amount);
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(day, lastDay));
  return result;
}

function updateLoveCounter() {
  const start = new Date(LOVE_START_DATE);
  const now = new Date();
  if (Number.isNaN(start.getTime()) || start > now) return;

  let cursor = new Date(start);
  let years = now.getFullYear() - cursor.getFullYear();
  if (addMonths(cursor, years * 12) > now) years -= 1;
  cursor = addMonths(cursor, years * 12);
  let months = (now.getFullYear() - cursor.getFullYear()) * 12 + now.getMonth() - cursor.getMonth();
  if (addMonths(cursor, months) > now) months -= 1;
  cursor = addMonths(cursor, months);
  const remainder = Math.max(0, now.getTime() - cursor.getTime());
  const days = Math.floor(remainder / 86_400_000);
  const hours = Math.floor((remainder % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remainder % 3_600_000) / 60_000);
  const seconds = Math.floor((remainder % 60_000) / 1000);
  const values = { years, months, days, hours, minutes, seconds };
  Object.entries(values).forEach(([unit, value]) => {
    document.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(2, "0");
  });
}

function updateProposalCountdown() {
  const target = new Date(PROPOSAL_DATE);
  const output = document.getElementById("proposal-countdown");
  const caption = document.getElementById("countdown-caption");
  if (Number.isNaN(target.getTime())) {
    output.textContent = "Date to be decided";
    caption.textContent = "Add your date in script.js";
    return;
  }
  const remaining = target.getTime() - Date.now();
  if (remaining <= 0) {
    output.textContent = "The day is here ✨";
    caption.textContent = "our next chapter starts now";
    return;
  }
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  output.innerHTML = `<span><strong>${days}</strong>days</span> · <span><strong>${String(hours).padStart(2, "0")}</strong>hours</span> · <span><strong>${String(minutes).padStart(2, "0")}</strong>minutes</span> · <span><strong>${String(seconds).padStart(2, "0")}</strong>seconds</span>`;
}

function setupQuotes() {
  const text = document.getElementById("quote-text");
  const author = document.getElementById("quote-author");
  const dots = document.getElementById("quote-dots");
  let current = 0;
  let timer;
  const dotButtons = quotes.map((_, index) => {
    const button = document.createElement("button");
    button.className = "quote-dot";
    button.type = "button";
    button.setAttribute("aria-label", `Show quote ${index + 1}`);
    button.addEventListener("click", () => show(index));
    dots.append(button);
    return button;
  });
  function show(index) {
    current = (index + quotes.length) % quotes.length;
    text.style.opacity = "0";
    text.style.transform = "translateY(6px)";
    window.setTimeout(() => {
      text.textContent = quotes[current][0];
      author.textContent = quotes[current][1];
      text.style.opacity = "1";
      text.style.transform = "translateY(0)";
    }, reducedMotion ? 0 : 160);
    dotButtons.forEach((button, dotIndex) => {
      if (dotIndex === current) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
    restart();
  }
  function restart() {
    window.clearInterval(timer);
    if (!reducedMotion && !document.hidden) timer = window.setInterval(() => show(current + 1), 5600);
  }
  document.getElementById("quote-prev").addEventListener("click", () => show(current - 1));
  document.getElementById("quote-next").addEventListener("click", () => show(current + 1));
  const stage = document.querySelector(".quote-section");
  stage.addEventListener("mouseenter", () => window.clearInterval(timer));
  stage.addEventListener("mouseleave", restart);
  stage.addEventListener("focusin", () => window.clearInterval(timer));
  stage.addEventListener("focusout", restart);
  document.addEventListener("visibilitychange", () => document.hidden ? window.clearInterval(timer) : restart());
  show(0);
}

function setupMusic() {
  const audio = document.getElementById("love-song");
  const button = document.getElementById("music-toggle");
  const buttonIcon = button.querySelector(".music-button-icon");
  const controlLabel = button.querySelector(".music-control-label");
  const widget = document.querySelector(".music-widget");
  const status = document.getElementById("music-status");
  audio.volume = Number(document.getElementById("volume").value);
  function setButtonState(isPlaying) {
    widget.classList.toggle("music-playing", isPlaying);
    button.setAttribute("aria-pressed", String(isPlaying));
    button.setAttribute("aria-label", isPlaying ? "Pause romantic music" : "Play romantic music");
    buttonIcon.textContent = isPlaying ? "Ⅱ" : "▶";
    controlLabel.textContent = isPlaying ? "Pause" : "Play";
  }
  function showPlaybackError(error) {
    setButtonState(false);
    status.textContent = window.location.protocol === "file:"
      ? "Use the published site or a local server for music"
      : "Audio couldn't load. Check the soundtrack file.";
    if (error) console.error("Music playback failed:", error);
  }
  async function startMusic(automatic = false) {
    if (window.location.protocol === "file:") {
      status.textContent = "For music, use the published site or a local server";
      return;
    }
    try {
      await audio.play();
      setButtonState(true);
      status.textContent = "playing just for you";
    } catch (error) {
      if (error?.name === "NotAllowedError") {
        status.textContent = automatic ? "Tap ♫ to start the music" : "Your browser blocked audio. Tap to try again";
      } else {
        showPlaybackError(error);
      }
    }
  }
  button.addEventListener("click", () => {
    if (audio.paused) {
      void startMusic();
    } else {
      audio.pause();
      setButtonState(false);
      status.textContent = "a song for this moment";
    }
  });
  audio.addEventListener("error", () => showPlaybackError(audio.error));
  document.getElementById("volume").addEventListener("input", (event) => {
    audio.volume = Number(event.currentTarget.value);
  });
  status.textContent = "starting our song…";
  void startMusic(true);
}

function setupTheme() {
  const button = document.getElementById("theme-toggle");
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  function setTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
  setTheme(media.matches);
  button.addEventListener("click", () => setTheme(!document.body.classList.contains("dark-mode")));
}

function setupAmbientHearts() {
  const container = document.getElementById("ambient");
  if (reducedMotion) return;
  window.setInterval(() => {
    if (document.hidden) return;
    const heart = document.createElement("span");
    heart.className = "ambient-heart";
    heart.textContent = Math.random() > .5 ? "♥" : "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${10 + Math.random() * 13}px`;
    heart.style.animationDuration = `${9 + Math.random() * 9}s`;
    container.append(heart);
    window.setTimeout(() => heart.remove(), 19_000);
  }, 1250);
}

function setupCursorTrail() {
  if (reducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
  const container = document.getElementById("cursor-hearts");
  let last = 0;
  window.addEventListener("pointermove", (event) => {
    const now = performance.now();
    if (now - last < 115) return;
    last = now;
    const heart = document.createElement("span");
    heart.className = "trail-heart";
    heart.textContent = "♥";
    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;
    heart.style.fontSize = `${8 + Math.random() * 8}px`;
    container.append(heart);
    window.setTimeout(() => heart.remove(), 800);
  }, { passive: true });
}

function setupParallaxAndProgress() {
  let scheduled = false;
  const progress = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
      const glow = document.querySelector(".glow-one");
      if (glow && !reducedMotion) glow.style.transform = `translateY(${window.scrollY * .12}px)`;
      scheduled = false;
    });
  }, { passive: true });
}

function setupTypewriter() {
  const messages = ["my favorite person.", "my safe place.", "my once-in-a-lifetime.", "my always."];
  const target = document.querySelector(".hero-note");
  if (!target || reducedMotion) return;
  const typeSpan = document.createElement("span");
  typeSpan.className = "typewriter";
  typeSpan.setAttribute("aria-hidden", "true");
  target.append(document.createTextNode(" · "), typeSpan);
  let messageIndex = 0;
  let letterIndex = 0;
  let deleting = false;
  const type = () => {
    const message = messages[messageIndex];
    typeSpan.textContent = message.slice(0, letterIndex);
    if (!deleting && letterIndex < message.length) letterIndex += 1;
    else if (!deleting) { deleting = true; window.setTimeout(type, 1600); return; }
    else if (letterIndex > 0) letterIndex -= 1;
    else { deleting = false; messageIndex = (messageIndex + 1) % messages.length; }
    window.setTimeout(type, deleting ? 45 : 85);
  };
  type();
}

function setupProposal() {
  const think = document.getElementById("think-button");
  let attempts = 0;
  function dodge(event) {
    if (event) event.preventDefault();
    attempts += 1;
    const choices = [
      [75, -16], [-70, 18], [38, 29], [-35, -27], [0, 0]
    ];
    const [x, y] = choices[(attempts - 1) % choices.length];
    think.style.transform = `translate(${x}px, ${y}px) scale(${attempts % 3 === 0 ? .92 : 1})`;
    think.textContent = funnyMessages[(attempts - 1) % funnyMessages.length];
  }
  think.addEventListener("pointerenter", dodge);
  think.addEventListener("pointerdown", dodge);
  think.addEventListener("click", (event) => { event.preventDefault(); dodge(event); });

  const overlay = document.getElementById("yes-overlay");
  function celebrate() {
    overlay.hidden = false;
    overlay.querySelectorAll(".celebration-heart").forEach((heart) => heart.remove());
    if (!reducedMotion) {
      for (let index = 0; index < 22; index += 1) {
        const heart = document.createElement("span");
        heart.className = "celebration-heart";
        heart.textContent = index % 3 === 0 ? "♡" : "♥";
        heart.style.setProperty("--x", `${Math.random() * 100}%`);
        heart.style.setProperty("--delay", `${Math.random() * .8}s`);
        heart.style.setProperty("--duration", `${2.5 + Math.random() * 2}s`);
        overlay.append(heart);
      }
    }
    launchFireworks();
    document.getElementById("celebrate-again").focus({ preventScroll: true });
  }
  document.getElementById("yes-button").addEventListener("click", celebrate);
  document.getElementById("celebrate-again").addEventListener("click", launchFireworks);
}

let fireworksFrame = 0;
function launchFireworks() {
  const canvas = document.getElementById("fireworks-canvas");
  const context = canvas.getContext("2d");
  if (!context) return;
  window.cancelAnimationFrame(fireworksFrame);
  const bounds = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(bounds.width * ratio);
  canvas.height = Math.floor(bounds.height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  const colors = ["#f17fa4", "#e8b4b8", "#f4ce91", "#ceb5ed", "#fff"];
  const particles = [];
  const started = performance.now();
  const narrow = bounds.width < 680;
  function burst(time) {
    if (time - started > 6000) return;
    for (let b = 0; b < 3; b += 1) {
      const onLeft = Math.random() < .5;
      const x = narrow
        ? 18 + Math.random() * (bounds.width - 36)
        : bounds.width * (onLeft ? .1 + Math.random() * .15 : .75 + Math.random() * .15);
      const y = narrow
        ? bounds.height * (Math.random() < .5 ? .08 + Math.random() * .12 : .82 + Math.random() * .1)
        : 35 + Math.random() * Math.min(290, bounds.height * .55);
      const count = 38;
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 1.1 + Math.random() * 3.2;
        particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 45 + Math.random() * 35, color: colors[Math.floor(Math.random() * colors.length)], size: 1.4 + Math.random() * 2 });
      }
      for (let i = 0; i < 22; i += 1) {
        particles.push({ x: Math.random() * bounds.width, y: -Math.random() * 90, vx: (Math.random() - .5) * 1.5, vy: 1 + Math.random() * 2.5, life: 75 + Math.random() * 45, color: colors[Math.floor(Math.random() * colors.length)], size: 3 + Math.random() * 4, shape: "confetti" });
      }
    }
  }
  let lastBurst = 0;
  function frame(time) {
    context.clearRect(0, 0, bounds.width, bounds.height);
    if (time - lastBurst > 550 && time - started < 4800) { burst(time); lastBurst = time; }
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += .035;
      particle.life -= 1;
      context.globalAlpha = Math.max(0, Math.min(1, particle.life / 50));
      context.fillStyle = particle.color;
      if (particle.shape === "confetti") {
        context.fillRect(particle.x, particle.y, particle.size, particle.size * 1.7);
      } else {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }
    });
    context.globalAlpha = 1;
    for (let i = particles.length - 1; i >= 0; i -= 1) if (particles[i].life <= 0) particles.splice(i, 1);
    if (time - started < 6300 || particles.length) fireworksFrame = window.requestAnimationFrame(frame);
    else context.clearRect(0, 0, bounds.width, bounds.height);
  }
  fireworksFrame = window.requestAnimationFrame(frame);
}

function setupStars() {
  const canvas = document.getElementById("stars-canvas");
  const context = canvas.getContext("2d");
  if (!context) return;
  let width = 0;
  let height = 0;
  let stars = [];
  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({ length: Math.min(70, Math.ceil(width * height / 15000)) }, () => ({
      x: Math.random() * width, y: Math.random() * height, size: .4 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2, speed: .003 + Math.random() * .008
    }));
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });
  if (reducedMotion) {
    context.fillStyle = "rgba(201, 140, 171, .5)";
    stars.forEach((star) => { context.beginPath(); context.arc(star.x, star.y, star.size, 0, Math.PI * 2); context.fill(); });
    return;
  }
  let frameId;
  function draw() {
    if (document.hidden) { frameId = 0; return; }
    context.clearRect(0, 0, width, height);
    const now = performance.now();
    stars.forEach((star) => {
      const alpha = .2 + (Math.sin(now * star.speed + star.phase) + 1) * .27;
      context.fillStyle = `rgba(187, 131, 167, ${alpha})`;
      context.beginPath();
      context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      context.fill();
    });
    frameId = window.requestAnimationFrame(draw);
  }
  function visibilityChange() {
    if (!document.hidden && !frameId) frameId = window.requestAnimationFrame(draw);
  }
  document.addEventListener("visibilitychange", visibilityChange);
  draw();
}

function setupNazarFloat() {
  const nazar = document.querySelector(".nazar-float");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bounds = nazar.getBoundingClientRect();
  const width = bounds.width || 24;
  const height = bounds.height || 24;
  const randomPoint = () => ({
    x: (window.innerWidth - width) * (.12 + Math.random() * .70),
    y: (window.innerHeight - height) * (.12 + Math.random() * .70),
    rotation: -30 + Math.random() * 60
  });
  const toTransform = (point) => `translate3d(${point.x}px, ${point.y}px, 0) rotate(${point.rotation}deg)`;
  let current = randomPoint();
  let animation = null;
  let timer = 0;
  nazar.style.transform = toTransform(current);
  if (reducedMotion) return;

  function moveNext() {
    const next = randomPoint();
    animation = nazar.animate(
      [{ transform: toTransform(current) }, { transform: toTransform(next) }],
      { duration: 22000 + Math.random() * 16000, easing: "ease-in-out", fill: "forwards" }
    );
    animation.onfinish = () => {
      current = next;
      nazar.style.transform = toTransform(current);
      animation.cancel();
      animation = null;
      timer = window.setTimeout(moveNext, 800 + Math.random() * 2000);
    };
  }

  moveNext();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      animation?.pause();
      window.clearTimeout(timer);
    } else if (animation?.playState === "paused") {
      animation.play();
    } else if (!animation) {
      moveNext();
    }
  });
  window.addEventListener("resize", () => {
    animation?.cancel();
    animation = null;
    window.clearTimeout(timer);
    current = randomPoint();
    nazar.style.transform = toTransform(current);
    if (!document.hidden) moveNext();
  }, { passive: true });
}

function setupDialogs() {
  document.querySelectorAll("dialog .modal-close").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog").close());
  });
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
  document.getElementById("secret-button").addEventListener("click", () => {
    document.getElementById("secret-modal").showModal();
  });
}

function init() {
  renderMemories();
  renderReasons();
  setupReveal();
  setupQuotes();
  setupMusic();
  setupTheme();
  setupAmbientHearts();
  setupCursorTrail();
  setupParallaxAndProgress();
  setupTypewriter();
  setupProposal();
  setupStars();
  setupNazarFloat();
  setupDialogs();
  updateLoveCounter();
  updateProposalCountdown();
  window.setInterval(updateLoveCounter, 1000);
  window.setInterval(updateProposalCountdown, 1000);
  window.setTimeout(() => document.getElementById("loader").classList.add("is-done"), 250);
}

document.addEventListener("DOMContentLoaded", init, { once: true });
