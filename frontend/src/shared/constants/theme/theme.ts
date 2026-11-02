import { createTheme } from '@mantine/core'

import components from './overrides'

export const theme = createTheme({
    components,
    cursorType: 'pointer',
    fontFamily:
        '"Golos Text", Vazirmatn, Apple Color Emoji, Noto Sans SC, Twemoji Country Flags, sans-serif',
    fontFamilyMonospace: '"Fira Mono", monospace',
    breakpoints: {
        xs: '25em',
        sm: '30em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        '2xl': '96em',
        '3xl': '120em',
        '4xl': '160em'
    },
    scale: 1,
    fontSmoothing: true,
    focusRing: 'auto',
    white: '#ffffff',
    black: '#000000',
    colors: {
        // Фирменный красный: взят из логотипа (#c02623)
        red: [
            '#fdeceb',
            '#f8d1d0',
            '#efa6a4',
            '#e47a77',
            '#d5504c',
            '#c02623',
            '#a81f1c',
            '#8b1916',
            '#6d1311',
            '#4f0d0c'
        ],
        // Нейтральная шкала страницы: от бумаги к чернилам
        gray: [
            '#f7f7f6',
            '#f1f1f0',
            '#e6e6e4',
            '#dededc',
            '#c8c8c5',
            '#a8a8a4',
            '#6b6b6b',
            '#4a4a4a',
            '#2a2a2a',
            '#000000'
        ],
        dark: [
            '#f7f7f6',
            '#e6e6e4',
            '#c8c8c5',
            '#a8a8a4',
            '#6b6b6b',
            '#4a4a4a',
            '#2a2a2a',
            '#151515',
            '#0a0a0a',
            '#000000'
        ]
    },
    primaryShade: 5,
    primaryColor: 'red',
    autoContrast: true,
    luminanceThreshold: 0.3,
    headings: {
        fontFamily: 'Unbounded, Vazirmatn, Apple Color Emoji, Noto Sans SC, sans-serif',
        fontWeight: '700',
        sizes: {
            h1: { fontSize: '26px', lineHeight: '1.2' },
            h2: { fontSize: '21px', lineHeight: '1.25' },
            h3: { fontSize: '17px', lineHeight: '1.3' },
            h4: { fontSize: '15px', lineHeight: '1.35' },
            h5: { fontSize: '14px', lineHeight: '1.4' },
            h6: { fontSize: '13px', lineHeight: '1.4' }
        }
    },
    radius: {
        xs: '2px',
        sm: '4px',
        md: '4px',
        lg: '4px',
        xl: '6px'
    },
    defaultRadius: 'md'
})
