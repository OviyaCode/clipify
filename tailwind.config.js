/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "base-color": "#F4F4F4",
        "secondary-color": "#428AFA",
        "brand-color": "#0064FF",
        "gray-color":"#F1F1F1",
        "dark-color":"#1D1D1D",
        "dark-color-2":"#272727",
        "card-color":"#E713BB",
        "highlight-color":"#0DA6FB"
      },
      fontFamily:"Poppins",
    },
  },
  plugins: [],
};
