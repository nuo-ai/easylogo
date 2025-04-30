/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 主色调
        primary: {
          DEFAULT: '#ff9900', // Pornhub橙色
          light: '#ffb340',
          dark: '#cc7a00'
        },
        // 自定义主色调
        'custom-primary': '#ff9900',
        // 文本颜色
        text: {
          light: '#ffffff',
          dark: '#000000'
        },
        // 背景颜色
        bg: {
          light: '#ffffff',
          dark: '#000000',
          transparent: 'transparent'
        }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Zilla Slab Highlight', 'serif'],
        mono: ['Source Code Pro', 'monospace']
      },
      fontSize: {
        'logo-sm': '30px',
        'logo-md': '60px',
        'logo-lg': '120px',
        'logo-xl': '200px'
      },
      borderRadius: {
        'logo': '7px'
      },
      boxShadow: {
        'logo': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }
    }
  },
  plugins: []
};
