import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cw: {
          purple: '#6B2D8B',
          'purple-dark': '#4E1F6A',
          'purple-light': 'rgba(107, 45, 139, 0.1)',
          success: '#3A9E6E',
          warning: '#D95550',
          info: '#4A6FA5',
          bg: '#c3c3d5',
          'bg-warm': '#bbbcce',
          'bg-alt': '#b5b5c8',
          ink: '#111118',
          'ink-secondary': '#3D3D4E',
          'ink-muted': '#888895',
        },
        tier: {
          beginner: '#3A9E6E',
          intermediate: '#4A6FA5',
          expert: '#D95550',
          advanced: '#6B2D8B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        glass: '20px',
      },
      borderRadius: {
        glass: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
