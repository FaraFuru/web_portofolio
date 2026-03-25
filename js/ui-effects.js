/* js/ui-effects.js */

/* ════════════════════════════════════════
   1. PRELOADER — hilang setelah halaman load
════════════════════════════════════════ */
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.visibility = 'hidden';
        preloader.style.display = 'none';
    }, 500);
});


/* ════════════════════════════════════════
   2. NAVBAR SCROLL EFFECT
   + SCROLL PROGRESS BAR
════════════════════════════════════════ */
window.addEventListener('scroll', function () {
    // Navbar background muncul setelah scroll 50px
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    // Progress bar melebar sesuai posisi scroll
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
        progressBar.style.width = pct + '%';
    }
});


/* ════════════════════════════════════════
   3. AOS INIT + CURSOR GLOW
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

    // ── AOS (Animate On Scroll) ──
    AOS.init({
        once: false,
        offset: 100,
        duration: 800,
        easing: 'ease-in-out',
    });

    // ── Mouse Follower Glow ──
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let glowX  = mouseX;
    let glowY  = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        // Efek "telat" ngikutin — 6% per frame
        glowX += (mouseX - glowX) * 0.06;
        glowY += (mouseY - glowY) * 0.06;

        if (cursorGlow) {
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top  = `${glowY}px`;
        }
        requestAnimationFrame(animateGlow);
    }
    animateGlow();


    /* ════════════════════════════════════════
       4. ACTIVE NAV HIGHLIGHT
       Pakai IntersectionObserver — nav link
       yang sesuai section aktif mendapat
       class "active-section" (didesain di CSS)
    ════════════════════════════════════════ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    if (sections.length && navLinks.length) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const sectionId = entry.target.id;

                navLinks.forEach(link => {
                    // Panel project tidak punya nav sendiri,
                    // keduanya masuk ke "projects"
                    const match =
                        link.dataset.section === sectionId ||
                        (sectionId.startsWith('view-') && link.dataset.section === 'projects');

                    link.classList.toggle('active-section', match);
                });
            });
        }, {
            // Section dianggap aktif saat 40–55% viewport terisi kontennya
            rootMargin: '-40% 0px -55% 0px',
        });

        sections.forEach(s => navObserver.observe(s));
    }


    /* ════════════════════════════════════════
       5. COUNTER ANIMASI (Stats Section)
       Angka nge-count dari 0 ke data-target
       saat elemen masuk viewport
    ════════════════════════════════════════ */
    const counters = document.querySelectorAll('.counter-val[data-target]');

    if (counters.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                if (entry.target.dataset.counted) return; // Jangan animasi ulang

                entry.target.dataset.counted = 'true';
                animateCounter(entry.target);
            });
        }, { threshold: 0.5 });

        counters.forEach(el => counterObserver.observe(el));
    }

    function animateCounter(el) {
        const target   = parseInt(el.dataset.target, 10);
        const duration = 1200; // ms
        const step     = target / (duration / 16); // ~60fps
        let current    = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                // Pad dengan nol di depan agar "04", "05", "06"
                el.textContent = String(target).padStart(2, '0');
                clearInterval(timer);
                // Trigger animasi pop setelah counter selesai
                el.classList.add('counter-done');
                setTimeout(() => el.classList.remove('counter-done'), 400);
            } else {
                el.textContent = String(Math.floor(current)).padStart(2, '0');
            }
        }, 16);
    }


    /* ════════════════════════════════════════
       6. SKILL LEVEL DOTS
       Auto-fill saat card masuk viewport,
       dan re-trigger animasi saat card diklik
    ════════════════════════════════════════ */
    const skillCards = document.querySelectorAll('.skill-card');

    // Helper: reset & jalankan animasi dot di satu card
    function triggerDotAnimation(card) {
        const dotsWrapper = card.querySelector('.skill-level-dots');
        if (!dotsWrapper) return;

        const level = parseInt(dotsWrapper.dataset.level, 10) || 0;
        const dots  = dotsWrapper.querySelectorAll('span');

        // Reset semua dot + hapus animasi lama
        dots.forEach(dot => {
            dot.classList.remove('filled');
            dot.style.animation = 'none';
            void dot.offsetWidth; // reflow paksa
            dot.style.animation  = '';
        });

        // Fill ulang berurutan dengan stagger 110ms
        dots.forEach((dot, i) => {
            if (i < level) {
                setTimeout(() => dot.classList.add('filled'), i * 110);
            }
        });
    }

    if (skillCards.length) {
        // Auto-trigger saat masuk viewport (sekali saja)
        const dotObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const dotsWrapper = entry.target.querySelector('.skill-level-dots');
                if (!dotsWrapper || dotsWrapper.dataset.animated) return;

                dotsWrapper.dataset.animated = 'true';
                triggerDotAnimation(entry.target);
            });
        }, { threshold: 0.55 });

        skillCards.forEach(card => {
            dotObserver.observe(card);

            // Re-trigger saat card diklik (bisa diulang berkali-kali)
            card.addEventListener('click', () => {
                const dotsWrapper = card.querySelector('.skill-level-dots');
                if (dotsWrapper) delete dotsWrapper.dataset.animated;
                triggerDotAnimation(card);
            });
        });
    }

});