const menuItems = document.querySelectorAll(".menu li");
const sections  = document.querySelectorAll(".section");

/* ── CLICK: tanlangan bo'limga silliq scroll ── */
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const target = document.getElementById(item.dataset.target);
    if (!target) return;
    const offset = window.innerWidth <= 768 ? 80 : 30;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

/* ── SCROLL SPY: qaysi bo'lim ko'rinishda ekanini belgilash ── */
let ticking = false;   // debounce — loop oldini oladi

function updateActive() {
  const offset = window.innerWidth <= 768 ? 100 : 180;
  let current = "";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - offset) {
      current = section.id;
    }
  });

  menuItems.forEach(li => {
    const wasActive = li.classList.contains("active");
    const isActive  = li.dataset.target === current;

    li.classList.toggle("active", isActive);

    // Mobilda yangi aktiv element bo'lsa scroll qilamiz
    // (lekin avval aktiv bo'lmagan bo'lsagina — loop oldini oladi)
    if (isActive && !wasActive && window.innerWidth <= 768) {
      li.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  });

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateActive);
    ticking = true;
  }
}, { passive: true });

// Sahifa ochilganda ham bir marta ishlatish
updateActive();
