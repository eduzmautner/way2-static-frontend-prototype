/* ==========================================================================
   Way2 — icon set

   Figma's asset CDN could not export the original icon SVGs, so every icon
   below is a hand-inlined Lucide equivalent chosen to match the outline
   weight used across the artboards. The substitution table lives in
   README.md — when the real exports land, replace the path data here and
   nothing else changes.

   All icons render on a 24x24 grid, stroke-based, currentColor.
   ========================================================================== */

const W2Icons = (() => {
  // Stroke-based paths (the default outline style used everywhere).
  const stroke = {
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
  };

  // Filled variants — used for the rating sparkles and toggled states.
  const filled = {
    sparkle: '<path d="M12 2 14.1 9.2a2 2 0 0 0 .7.7L22 12l-7.2 2.1a2 2 0 0 0-.7.7L12 22l-2.1-7.2a2 2 0 0 0-.7-.7L2 12l7.2-2.1a2 2 0 0 0 .7-.7Z"/>',
    heart:   '<path d="M12 20s-7.5-4.4-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.6 12 20 12 20Z"/>',
    bookmark:'<path d="M6.5 3.5h11a1 1 0 0 1 1 1V21l-6.5-4.2L5.5 21V4.5a1 1 0 0 1 1-1Z"/>',
    check:   '<path d="m5 12.5 4.5 4.5L19 7.5"/>'
  };

  /**
   * @param {string} name  key from `stroke` (or `filled` when opts.fill)
   * @param {{fill?:boolean, size?:number, class?:string, width?:number}} opts
   */
  function icon(name, opts = {}) {
    const set = opts.fill ? filled : stroke;
    const body = set[name] || stroke[name];
    if (!body) {
      console.warn(`[w2] unknown icon "${name}"`);
      return '';
    }
    const cls = opts.class ? ` class="${opts.class}"` : '';
    // Always emit intrinsic dimensions so an icon dropped into a flex
    // container without a CSS rule can't stretch to fill it. Component CSS
    // still wins wherever it sets a size.
    const px = opts.size || 24;
    const size = ` width="${px}" height="${px}"`;
    const paint = opts.fill
      ? 'fill="currentColor" stroke="none"'
      : `fill="none" stroke="currentColor" stroke-width="${opts.width || 1.75}" stroke-linecap="round" stroke-linejoin="round"`;
    return `<svg${cls}${size} viewBox="0 0 24 24" ${paint} aria-hidden="true">${body}</svg>`;
  }

  /* The W2 wordmark, inlined from WAY2_Logo_Vector.svg (the vector Eduardo
     supplied). A single open stroke path on a 71x41 canvas — the source file
     paints it white; here the stroke is swapped for the Orange Grad so one
     mark serves both themes, matching the light artboards.

     Inlined rather than referenced as <img> so it works from file:// without
     a second request and can read the gradient stops from the token layer. */
  const LOGO_PATH = "M25.0803 31.5608C25.2337 29.9092 25.4227 28.2605 25.5285 26.6061C25.5986 25.5095 25.5977 24.4025 25.5378 23.3049C25.4892 22.4188 24.9455 21.9528 24.1707 21.9874C23.6458 22.0108 23.2977 22.3776 23.0769 22.7734C22.4284 23.9328 21.7678 25.0959 21.2494 26.317C19.9731 29.3225 18.8399 32.3926 17.0312 35.1418C15.8288 36.9692 14.3279 38.4655 12.2337 39.2271C8.081 40.7365 3.35187 38.9857 2.09613 33.8757C1.61798 31.9294 1.65073 29.9448 1.99226 28.0004C2.52375 24.9733 3.19092 21.9696 3.81786 18.9603C4.18372 17.2059 4.41391 15.442 4.23893 13.6501C4.09015 12.1258 3.45293 10.8083 2.49381 9.62091C1.97074 8.97339 1.39527 8.32213 1.0659 7.57449C0.301415 5.83872 0.980749 3.92985 2.57522 2.72839C5.32624 0.652956 9.42657 1.61301 11.1623 4.60919C11.9427 5.95569 12.2674 7.41822 12.3573 8.95655C12.5126 11.6177 12.0213 14.2041 11.4702 16.782C11.0791 18.6113 10.5766 20.421 10.2706 22.2634C10.0947 23.3189 10.148 24.4278 10.2191 25.5048C10.2697 26.2674 10.6917 26.9196 11.487 27.1329C12.2515 27.3379 12.9187 27.0609 13.482 26.5079C14.3812 25.6255 15.0362 24.5728 15.5415 23.4378C16.4529 21.3885 17.3025 19.3122 18.1962 17.2545C19.1665 15.0191 20.2164 12.8248 21.6237 10.8214C22.6586 9.34768 23.8339 8.0096 25.4433 7.15061C27.1997 6.21395 28.9925 5.9482 30.7545 7.15903C31.8961 7.9441 32.4491 9.11281 32.7223 10.4172C33.091 12.1745 32.9366 13.9355 32.6905 15.6966C32.3798 17.9189 32.0551 20.1412 31.8455 22.3739C31.7772 23.1047 31.9709 23.8907 32.1824 24.6121C32.5389 25.8285 33.8424 26.3862 35.0513 25.2802C35.958 24.4512 36.5419 23.3929 36.9377 22.2663C37.8304 19.7295 38.6286 17.16 39.4801 14.6092C40.3381 12.0369 41.4769 9.59939 43.1752 7.46875C44.8811 5.32876 46.9761 3.65288 49.4605 2.48229C51.2515 1.63921 53.1238 1.10865 55.0973 0.870043C57.7229 0.552833 60.2634 0.870043 62.7309 1.75336C64.0091 2.21187 65.1619 2.92208 66.2015 3.82131C67.9269 5.31378 69.0049 7.19271 69.4438 9.39634C69.949 11.9331 69.6524 14.4174 68.639 16.8119C67.9784 18.3737 67.0792 19.7735 65.9778 21.061C64.2963 23.0251 62.191 24.4549 60.0856 25.8997C59.0067 26.6398 57.9699 27.4501 56.9696 28.2951C56.3633 28.8079 56.3034 29.3983 56.6674 30.0449C56.9687 30.5811 57.5339 30.7186 58.0729 30.6896C59.0741 30.6363 60.0716 30.5062 61.0672 30.3752C62.8432 30.1413 64.5705 29.5312 66.397 29.6753C67.7005 29.7782 68.799 30.2695 69.5298 31.3951C70.1521 32.3533 70.1895 33.4191 69.8545 34.4653C69.0723 36.9122 67.2495 38.2465 64.8634 38.8856C64.0652 39.0989 63.2259 39.259 62.4043 39.2646C61.4705 39.2721 60.5263 39.1261 59.6018 38.9642C57.867 38.6601 56.1191 38.5216 54.3711 38.6601C52.9301 38.7743 51.506 39.0961 50.0668 39.2515C48.4808 39.4236 46.8938 39.4788 45.3667 38.8304C43.8845 38.2016 43.1453 37.0507 43.0414 35.502C42.8571 32.7548 43.8929 30.4014 45.5791 28.3166C48.0569 25.2531 51.1195 22.866 54.4507 20.8C56.3577 19.6172 58.0644 18.208 59.221 16.2383C59.9724 14.9573 60.3804 13.5902 60.0454 12.094C59.6701 10.4135 58.1683 9.20919 56.4372 9.09223C53.6057 8.90134 51.4807 10.2011 49.7075 12.2363C47.5862 14.6701 46.3183 17.5802 45.1618 20.5436C43.6656 24.38 42.1899 28.2249 40.2979 31.8901C39.3416 33.7419 38.2421 35.5058 36.7422 36.9711C35.4462 38.2371 33.935 39.1832 32.1047 39.4283C29.4791 39.7811 27.3634 38.9193 26.1002 36.5875C25.4283 35.3467 25.1626 33.9703 25.1748 32.5508C25.1776 32.2233 25.1748 31.8967 25.1748 31.5692C25.1429 31.5664 25.1111 31.5636 25.0803 31.5608Z";

  function logo(id = "w2-grad") {
    return `
      <svg viewBox="0 0 71 41" role="img" aria-label="Way2" fill="none">
        <defs>
          <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stop-color="var(--w2-orange-start)"/>
            <stop offset="100%" stop-color="var(--w2-orange-end)"/>
          </linearGradient>
        </defs>
        <path d="${LOGO_PATH}" stroke="url(#${id})" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  }

  return { icon, logo, stroke, filled };
})();
