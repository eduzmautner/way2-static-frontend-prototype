/* ==========================================================================
   Way2 — render primitives

   Every function here returns an HTML string and takes a plain object. That
   is deliberate: each one maps 1:1 to a React component in phase 2, so the
   props are already the props.
   ========================================================================== */

const W2UI = (() => {
  const { icon, logo } = W2Icons;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  /* --------------------------------------------------------------- media
     Figma draws every photo slot as a flat #D9D9D9 block. These stand-ins
     keep the layout honest while making the prototype readable in review.
     Setting `data-media="flat"` on <html> restores the literal grey blocks. */
  const ART = {
    party:    ['#3B3348', '#6B5E76', '#A08C93'],
    gallery:  ['#333A48', '#5D6878', '#9A9A8E'],
    stadium:  ['#2C3A33', '#4E6455', '#8E9A7A'],
    river:    ['#2C3A31', '#4C6152', '#8B9A85'],
    market:   ['#413429', '#6E5844', '#A99172'],
    run:      ['#2C3740', '#4E626E', '#8AA3A5'],
    portrait: ['#4A5464', '#7E8A9B', '#B6C0CC'],
    masp:     ['#F2F2F2', '#E8E8E8', '#DCDCDC'],
    generic:  ['#5A5A5A', '#8A8A8A', '#B4B4B4']
  };

  function artStyle(name) {
    const [a, b, c] = ART[name] || ART.generic;
    return `background:linear-gradient(145deg, ${a} 0%, ${b} 55%, ${c} 100%)`;
  }

  function media({ art = 'generic', label = '', shape = 'square', className = '' } = {}) {
    const shapeCls = shape === 'poster' ? 'media--poster' : shape === 'free' ? '' : 'media--square';
    return `
      <div class="media ${shapeCls} ${className}">
        <div class="media__art" style="${artStyle(art)}">
          ${label ? `<span class="media__label">${esc(label)}</span>` : ''}
        </div>
      </div>`;
  }

  function thumb({ art = 'generic', className = '' } = {}) {
    return `<span class="${className}"><span style="position:absolute;inset:0;${artStyle(art)}"></span></span>`;
  }

  /* -------------------------------------------------------------- avatar */
  function avatar({ name = '', art, size = '', className = '' } = {}) {
    const initials = name
      .split(/[\s_]+/).filter(Boolean).slice(0, 2)
      .map(w => w[0]).join('').toUpperCase();
    const sizeCls = size ? `avatar--${size}` : '';
    const inner = art
      ? `<span class="avatar__art" style="${artStyle(art)}"></span>`
      : esc(initials);
    return `<span class="avatar ${sizeCls} ${className}" title="${esc(name)}">${inner}</span>`;
  }

  /* ----------------------------------------------------------------- tag */
  function tag(label, { selected = false, selectable = false, removable = false, action = '' } = {}) {
    const cls = ['tag', selectable ? 'tag--selectable' : '', selected ? 'is-selected' : ''].join(' ');
    const el = selectable ? 'button' : 'span';
    const attrs = selectable ? ` type="button" data-action="${action || 'toggle-tag'}" data-tag="${esc(label)}"` : '';
    return `<${el} class="${cls}"${attrs}>${esc(label)}${
      removable ? `<span class="tag__remove">${icon('x')}</span>` : ''
    }</${el}>`;
  }

  const tagRow = (tags = [], opts = {}) =>
    `<div class="tag-row">${tags.map(t => tag(t, opts)).join('')}</div>`;

  /* -------------------------------------------------------------- rating */
  /* The feed frames render only the earned sparkles — no empty slots. The
     empty track appears solely in the create-post rating control. */
  function rating(value, max = null, { input = false } = {}) {
    const slots = input ? (max || 5) : value;
    const stars = Array.from({ length: slots }, (_, i) =>
      icon('sparkle', { fill: i < value, class: i < value ? '' : 'is-off' })
    ).join('');
    return `<div class="rating ${input ? 'rating--input' : ''}"
                 aria-label="Avaliação ${value} de ${max || 5}">${stars}</div>`;
  }

  /* ---------------------------------------------------------------- post */
  function post(p) {
    const likes = p.likedBy || [];
    const likeLabel = likes.length
      ? `Curtido por <strong>${esc(likes[0])}</strong>${likes.length > 1 ? ' e <strong>outros</strong>' : ''}`
      : '';
    return `
      <article class="post" data-post="${esc(p.id)}">
        <header class="post__head">
          ${avatar({ name: p.username, art: p.art })}
          <div class="post__author">
            <a class="post__username" href="#/perfil/${esc(p.username)}">${esc(p.username)}</a>
            ${p.isFollowingPostAuthor ? '<span class="post__following">• Seguindo</span>' : ''}
          </div>
          <div class="post__organizer">
            <a class="post__organizer-handle" href="#/perfil-organizador/${esc(p.organizer)}">@${esc(p.organizer)}</a>
            <button class="follow-plus ${p.isFollowingOrganizer ? 'is-following' : ''}"
                    type="button" data-action="follow-organizer"
                    aria-label="Seguir @${esc(p.organizer)}">${icon('plusCircle')}</button>
          </div>
        </header>

        <a href="#/evento/${esc(p.eventId || 'e1')}" aria-label="${esc(p.eventName)}">
          ${media({ art: p.art, label: p.eventName })}
        </a>

        <div class="post__actions">
          <button class="icon-btn" type="button" data-action="like" aria-label="Curtir">${icon('heart')}</button>
          <button class="icon-btn" type="button" data-action="comment" aria-label="Comentar">${icon('comment')}</button>
          <button class="icon-btn" type="button" data-action="share" aria-label="Compartilhar">${icon('send')}</button>
          <div class="post__event">
            <span class="post__event-name">${esc(p.eventName)}</span>
            <span class="post__event-date">${esc(p.eventDate)}</span>
          </div>
        </div>

        ${likeLabel ? `<p class="post__likes">${likeLabel}</p>` : ''}
        ${rating(p.rating)}
        <p class="post__description">${esc(p.description)}</p>
        ${tagRow(p.tags)}
      </article>`;
  }

  /* ---------------------------------------------------------- event card */
  function eventCard(e, { compact = false } = {}) {
    return `
      <article class="event-card" data-event="${esc(e.id)}">
        <header class="event-card__head">
          <a class="event-card__organizer" href="#/perfil-organizador/${esc(e.organizer)}">@${esc(e.organizer)}</a>
          <button class="follow-plus" type="button" data-action="follow-organizer"
                  aria-label="Seguir @${esc(e.organizer)}">${icon('plusCircle')}</button>
        </header>

        <a href="#/evento/${esc(e.id)}" aria-label="${esc(e.title)}">
          ${media({ art: e.art, label: e.title })}
        </a>

        <div class="event-card__title-row">
          <h3 class="event-card__title">${esc(e.title)}</h3>
          <button class="icon-btn ${e.saved ? 'is-on' : ''}" type="button"
                  data-action="save-event" data-event="${esc(e.id)}"
                  aria-label="Salvar evento">${icon('bookmark', { fill: !!e.saved })}</button>
        </div>

        <p class="event-card__meta">
          <span>${esc(e.date)}</span>
          <span>${esc(e.time)}</span>
          <span>${esc(e.location)}</span>
        </p>

        ${tagRow(e.tags)}
        ${compact ? '' : `<a class="btn btn--primary btn--block" href="#/evento/${esc(e.id)}">ver mais</a>`}
      </article>`;
  }

  /* Compact horizontal row — search results, "baseado em seus interesses" */
  function eventRow(e) {
    return `
      <a class="event-row" href="#/evento/${esc(e.id)}">
        <span class="event-row__thumb">${thumb({ art: e.art })}</span>
        <span class="event-row__body">
          <span class="event-row__title">${esc(e.title)}</span>
          <span class="event-row__meta">${esc(e.date)}</span>
          <span class="event-row__meta">@${esc(e.organizer)}</span>
        </span>
        <button class="icon-btn ${e.saved ? 'is-on' : ''}" type="button"
                data-action="save-event" data-event="${esc(e.id)}"
                aria-label="Salvar evento">${icon('bookmark', { fill: !!e.saved })}</button>
      </a>`;
  }

  /* --------------------------------------------------------------- forms */
  const field = ({ label, id, type = 'text', placeholder = '', value = '' }) => `
    <label class="field" for="${esc(id)}">
      <span class="field__label">${esc(label)}</span>
      <input class="input" id="${esc(id)}" type="${esc(type)}"
             placeholder="${esc(placeholder)}" value="${esc(value)}">
    </label>`;

  const searchInput = ({ placeholder = 'Pesquisar', square = false, id = '' } = {}) => `
    <div class="search ${square ? 'search--square' : ''}">
      ${icon('search')}
      <input type="search" ${id ? `id="${esc(id)}"` : ''} placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}">
    </div>`;

  const backButton = (href = '#back') =>
    `<a class="btn-back" href="${esc(href)}" data-action="back">${icon('arrowLeft')} Voltar</a>`;

  /* --------------------------------------------------------------- shell */
  const NAV = [
    { key: 'home',    route: '#/home',          label: 'Início',        icon: 'home' },
    { key: 'search',  route: '#/pesquisa',      label: 'Pesquisar',     icon: 'search' },
    { key: 'events',  route: '#/eventos',       label: 'Eventos',       icon: 'ticket' },
    { key: 'notifs',  route: '#/notificacoes',  label: 'Notificações',  icon: 'sparkle' },
    { key: 'chat',    route: '#/chat',          label: 'Mensagens',     icon: 'message' },
    { key: 'create',  route: '#criar-post',     label: 'Criar post',    icon: 'plusCircle' },
    { key: 'profile', route: '#/perfil',        label: 'Perfil',        icon: 'user', dot: true }
  ];

  // Mobile carries a 5-item subset — the order the iPhone 16 frames show.
  const TAB_KEYS = ['home', 'search', 'create', 'events', 'profile'];

  function rail(active, { organizer = false } = {}) {
    const items = NAV.map(n => `
      <a class="rail__item ${n.key === active ? 'is-active' : ''}" href="${n.route}"
         title="${n.label}" aria-label="${n.label}">
        ${icon(n.icon)}${n.dot ? '<span class="dot"></span>' : ''}
      </a>`).join('');
    const organizerItem = organizer ? `
      <a class="rail__item ${active === 'manager' ? 'is-active' : ''}" href="#/gerenciador"
         title="Gerenciador de eventos" aria-label="Gerenciador de eventos">${icon('panelLeft')}</a>` : '';
    return `<nav class="rail">${items}${organizerItem}</nav>`;
  }

  function tabbar(active) {
    const items = TAB_KEYS.map(key => {
      const n = NAV.find(x => x.key === key);
      return `
        <a class="tabbar__item ${n.key === active ? 'is-active' : ''}" href="${n.route}"
           aria-label="${n.label}">${icon(n.icon)}${n.dot ? '<span class="dot"></span>' : ''}</a>`;
    }).join('');
    return `<nav class="tabbar">${items}</nav>`;
  }

  /* Mobile top bar. Home shows the wordmark + notification/chat shortcuts —
     that is the only mobile artboard in Figma, so every other screen reuses
     it with a title in place of the wordmark. */
  function topbar({ title = '', back = false } = {}) {
    const left = back
      ? `<button class="topbar__action" type="button" data-action="back" aria-label="Voltar">${icon('arrowLeft')}</button>`
      : `<a class="brand" href="#/home" aria-label="Way2">${logo('w2-grad-mobile')}</a>`;
    return `
      <header class="topbar">
        ${left}
        ${title ? `<span class="topbar__title">${esc(title)}</span>` : '<span></span>'}
        <div class="topbar__actions">
          <a class="topbar__action" href="#/notificacoes" aria-label="Notificações">${icon('sparkle', { fill: true })}</a>
          <a class="topbar__action" href="#/chat" aria-label="Mensagens">${icon('message')}</a>
        </div>
      </header>`;
  }

  /* Full app chrome around a screen body. */
  function shell(body, { active = '', title = '', back = false, organizer = false, flush = false, bare = false } = {}) {
    return `
      <div class="app">
        ${bare ? '' : `<a class="app__brand brand" href="#/home" aria-label="Way2">${logo('w2-grad-rail')}</a>`}
        ${bare ? '' : rail(active, { organizer })}
        ${bare ? '' : topbar({ title, back })}
        <main class="main ${flush ? 'main--flush' : ''} ${bare ? 'main--bare' : ''}">${body}</main>
        ${bare ? '' : tabbar(active)}
      </div>`;
  }

  /* Onboarding + checkout screens have no rail and no tab bar. */
  function bareShell(body, { brand = true } = {}) {
    return `
      <div class="app">
        ${brand ? `<a class="app__brand brand" href="#/home" aria-label="Way2">${logo('w2-grad-bare')}</a>` : ''}
        <main class="main main--bare main--flush">${body}</main>
      </div>`;
  }

  return {
    esc, artStyle, media, thumb, avatar, tag, tagRow, rating,
    post, eventCard, eventRow, field, searchInput, backButton,
    rail, tabbar, topbar, shell, bareShell, NAV
  };
})();
