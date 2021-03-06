const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gray: colors.gray,
                cyan: colors.cyan,
                "light-blue": colors.lightBlue
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            maxWidth: {
                '8xl': '96rem',
                '9xl': '110rem',
                '10xl': '128rem',
            },
        },
        screens: {
            ...defaultTheme.screens,
            '2xl': '1600px',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('tailwind-scrollbar')],
};
