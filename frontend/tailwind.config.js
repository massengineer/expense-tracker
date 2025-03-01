/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [flowbite],
  darkMode: "class" /* rest */,
};
