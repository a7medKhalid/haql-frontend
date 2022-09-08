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
            transitionTimingFunction: {
                'spring-high': 'cubic-bezier(0,1.54,.63,.24)',
                'spring-mid': 'cubic-bezier(0,1.54,.83,.67)',
                'spring-low': 'cubic-bezier(0,1.26,.83,.67)',
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
        require('@tailwindcss/aspect-ratio'),
    ],
}
