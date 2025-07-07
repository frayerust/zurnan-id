import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', function() {

    // --- DATA AKADEMIK ---
    const academicData = [
        // ... (biarkan data ini seperti apa adanya) ...
    ];

    // ... (biarkan fungsi initChart dan initCollapsibles seperti apa adanya) ...

    // --- FUNGSI NAVIGASI YANG DIPERBAIKI ---
    const initNavigation = () => {
        const navItems = document.querySelectorAll('.nav-item, .nav-trigger');
        const contentSections = document.querySelectorAll('.content-section');
        const mainLayoutNavs = document.querySelectorAll('#main-nav .nav-item');

        function switchPage(hash) {
            const pageId = hash.substring(1);
            contentSections.forEach(section => section.classList.remove('active'));
            const activeSection = document.getElementById(pageId + '-content');
            if (activeSection) activeSection.classList.add('active');

            mainLayoutNavs.forEach(item => {
                // Hanya aktifkan link jika hash-nya cocok
                item.classList.toggle('active', item.getAttribute('href') === hash);
            });
        }

        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // INI PERUBAHAN KUNCINYA:
                // Hanya jalankan logika SPA jika link adalah hash link (#)
                if (href && href.startsWith('#')) {
                    e.preventDefault(); // Mencegah lompatan halaman
                    
                    if (window.location.hash !== href) {
                        history.pushState(null, null, href);
                    }
                    switchPage(href);
                }
                // Jika bukan hash link (misalnya /opini), biarkan browser
                // melakukan navigasi normal. Tidak perlu ada 'else'.
            });
        });

        // Logika untuk menangani saat halaman dimuat atau tombol back/forward ditekan
        const handleLocation = () => {
            // Hanya jalankan logika SPA jika kita berada di halaman utama
            if (window.location.pathname === '/') {
                const hash = window.location.hash || '#beranda';
                switchPage(hash);
            } else {
                 // Jika di halaman lain (spt /opini), cocokkan status aktif di sidebar
                 mainLayoutNavs.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === window.location.pathname);
                });
            }
        };
        
        window.addEventListener('popstate', handleLocation);
        handleLocation(); // Panggil saat pertama kali dimuat
    };

    // Panggil semua fungsi inisialisasi
    // (pastikan fungsi initChart dan initCollapsibles Anda ada di sini)
    initChart();
    initCollapsibles();
    initNavigation();
});