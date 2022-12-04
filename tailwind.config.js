/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    styled: true,
    themes: ["night", "light", "retro", "cyberpunk", "synthwave", "pastel"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
