/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6366f1',
                    hover: '#4f46e5',
                },
                card: {
                    DEFAULT: 'rgba(30, 41, 59, 0.7)',
                },
                dark: {
                    bg: '#0f172a',
                    surface: '#1e293b'
                }
            }
        },
    },
    plugins: [],
}
