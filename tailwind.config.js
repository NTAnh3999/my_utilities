/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**.{ts,tsx,css,scss}"],
  theme: {
    extend: {
      colors: {
        clouds: {
          50: "#f8fafc",
          500: "#64748b",
          600: "#475569",
          800: "#1e293b",
        },
      },
    },
  },
  plugins: [],
};
