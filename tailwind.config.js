/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      theme: {
        primary: '#6F0000',
        secondary: '#025498',
      },
      background: {
        primary: "#F8F8F8",
        secondary: "#FFEEEE",
      },
      white: "#ffffff",
      grey: "#333333",
      gradient1: "#6C0000",
      gradient2: "#E10000",
      loginGradient1: "#E9EBFD",
      loginGradient2: "#E9EBFD",
    },
  },
  plugins: [],
}

