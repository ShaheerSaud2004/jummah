/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rutgers-red': '#8B0000',
        'rutgers-light-red': '#A52A2A',
        'rutgers-dark-red': '#660000',
      },
      fontFamily: {
        'arabic': ['Amiri', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'rutgers': '0 4px 6px -1px rgba(139, 0, 0, 0.1), 0 2px 4px -1px rgba(139, 0, 0, 0.06)',
        'rutgers-lg': '0 10px 15px -3px rgba(139, 0, 0, 0.1), 0 4px 6px -2px rgba(139, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
