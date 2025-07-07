// File: src/scripts/main.js
import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', function() {

    // --- DATA AKADEMIK ---
    const academicData = [
        {
            title: 'Mata Kuliah Diampu',
            icon: '📚',
            content: `
                <ul class="list-disc list-inside text-stone-600 space-y-1">
                    <li><strong>TI0123</strong> - Rekayasa Perangkat Lunak (S1)</li>
                    <li><strong>TI4567</strong> - Kecerdasan Buatan Lanjut (S1)</li>
                    <li><strong>MI8910</strong> - Natural Language Processing (S2)</li>
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
                </ul>
            `
        },
        {
            title: 'Publikasi & Konferensi',
            icon: '📄',
            content: `
                 <p class="text-stone-600">Daftar publikasi lengkap dapat diakses melalui profil Google Scholar atau Scopus saya.</p>
            `
        }
    ];

    // --- Inisialisasi Chart.js ---
    const initChart = () => {
        const ctx = document.getElementById('academicFocusChart');
        if (!ctx) return;
        // Hancurkan chart lama jika ada untuk mencegah duplikasi
        if (Chart.getChart(ctx)) {
            Chart.getChart(ctx).destroy();
        }
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Pengajaran', 'Riset', 'Bimbingan', 'Administrasi'],
                datasets: [{
                    label: 'Alokasi Waktu',
                    data: [45, 30, 15, 10],
                    backgroundColor: ['#0f766e', '#14b8a6', '#5eead4', '#ccfbf1'],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { font: { family: "'Inter', sans-serif" }, padding: 15 } }
                }
            }
        });
    };

    // --- Inisialisasi Konten Akademik (Collapsible/Accordion) ---
    const initCollapsibles = () => {
        const container = document.getElementById('collapsible-container');
        if (!container) return;

        container.innerHTML = ''; // Kosongkan container sebelum mengisi ulang

        academicData.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'border border-stone-200 rounded-lg overflow-hidden';

            const trigger = document.createElement('button');
            trigger.className = 'collapsible-trigger w-full flex justify-between items-center p-4 hover:bg-stone-50 transition';
            trigger.innerHTML = `
                <h3 class="font-semibold text-lg text-teal-800 text-left">${item.icon} ${item.title}</h3>
                <span class="arrow transform transition-transform duration-300">▼</span>
            `;

            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'collapsible-content'; // Ini yang akan kita animasikan

            const content = document.createElement('div');
            content.className = 'p-4 pt-2'; // Padding untuk konten
            content.innerHTML = item.content;

            contentWrapper.appendChild(content);
            wrapper.appendChild(trigger);
            wrapper.appendChild(contentWrapper);
            container.appendChild(wrapper);

            trigger.addEventListener('click', () => {
                const isOpen = contentWrapper.style.maxHeight;

                // Tutup semua item lain terlebih dahulu
                container.querySelectorAll('.collapsible-content').forEach(c => {
                    c.style.maxHeight = null;
                    c.previousElementSibling.querySelector('.arrow').style.transform = 'rotate(0deg)';
                });

                // Jika item yang diklik belum terbuka, buka.
                if (!isOpen) {
                    trigger.querySelector('.arrow').style.transform = 'rotate(180deg)';
                    // Inilah bagian kuncinya: atur max-height sesuai tinggi konten di dalamnya
                    contentWrapper.style.maxHeight = contentWrapper.scrollHeight + "px";
                }
            });
        });
    };

    // --- Logika Navigasi SPA ---
    const initNavigation = () => {
        const navItems = document.querySelectorAll('.nav-item, .nav-trigger');
        const contentSections = document.querySelectorAll('.content-section');

        function switchPage(hash) {
            const pageId = hash.substring(1);
            contentSections.forEach(section => section.classList.remove('active'));
            const activeSection = document.getElementById(pageId + '-content');
            if (activeSection) activeSection.classList.add('active');

            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.toggle('active', item.getAttribute('href') === hash);
            });
        }

        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const hash = this.getAttribute('href');
                if (window.location.hash !== hash) {
                    history.pushState(null, null, hash);
                }
                switchPage(hash);
            });
        });

        window.addEventListener('popstate', () => {
            const hash = window.location.hash || '#beranda';
            switchPage(hash);
        });

        const initialHash = window.location.hash || '#beranda';
        switchPage(initialHash);
    };

    // Panggil semua fungsi inisialisasi
    initChart();
    initCollapsibles();
    initNavigation();
});