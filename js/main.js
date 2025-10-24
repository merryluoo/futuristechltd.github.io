// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 64; // Height of fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Set current year
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Add active state to nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('text-blue-600');
        } else {
            navLink?.classList.remove('text-blue-600');
        }
    });
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 30);
}

// Cookie Consent Management
function getCookieConsent() {
    try {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) return null;

        const consentData = JSON.parse(consent);
        const expiryDate = new Date(consentData.expiryDate);

        // Check if consent has expired (12 months)
        if (new Date() > expiryDate) {
            localStorage.removeItem('cookieConsent');
            return null;
        }

        return consentData;
    } catch (e) {
        return null;
    }
}

function setCookieConsent() {
    const consentData = {
        status: 'accepted',
        consentDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 365 days
    };

    try {
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    } catch (e) {
        console.error('Failed to save cookie consent:', e);
    }
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.add('hidden');
        // Remove from DOM after animation completes
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    }
}

function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.display = 'block';
        banner.classList.remove('hidden');
    }
}

function checkCookieConsent() {
    const consent = getCookieConsent();

    if (!consent) {
        // No consent found or expired, show banner
        showCookieBanner();
    } else {
        // Consent exists and valid, hide banner
        hideCookieBanner();
    }
}

// Initialize cookie banner on page load
document.addEventListener('DOMContentLoaded', function() {
    checkCookieConsent();

    // Handle "Got It" button click
    const acceptButton = document.getElementById('cookie-accept');
    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            setCookieConsent();
            hideCookieBanner();
        });
    }
});
