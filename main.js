// ✅ LIAM WAGNER PORTFOLIO - 100% BULLETPROOF

// Warte bis DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
    initWebsite();
});

function initWebsite() {
    // GSAP verfügbar?
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initAnimations();
    }
    
    initLoader();
    initNavigation();
    initProjects();
    initForm();
    initSmoothScroll();
}

function initLoader() {
    const loader = document.getElementById('loader');
    const progress = document.getElementById('progress');
    
    // Progress Animation
    let progressValue = 0;
    const progressInterval = setInterval(() => {
        progressValue += Math.random() * 15;
        if (progressValue >= 100) {
            progressValue = 100;
            clearInterval(progressInterval);
            hideLoader(loader);
        }
        progress.style.width = progressValue + '%';
    }, 50);
}

function hideLoader(loader) {
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 800);
}

function initNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            if (scrollY < lastScrollY) {
                navbar.classList.remove('hidden');
            } else {
                navbar.classList.add('hidden');
            }
        } else {
            navbar.classList.remove('hidden');
        }
        lastScrollY = scrollY;
    });
    
    // Active Nav Link
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

function initProjects() {
    const tabs = document.querySelectorAll('.tab-btn');
    const previews = document.querySelectorAll('.project-preview');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active preview
            previews.forEach(p => p.classList.remove('active'));
            previews[index].classList.add('active');
            
            // Smooth animation
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(previews[index], 
                    { opacity: 0, x: 50 }, 
                    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
                );
            }
        });
    });
}

function initForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.btn');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Button feedback
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
        }, 150);
        
        alert('🎉 Nachricht gesendet! Ich melde mich bald bei dir.');
        form.reset();
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
}

function initAnimations() {
    // Hero animations
    gsap.from('.hero-title', {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-desc', {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.btn', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    // Section reveals
    gsap.utils.toArray('.section').forEach((section, i) => {
        gsap.from(section.querySelector('.container'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Staggered elements
    gsap.from('.skill-item', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 85%'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.stat', {
        scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 85%'
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
}

// Resize handler
window.addEventListener('resize', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

// Prevent FOUC
document.body.style.visibility = 'visible';
