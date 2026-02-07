/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        smart: {
          primary: '#1e3a8a', // blue-900
          secondary: '#10b981', // emerald-500
          background: '#f8fafc', // slate-50
          surface: '#ffffff',
          text: '#0f172a', // slate-900
          muted: '#64748b', // slate-500
          border: '#e2e8f0', // slate-200
        }
      }
    },
  },
  plugins: [],
}
