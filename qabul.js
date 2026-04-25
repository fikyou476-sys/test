// EmailJS initialization
(function() {
    emailjs.init("0Dldw51SWiTi1Hk-z");
})();

// DOMContentLoaded event handler
document.addEventListener("DOMContentLoaded", function () {
    
    //==================== FOOTER FORM HANDLER ====================
    const footerForm = document.getElementById("footer-contact-form");
    
    if (footerForm) {
        footerForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const btn = this.querySelector("button");
            const originalText = btn.innerText;
            
            // Disable button and show loading state
            btn.innerText = "Yuborilmoqda...";
            btn.disabled = true;
            
            // Send email using EmailJS
            emailjs.sendForm("service_x4os40r", "template_czii6a8", this)
                .then(() => {
                    alert("Xabaringiz qabul qilindi! Tez orada bog'lanamiz. ✅");
                    this.reset();
                })
                .catch((err) => {
                    console.error("EmailJS error:", err);
                    alert("Xatolik yuz berdi ❌. Iltimos, keyinroq qayta urinib ko'ring.");
                })
                .finally(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }
    
    //==================== MENU & SCROLL SPY ====================
     const sections = document.querySelectorAll(".section-card");
    const menuItems = document.querySelectorAll(".menu-item");

    function updateActiveMenu() {
      let current = "";
      const scrollPosition = window.scrollY + 250;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          current = section.id;
        }
      });
      menuItems.forEach(item => {
        if (item.dataset.target === current) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }

    menuItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = item.dataset.target;
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    window.addEventListener("scroll", () => {
      requestAnimationFrame(updateActiveMenu);
    });
    updateActiveMenu();
  });