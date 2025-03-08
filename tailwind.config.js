/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        dracula: {
          background: '#000000',
          currentLine: '#1a1a1a',
          foreground: '#f8f8f2',
          comment: '#6272a4',
          cyan: '#8be9fd',
          green: '#50fa7b',
          orange: '#ffb86c',
          pink: '#ff79c6',
          purple: '#bd93f9',
          red: '#ff5555',
          yellow: '#f1fa8c',
        },
      },
      backgroundColor: {
        dark: {
          primary: '#000000',
          secondary: '#1a1a1a',
          accent: '#bd93f9',
        },
      },
      textColor: {
        dark: {
          primary: '#f8f8f2',
          secondary: '#6272a4',
          accent: '#bd93f9',
        },
      },
      borderColor: {
        dark: {
          primary: '#1a1a1a',
          secondary: '#6272a4',
        },
      },
    },
  },
  plugins: [],
} 