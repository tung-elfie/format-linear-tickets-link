/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./index.tsx",
        "./extension/**/*.{js,ts,jsx,tsx,html}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
