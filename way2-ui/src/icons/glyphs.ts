/* Icon glyph registry — ported verbatim from the phase-1 prototype
   (assets/js/icons.js). Each entry is SVG innerHTML on a 24x24 grid.
   These are hand-inlined Lucide equivalents; when real Figma exports land,
   replace path data here and every component updates. See the root README
   for the substitution table. */

export const strokeGlyphs = {
    /* --- primary navigation --- */
    home:        '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.8V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.8"/><path d="M9.5 21v-6h5v6"/>',
    search:      '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    ticket:      '<path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h15A1.5 1.5 0 0 1 21 8.5v1.9a2.1 2.1 0 0 0 0 3.2v1.9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 15.5v-1.9a2.1 2.1 0 0 0 0-3.2Z"/><path d="M9 7v2"/><path d="M9 13.5v3"/>',
    sparkle:     '<path d="M12 2.5 14 9.4a3 3 0 0 0 .6.6L21.5 12l-6.9 2a3 3 0 0 0-.6.6L12 21.5l-2-6.9a3 3 0 0 0-.6-.6L2.5 12l6.9-2a3 3 0 0 0 .6-.6Z"/>',
    message:     '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5 4Z"/><circle cx="8.5" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="15.5" cy="10" r=".9" fill="currentColor" stroke="none"/>',
    plusCircle:  '<circle cx="12" cy="12" r="9"/><path d="M12 8.2v7.6M8.2 12h7.6"/>',
    user:        '<circle cx="12" cy="8" r="3.6"/><path d="M4.8 20a7.5 7.5 0 0 1 14.4 0"/>',
    panelLeft:   '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="M12.5 9h5M12.5 13h5"/>',

    /* --- post + card actions --- */
    heart:       '<path d="M12 20s-7.5-4.4-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.6 12 20 12 20Z"/>',
    comment:     '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5 4Z"/>',
    send:        '<path d="M4.5 5 20 12 4.5 19l2.2-7Z"/>',
    bookmark:    '<path d="M6.5 3.5h11a1 1 0 0 1 1 1V21l-6.5-4.2L5.5 21V4.5a1 1 0 0 1 1-1Z"/>',

    /* --- utility --- */
    x:           '<path d="m6 6 12 12M18 6 6 18"/>',
    check:       '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    arrowLeft:   '<path d="M20 12H4"/><path d="m10 6-6 6 6 6"/>',
    arrowRight:  '<path d="M4 12h16"/><path d="m14 6 6 6-6 6"/>',
    chevronLeft: '<path d="m15 5-7 7 7 7"/>',
    chevronRight:'<path d="m9 5 7 7-7 7"/>',
    chevronDown: '<path d="m5 9 7 7 7-7"/>',
    image:       '<rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 17 5-5 4.5 4.5L17 13l3 3"/>',
    upload:      '<path d="M12 16V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"/>',
    filters:     '<path d="M4 7h16M7 12h10M10 17h4"/>',
    plus:        '<path d="M12 5v14M5 12h14"/>',
    minus:       '<path d="M5 12h14"/>',
    moon:        '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
    sun:         '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"/>',
    grid:        '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
    calendar:    '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
    mapPin:      '<path d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z"/><circle cx="12" cy="10.5" r="2.4"/>',
    logOut:      '<path d="M14 4h4.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H14"/><path d="M9 12h9"/><path d="m12.5 8.5 3.5 3.5-3.5 3.5"/>'
} as const;

/* Filled variants for toggled states (rating, like, save, check). */
export const filledGlyphs = {
    sparkle: '<path d="M12 2 14.1 9.2a2 2 0 0 0 .7.7L22 12l-7.2 2.1a2 2 0 0 0-.7.7L12 22l-2.1-7.2a2 2 0 0 0-.7-.7L2 12l7.2-2.1a2 2 0 0 0 .7-.7Z"/>',
    heart:   '<path d="M12 20s-7.5-4.4-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.6 12 20 12 20Z"/>',
    bookmark:'<path d="M6.5 3.5h11a1 1 0 0 1 1 1V21l-6.5-4.2L5.5 21V4.5a1 1 0 0 1 1-1Z"/>',
    check:   '<path d="m5 12.5 4.5 4.5L19 7.5"/>'
} as const;

export type IconName = keyof typeof strokeGlyphs;
