/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Coursera & Udemy warmth + Green freshness
        warm: {
          50: '#FDFBF7',
          100: '#FAF5ED',
          200: '#F5EADB',
          300: '#EBD5BD',
          800: '#4A3B32',
          900: '#2A1F18',
        },
        sage: {
          50: '#F3F8F5',
          100: '#E4F1EB',
          200: '#CBE4D7',
          400: '#72B895',
          500: '#2E8B57', // Forest Sea Green
          600: '#237346',
          700: '#1B5B37',
          800: '#14462A',
        },
        sun: {
          50: '#FFFDF0',
          100: '#FFF9C2',
          200: '#FFF085',
          300: '#FFE247',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
        },
        coral: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          400: '#FB923C',
          500: '#F97316', // Vibrant Orange
          600: '#EA580C',
          700: '#C2410C',
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft-card': '0 4px 20px -2px rgba(42, 31, 24, 0.06), 0 2px 6px -1px rgba(42, 31, 24, 0.04)',
        'soft-hover': '0 12px 30px -4px rgba(42, 31, 24, 0.12), 0 4px 12px -2px rgba(42, 31, 24, 0.08)',
        'warm-glow': '0 8px 25px -4px rgba(249, 115, 22, 0.25)',
        'green-glow': '0 8px 25px -4px rgba(46, 139, 87, 0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};
