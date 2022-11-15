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
    themes: ["business"],
  },
  plugins: [require("daisyui")],
};
