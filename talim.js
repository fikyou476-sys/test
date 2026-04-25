const menuItems = document.querySelectorAll(".menu li");
const sections = document.querySelectorAll(".section");

/* CLICK MENU */
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        const target = document.getElementById(item.dataset.target);
        if (!target) return;
        const offset = window.innerWidth <= 768 ? 80 : 30;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
    });
});

/* AUTO ACTIVE ON SCROLL */
window.addEventListener("scroll", () => {
    let current = "";
    const offset = window.innerWidth <= 768 ? 100 : 180;
    sections.forEach(section => {
        const top = section.offsetTop - offset;
        if (pageYOffset >= top) {
            current = section.getAttribute("id");
        }
    });
    menuItems.forEach(li => {
        li.classList.remove("active");
        if (li.dataset.target === current) {
            li.classList.add("active");
            // Mobilda aktiv menu item ko'rinishga skroll
            if (window.innerWidth <= 768) {
                li.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }
        }
    });
});
