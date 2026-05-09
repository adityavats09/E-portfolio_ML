document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left  = mouseX + 'px';
        dot.style.top   = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .glass-panel').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width  = '48px';
            ring.style.height = '48px';
            ring.style.borderColor = 'rgba(0,229,255,0.8)';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width  = '32px';
            ring.style.height = '32px';
            ring.style.borderColor = 'rgba(0,229,255,0.5)';
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Active Nav Link ---
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            if (scrollY >= sec.offsetTop - 250) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').includes(current));
        });
    });

    // --- Mobile Menu ---
    const hamburger  = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        }
    });

    // --- Scroll Reveal ---
    const revealEls = document.querySelectorAll('.reveal');
    const observer  = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));

    // --- Smooth number counter for hero stats ---
    function countUp(el, target, duration = 1200) {
        let start = 0;
        const step = target / (duration / 16);
        const isFloat = target % 1 !== 0;
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { start = target; clearInterval(timer); }
            el.textContent = isFloat ? start.toFixed(2) : Math.floor(start) + (el.dataset.suffix || '');
        }, 16);
    }

    const statNums = document.querySelectorAll('.stat-num');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const raw = el.textContent.replace('+','').trim();
                const num = parseFloat(raw);
                if (!isNaN(num)) {
                    if (el.textContent.includes('+')) el.dataset.suffix = '+';
                    countUp(el, num);
                }
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => statsObserver.observe(el));

    // --- Typing animation for code cursor ---
    // already handled via CSS blink animation

    // --- Parallax glow on hero ---
    const orbs = document.querySelectorAll('.glow-orb');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth  - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        orbs.forEach((orb, i) => {
            const factor = (i + 1) * 0.4;
            orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });

});