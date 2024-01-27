/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            'sans': 'Poppins,Helvetica Neue,Helvetica,Arial,sans-serif'
        },
        extend: {
            translate: {
                'z-0': 'translateZ(0)',
            },
            transitionProperty: {
                'colors-filter-transform': 'filter, background, color, transform',
            },
            filter: {
                'brightness-100': 'brightness(1)',
            },
            maxWidth: {
                xxs: 300,
                xs: 400,
                sm: 500,
                md: 600,
                lg: 700,
            },
            duration: {
                250: '250ms',
            },
            margin: {
                'inline-auto': 'auto',
            },
            scrollMargin: {
                '100': '100px 0 0 0',
            },
            colors: {
                gray: {
                    600: '#454d5e',
                    700: '#222b39',
                    900: '#131a20'
                },
                neutral: {
                    50: '#f5f4fb',
                },
                slate: {
                    200: '#f9fafc',
                    600: '#303a4b',
                    700: '#35424d',
                    800: '#1b232d',
                    900: '#101623',
                },
                cyan: {
                    400: '#26a4ff',
                    700: '#0f6ecd',
                },
                red: {
                    400: '#ec364b',
                    700: '#c0172a',
                },
                green: {
                    400: '#00f593',
                    700: '#00c46a',
                },
                amber: {
                    500: '#ffb836',
                    700: '#d99e0b',
                },
                primary: {
                    300: '#ff7097',
                    400: '#db0a61',
                    500: '#c70859',
                },
                contrast: {
                    300: 'rgba(255, 255, 255, 0.3)',
                    700: 'rgba(255, 255, 255, 0.7)',
                }
            },
            screens: {
                'xs-height': {'raw': '(min-height: 350px)'},
                'sm-height': {'raw': '(min-height: 480px)'},
                'md-height': {'raw': '(min-height: 600px)'},
                'lg-height': {'raw': '(min-height: 850px)'},
                'xl-height': {'raw': '(min-height: 960px)'},
                '2xl-height': {'raw': '(min-height: 1152px)'},
            }
        },
    },
    plugins: [
        require('tailwindcss-debug-screens')
    ],
}

