/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "org-light": "#b6b6b6",
        "light-dark": "#4c4c4c",
        "half-dark": "#343434",
        "org-dark": "#0c0c0c",
        "org-color": "#c8984c",
      },
      backgroundImage: {
        "org-gradient-light-dark":
          "linear-gradient(to right, #b6b6b6, #4c4c4c)",
        "org-gradient-half-dark": "linear-gradient(to right, #4c4c4c, #343434)",
        "org-gradient-darkest": "linear-gradient(to right, #343434, #0c0c0c)",
        "org-gradient-custom": "linear-gradient(to right, #c8984c, #b6b6b6)",
      },
      borderWidth: {
        1: "1px",
        2: "2px",
        3: "3px",
      },
    },
  },
  plugins: [],
};
