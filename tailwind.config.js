/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#5B8FDB',
          cyan: '#4DBFD9',
        },
        green: {
          leaf: '#6BBF3B',
          light: '#9FD356',
          dark: '#4A9D2A',
          stem: '#2D5016',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
