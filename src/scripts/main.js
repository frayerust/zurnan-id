// PERUBAHAN KUNCI: Impor Chart.js dan komponennya di sini
import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', function() {

    // --- DATA AKADEMIK (Bisa diganti dengan data dari API/database nanti) ---
    const academicData = [
        {
            title: 'Mata Kuliah Diampu',
            icon: '📚',
            content: `
                <ul class="list-disc list-inside text-stone-600 space-y-1">
                    <li><strong>DM000</strong> - Data Mining (S1)</li>
                    <li><strong>AI000</strong> - Kecerdasan Buatan (S1)</li>
                    <li><strong>NLP00</strong> - Natural Language Processing (S1)</li>
                    <li><strong>IMK00</strong> - Interaksi Manusia dengan Komputer (S1)</li>
                </ul>
            `
        },
        {
            title: 'Area Riset & Minat',
            icon: '🔬',
            content: `
                <p class="text-stone-600">Fokus penelitian saya saat ini adalah pada pemanfaatan Large Language Models (LLMs) untuk sintesis data, deteksi anomali pada teks, dan pengembangan agen AI otonom. Saya juga tertarik pada etika AI dan mitigasi bias dalam model pembelajaran mesin.</p>
            `
        },
        {
            title: 'Bimbingan Mahasiswa',
            icon: '🧑‍🏫',
            content: `
                <p class="text-stone-600 mb-2">Saya membuka bimbingan untuk topik-topik berikut:</p>
                <ul class="list-disc list-inside text-stone-600 space-y-1">
                    <li>Analisis Sentimen & Klasifikasi Teks</li>
                    <li>Sistem Rekomendasi</li>
                    <li>--</li>
                    <li>Penerapan Reinforcement Learning</li>
                </ul>
                <p class="text-stone-600 mt-3">Silakan hubungi melalui email untuk diskusi lebih lanjut.</p>
            `
        },
        {
            title: 'Publikasi & Konferensi',
            icon: '📄',
            content: `
                 <p class="text-stone-600">Daftar publikasi lengkap dapat diakses melalui profil Google Scholar atau Scopus saya. Beberapa publikasi terbaru akan ditampilkan di sini.</p>
            `
        }
    ];

    // --- Inisialisasi Chart.js ---
    const ctx = document.getElementById('academicFocusChart');
    if (ctx) {
        new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Pengajaran', 'Riset', 'Bimbingan', 'PkM', 'Administrasi'],
                    datasets: [{
                        label: 'Alokasi Waktu',
                        data: [30, 20, 20, 15, 15],
                        backgroundColor: [
                            '#0f766e', // teal-700
                            '#0d9488', // teal-600
                            '#14b8a6', // teal-500
                            '#5eead4', // teal-300
                            '#ccfbf1'  // teal-100
                        ],
                        borderColor: '#f5f5f4', // bg-stone-100
                        borderWidth: 4
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: "'Inter', sans-serif"
                            },
                            padding: 15
                        }
                    }
                }
            }
        });
    }

    // --- Inisialisasi Konten Akademik (Collapsible/Accordion) ---
    const collapsibleContainer = document.getElementById('collapsible-container');
    if (collapsibleContainer) {
        academicData.forEach((item, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'border border-stone-200 rounded-lg';

            const trigger = document.createElement('div');
            trigger.className = 'collapsible-trigger flex justify-between items-center p-4 hover:bg-stone-50';
            trigger.innerHTML = `
                <h3 class="font-semibold text-lg text-teal-800">${item.icon} ${item.title}</h3>
                <span class="transform transition-transform duration-300">▼</span>
            `;

            const content = document.createElement('div');
            content.className = 'collapsible-content';
            content.innerHTML = item.content;

            wrapper.appendChild(trigger);
            wrapper.appendChild(content);
            collapsibleContainer.appendChild(wrapper);

            trigger.addEventListener('click', () => {
                const isOpen = content.classList.contains('open');
                
                collapsibleContainer.querySelectorAll('.collapsible-content').forEach(c => {
                    c.classList.remove('open');
                    c.style.maxHeight = null;
                    c.previousElementSibling.querySelector('span').style.transform = 'rotate(0deg)';
                });

                if (!isOpen) {
                    content.classList.add('open');
                    content.style.maxHeight = content.scrollHeight + "px";
                    trigger.querySelector('span').style.transform = 'rotate(180deg)';
                }
            });
        });
    }

    // --- Logika Navigasi SPA (Single Page Application) ---
    const navItems = document.querySelectorAll('.nav-item, .nav-trigger');
    const contentSections = document.querySelectorAll('.content-section');

    function switchPage(hash) {
        const pageId = hash.substring(1);
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        const activeSection = document.getElementById(pageId + '-content');
        if (activeSection) {
            activeSection.classList.add('active');
        }

        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.getAttribute('href') === hash) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const hash = this.getAttribute('href');
            history.pushState(null, null, hash);
            switchPage(hash);
        });
    });

    if (window.location.hash) {
        switchPage(window.location.hash);
    } else {
        switchPage('#beranda');
    }
    
    window.addEventListener('popstate', function() {
        if (window.location.hash) {
            switchPage(window.location.hash);
        }
    });
});
