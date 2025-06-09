/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        softblack: '#0f0f0f',   // bg gelap
        surface: '#1f2937',   // card, sidebar
        accent: '#6366f1',    // warna aksen
        muted: '#9ca3af',     // teks netral
      },
    },
  },
  darkMode: ['attribute', 'class'], // opsional, jika pakai data-theme
  plugins: [],
}
