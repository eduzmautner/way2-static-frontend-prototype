/**
 * Way2 — Tailwind theme mapped onto the token system.
 *
 * Colors point at the semantic CSS variables defined in src/styles/tokens.css,
 * so `dark:` variants are never used: flipping data-theme on <html> retints
 * every utility, exactly like the phase-1 prototype.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // The 4px scale from the guideline sheet — replaces Tailwind's default.
    spacing: {
      0: '0',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      8: '32px',
      10: '40px',
      12: '48px'
    },
    // Two radii + the pill/circle exceptions. `rounded-surface` etc.
    borderRadius: {
      none: '0',
      control: '6px',
      surface: '12px',
      full: '9999px'
    },
    boxShadow: {
      subtle: '0px 2px 10px rgba(0, 0, 0, 0.12)',
      prominent: '0px 4px 16px rgba(22, 22, 22, 0.12)',
      none: 'none'
    },
    fontFamily: {
      ui: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      accent: ['Space Grotesk', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
    },
    // The 10 permitted Inter combos + 2 Space Grotesk combos. If a style
    // isn't here, it isn't in the system.
    fontSize: {
      hero: ['32px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
      section: ['24px', { lineHeight: '1.25', fontWeight: '700', letterSpacing: '-0.01em' }],
      subsection: ['20px', { lineHeight: '1.3', fontWeight: '600' }],
      item: ['16px', { lineHeight: '1.35', fontWeight: '600' }],
      button: ['14px', { lineHeight: '1.35', fontWeight: '600' }],
      'small-label': ['12px', { lineHeight: '1.35', fontWeight: '600' }],
      'body-lg': ['20px', { lineHeight: '1.45', fontWeight: '400' }],
      body: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      meta: ['12px', { lineHeight: '1.45', fontWeight: '400' }],
      micro: ['10px', { lineHeight: '1.4', fontWeight: '400' }],
      'accent-hero': ['40px', { lineHeight: '1.15', fontWeight: '500', letterSpacing: '-0.01em' }],
      'accent-tag': ['12px', { lineHeight: '1', fontWeight: '400', letterSpacing: '0.02em' }]
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Surfaces
      app: 'var(--bg-app)',
      surface: 'var(--bg-surface)',
      'surface-subtle': 'var(--bg-surface-subtle)',
      elevated: 'var(--bg-elevated)',
      input: 'var(--bg-input)',
      search: 'var(--bg-search)',
      media: 'var(--bg-media)',
      scrim: 'var(--bg-scrim)',
      disabled: 'var(--bg-disabled)',
      // Text
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      placeholder: 'var(--text-placeholder)',
      inverse: 'var(--text-inverse)',
      'text-disabled': 'var(--text-disabled)',
      // Borders
      'border-default': 'var(--border-default)',
      'border-subtle': 'var(--border-subtle)',
      'border-strong': 'var(--border-strong)',
      // Icons
      'icon-default': 'var(--icon-default)',
      'icon-active': 'var(--icon-active)',
      // Accent + actions
      accent: 'var(--accent)',
      'accent-soft': 'var(--accent-soft)',
      action: 'var(--action-bg)',
      'action-text': 'var(--action-text)',
      'action-hover': 'var(--action-bg-hover)',
      unread: 'var(--badge-unread)',
      // Raw brand values (gradient stops)
      'orange-start': '#FF5C00',
      'orange-end': '#FF9900'
    },
    extend: {
      transitionDuration: { fast: '120ms', base: '200ms' }
    }
  },
  plugins: []
};
