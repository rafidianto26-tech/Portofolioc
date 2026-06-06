// ==========================================
// 1. HIGHLIGHT ACTIVE NAV LINK
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// 2. HAMBURGER MENU (MOBILE)
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-links');

if(hamburger && navMenu) {
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
}

// ==========================================
// 3. CUSTOM CURSOR & CLICK RIPPLE
// ==========================================
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    if(cursorDot && cursorOutline) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
    }
});

window.addEventListener("mousedown", () => { document.body.classList.add("click-anim"); });
window.addEventListener("mouseup", () => { setTimeout(() => { document.body.classList.remove("click-anim"); }, 150); });

// ==========================================
// 4. MAGNETIC ELEMENTS
// ==========================================
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach((elem) => {
    elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    elem.addEventListener('mouseleave', () => { elem.style.transform = `translate(0px, 0px)`; });
});

// ==========================================
// 5. PARALLAX BACKGROUND
// ==========================================
const parallaxBg = document.getElementById('parallax-bg');
window.addEventListener('mousemove', (e) => {
    if(window.innerWidth > 768 && parallaxBg) {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        parallaxBg.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// ==========================================
// 6. SCROLL PROGRESS & FLOATING NAV
// ==========================================
window.addEventListener("scroll", () => {
    let scrollProgress = document.getElementById("scroll-progress");
    if(scrollProgress) {
        let totalHeight = document.body.scrollHeight - window.innerHeight;
        let progressHeight = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = progressHeight + "%";
    }

    const nav = document.querySelector('.floating-nav');
    if(nav && window.innerWidth > 768) {
        if (window.scrollY > 50) {
            nav.style.padding = "10px 40px";
            nav.style.backgroundColor = "rgba(15, 23, 42, 0.95)";
            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.6)";
        } else {
            nav.style.padding = "15px 40px";
            nav.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
            nav.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)";
        }
    }
});

// ==========================================
// 7. TYPING EFFECT (HERO)
// ==========================================
const typedTextSpan = document.querySelector(".typed-text");
if(typedTextSpan) {
    const textArray = ["Game Developer", "Web Designer", "Video Editor", "Server Architect"];
    const typingDelay = 80;
    const erasingDelay = 60;
    const newTextDelay = 2500;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }
    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    setTimeout(type, newTextDelay + 250);
}

// ==========================================
// 8. EPIC TERMINAL LOADING SCREEN
// ==========================================
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById('loading-screen');
    const percentageText = document.getElementById('loading-percentage');
    const loadingBar = document.getElementById('loading-bar');
    const terminalText = document.getElementById('terminal-text');
    
    if(loadingScreen && terminalText) {
        const terminalLines = [
            "Initiating core modules...",
            "Decrypting visual assets...",
            "Compiling UI frameworks...",
            "Establishing secure connection...",
            "System ready. Welcome to Chiro's Portfolio."
        ];
        let lineIndex = 0;
        let progress = 0;
        
        const terminalInterval = setInterval(() => {
            if(lineIndex < terminalLines.length) {
                const p = document.createElement('div');
                p.classList.add('terminal-line');
                p.innerText = terminalLines[lineIndex];
                terminalText.appendChild(p);
                lineIndex++;
            }
        }, 350); 

        const progressInterval = setInterval(() => {
            progress += Math.floor(Math.random() * 5) + 2; 
            if(progress > 99) progress = 99; 

            if(lineIndex >= terminalLines.length - 1 && progress === 99) progress = 100;

            if(progress >= 100) {
                clearInterval(progressInterval);
                clearInterval(terminalInterval);
                percentageText.innerText = '100%';
                loadingBar.style.width = '100%';
                
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => { loadingScreen.style.display = 'none'; }, 1500); 
                }, 800);
            } else {
                percentageText.innerText = progress + '%';
                loadingBar.style.width = progress + '%';
            }
        }, 80);
    } else if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => { loadingScreen.style.display = 'none'; }, 1500); 
        }, 300);
    }
});

