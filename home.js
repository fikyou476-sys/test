// EmailJS initialization
(function() {
    emailjs.init("0Dldw51SWiTi1Hk-z");
})();

// ==================== COUNTER ANIMATION ====================
// Bu funksiya sonlarni target raqamgacha sanaydi
function startCounter(counterElement) {
    const target = parseInt(counterElement.getAttribute('data-target'));
    let current = 0;
    const duration = 2000; // 2 sekund
    const stepTime = 20; // har 20msda yangilash
    const steps = duration / stepTime;
    const increment = target / steps;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counterElement.textContent = Math.floor(current);
            setTimeout(updateCounter, stepTime);
        } else {
            counterElement.textContent = target;
        }
    };
    
    updateCounter();
}

// Barcha counterlarni ishga tushirish
function animateAllCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        // Avval 0 ga o'rnatamiz
        counter.textContent = '0';
        // Sanashni boshlaymiz
        startCounter(counter);
    });
}

// ==================== FORM SUBMISSION ====================
function initContactForm() {
    const footerForm = document.getElementById("footer-contact-form");
    
    if (footerForm) {
        footerForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const btn = this.querySelector("button");
            const originalText = btn.innerText;
            
            btn.innerHTML = '<span class="spinner"></span> Yuborilmoqda...';
            btn.disabled = true;
            
            emailjs.sendForm("service_x4os40r", "template_czii6a8", this)
                .then(() => {
                    showMessage('✅ Xabaringiz qabul qilindi! Tez orada bog\'lanamiz.', 'success');
                    this.reset();
                })
                .catch(err => {
                    showMessage('❌ Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.', 'error');
                    console.error("EmailJS error:", err);
                })
                .finally(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                });
        });
    }
}

// Xabar ko'rsatish
function showMessage(text, type) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-size: 14px;
        z-index: 9999;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

// ==================== RIPPLE EFFECT ====================
function initRippleEffect() {
    const buttons = document.querySelectorAll('.about-btn, .footer-form button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const aboutImage = document.querySelector('.about-image');
        if (aboutImage && scrolled < 800) {
            aboutImage.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
}

// ==================== STAT BOX HOVER ====================
function initStatBoxHover() {
    const statBoxes = document.querySelectorAll('.stat-box');
    statBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==================== PAGE LOAD VA REFRESH ====================
// Sahifa to'liq yuklanganda va yangilanganda counterlar ishlaydi
document.addEventListener("DOMContentLoaded", function() {
    // Counter animatsiyasini ishga tushirish
    animateAllCounters();
    
    // Boshqa funksiyalar
    initContactForm();
    initRippleEffect();
    initSmoothScroll();
    initParallax();
    initStatBoxHover();
});

// Sahifa yangilanganda ham ishlashi uchun
window.addEventListener('load', function() {
    // Qayta ishga tushirish (agar DOMContentLoaded dan keyin ham kerak bo'lsa)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        if (counter.textContent === '0') {
            startCounter(counter);
        }
    });
});

// Scroll orqali ko'rinishda animatsiya (agar xohlasangiz)
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            if (counter.textContent === '0') {
                startCounter(counter);
            }
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

// Ixtiyoriy: scroll bo'yicha animatsiya (agar xohlasangiz bu qismni yoqishingiz mumkin)
// Agarda sahifa yuklanganda emas balki scroll qilganda sanasin desangiz quyidagi kodni yoqing:
/*
document.querySelectorAll('.counter').forEach(counter => {
    counter.textContent = '0';
    counterObserver.observe(counter);
});
*/