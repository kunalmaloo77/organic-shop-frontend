/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "footer-blue": "#001524",
        "nature-green": "#8bc34a",
        "secondary-nature": "#6a9739",
        "content-background": "#f8f6f3",
      },
    },
    fontFamily: {
      'merriweather': ['Merriweather', 'serif'],
    },
  },
  plugins: [],
};
