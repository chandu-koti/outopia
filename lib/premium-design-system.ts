export const premiumColors = {
  // Primary colors
  primary: {
    900: '#0A1F0F', // Deep Forest
    800: '#0F2A16',
    700: '#14351C',
    600: '#194023',
    500: '#1E4B2A',
    400: '#2C5F3A',
    300: '#3A734A',
    200: '#4F8B61',
    100: '#6FA382',
    50: '#E8F2EB',
  },
  // Accent colors
  accent: {
    emerald: '#10B981',
    gold: '#F59E0B',
    amber: '#F97316',
    rose: '#F43F5E',
  },
  // Neutral colors with warmth
  neutral: {
    950: '#020202',
    900: '#111111',
    800: '#1A1A1A',
    700: '#262626',
    600: '#404040',
    500: '#525252',
    400: '#737373',
    300: '#A3A3A3',
    200: '#D4D4D4',
    100: '#E5E5E5',
    50: '#FAFAFA',
    white: '#FFFFFF',
  },
  // Glass effect colors
  glass: {
    white: 'rgba(255, 255, 255, 0.05)',
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    dark: 'rgba(0, 0, 0, 0.2)',
  },
} as const;

export const premiumTypography = {
  // Display fonts
  display: {
    fontFamily: 'var(--font-display)',
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  // Body fonts
  body: {
    fontFamily: 'var(--font-body)',
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },
  // Accent fonts
  accent: {
    fontFamily: 'var(--font-accent)',
    weights: {
      regular: 400,
      italic: 'italic',
    },
  },
} as const;

export const premiumSpacing = {
  // Golden ratio based spacing
  xs: '0.382rem', // 6.11px
  sm: '0.618rem', // 9.89px
  md: '1rem', // 16px
  lg: '1.618rem', // 25.89px
  xl: '2.618rem', // 41.89px
  '2xl': '4.236rem', // 67.78px
  '3xl': '6.854rem', // 109.66px
  '4xl': '11.09rem', // 177.44px
} as const;

export const premiumAnimation = {
  // Easing functions
  easing: {
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    premium: 'cubic-bezier(0.77, 0, 0.175, 1)',
  },
  // Durations
  duration: {
    instant: '100ms',
    fast: '250ms',
    normal: '400ms',
    slow: '600ms',
    slower: '800ms',
    slowest: '1200ms',
  },
  // Spring configurations
  spring: {
    smooth: { type: 'spring', stiffness: 100, damping: 20 },
    bouncy: { type: 'spring', stiffness: 300, damping: 10 },
    stiff: { type: 'spring', stiffness: 400, damping: 30 },
  },
} as const;

export const premiumEffects = {
  // Box shadows
  shadow: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  },
  // Blur effects
  blur: {
    xs: 'blur(2px)',
    sm: 'blur(4px)',
    md: 'blur(8px)',
    lg: 'blur(12px)',
    xl: 'blur(16px)',
    '2xl': 'blur(24px)',
  },
  // Gradients
  gradient: {
    mesh: 'radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 0%), radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%), radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%), radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%)',
    dark: 'linear-gradient(180deg, rgba(10, 31, 15, 0) 0%, rgba(10, 31, 15, 0.8) 100%)',
    light: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
    radial: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
  },
  // Noise texture
  noise: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.02"/%3E%3C/svg%3E")',
} as const;

export const premiumBreakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
} as const;

// Utility function for responsive values
export function responsive<T>(values: {
  base: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
  '3xl'?: T;
}) {
  return values;
}

// CSS-in-JS utilities
export const premiumTheme = {
  colors: premiumColors,
  typography: premiumTypography,
  spacing: premiumSpacing,
  animation: premiumAnimation,
  effects: premiumEffects,
  breakpoints: premiumBreakpoints,
} as const;

export type PremiumTheme = typeof premiumTheme;