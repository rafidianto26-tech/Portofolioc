// ==========================================
// 1. HIGHLIGHT ACTIVE NAV LINK
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
});

// ==========================================
// 2. HAMBURGER MENU
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-links');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.floating-nav') && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ==========================================
// 3. CUSTOM CURSOR
// ==========================================
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }
});

function animateCursor() {
    if (cursorOutline) {
        outlineX += (mouseX - outlineX) * 0.12;
        outlineY += (mouseY - outlineY) * 0.12;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

window.addEventListener("mousedown", () => document.body.classList.add("click-anim"));
window.addEventListener("mouseup", () => setTimeout(() => document.body.classList.remove("click-anim"), 200));

// Cursor hover effect
document.querySelectorAll('a, button, .card, .service-card, .benefit-card, .timeline-item, .faq-question').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ==========================================
// 4. MAGNETIC ELEMENTS
// ==========================================
document.querySelectorAll('.magnetic').forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        elem.style.transform = `translate(${x}px, ${y}px)`;
    });
    elem.addEventListener('mouseleave', () => elem.style.transform = 'translate(0,0)');
});

// ==========================================
// 5. PARALLAX BACKGROUND
// ==========================================
const parallaxBg = document.getElementById('parallax-bg');
let tX = 0, tY = 0;
window.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768 && parallaxBg) {
        tX = (e.clientX / window.innerWidth - 0.5) * 30;
        tY = (e.clientY / window.innerHeight - 0.5) * 30;
    }
});
function animateParallax() {
    if (parallaxBg) parallaxBg.style.transform = `translate(${tX}px, ${tY}px)`;
    requestAnimationFrame(animateParallax);
}
animateParallax();

// ==========================================
// 6. SCROLL: PROGRESS BAR + NAV SHRINK
// ==========================================
const nav = document.querySelector('.floating-nav');
window.addEventListener("scroll", () => {
    const el = document.getElementById("scroll-progress");
    if (el) {
        const total = document.body.scrollHeight - window.innerHeight;
        el.style.width = ((window.pageYOffset / total) * 100) + "%";
    }
    if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }
});

// ==========================================
// 7. TYPING EFFECT
// ==========================================
const typedSpan = document.querySelector(".typed-text");
if (typedSpan) {
    const words = ["Game Developer", "Web Designer", "Video Editor", "Server Architect"];
    let wi = 0, ci = 0, typing = true;
    const speed = { type: 85, erase: 55, pause: 2200, start: 700 };

    function tick() {
        const word = words[wi];
        if (typing) {
            typedSpan.textContent = word.substring(0, ci + 1);
            ci++;
            if (ci === word.length) { typing = false; setTimeout(tick, speed.pause); return; }
        } else {
            typedSpan.textContent = word.substring(0, ci - 1);
            ci--;
            if (ci === 0) { typing = true; wi = (wi + 1) % words.length; setTimeout(tick, speed.start); return; }
        }
        setTimeout(tick, typing ? speed.type : speed.erase);
    }
    setTimeout(tick, 1200);
}

// ==========================================
// 8. LOADING SCREEN
// ==========================================
window.addEventListener("load", () => {
    const screen = document.getElementById('loading-screen');
    const pct = document.getElementById('loading-percentage');
    const bar = document.getElementById('loading-bar');
    const terminal = document.getElementById('terminal-text');

    if (!screen) return;

    if (terminal) {
        const lines = [
            { text: "Initializing portfolio...", type: "" },
            { text: "Loading visual assets...", type: "" },
            { text: "Compiling animations...", type: "" },
            { text: "Connecting modules...", type: "" },
            { text: "System ready ✓", type: "done" }
        ];

        let li = 0, prog = 0;
        const tInt = setInterval(() => {
            if (li < lines.length) {
                const p = document.createElement('div');
                p.className = 'terminal-line ' + lines[li].type;
                p.innerText = lines[li].text;
                terminal.appendChild(p);
                terminal.scrollTop = terminal.scrollHeight;
                li++;
            }
        }, 380);

        const pInt = setInterval(() => {
            prog = Math.min(prog + Math.random() * 6 + 2, 100);
            const rounded = Math.floor(prog);
            if (pct) pct.innerText = rounded + '%';
            if (bar) bar.style.width = rounded + '%';

            if (prog >= 100) {
                clearInterval(pInt);
                clearInterval(tInt);
                setTimeout(() => {
                    screen.classList.add('fade-out');
                    setTimeout(() => screen.style.display = 'none', 900);
                }, 600);
            }
        }, 70);
    } else {
        setTimeout(() => {
            screen.classList.add('fade-out');
            setTimeout(() => screen.style.display = 'none', 900);
        }, 300);
    }
});

