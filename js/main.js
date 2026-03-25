/* js/main.js */

document.addEventListener('DOMContentLoaded', function () {

    /* ════════════════════════════════════════
       1. TUTUP MENU MOBILE OTOMATIS
    ════════════════════════════════════════ */
    const navLinks       = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.getElementById('navbarNav');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });


/* ════════════════════════════════════════
   2. TYPEWRITER HERO (VERSI PROMISE + ASYNC/AWAIT)
════════════════════════════════════════ */
const typewriterEl = document.getElementById('typewriter-text');

   if (typewriterEl) {
        const roles = [
            'Information Systems Student',
            'Web Developer',
            'UI/UX Enthusiast',
            'Mobile App Developer',
            'Full-Stack Developer',
            'Business Analyst',
            'IoT Explorer',
            'Problem Solver',
            'Creative Thinker',
            'Manhattan Cafe Best Friend'
        ];
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function jalankanTypewriter() {
        let roleIdx = 0;

        while (true) {
            const kataSekarang = roles[roleIdx];

            // FASE 1: Ngetik huruf maju
            for (let i = 0; i <= kataSekarang.length; i++) {
                typewriterEl.textContent = kataSekarang.slice(0, i);
                
                // Cek apakah karakter terakhir yang baru diketik adalah spasi
                if (i > 0 && kataSekarang[i - 1] === ' ') {
                    await sleep(400); // Pause lebih lama (400ms) setelah ngetik spasi
                } else {
                    await sleep(70);  // Kecepatan ngetik normal (70ms)
                }
            }

            // FASE 2: Diam sejenak setelah 1 kalimat utuh selesai
            await sleep(2200);

            // FASE 3: Menghapus huruf (mundur)
            for (let i = kataSekarang.length; i >= 0; i--) {
                typewriterEl.textContent = kataSekarang.slice(0, i);
                await sleep(38); // Hapus lebih cepat
            }

            // FASE 4: Diam sejenak sebelum ngetik kata berikutnya
            await sleep(450);

            roleIdx = (roleIdx + 1) % roles.length;
        }
    }

    jalankanTypewriter();
    }

    /* ════════════════════════════════════════
       3. PROJECT PANEL SWITCHER — SLIDE

       Cara kerja yang benar untuk slide:
       Masalah utama slide selama ini adalah wrapper
       tidak punya tinggi saat kedua panel absolute.

       Solusi: LOCK wrapper height via JS selama transisi.

       Urutan lengkap:
       1. Ukur tinggi panel aktif sekarang
       2. Lock wrapper ke tinggi itu via inline style
       3. Kedua panel jadi absolute (panel-sliding)
       4. Set posisi awal: fromPanel di center,
          toPanel di luar kanan/kiri
       5. Force reflow (void offsetHeight)
       6. Kedua panel slide bersamaan:
          fromPanel → keluar kanan/kiri
          toPanel   → masuk ke center
       7. Setelah transisi selesai:
          - toPanel balik ke relative (panel-visible)
          - fromPanel jadi display:none (panel-hidden)
          - Wrapper height di-unlock (hapus inline style)
    ════════════════════════════════════════ */
    const btnWeb     = document.getElementById('btn-web-projects');
    const btnOther   = document.getElementById('btn-other-projects');
    const panelWeb   = document.getElementById('view-web-projects');
    const panelOther = document.getElementById('view-other-projects');
    const wrapper    = panelWeb ? panelWeb.closest('.project-panel-wrapper') : null;

    if (!btnWeb || !btnOther || !panelWeb || !panelOther || !wrapper) return;

    const TRANSITION_MS = 500;
    let currentPanel    = 'web';
    let isAnimating     = false;

    /* Hapus semua class panel dari elemen */
    function clearPanel(el) {
        el.classList.remove(
            'panel-visible', 'panel-hidden', 'panel-sliding',
            'panel-slide-from-right', 'panel-slide-from-left',
            'panel-slide-to-right',   'panel-slide-to-left',
            'panel-slide-center'
        );
    }

    /* ── INIT ── */
    clearPanel(panelWeb);
    panelWeb.classList.add('panel-visible');

    clearPanel(panelOther);
    panelOther.classList.add('panel-hidden');


    function switchToPanel(next) {
        if (next === currentPanel || isAnimating) return;
        isAnimating = true;

        const fromPanel   = currentPanel === 'web' ? panelWeb   : panelOther;
        const toPanel     = next         === 'web' ? panelWeb   : panelOther;
        const activeBtn   = next         === 'web' ? btnWeb     : btnOther;
        const inactiveBtn = next         === 'web' ? btnOther   : btnWeb;

        /* Arah:
           web → other : other masuk dari kanan, web keluar ke kiri
           other → web : web masuk dari kiri, other keluar ke kanan */
        const toEnter  = next === 'other' ? 'panel-slide-from-right' : 'panel-slide-from-left';
        const fromExit = next === 'other' ? 'panel-slide-to-left'    : 'panel-slide-to-right';

        /* STEP 1: Lock wrapper height = tinggi panel aktif sekarang */
        const lockedHeight = fromPanel.offsetHeight;
        wrapper.style.height = lockedHeight + 'px';

        /* STEP 2: Kedua panel jadi absolute, tumpuk di wrapper.
           fromPanel: sudah di posisi center (translateX 0)
           toPanel: di luar layar (kiri atau kanan) */
        clearPanel(fromPanel);
        fromPanel.classList.add('panel-sliding', 'panel-slide-center');

        clearPanel(toPanel);
        toPanel.classList.add('panel-sliding', toEnter);

        /* STEP 3: Force reflow — paksa browser hitung posisi
           awal sebelum transisi dimulai */
        void toPanel.offsetHeight;

        /* STEP 4: Slide keduanya bersamaan */
        requestAnimationFrame(() => {
            /* fromPanel: slide keluar */
            fromPanel.classList.remove('panel-slide-center');
            fromPanel.classList.add(fromExit);

            /* toPanel: slide masuk ke center */
            toPanel.classList.remove(toEnter);
            toPanel.classList.add('panel-slide-center');

            /* STEP 5: Cleanup setelah transisi selesai */
            setTimeout(() => {
                /* toPanel: balik ke relative, ikut flow */
                clearPanel(toPanel);
                toPanel.classList.add('panel-visible');

                /* fromPanel: sembunyikan */
                clearPanel(fromPanel);
                fromPanel.classList.add('panel-hidden');

                /* Unlock wrapper height */
                wrapper.style.height = '';

                if (typeof AOS !== 'undefined') AOS.refresh();
                isAnimating = false;
            }, TRANSITION_MS + 20);
        });

        updateButtonStyle(activeBtn, inactiveBtn);
        currentPanel = next;
    }


    function updateButtonStyle(activeBtn, inactiveBtn) {
        activeBtn.classList.remove('border-secondary', 'bg-gradient-dark', 'text-light');
        activeBtn.classList.add('border-warning', 'bg-warning', 'text-dark', 'highlight-stat');

        inactiveBtn.classList.remove('border-warning', 'bg-warning', 'text-dark', 'highlight-stat');
        inactiveBtn.classList.add('border-secondary', 'bg-gradient-dark', 'text-light');

        const activeText   = activeBtn.querySelector('p');
        const inactiveText = inactiveBtn.querySelector('p');
        if (activeText)   { activeText.classList.remove('text-secondary');  activeText.classList.add('fw-semibold'); }
        if (inactiveText) { inactiveText.classList.add('text-secondary');   inactiveText.classList.remove('fw-semibold'); }

        const activePill   = activeBtn.querySelector('.stat-pill');
        const inactivePill = inactiveBtn.querySelector('.stat-pill');
        if (activePill)   { activePill.style.background   = 'rgba(0,0,0,0.12)'; activePill.style.color   = 'rgba(0,0,0,0.55)'; }
        if (inactivePill) { inactivePill.style.background = '';                  inactivePill.style.color = ''; }
    }

    btnWeb.addEventListener('click',   () => switchToPanel('web'));
    btnOther.addEventListener('click', () => switchToPanel('other'));

});