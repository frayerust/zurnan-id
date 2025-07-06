document.addEventListener('DOMContentLoaded', function () {
    // Data untuk bagian akademik
    const academicData = [
        {
            title: 'Pengajaran: Semester Berjalan',
            content: `
                <div class="space-y-2">
                    <p><strong>TI-401: Kecerdasan Buatan</strong><br><span class="text-sm text-stone-500">Deskripsi singkat, silabus, dan referensi utama.</span></p>
                    <p><strong>TI-305: Pemrosesan Bahasa Alami</strong><br><span class="text-sm text-stone-500">Detail untuk mata kuliah Pemrosesan Bahasa Alami.</span></p>
                </div>`
        },
        {
            title: 'Pengajaran: Arsip',
            content: '<p class="text-sm text-stone-600">Daftar mata kuliah dari semester lalu akan ditampilkan di sini.</p>'
        },
        {
            title: 'Bimbingan & Riset',
            content: `
                <h4 class="font-semibold">Area Riset</h4>
                <ul class="list-disc list-inside text-stone-600 mt-1">
                    <li>Sentiment Analysis pada Media Sosial</li>
                    <li>Generative Models untuk Teks dan Gambar</li>
                    <li>Explainable AI (XAI)</li>
                </ul>
                <h4 class="font-semibold mt-3">Bimbingan Tugas Akhir</h4>
                <p class="text-sm text-stone-600 mt-1">Daftar mahasiswa bimbingan aktif dan lulus akan ada di sini.</p>`
        }
    ];

    // Fungsi untuk membuat elemen collapsible
    const createCollapsibleItems = () => {
        const container = document.getElementById('collapsible-container');
        if (!container) return;
        
        container.innerHTML = academicData.map(item => `
            <div class="collapsible-item border rounded-lg bg-stone-50">
                <button class="collapsible-trigger w-full text-left p-4 flex justify-between items-center font-semibold hover:bg-stone-100">
                    <span>${item.title}</span> <span class="arrow text-teal-600 font-bold text-xl">›</span>
                </button>
                <div class="collapsible-content px-4 pb-4 bg-white">
                    <div class="pt-3">${item.content}</div>
                </div>
            </div>
        `).join('');

        // Tambahkan event listener setelah item dibuat
        addCollapsibleListeners();
    };
    
    // Fungsi untuk menambahkan event listener ke item collapsible
    const addCollapsibleListeners = () => {
        const collapsibleTriggers = document.querySelectorAll('.collapsible-trigger');
        collapsibleTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                this.classList.toggle('open');
                const content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    };

    // Inisialisasi Chart.js Doughnut Chart
    const initChart = () => {
        const ctx = document.getElementById('academicFocusChart');
        if (!ctx) return;
        new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Pengajaran', 'Riset', 'PkM', 'Administrasi'],
                datasets: [{
                    data: [45, 35, 15, 5],
                    backgroundColor: ['#14b8a6', '#0d9488', '#0f766e', '#ccfbf1'],
                    borderColor: '#f5f5f4',
                    borderWidth: 4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { font: { size: 12, family: 'Inter' }, boxWidth: 12, padding: 15 }},
                    tooltip: { callbacks: { label: (c) => `${c.label}: ${c.raw}%` }}
                },
                cutout: '60%'
            }
        });
    };

    // Logika Navigasi SPA
    const navLinks = document.querySelectorAll('#main-nav a, .nav-trigger');
    const contentSections = document.querySelectorAll('.content-section');
    const mainNavLinks = document.querySelectorAll('#main-nav a');

    const switchTab = (targetId) => {
        contentSections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(targetId + '-content');
        if(targetSection) targetSection.classList.add('active');

        mainNavLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + targetId) link.classList.add('active');
        });
        window.scrollTo(0, 0);
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            switchTab(targetId);
        });
    });

    // Panggil fungsi inisialisasi
    initChart();
    createCollapsibleItems();
});