export const theme = {
  colors: {
    background: '#0a0a0a',
    surface: '#1a1a1a',
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    },
    border: 'rgba(255, 255, 255, 0.1)',
    borderHover: 'rgba(255, 255, 255, 0.2)',
  },
  typography: {
    fontMono: 'var(--font-mono)',
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
} as const;
