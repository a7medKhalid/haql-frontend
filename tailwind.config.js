const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.tsx'],
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: '#0EA5E9',
                accent: '#E1AA65',
                neutral: {
                    100: '#F8FAFC',
                    200: '#F1F5F9',
                    300: '#CBD5E1',
                },
                'primary-text': '#1E293B',
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            lineClamp: ['hover'],
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
    ],
}