// ==========================================
// 9. REVEAL ON SCROLL + SKILL BARS
// ==========================================
const skillBars = document.querySelectorAll('.skill-per');
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Trigger skill bars when skills section is visible
            const bars = entry.target.querySelectorAll('.skill-per');
            if (bars.length) {
                setTimeout(() => bars.forEach(b => b.style.width = b.getAttribute('data-target')), 200);
            }
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ==========================================
// 10. COUNTER ANIMATION
// ==========================================
function animateCounter(el, target, suffix = '') {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
    }, 25);
}

const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const num = entry.target;
            const target = parseInt(num.dataset.target);
            const suffix = num.dataset.suffix || '';
            animateCounter(num, target, suffix);
            obs.unobserve(num);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

// ==========================================
// 11. 3D CARD TILT + MODAL (PROYEK)
// ==========================================
const projectModal = document.getElementById('project-modal');
const projectDetails = {
    1: { icon: '🎮', title: 'Sistem Game Roblox', desc: 'Saya merancang framework berskala besar dari nol. Fitur utamanya mencakup sistem manajemen interaksi pemain, leaderboard dinamis dengan penyimpanan data yang aman, kustomisasi karakter secara real-time, serta sistem pintu dan kontrol area otomatis. Semuanya ditulis menggunakan Luau dan dioptimasi penuh agar server tetap stabil tanpa hambatan.', tags: ['Luau', 'Roblox Studio', 'DataStore', 'UI/UX'] },
    2: { icon: '💻', title: 'Desain Antarmuka Web', desc: 'Pembuatan landing page yang difokuskan pada kecepatan akses, estetika, dan konversi pengunjung. Saya menggunakan kombinasi HTML semantik, CSS3 modern dengan animasi sinematik, serta JavaScript untuk interaksi yang mulus tanpa framework berat. Desain dijamin responsif 100%.', tags: ['HTML5', 'CSS3', 'JavaScript Modern', 'Responsive Design'] },
    3: { icon: '🤖', title: 'Arsitektur Discord', desc: 'Konfigurasi infrastruktur server Discord untuk menangani komunitas skala besar secara profesional. Ini meliputi pembuatan sistem verifikasi keamanan untuk mencegah spam, penyusunan hierarki peran (role) yang terstruktur rapi, hingga integrasi bot otomatis untuk moderasi.', tags: ['Discord Setup', 'Bot Automation', 'Server Security', 'Community Management'] },
    4: { icon: '🎬', title: 'Produksi Media Visual', desc: 'Pengembangan dan produksi aset visual untuk mempromosikan layanan dan komunitas. Keahlian ini mencakup penyuntingan video dinamis, penyelarasan efek transisi yang presisi, desain suara, hingga pembuatan konten visual yang sengaja dioptimasi agar sesuai algoritma sosial media.', tags: ['Video Editing', 'Content Creation', 'Sound Design', 'Visual Effects'] }
};

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 22;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height * -22;
            card.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.04,1.04,1.04)`;
        }
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
    card.addEventListener('click', () => {
        const data = projectDetails[card.dataset.id];
        if (!data || !projectModal) return;
        document.getElementById('modal-icon').innerText = data.icon;
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-desc').innerText = data.desc;
        const tagsEl = document.getElementById('modal-tags');
        tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (projectModal) {
    document.getElementById('close-modal')?.addEventListener('click', () => { projectModal.classList.remove('active'); document.body.style.overflow = ''; });
    projectModal.addEventListener('click', e => { if (e.target === projectModal) { projectModal.classList.remove('active'); document.body.style.overflow = ''; } });
}

// ==========================================
// 12. TIMELINE TILT + MODAL (KARIER)
// ==========================================
const timelineModal = document.getElementById('timeline-modal');
const careerDetails = {
    1: { icon: '🌱', date: '2023 - 2024', title: 'Memulai Eksplorasi Digital', desc: 'Semuanya dimulai dari rasa penasaran yang kuat. Pada periode ini, saya mulai mempelajari dasar-dasar logika algoritma dan bereksperimen dengan bahasa pemrograman ringan. Saya juga mulai memperhatikan pentingnya estetika desain (UI/UX) dan bagaimana sebuah sistem digital dapat berinteraksi secara organik dengan penggunanya.' },
    2: { icon: '⚔️', date: 'Awal 2025', title: 'Terjun ke Game Development', desc: 'Saya mulai menajamkan fokus ke bahasa pemrograman Luau dan ekosistem Roblox Studio. Di fase ini, saya tidak hanya sekadar bermain, melainkan menciptakan sistem kompleks dari bawah. Mulai dari merancang database (DataStore) pemain, sistem interaksi objek in-game, hingga membangun struktur roleplay fungsional yang stabil menampung banyak pengguna.' },
    3: { icon: '🏰', date: 'Akhir 2025', title: 'Manajemen Komunitas & Arsitektur', desc: 'Menyadari bahwa sistem game membutuhkan tempat untuk pemain berkumpul, saya mempelajari arsitektur server Discord. Saya merancang infrastruktur digital dengan hierarki keamanan yang sangat rapi, mengintegrasikan bot kustom untuk mengotomatisasi log, moderasi, serta alur penerimaan anggota baru.' },
    4: { icon: '🚀', date: '2026 - Sekarang', title: 'Kreator & Web Developer Multi-Disiplin', desc: 'Di tahap ini, saya menggabungkan semua keahlian yang ada. Saya mulai mengembangkan antarmuka website profesional menggunakan HTML, CSS, dan JS untuk membuat portofolio digital yang solid. Di waktu yang sama, saya juga rutin memproduksi konten media visual untuk memperkuat personal branding dan mempromosikan layanan kepada khalayak yang lebih luas.' }
};

document.querySelectorAll('.timeline-item').forEach(item => {
    const content = item.querySelector('.timeline-content');
    item.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768 && content) {
            const rect = content.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 16;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height * -16;
            content.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`;
        }
    });
    item.addEventListener('mouseleave', () => {
        if (content) content.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
    item.addEventListener('click', () => {
        const data = careerDetails[item.dataset.id];
        if (!data || !timelineModal) return;
        document.getElementById('timeline-modal-icon').innerText = data.icon;
        document.getElementById('timeline-modal-date').innerText = data.date;
        document.getElementById('timeline-modal-title').innerText = data.title;
        document.getElementById('timeline-modal-desc').innerText = data.desc;
        timelineModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (timelineModal) {
    document.getElementById('close-timeline-modal')?.addEventListener('click', () => { timelineModal.classList.remove('active'); document.body.style.overflow = ''; });
    timelineModal.addEventListener('click', e => { if (e.target === timelineModal) { timelineModal.classList.remove('active'); document.body.style.overflow = ''; } });
}

// ==========================================
// 13. FORM KONTAK
// ==========================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = 'Mengirim... ⏳';
        btn.disabled = true;
        try {
            const res = await fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm), headers: { 'Accept': 'application/json' } });
            alert(res.ok ? 'Pesan terkirim! Saya akan membalas secepatnya ✅' : 'Gagal mengirim. Coba lagi ❌');
            if (res.ok) contactForm.reset();
        } catch { alert('Kesalahan jaringan. Periksa koneksi ❌'); }
        btn.innerHTML = orig;
        btn.disabled = false;
    });
}

// ==========================================
// 14. FAQ ACCORDION
// ==========================================
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const isOpen = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
        if (!isOpen) item.classList.add('active');
    });
});

// ==========================================
// 15. PARTICLE SYSTEM
// ==========================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

    const particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: ['59,130,246', '139,92,246', '245,158,11'][Math.floor(Math.random() * 3)]
    }));

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[j].x - p.x;
                const dy = particles[j].y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(59,130,246,${0.1 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(drawParticles);
    }
    drawParticles();
}
