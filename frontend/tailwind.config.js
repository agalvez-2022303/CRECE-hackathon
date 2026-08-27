/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CRECE identity — extracted from the illustrated brand mark.
        // Deep teal carries trust, sage signals growth and bronze adds warmth.
        stone: {
          50: '#F7F7F0', 100: '#EEEFE5', 200: '#DDE1D4', 300: '#C6CCBD',
          400: '#8A958B', 500: '#647268', 600: '#4B5A53', 700: '#354941',
          800: '#263B36', 900: '#183B45', 950: '#102A31',
        },
        emerald: {
          50: '#EFF6F1', 100: '#DCECE1', 200: '#BED8C5', 300: '#97C1A4',
          400: '#659977', 500: '#3B735E', 600: '#2B5D4C', 700: '#234B3E',
          800: '#1A3B32', 900: '#123028',
        },
        amber: {
          50: '#FBF8F0', 100: '#F5EEDC', 200: '#E9D7B6', 300: '#D8B77D',
          400: '#BE914E', 500: '#A97938', 600: '#895F2B', 700: '#6B4823',
          800: '#53381E', 900: '#3D2A19', 950: '#271A10',
        },
        orange: {
          50: '#F8F4EC', 100: '#EEE3D2', 200: '#DEC8A7', 300: '#CBA775',
          400: '#B9864E', 500: '#9B6A36', 600: '#7D532B', 700: '#624121',
          800: '#4A311B', 900: '#352314',
        },
        // Legacy aliases kept for future semantic component work.
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
        'soft-card': '0 4px 20px -2px rgba(24, 59, 69, 0.08), 0 2px 6px -1px rgba(24, 59, 69, 0.04)',
        'soft-hover': '0 18px 36px -10px rgba(24, 59, 69, 0.22), 0 6px 14px -4px rgba(24, 59, 69, 0.08)',
        'warm-glow': '0 8px 25px -4px rgba(155, 106, 54, 0.25)',
        'green-glow': '0 8px 25px -4px rgba(59, 115, 94, 0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};
