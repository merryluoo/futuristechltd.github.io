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

    // Initialize network animation
    initNetworkAnimation();

    // Initialize anime.js animations
    initAnimeAnimations();
});

// Network Animation
function initNetworkAnimation() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let mouse = { x: null, y: null, radius: 150 };

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        initParticles();
    }

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.vx -= Math.cos(angle) * force * 0.2;
                    this.vy -= Math.sin(angle) * force * 0.2;
                }
            }

            // Damping
            this.vx *= 0.99;
            this.vy *= 0.99;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
        }
    }

    // Initialize particles
    function initParticles() {
        particles = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    // Connect particles with lines
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = 1 - distance / 150;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();

        animationFrameId = requestAnimationFrame(animate);
    }

    // Mouse move event
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    // Mouse leave event
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Initialize
    resizeCanvas();
    animate();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrameId);
    });
}

// Anime.js Animations
function initAnimeAnimations() {
    // Wait a tiny bit for DOM to be fully ready
    setTimeout(() => {
        // Set initial state for hero elements
        anime.set('.hero-word', {
            opacity: 0,
            translateY: 60
        });
        
        anime.set('#hero-subtitle', {
            opacity: 0,
            translateY: 40
        });
        
        anime.set('#hero-buttons', {
            opacity: 0,
            translateY: 30
        });

        // Hero title animation - word by word with delay for dramatic effect
        const heroTimeline = anime.timeline({
            easing: 'easeOutExpo',
            autoplay: true
        });

        heroTimeline
        .add({
            targets: '.hero-word',
            translateY: [60, 0],
            opacity: [0, 1],
            duration: 1200,
            delay: anime.stagger(200), // Each word appears 200ms after the previous
            easing: 'easeOutExpo'
        }, 300) // Start after 300ms
        .add({
            targets: '#hero-subtitle',
            translateY: [40, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        }, '-=600')
        .add({
            targets: '#hero-buttons',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        }, '-=400');
    }, 100);

    // Hero buttons hover animation
    const heroButtons = document.querySelectorAll('.hero-btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutElastic(1, .6)'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutElastic(1, .6)'
            });
        });
    });

    // Feature cards scroll animation
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                const cards = document.querySelectorAll('.feature-card');
                anime({
                    targets: cards,
                    translateY: [60, 0],
                    opacity: [0, 1],
                    duration: 1000,
                    delay: anime.stagger(100),
                    easing: 'easeOutExpo'
                });
            }
        });
    }, observerOptions);

    const featureSection = document.querySelector('.feature-card');
    if (featureSection) {
        featureObserver.observe(featureSection);
    }

    // Add floating animation to feature icons
    anime({
        targets: '.feature-card .inline-flex',
        translateY: [-10, 10],
        duration: 2000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        delay: anime.stagger(200)
    });
}
