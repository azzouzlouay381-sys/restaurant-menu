import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f0',
          100: '#f9edda',
          500: '#c97d3a',
          600: '#a8622a',
          900: '#3d200d',
        },
      },
    },
  },
  plugins: [],
}

export default config
