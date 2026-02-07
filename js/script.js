/* ========================================
   PORTFOLIO WEBSITE - COMPLETE JAVASCRIPT
   Engineering Precision Meets Creative Code
   ======================================== */

// ========================================
// 1. DOM ELEMENTS
// ========================================

const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// ========================================
// 2. NAVIGATION & SCROLLING
// ========================================

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Sticky navbar behavior: become fixed/sticky after passing the hero section
function handleStickyNav() {
    const hero = document.getElementById('hero');
    const heroHeight = hero ? hero.offsetHeight : 300;
    const triggerPoint = Math.max(heroHeight - (navbar ? navbar.offsetHeight : 70), 50);

    if (window.scrollY > triggerPoint) {
        if (!navbar.classList.contains('sticky')) navbar.classList.add('sticky');
    } else {
        if (navbar.classList.contains('sticky')) navbar.classList.remove('sticky');
    }
    // subtle border color change for better contrast when sticky
    if (navbar.classList.contains('sticky')) {
        navbar.style.borderBottomColor = 'rgba(61, 65, 86, 0.5)';
    } else {
        navbar.style.borderBottomColor = 'transparent';
    }
}

// Run on scroll (debounced) and on load/resize to set initial state
window.addEventListener('scroll', debounce(handleStickyNav, 20));
window.addEventListener('resize', debounce(handleStickyNav, 50));
window.addEventListener('load', handleStickyNav);

// ========================================
// 3. DARK/LIGHT MODE TOGGLE
// ========================================

const isDarkMode = localStorage.getItem('darkMode') !== 'false';
initializeTheme();

function initializeTheme() {
    if (!isDarkMode) {
        document.body.classList.add('light-mode');
        updateThemeIcon(false);
    } else {
        document.body.classList.remove('light-mode');
        updateThemeIcon(true);
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isDark = !document.body.classList.contains('light-mode');
    localStorage.setItem('darkMode', isDark);
    updateThemeIcon(isDark);
    
    // Add rotation animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.title = 'Switch to light mode';
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.title = 'Switch to dark mode';
    }
}

// ========================================
// 4. PROJECT FILTERING
// ========================================

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ========================================
// 5. FORM HANDLING
// ========================================

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    setTimeout(() => {
        showNotification('Message sent successfully! Thank you for reaching out.', 'success');
        contactForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }, 1500);
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#00d4ff' : '#ff6b9d'};
        color: #0a0e27;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// 6. SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .journal-card, .skill-category, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// 7. SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href !== '#!' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const topOffset = target.offsetTop - 70;
            
            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// 8. PARALLAX EFFECT
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual');
    
    parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
});

// ========================================
// 9. ANIMATED COUNTERS FOR STATS
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const targets = {
                '50': 50,
                '200': 200,
                '30': 30,
                '5': 5
            };
            
            for (const [text, num] of Object.entries(targets)) {
                const el = entry.target.querySelector(`.stat-number`);
                if (el && el.textContent.includes(text)) {
                    animateCounter(el, num);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ========================================
// 10. PROJECT CARD HOVER EFFECTS
// ========================================

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// 11. TYPED ANIMATION FOR HERO TITLE
// ========================================

function initTypedAnimation() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        let charIndex = 0;
        
        const typeChar = () => {
            if (charIndex < text.length) {
                line.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50);
            }
        };
        
        setTimeout(typeChar, index * 400);
    });
}

// Initialize typed animation on load
window.addEventListener('load', initTypedAnimation);

// ========================================
// 12. KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Alt + M to toggle menu
    if (e.altKey && e.code === 'KeyM') {
        hamburger.click();
    }
    
    // Alt + T to toggle theme
    if (e.altKey && e.code === 'KeyT') {
        themeToggle.click();
    }
});

// ========================================
// 13. SCROLL TO TOP BUTTON
// ========================================

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00d4ff, #0099cc);
        color: #0a0e27;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
        transition: all 0.3s ease;
    `;
    
    button.title = 'Scroll to top (or press Home)';
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 8px 20px rgba(0, 212, 255, 0.5)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.3)';
    });
    
    document.body.appendChild(button);
}

createScrollToTopButton();

// Home key to scroll to top
document.addEventListener('keydown', (e) => {
    if (e.code === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ========================================
// 14. PRELOAD ANIMATIONS
// ========================================

function initializePageLoad() {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    document.body.style.animation = 'fadeInUp 0.8s ease forwards';
}

window.addEventListener('DOMContentLoaded', initializePageLoad);

// ========================================
// 15. RESPONSIVE HAMBURGER ANIMATION
// ========================================

function animateHamburger() {
    const spans = hamburger.querySelectorAll('span');
    
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(12px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

hamburger.addEventListener('click', animateHamburger);

// ========================================
// 16. MOBILE VIEWPORT HEIGHT FIX
// ========================================

function handleViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', handleViewportHeight);
window.addEventListener('orientationchange', handleViewportHeight);
handleViewportHeight();

// ========================================
// 17. CONSOLE MESSAGE
// ========================================

console.log('%c🚀 Ashish Yadav - Portfolio', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%cEngineering precision meets creative code.', 'font-size: 14px; color: #a8adc8; font-style: italic;');
console.log('%cLooking for the code? Check the GitHub repository!', 'font-size: 12px; color: #ff6b9d;');

// ========================================
// 18. PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// 19. PAGE VISIBILITY HANDLING
// ========================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden - animations paused');
    } else {
        console.log('Page visible - animations resumed');
    }
});

// ========================================
// 20. INITIALIZE ALL FEATURES
// ========================================

function initializePortfolio() {
    console.log('Portfolio initialized successfully');
    
    // Load theme preference
    initializeTheme();
    
    // Setup animations
    setupAnimationObserver();
    
    // Animate counter on page load if in view
    document.querySelectorAll('.stat-number').forEach(el => {
        const text = el.textContent;
        const match = text.match(/(\d+)/);
        if (match) {
            const num = parseInt(match[1]);
            if (Math.random() > 0.5) {
                animateCounter(el, num, 1500);
            }
        }
    });
}

function setupAnimationObserver() {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        animationObserver.observe(el);
    });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

// ========================================
// 21. PROJECT LINKS ENHANCEMENT
// ========================================

document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = '#ffd700';
        this.style.transform = 'translateX(5px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.color = '#00d4ff';
        this.style.transform = 'translateX(0)';
    });
});

// ========================================
// 22. EXTERNAL LINKS HANDLING
// ========================================

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // You can add custom handling here if needed
        console.log('Opening external link:', link.href);
    });
});

// ========================================
// 23. SECTION SCROLL TRACKING
// ========================================

const sectionScrollPositions = {};

window.addEventListener('scroll', debounce(() => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const id = section.getAttribute('id');
        sectionScrollPositions[id] = {
            top: rect.top,
            bottom: rect.bottom,
            inView: rect.top < window.innerHeight && rect.bottom > 0
        };
    });
}, 100));

// ========================================
// 24. ENHANCED LINK HIGHLIGHTING
// ========================================

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(current => {
        const sectionDistance = current.offsetTop;
        const sectionHeight = current.clientHeight;
        const sectionId = current.getAttribute('id');
        
        if (scrollPosition >= sectionDistance && scrollPosition < sectionDistance + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', debounce(updateActiveLink, 100));

// ========================================
// 25. FINAL POLISH - LOADING ANIMATION
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('All assets loaded');
});
