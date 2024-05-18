/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    keyframes: {
      bounce: {
        '0%, 100%': {
          transform: 'none',
          'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
        },
        '50%': {
          transform: 'translateY(+25%)',
          'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
        },
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#c485ee',
        secondary: '#f4aeb2',
        accent: '#f7bafc',
        text: '#06010E',
        background: '#F2F2F2',
        darkNavy: '#444E89',
        vividPurple: '#A56DF2',
        blueishPurple: '#ADB1F1',
        lightPurple: '#E1D5F2',
        vividPink: '#FADCFF',
        goldenPurple: '#F9F0FF',
        navy: '#8D91B9',
        darkPurple: '#B352B9',
        dimmedPurple: '#ECEBFF',
        lighterPurple: '#EEDAFF',
        lightPink: '#F7E7E8',
        white: '#FAFAFA',
      },
      boxShadow: {
        foggyBlue: '0px 0px 20px 0 rgb(173 177 241 / 0.3)',
        foggyPink: '0px 0px 20px 0 rgb(250 220 255)',
        foggyPurple: '0px 0px 16px 0 rgb(165 109 242 / 0.16)',
        searchShadow: '0 0 10px 1px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)'],
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
    },
  },
  plugins: [],
}
