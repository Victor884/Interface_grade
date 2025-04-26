/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Isso permite alternar manualmente entre temas
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adicione cores personalizadas se necessário
      },
    },
  },
  plugins: [],
}