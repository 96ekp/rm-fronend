/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'phone': '480px',  // Define custom screen size for phones
        'tablet': '640px', // Existing tablet size
        'laptop': '1024px', // Existing laptop size
        'desktop': '1280px', // Existing desktop size
      },
      gridAutoRows: {
        '2fr': 'minmax(0, 2fr)',
      },
      zIndex: {
        '100': '100',
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#f50057",      // Sorx Red for primary actions
          "text": "#3f3d56",         // Attorney for text
          "accent": "#fe6484",       // Brink Pink for accents
          "bg": "#fefeff",           // White for background
          "base": "#fefeff",         // White for base elements
          "info": "#3f3d56",         // Attorney for informational elements
          "success": "#f50057",      // Sorx Red for success states
          "warning": "#fe6484",      // Brink Pink for warnings
          "error": "#f50057",        // Sorx Red for errors
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
