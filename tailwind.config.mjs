/** @type {import('tailwindcss').Config} */
export default {
  // PERUBAHAN KUNCI: Bagian 'content' ini memberitahu Tailwind
  // untuk memindai semua file di dalam folder 'src' yang memiliki
  // ekstensi berikut untuk mencari kelas-kelas Tailwind.
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
