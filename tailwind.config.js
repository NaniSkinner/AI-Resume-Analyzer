/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        matcha: {
          50: "#f8faf8",
          100: "#e8f2e8",
          200: "#d1e6d1",
          300: "#a8d4a8",
          400: "#7bc17b",
          500: "#5fa05f",
          600: "#4a8a4a",
          700: "#3d713d",
          800: "#2f5a2f",
          900: "#1e3f1e",
        },
        lavender: {
          50: "#faf9ff",
          100: "#f3f1ff",
          200: "#e8e4ff",
          300: "#d4ccff",
          400: "#b8a6ff",
          500: "#9b7fb5",
          600: "#8366a3",
          700: "#6b5086",
          800: "#544066",
          900: "#3d2f4a",
        },
        badge: {
          green: "#e8f2e8",
          "green-text": "#3d713d",
          yellow: "#fff3cd",
          "yellow-text": "#856404",
          red: "#f8d7da",
          "red-text": "#721c24",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
