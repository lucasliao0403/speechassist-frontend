/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        
      },

      colors: {
        "bg-dark": "#2e2d57",
        "bg-light":"#fff5f6",
        "lightpink":"#ffa2fc",
        

      }
    },
  },
  plugins: [],
};
