document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();

    initScrollAnimations();
    initStatsCounter();
    checkCookieConsent();
    initContactForm();
    updateYear();
});

/* Mobile Menu */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const links = document.querySelectorAll('.mobile-nav-links a');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            overlay.classList.toggle('active');
            menuBtn.classList.toggle('active');
            // Toggle hamburger animation class if needed
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

/* Smooth Scroll & Active Nav */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Link Highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });
}



/* Scroll Animations (Intersection Observer) */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger stats if visible
                if (entry.target.classList.contains('stat-number')) {
                    animateValue(entry.target);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Fade-in elements
    document.querySelectorAll('.fade-in-up, .glass-card, .service-card, .about-content, .contact-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Reveal text
    document.querySelectorAll('.reveal-text').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(el);
    });

    // Add visible class styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* Stats Counter */
function initStatsCounter() {
    // Logic handled inside IntersectionObserver above for trigger
}

function animateValue(obj) {
    const targetStr = obj.getAttribute('data-target');
    const isFloat = targetStr.includes('.');
    const target = parseFloat(targetStr);

    if (!target) return;

    let startTimestamp = null;
    const duration = 2000;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        let current;
        if (isFloat) {
            current = (progress * target).toFixed(1);
        } else {
            current = Math.floor(progress * target);
        }

        obj.innerHTML = current;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Smart suffix handling
            if (targetStr === '99.9') {
                obj.innerHTML = target;
            } else {
                obj.innerHTML = target + '+';
            }
        }
    };
    window.requestAnimationFrame(step);
}

/* Cookie Consent */
function checkCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');

    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            banner.classList.remove('hidden');
        }, 2000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            banner.classList.add('hidden');
        });
    }
}

/* Form Handling */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                btn.style.background = 'var(--secondary)';
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = ''; // reset to CSS default
                }, 3000);
            }, 1000);
        });
    }
}

function updateYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
