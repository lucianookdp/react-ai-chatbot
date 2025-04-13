/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: '#0f172a',
          'background-dark': '#0a0f1c',
          'accent-blue': '#3b82f6',
          neon: {
            red: '#ff0040',
          },
        },
        spacing: {
          section: "5rem",
        },
        fontSize: {
          hero: "2.5rem",
          "section-title": "1.75rem",
        },
        maxWidth: {
          container: "72rem",
        },
      },
    },
    plugins: [],
  }
  