// ==========================================
// 9. CINEMATIC REVEAL & SKILL BARS
// ==========================================
const revealElements = document.querySelectorAll('.reveal');
const skillBars = document.querySelectorAll('.skill-per');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if(entry.target.querySelector('.skills-container') || entry.target.id === 'tentang') {
                skillBars.forEach(bar => { bar.style.width = bar.getAttribute('data-target'); });
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
revealElements.forEach(element => revealObserver.observe(element));

// ==========================================
// 10. EFEK 3D TILT & SISTEM MODAL (PROYEK & KARIER)
// ==========================================
const cards = document.querySelectorAll('.card');
const timelineItems = document.querySelectorAll('.timeline-item');

const projectModal = document.getElementById('project-modal');
const timelineModal = document.getElementById('timeline-modal');

const projectDetails = {
    1: { icon: '🎮', title: 'Sistem Game Roblox', desc: 'Saya merancang framework berskala besar dari nol. Fitur utamanya mencakup sistem manajemen interaksi pemain, leaderboard dinamis dengan penyimpanan data yang aman, kustomisasi karakter secara real-time, serta sistem pintu dan kontrol area otomatis. Semuanya ditulis menggunakan Luau dan dioptimasi penuh agar server tetap stabil tanpa hambatan.', tags: ['Luau', 'Roblox Studio', 'DataStore', 'UI/UX'] },
    2: { icon: '💻', title: 'Desain Antarmuka Web', desc: 'Pembuatan landing page yang difokuskan pada kecepatan akses, estetika, dan konversi pengunjung. Saya menggunakan kombinasi HTML semantik, CSS3 modern dengan animasi sinematik, serta JavaScript untuk interaksi yang mulus tanpa framework berat. Desain dijamin responsif 100%.', tags: ['HTML5', 'CSS3', 'JavaScript Modern', 'Responsive Design'] },
    3: { icon: '🤖', title: 'Arsitektur Discord', desc: 'Konfigurasi infrastruktur server Discord untuk menangani komunitas skala besar secara profesional. Ini meliputi pembuatan sistem verifikasi keamanan untuk mencegah spam, penyusunan hierarki peran (role) yang terstruktur rapi, hingga integrasi bot otomatis untuk moderasi.', tags: ['Discord Setup', 'Bot Automation', 'Server Security', 'Community Management'] },
    4: { icon: '🎬', title: 'Produksi Media Visual', desc: 'Pengembangan dan produksi aset visual untuk mempromosikan layanan dan komunitas. Keahlian ini mencakup penyuntingan video dinamis, penyelarasan efek transisi yang presisi, desain suara, hingga pembuatan konten visual yang sengaja dioptimasi agar sesuai algoritma sosial media.', tags: ['Video Editing', 'Content Creation', 'Sound Design', 'Visual Effects'] }
};

const careerDetails = {
    1: { icon: '🌱', date: '2023 - 2024', title: 'Memulai Eksplorasi Digital', desc: 'Semuanya dimulai dari rasa penasaran yang kuat. Pada periode ini, saya mulai mempelajari dasar-dasar logika algoritma dan bereksperimen dengan bahasa pemrograman ringan. Saya juga mulai memperhatikan pentingnya estetika desain (UI/UX) dan bagaimana sebuah sistem digital dapat berinteraksi secara organik dengan penggunanya.' },
    2: { icon: '⚔️', date: 'Awal 2025', title: 'Terjun ke Game Development', desc: 'Saya mulai menajamkan fokus ke bahasa pemrograman Luau dan ekosistem Roblox Studio. Di fase ini, saya tidak hanya sekadar bermain, melainkan menciptakan sistem kompleks dari bawah. Mulai dari merancang database (DataStore) pemain, sistem interaksi objek in-game, hingga membangun struktur roleplay fungsional yang stabil menampung banyak pengguna.' },
    3: { icon: '🏰', date: 'Akhir 2025', title: 'Manajemen Komunitas & Arsitektur', desc: 'Menyadari bahwa sistem game membutuhkan tempat untuk pemain berkumpul, saya mempelajari arsitektur server Discord. Saya merancang infrastruktur digital dengan hierarki keamanan yang sangat rapi, mengintegrasikan bot kustom untuk mengotomatisasi log, moderasi, serta alur penerimaan anggota baru agar komunitas dapat berjalan secara mandiri dan aman.' },
    4: { icon: '🚀', date: '2026 - Sekarang', title: 'Kreator & Web Developer Multi-Disiplin', desc: 'Di tahap ini, saya menggabungkan semua keahlian yang ada. Saya mulai mengembangkan antarmuka website profesional (menggunakan HTML, CSS, dan JS) untuk membuat portofolio digital yang solid. Di waktu yang sama, saya juga rutin memproduksi konten media visual (video editing) untuk memperkuat *personal branding* dan mempromosikan layanan kepada khalayak yang lebih luas.' }
};

// Proyek Modal
if(cards.length > 0 && projectModal) {
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if(window.innerWidth > 768) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; const y = e.clientY - rect.top;  
                const centerX = rect.width / 2; const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -12; 
                const rotateY = ((x - centerX) / centerX) * 12;
                card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            }
        });
        card.addEventListener('mouseleave', () => { card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`; });

        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const data = projectDetails[id];
            if(data) {
                document.getElementById('modal-icon').innerText = data.icon; 
                document.getElementById('modal-title').innerText = data.title; 
                document.getElementById('modal-desc').innerText = data.desc;
                const modalTags = document.getElementById('modal-tags');
                modalTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement('span'); span.classList.add('tag'); span.innerText = tag; modalTags.appendChild(span);
                });
                projectModal.classList.add('active'); document.body.style.overflow = 'hidden'; 
            }
        });
    });
    document.getElementById('close-modal').addEventListener('click', () => { projectModal.classList.remove('active'); document.body.style.overflow = 'auto'; });
    projectModal.addEventListener('click', (e) => { if(e.target === projectModal) { projectModal.classList.remove('active'); document.body.style.overflow = 'auto'; } });
}

// Karier Modal
if(timelineItems.length > 0 && timelineModal) {
    timelineItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            if(window.innerWidth > 768) {
                const content = item.querySelector('.timeline-content');
                const rect = content.getBoundingClientRect();
                const x = e.clientX - rect.left; const y = e.clientY - rect.top;  
                const centerX = rect.width / 2; const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10; 
                const rotateY = ((x - centerX) / centerX) * 10;
                content.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            }
        });
        item.addEventListener('mouseleave', () => { 
            item.querySelector('.timeline-content').style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`; 
        });

        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            const data = careerDetails[id];
            if(data) {
                document.getElementById('timeline-modal-icon').innerText = data.icon; 
                document.getElementById('timeline-modal-date').innerText = data.date; 
                document.getElementById('timeline-modal-title').innerText = data.title; 
                document.getElementById('timeline-modal-desc').innerText = data.desc;
                timelineModal.classList.add('active'); document.body.style.overflow = 'hidden'; 
            }
        });
    });
    document.getElementById('close-timeline-modal').addEventListener('click', () => { timelineModal.classList.remove('active'); document.body.style.overflow = 'auto'; });
    timelineModal.addEventListener('click', (e) => { if(e.target === timelineModal) { timelineModal.classList.remove('active'); document.body.style.overflow = 'auto'; } });
}

// ==========================================
// 11. FORM KONTAK & FAQ
// ==========================================
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Mengirim Pesan... ⏳';
        btn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert('Luar biasa! Pesan Anda telah terkirim. Saya akan merespon secepatnya. ✅');
                contactForm.reset();
            } else {
                alert('Gagal mengirim pesan. Silakan coba lagi atau hubungi langsung via email. ❌');
            }
        } catch (error) {
            alert('Terjadi kesalahan jaringan. Periksa koneksi internet Anda. ❌');
        }

        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}

const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(faq => { faq.classList.remove('active'); });
        if(!isActive) { item.classList.add('active'); }
    });
});

