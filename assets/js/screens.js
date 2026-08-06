/* ==========================================================================
   Way2 — screens
   One function per Figma frame. Each returns the full document body for its
   route; the router in app.js swaps them.
   ========================================================================== */

const W2Screens = (() => {
  const D = W2Data;
  const U = W2UI;
  const { icon, logo } = W2Icons;
  const esc = U.esc;

  /* ========================== ONBOARDING ================================ */

  function signupForm({ filled = false } = {}) {
    return `
      <div class="centered-screen">
        <div class="onboarding">
          <h1 class="t-accent-hero onboarding__title">Cadastre-se</h1>

          <div class="onboarding__fields">
            ${U.field({ label: 'Nome do usuário', id: 'su-user', value: filled ? 'matheus_braga' : '' })}
            ${U.field({ label: 'Email', id: 'su-email', type: 'email', value: filled ? 'matheus@way2.app' : '' })}
            ${U.field({ label: 'Senha', id: 'su-pass', type: 'password', value: filled ? '••••••••••' : '' })}
          </div>

          <button class="checkbox onboarding__terms ${filled ? 'is-checked' : ''}"
                  type="button" data-action="toggle-terms" aria-pressed="${filled}">
            <span class="checkbox__box">${icon('check', { width: 2.4 })}</span>
            <span class="t-micro">Eu li e concordo com os <span class="link">Termos de Serviço</span>
              e <span class="link">Política de Privacidade</span>.</span>
          </button>

          <div class="onboarding__submit">
            ${filled
              ? '<a class="btn btn--primary" href="#/onboarding/carregando">Cadastrar</a>'
              : '<button class="btn" type="button" aria-disabled="true" data-action="need-terms">Cadastrar</button>'}
          </div>

          <p class="onboarding__or">ou</p>

          <div class="onboarding__sso">
            <button class="btn btn--secondary btn--lg" type="button">
              <span aria-hidden="true" style="font-weight:700;color:#4285F4">G</span> Entre com Google
            </button>
            <button class="btn btn--secondary btn--lg" type="button">
              <span aria-hidden="true">&#63743;</span> Entre com Apple
            </button>
          </div>

          <div class="onboarding__foot">
            <p>Já possui uma conta? <a class="link" href="#/home">Entrar</a></p>
            <p><a class="link" href="#/criar-evento">*Sou um organizador de eventos</a></p>
          </div>
        </div>
      </div>`;
  }

  const onboardingSignup      = () => U.bareShell(signupForm({ filled: false }));
  const onboardingSignupValid = () => U.bareShell(signupForm({ filled: true }));

  const sparkleLoader = () => `
    <div class="sparkle-loader">
      ${icon('sparkle', { fill: true })}${icon('sparkle', { fill: true })}${icon('sparkle', { fill: true })}
    </div>`;

  const onboardingLoading = () => U.bareShell(`
    <div class="centered-screen">
      ${sparkleLoader()}
      <p class="sr-only">Carregando</p>
    </div>`);

  const onboardingInterests = (state) => U.bareShell(`
    <div class="centered-screen">
      <div class="interests">
        <h1 class="t-accent-hero">Quais são os seus interesses?</h1>
        <p class="t-meta text-secondary" style="margin-top:var(--space-4)">Selecione ao menos um interesse</p>

        <div class="interests__grid">
          ${D.interests.map(i => U.tag(i, {
            selectable: true,
            selected: state.selectedInterests.includes(i),
            action: 'toggle-interest'
          })).join('')}
        </div>

        ${state.selectedInterests.length
          ? '<a class="btn btn--primary" href="#/onboarding/personalizando">Continuar</a>'
          : '<button class="btn" type="button" aria-disabled="true">Continuar</button>'}
      </div>
    </div>`);

  const onboardingPersonalizing = () => U.bareShell(`
    <div class="centered-screen">
      <h1 class="t-accent-hero" style="margin-bottom:var(--space-8)">Personalizando a sua experiência ;)</h1>
      ${sparkleLoader()}
      <p style="margin-top:var(--space-10)"><a class="link" href="#/home">Ir para o feed</a></p>
    </div>`);

  /* ============================= HOME =================================== */

  const home = () => U.shell(`
    <div class="container container--feed">
      <div class="feed">${D.posts.map(p => U.post(p)).join('')}</div>
    </div>`, { active: 'home' });

  /* ============================ EVENTOS ================================= */

  const FILTERS = ['Festas', 'Arte', 'Esporte', 'Música', 'Ar livre'];

  /* Every interest that exists anywhere in the mock data — the onboarding
     taxonomy plus tags used by events and organizer profiles. */
  const allInterests = () => [...new Set([
    ...D.interests,
    ...D.events.flatMap(e => e.tags),
    ...D.organizers.flatMap(o => o.interests)
  ])];

  const eventos = (state) => {
    // Base row plus any modal-picked filter not already in it, so an active
    // filter is never invisible.
    const rowFilters = [...FILTERS, ...state.activeFilters.filter(f => !FILTERS.includes(f))];
    return U.shell(`
    <div class="container">
      <h2 class="t-body-lg eventos__filter-label">Filtrar por interesse</h2>
      <div class="eventos__filters">
        ${rowFilters.map(f => U.tag(f, {
          selectable: true,
          selected: state.activeFilters.includes(f),
          action: 'toggle-filter'
        })).join('')}
        <button class="eventos__more" type="button" data-action="open-interests">ver mais</button>
      </div>

      <div class="event-grid eventos__grid">
        ${filteredEvents(state).map(e => U.eventCard(e)).join('')}
      </div>
      ${filteredEvents(state).length ? '' : `
        <div class="empty"><p class="empty__title">Nenhum evento com esses interesses</p></div>`}
    </div>`, { active: 'events', title: 'Eventos' });
  };

  function filteredEvents(state) {
    if (!state.activeFilters.length) return D.events;
    return D.events.filter(e =>
      e.tags.some(t => state.activeFilters.some(f => f.toLowerCase() === t.toLowerCase()))
    );
  }

  /* -------- Event detail (Figma: Eventos 2) -------- */
  function eventoDetalhe(id) {
    const e = D.findEvent(id) || D.events[3];
    const org = D.findOrganizer(e.organizer);
    return U.shell(`
      <div class="container">
        <div style="margin-bottom:var(--space-6)">${U.backButton('#/eventos')}</div>

        <div class="event-detail">
          <div class="event-detail__aside">
            ${U.media({ art: e.art, label: e.title, shape: 'square' })}
            <button class="event-detail__save" type="button" data-action="save-event" data-event="${esc(e.id)}">
              <span>${e.saved ? 'Evento salvo' : 'Salvar evento'}</span>
              <span class="icon-btn ${e.saved ? 'is-on' : ''}">${icon('bookmark', { fill: !!e.saved })}</span>
            </button>
          </div>

          <div class="stack stack-4">
            <h1 class="t-hero">${esc(e.title)}</h1>

            <div class="stack stack-2">
              <p class="event-detail__venue">${esc(e.venue)}</p>
              <p class="event-detail__venue">${esc(e.location)} | ${esc(e.city)}</p>
            </div>

            <p class="t-button">${esc(e.fullDate)}</p>
            ${U.tagRow(e.tags)}

            <div class="event-detail__buy">
              <span class="event-detail__price">${esc(e.price)}</span>
              <a class="btn btn--primary btn--lg" href="#/ingresso/${esc(e.id)}">Comprar</a>
            </div>
            <p class="t-micro text-secondary">Este valor reflete o preço inicial de 1x ingresso a este evento.</p>

            <hr class="divider" style="margin:var(--space-4) 0">

            <div class="stack stack-3">
              <h2 class="t-button">Sobre o Evento</h2>
              <p class="t-meta">${esc(e.about)}</p>
            </div>

            <hr class="divider" style="margin:var(--space-4) 0">

            <div class="stack stack-3">
              <h2 class="t-button">Organizado por</h2>
              <div class="row">
                <a class="event-detail__organizer-name" href="#/perfil-organizador/${esc(e.organizer)}">${esc(org ? org.name : e.organizer)}</a>
                <button class="btn btn--primary btn--sm" type="button" data-action="follow-organizer">Seguir</button>
              </div>
            </div>

            <div class="row" style="margin-top:var(--space-4)">
              <span class="avatar-stack">
                ${U.avatar({ name: 'fulano 2001', art: 'party', size: 'sm' })}
                ${U.avatar({ name: 'maria s', art: 'gallery', size: 'sm' })}
              </span>
              <span class="t-meta text-secondary">${esc(e.savedByLabel || 'fulano_2001 e outros salvaram este evento')}</span>
            </div>
          </div>
        </div>
      </div>`, { active: 'events', title: 'Evento', back: true });
  }

  /* -------- Ticket picker (Figma: Eventos 3) -------- */
  function ingresso(id, state) {
    const e = D.findEvent(id) || D.events[3];
    const tickets = e.tickets || [{ id: 't1', name: 'Entrada Geral', price: 79.90, note: '' }];
    const money = n => `R$ ${n.toFixed(2).replace('.', ',')}`;
    const qty = state.ticketQty;
    const selected = tickets[0];

    return U.bareShell(`
      <div class="container container--narrow checkout-shell">
        <div class="checkout-shell__bar">
          ${U.backButton(`#/evento/${esc(e.id)}`)}
          <div class="checkout-shell__steps">
            <span class="is-active">Ingresso</span>${icon('arrowRight')}<span>Checkout</span>
          </div>
          <a class="icon-btn checkout-shell__close" href="#/eventos" aria-label="Fechar">${icon('x')}</a>
        </div>

        <div class="stack stack-8">
          <div class="ticket-summary">
            <div class="ticket-summary__thumb">${U.media({ art: e.art })}</div>
            <div>
              <p class="ticket-summary__title">${esc(e.title)}</p>
              <p class="t-button">${esc(e.fullDate)}</p>
              <p class="t-body text-secondary">${esc(e.venue)}</p>
            </div>
          </div>

          <div class="stack stack-3">
            <div class="ticket-option">
              <div class="ticket-option__head">
                <div>
                  <p class="ticket-option__name">${esc(selected.name)}</p>
                  <p class="ticket-option__price">${money(selected.price)}</p>
                </div>
                <div class="ticket-option__stepper">
                  <button type="button" data-action="qty-down" aria-label="Menos um ingresso">−</button>
                  <span class="ticket-option__qty">${qty}</span>
                  <button type="button" data-action="qty-up" aria-label="Mais um ingresso">+</button>
                </div>
              </div>
              <a class="btn btn--primary btn--block btn--lg" style="margin-top:var(--space-4)"
                 href="#/checkout/${esc(e.id)}">Comprar - ${money(selected.price * qty)}</a>
            </div>

            ${tickets.slice(1).map(t => `
              <a class="ticket-option" href="#/checkout/${esc(e.id)}">
                <div class="ticket-option__head">
                  <div>
                    <p class="ticket-option__name">${esc(t.name)}</p>
                    <p class="ticket-option__price">${money(t.price)}</p>
                  </div>
                  <span class="icon-btn" style="margin-left:auto">${icon('chevronRight')}</span>
                </div>
              </a>`).join('')}
          </div>

          <p class="t-micro text-secondary" style="text-align:center;max-width:44ch;margin:0 auto">
            Ao efetuar a compra, você declara ter lido, compreendido e concordado com os
            Termos e Condições aplicáveis.
          </p>
        </div>
      </div>`, { brand: false });
  }

  /* -------- Checkout (Figma: Eventos 4) -------- */
  function checkout(id, state) {
    const e = D.findEvent(id) || D.events[3];
    const t = (e.tickets || [])[0] || { name: 'Entrada Geral', price: 79.90, note: 'Os ingressos serão enviados por e-mail' };
    const qty = state.ticketQty;
    const money = n => `R$ ${n.toFixed(2).replace('.', ',')}`;

    return U.bareShell(`
      <div class="container checkout-shell">
        <div class="checkout-shell__bar">
          ${U.backButton(`#/ingresso/${esc(e.id)}`)}
          <div class="checkout-shell__steps">
            <span>Ingresso</span>${icon('arrowRight')}<span class="is-active">Checkout</span>
          </div>
          <a class="icon-btn checkout-shell__close" href="#/eventos" aria-label="Fechar">${icon('x')}</a>
        </div>

        <div class="checkout-grid">
          <div class="stack stack-6">
            <div class="ticket-summary">
              <div class="ticket-summary__thumb">${U.media({ art: e.art })}</div>
              <div>
                <p class="ticket-summary__title">${esc(e.title)}</p>
                <p class="t-button">${esc(e.fullDate)}</p>
                <p class="t-body text-secondary">${esc(e.venue)}</p>
              </div>
            </div>

            <div class="stack stack-3">
              <p class="t-button">Finalizar pedido</p>
              <hr class="divider">
              <div class="checkout-line">
                <span class="checkout-line__qty">${qty}x</span>
                <span style="flex:1">
                  <span class="t-item" style="display:block">${esc(t.name)}</span>
                  <span class="t-meta text-secondary">${esc(t.note)}</span>
                </span>
                <span class="t-item">${money(t.price * qty)}</span>
              </div>
              <hr class="divider">
              <div>
                <p class="t-button">Total</p>
                <p class="checkout-total">${money(t.price * qty)}</p>
              </div>
            </div>
          </div>

          <div class="pay-card">
            <button class="pay-method" type="button" data-action="pay-method" data-method="pix">
              <span>Pagar com PIX</span>
              <span class="radio ${state.payMethod === 'pix' ? 'is-checked' : ''}"></span>
            </button>

            <button class="pay-method" type="button" data-action="pay-method" data-method="card">
              <span>Pagar com cartão</span>
              <span class="radio ${state.payMethod === 'card' ? 'is-checked' : ''}"></span>
            </button>

            ${state.payMethod === 'card' ? `
              <div class="pay-fields">
                <div class="pay-field">
                  <span class="pay-field__brand"></span>
                  <input type="text" inputmode="numeric" placeholder="Número do cartão" aria-label="Número do cartão">
                </div>
                <div class="pay-field">
                  <input type="text" placeholder="MM / AA" aria-label="Validade" style="max-width:96px">
                  <input type="text" placeholder="CVC" aria-label="CVC">
                </div>
                <div class="pay-field">
                  <input type="text" inputmode="numeric" placeholder="CEP" aria-label="CEP">
                </div>
              </div>` : `
              <div class="pay-fields">
                <p class="t-meta text-secondary">O código PIX será gerado na próxima etapa e expira em 5 minutos.</p>
              </div>`}

            <div class="pay-fields" style="padding-top:0">
              <button class="btn btn--primary btn--block btn--lg" type="button" data-action="pay">Pagar agora</button>
              <p class="t-meta text-secondary" style="text-align:center;margin-top:var(--space-3)">
                Ingressos serão reservados por <strong>5:00 minutos</strong>
              </p>
            </div>
          </div>
        </div>
      </div>`, { brand: false });
  }

  /* ============================ PESQUISA ================================ */

  const pesquisa = () => U.shell(`
    <div class="container">
      <div class="pesquisa__search">
        ${U.searchInput({ placeholder: 'Descobrir eventos, pessoas, e organizadores' })}
      </div>

      <div class="container--narrow" style="margin:0 auto;padding:0">
        <section>
          <h2 class="t-section pesquisa__section-title">Baseado em seus interesses</h2>
          <div class="pesquisa__list">
            ${D.events.slice(0, 3).map(e => U.eventRow(e)).join('')}
          </div>
        </section>

        <section class="section-gap">
          <h2 class="t-section pesquisa__section-title">Pesquisas recentes</h2>
          <div class="pesquisa__list">
            ${D.recentSearches.map((r, i) => `
              <div class="recent-row">
                ${U.avatar({ name: r.handle.slice(1), art: ['portrait', 'masp', 'party'][i % 3], size: 'lg' })}
                <div style="flex:1;min-width:0">
                  <p class="recent-row__handle">${esc(r.handle)}</p>
                  <p class="t-meta text-secondary">${esc(r.kind)}</p>
                </div>
                <button class="btn btn--quiet btn--sm" type="button" data-action="toggle-follow">
                  ${r.following ? 'seguindo' : 'seguir'}
                </button>
                <button class="icon-btn" type="button" data-action="dismiss-recent" aria-label="Remover">${icon('x')}</button>
              </div>`).join('')}
          </div>
        </section>
      </div>
    </div>`, { active: 'search', title: 'Pesquisar' });

  /* ========================== NOTIFICACOES ============================== */

  function notifTrailing(n) {
    switch (n.actionType) {
      case 'thumb':     return `<span class="list-row__thumb">${U.thumb({ art: n.art })}</span>`;
      case 'following': return '<button class="btn btn--quiet btn--sm" type="button" data-action="toggle-follow">seguindo</button>';
      case 'allow':     return '<button class="btn btn--primary btn--sm" type="button" data-action="allow-follow">permitir</button>';
      case 'tag':       return U.tag(n.tag);
      default:          return '';
    }
  }

  function notificacoes() {
    const groups = [...new Set(D.notifications.map(n => n.grouping))];
    return U.shell(`
      <div class="container container--narrow">
        <div class="notifs">
          ${groups.map(g => `
            <section class="notifs__group">
              <h2 class="t-button notifs__group-title">${esc(g)}</h2>
              ${D.notifications.filter(n => n.grouping === g).map(n => `
                <div class="notif-row">
                  ${U.avatar({ name: n.actor, size: 'sm' })}
                  <p class="notif-row__text">
                    <strong>${esc(n.actor)}</strong> ${esc(n.action)}
                    ${n.actionType === 'tag' ? '' : `<span class="notif-row__time">• ${esc(n.timestamp)}</span>`}
                  </p>
                  ${notifTrailing(n)}
                  ${n.actionType === 'tag' ? `<span class="notif-row__time">• ${esc(n.timestamp)}</span>` : ''}
                </div>`).join('')}
            </section>`).join('')}
        </div>
      </div>`, { active: 'notifs', title: 'Notificações' });
  }

  /* ============================== CHAT ================================== */

  function chat(activeId) {
    const active = activeId ? D.findChat(activeId) : null;

    const list = D.chats.map(c => `
      <a class="chat-row ${c.id === activeId ? 'is-active' : ''} ${c.unread ? 'is-unread' : ''}"
         href="#/chat/${esc(c.id)}">
        ${U.avatar({ name: c.name, size: 'lg' })}
        <span style="flex:1;min-width:0">
          <span class="chat-row__name" style="display:block">${esc(c.name)}</span>
          <span class="chat-row__preview">${esc(c.preview)} <span class="text-secondary">• ${esc(c.timestamp)}</span></span>
        </span>
        ${c.unread ? '<span class="chat-row__dot"></span>' : ''}
      </a>`).join('');

    const pane = active ? `
      <div class="chat__pane-head">
        ${U.avatar({ name: active.name, size: 'lg' })}
        <span class="t-section">${esc(active.name)}</span>
      </div>
      <div class="chat__canvas">
        ${active.messages.map(m => {
          if (m.kind === 'event') {
            const e = D.findEvent(m.eventId);
            return `<div class="bubble bubble--card ${m.from === 'me' ? 'bubble--out' : ''}">
              ${U.eventCard({ ...e, saved: false })}</div>`;
          }
          return `<div class="bubble ${m.from === 'me' ? 'bubble--out' : ''}">${esc(m.body)}</div>`;
        }).join('')}
      </div>
      <form class="chat__composer" data-action="send-message">
        ${U.searchInput({ placeholder: 'Mensagem' })}
        <button class="btn btn--primary" type="submit">Enviar</button>
      </form>` : `
      <div class="empty"><p class="empty__title">Selecione um chat para visualizá-lo</p></div>`;

    return U.shell(`
      <div class="chat" data-view="${activeId ? 'pane' : 'list'}">
        <div class="chat__list">${list}</div>
        <div class="chat__pane">${pane}</div>
      </div>`, {
      active: 'chat',
      title: active ? active.name : 'Mensagens',
      back: !!activeId,
      flush: true
    });
  }

  /* ============================= PERFIL ================================= */

  function profileHeader(p, { own = true } = {}) {
    return `
      <div class="profile-card">
        ${U.avatar({ name: p.name, art: p.art, size: 'xl', className: 'avatar--photo' })}
        <div class="profile-card__body">
          <div class="profile-card__ident">
            ${icon('sparkle', { fill: true })}
            <span class="profile-card__handle">${esc(p.username || p.handle)}</span>
            <span class="profile-card__stats">
              <strong>${p.followers}</strong> seguidores <span aria-hidden="true">|</span>
              <strong>${p.following}</strong> seguindo
            </span>
            ${own
              ? '<a class="btn btn--primary btn--sm" href="#/editar-perfil">Editar</a>'
              : '<button class="btn btn--primary btn--sm" type="button" data-action="toggle-follow">Seguir</button>'}
          </div>
          ${U.tagRow(p.interests || [])}
          <div>
            <p class="profile-card__name">${esc(p.name)}</p>
            <p class="profile-card__bio">${esc(p.bio || p.description || '')}</p>
          </div>
        </div>
      </div>`;
  }

  function profileTabs(active) {
    const tabs = [
      { key: 'posts',   label: 'Posts',        href: '#/perfil' },
      { key: 'tagged',  label: 'Marcado',      href: '#/perfil-marcado' },
      { key: 'events',  label: 'Meus Eventos', href: '#/perfil-meus-eventos', icon: 'bookmark' }
    ];
    return `<nav class="tabs profile__tabs">${tabs.map(t => `
      <a class="tabs__item ${t.key === active ? 'is-active' : ''}" href="${t.href}">
        ${t.icon ? icon(t.icon) : ''}${t.label}
      </a>`).join('')}</nav>`;
  }

  const tileGrid = (items, { events = false } = {}) => `
    <div class="profile-grid ${events ? 'profile-grid--events' : ''}">
      ${items.map(i => `
        <a class="profile-grid__tile" href="#/evento/${esc(i.eventId || 'e1')}">
          ${U.media({ art: i.art, label: events ? '' : i.title })}
          ${events ? `
            <span class="profile-grid__caption">
              <span class="profile-grid__caption-title">${esc(i.title)}</span>
              <span class="profile-grid__caption-meta">${esc(i.date)}</span>
            </span>` : ''}
        </a>`).join('')}
    </div>`;

  const perfil = () => U.shell(`
    <div class="container">
      ${profileHeader(D.currentUser, { own: true })}
      ${profileTabs('posts')}
      ${tileGrid(D.profilePosts)}
    </div>`, { active: 'profile', title: 'Perfil', organizer: D.currentUser.isOrganizer });

  const perfilMarcado = () => U.shell(`
    <div class="container">
      ${profileHeader(D.currentUser, { own: true })}
      ${profileTabs('tagged')}
      ${tileGrid(D.taggedPosts)}
    </div>`, { active: 'profile', title: 'Marcado', organizer: D.currentUser.isOrganizer });

  const perfilMeusEventos = () => U.shell(`
    <div class="container">
      ${profileHeader(D.currentUser, { own: true })}
      ${profileTabs('events')}
      ${tileGrid(D.events.filter(e => e.saved).map(e => ({ art: e.art, title: e.title, date: e.date, eventId: e.id })), { events: true })}
      ${D.events.some(e => e.saved) ? '' : '<div class="empty"><p class="empty__title">Você ainda não salvou eventos</p></div>'}
    </div>`, { active: 'profile', title: 'Meus eventos', organizer: D.currentUser.isOrganizer });

  /* Third-party profile — same header, "Seguir" instead of "Editar". */
  function perfilPessoa(username) {
    const person = D.people.find(p => p.username === username) || D.people[0];
    const view = {
      ...person,
      username: person.username,
      followers: 214, following: 180,
      bio: 'Vou em tudo que tem música ao vivo.',
      interests: ['Festas', 'Música', 'Comida'],
      art: 'portrait'
    };
    return U.shell(`
      <div class="container">
        <div style="margin-bottom:var(--space-6)">${U.backButton('#/home')}</div>
        ${profileHeader(view, { own: false })}
        <div style="margin-top:var(--space-8)">${tileGrid(D.taggedPosts.slice(0, 3))}</div>
      </div>`, { active: 'home', title: person.name, back: true });
  }

  /* Organizer profile — "Próximos Eventos / Meus Eventos" instead of Posts. */
  function perfilOrganizador(handle) {
    const org = D.findOrganizer(handle) || D.organizers[0];
    const list = D.events.filter(e => e.organizer === org.handle);
    const shown = list.length ? list : D.events.slice(0, 4);
    return U.shell(`
      <div class="container">
        <div style="margin-bottom:var(--space-6)">${U.backButton('#/eventos')}</div>
        ${profileHeader({ ...org, username: org.handle, bio: org.description }, { own: false })}

        <nav class="tabs profile__tabs">
          <span class="tabs__item is-active">Próximos Eventos</span>
          <span class="tabs__item">${icon('bookmark')}Meus Eventos</span>
        </nav>

        ${tileGrid(shown.map(e => ({ art: e.art, title: e.title, date: e.date, eventId: e.id })), { events: true })}
      </div>`, { active: 'search', title: org.name, back: true });
  }

  /* ========================== EDITAR PERFIL ============================= */

  const editarPerfil = (state) => U.shell(`
    <div class="container">
      <div class="form-page">
        ${U.backButton('#/perfil')}
        <h1 class="t-section form-page__title">Editar Perfil</h1>

        <div class="form-section">
          <span class="form-section__label">Trocar foto de perfil</span>
          <div class="panel photo-panel">
            ${U.avatar({ name: D.currentUser.name, art: 'portrait', size: 'lg', className: 'avatar--photo' })}
            <button class="btn btn--primary" type="button">Trocar foto</button>
          </div>
        </div>

        <div class="form-section">
          <span class="form-section__label">Nome de perfil</span>
          <div class="panel"><input class="input" type="text" value="${esc(D.currentUser.name)}" aria-label="Nome de perfil"></div>
        </div>

        <div class="form-section">
          <span class="form-section__label">Bio</span>
          <div class="panel counted">
            <textarea class="textarea" maxlength="100" placeholder="escreva algo..."
                      aria-label="Bio" data-counter="bio-count"></textarea>
            <span class="counted__count"><span id="bio-count">0</span>/100</span>
          </div>
        </div>

        <div class="form-section">
          <span class="form-section__label">Interesses</span>
          <div class="chip-input">
            <div class="tag-row">
              ${state.profileInterests.map(i => `
                <button class="tag" type="button" data-action="remove-interest" data-tag="${esc(i)}">
                  ${esc(i)}<span class="tag__remove">${icon('x')}</span>
                </button>`).join('')}
            </div>
            <input class="input" type="text" placeholder="Adicione até 5 interesses" aria-label="Adicionar interesse">
            <div>
              <p class="chip-input__suggest-label">Interesses Sugeridos</p>
              <div class="tag-row" style="margin-top:var(--space-2)">
                ${D.suggestedInterests.map(i => U.tag(i, { selectable: true, action: 'add-interest' })).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="row" style="margin-top:var(--space-8);justify-content:flex-end;gap:var(--space-3)">
          <a class="btn btn--secondary" href="#/perfil">Cancelar</a>
          <a class="btn btn--primary" href="#/perfil" data-action="save-profile">Salvar alterações</a>
        </div>
      </div>
    </div>`, { active: 'profile', title: 'Editar perfil', back: true, organizer: D.currentUser.isOrganizer });

  /* ========================= REGISTRAR EVENTOS ========================== */

  function calendar(state) {
    const dows = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    return `
      <div class="calendar">
        <div class="calendar__head">
          <button class="calendar__nav" type="button" aria-label="Mês anterior">${icon('arrowLeft')}</button>
          <span class="calendar__month">Mar. 2026</span>
          <button class="calendar__nav" type="button" aria-label="Próximo mês">${icon('arrowRight')}</button>
        </div>
        <div class="calendar__grid">
          ${dows.map(d => `<span class="calendar__dow">${d}</span>`).join('')}
          ${days.map(d => `
            <button class="calendar__day ${d === 1 ? 'is-muted' : ''} ${d === state.eventDay ? 'is-selected' : ''}"
                    type="button" data-action="pick-day" data-day="${d}">${d}</button>`).join('')}
          <span class="calendar__summary">Sáb., 3/${state.eventDay}, 10:00-14:00</span>
        </div>
      </div>`;
  }

  const criarEvento = (state) => U.shell(`
    <div class="container">
      <div class="form-page">
        ${U.backButton('#/gerenciador')}
        <h1 class="t-section form-page__title">Criar Evento</h1>

        <div class="form-section">
          <span class="form-section__label">Organizador</span>
          <div class="row" style="gap:var(--space-2)">
            <div class="input row" style="gap:var(--space-2)">
              <span class="text-placeholder">@</span>
              <span>Track_Field</span>
            </div>
          </div>
        </div>

        <div class="form-section">
          <span class="form-section__label">Nome do evento</span>
          <div class="counted">
            <input class="input" type="text" maxlength="50" value="Corrida 10K no Ibirapuera"
                   aria-label="Nome do evento" data-counter="name-count">
            <span class="counted__count" style="bottom:11px"><span id="name-count">24</span>/50</span>
          </div>
        </div>

        <div class="form-section">
          <span class="form-section__label">Selecionar imagem de cartaz</span>
          <div class="picker">
            <span class="picker__glyph">${icon('image', { width: 1.5 })}</span>
            <button class="btn btn--primary" type="button">Escolher foto ${icon('upload')}</button>
          </div>
        </div>

        <div class="form-section">
          <span class="form-section__label">Link de venda de ingressos</span>
          <input class="input" type="url" placeholder="https://" aria-label="Link de venda de ingressos">
        </div>

        <div class="form-section">
          <span class="form-section__label">Data e horário</span>
          <div class="calendar-panel">
            ${calendar(state)}
            <div class="calendar-side">
              <label class="calendar-side__field">
                <span>
                  <span class="calendar-side__label">Início</span>
                  <span class="calendar-side__value">10:00</span>
                </span>
                ${icon('chevronDown')}
              </label>
              <label class="calendar-side__field">
                <span>
                  <span class="calendar-side__label">Duração</span>
                  <span class="calendar-side__value">4:00</span>
                </span>
                ${icon('chevronDown')}
              </label>
            </div>
          </div>
        </div>

        <div class="form-section">
          <span class="form-section__label">Local</span>
          <div class="field-group">
            <div class="stacked-input">
              <label for="ev-addr">Endereço</label>
              <input id="ev-addr" type="text" placeholder="Ex: Av. Pedro Álvares Cabral, 1000">
            </div>
            <div class="stacked-input">
              <label for="ev-comp">Complemento (opcional)</label>
              <input id="ev-comp" type="text" placeholder="Ex: Apt. 101A">
            </div>
            <div class="field-group__row field-group__row--3">
              <div class="stacked-input">
                <label for="ev-city">Cidade</label>
                <input id="ev-city" type="text" placeholder="Ex: Sao Paulo">
              </div>
              <div class="stacked-input">
                <label for="ev-uf">Estado</label>
                <select id="ev-uf"><option>SP</option><option>RJ</option><option>MG</option><option>PR</option></select>
              </div>
              <div class="stacked-input">
                <label for="ev-cep">CEP</label>
                <input id="ev-cep" type="text" placeholder="Ex: 12345-678">
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <span class="form-section__label">Ingressos</span>
          <div class="field-group">
            <div class="field-group__row field-group__row--2">
              <div class="stacked-input">
                <label for="tk-name">Nome</label>
                <input id="tk-name" type="text" placeholder="Ex: Entrada Nível 1">
              </div>
              <div class="stacked-input">
                <label for="tk-price">Valor unitário</label>
                <input id="tk-price" type="text" placeholder="R$ 1,00">
              </div>
            </div>
            <div class="stacked-input">
              <label for="tk-desc">Descrição</label>
              <input id="tk-desc" type="text" placeholder="Ex: Acesso geral. Não inclui itens adicionais.">
            </div>
          </div>
          <button class="btn btn--primary" type="button" style="align-self:flex-start">Adicionar ingresso +</button>
        </div>

        <div class="form-section">
          <span class="form-section__label">Descrição do evento</span>
          <div class="counted">
            <textarea class="textarea" maxlength="500" placeholder="escreva algo..."
                      aria-label="Descrição do evento" data-counter="desc-count"></textarea>
            <span class="counted__count"><span id="desc-count">0</span>/500</span>
          </div>
        </div>

        <div class="form-section">
          <span class="form-section__label">Tags</span>
          <div class="chip-input">
            <div class="tag-row">
              ${state.eventTags.map(t => `
                <button class="tag" type="button" data-action="remove-event-tag" data-tag="${esc(t)}">
                  ${esc(t)}<span class="tag__remove">${icon('x')}</span>
                </button>`).join('')}
            </div>
            <input class="input" type="text" placeholder="Adicione até 5 interesses" aria-label="Adicionar tag">
          </div>
        </div>

        <a class="btn btn--primary btn--block btn--lg" style="margin-top:var(--space-8)"
           href="#/gerenciador" data-action="create-event">Criar evento</a>
      </div>
    </div>`, { active: 'manager', title: 'Criar evento', back: true, organizer: true });

  /* ======================= GERENCIADOR DE EVENTOS ======================= */

  function statusClass(status) {
    if (status === 'Encerrado') return 'status status--past';
    if (status === 'Rascunho')  return 'status status--live';
    return 'status';
  }

  /* -------- Filters (no Figma frame — spreadsheet-style panel) --------
     Filters apply live to the table. The same panel renders in two hosts:
     an anchored flyout under the "Filtros" button on desktop (Prominent
     shadow, per the guidelines' dropdown spec) and a bottom-sheet modal on
     mobile, reusing the overlay system like Criar Post. */

  function managerFilterInfo(state) {
    const f = state.managerFilters;
    const parse = s => { const [dd, mm, yy] = s.split('/').map(Number); return new Date(yy, mm - 1, dd); };
    const rows = D.managedEvents.filter(e => {
      if (f.status.length && !f.status.includes(e.status)) return false;
      if (f.organizers.length && !f.organizers.includes(e.organizer)) return false;
      if (f.tags.length && !e.tags.some(t => f.tags.includes(t))) return false;
      if (f.from && parse(e.date) < new Date(`${f.from}T00:00:00`)) return false;
      if (f.to && parse(e.date) > new Date(`${f.to}T23:59:59`)) return false;
      return true;
    });
    const active = f.status.length + f.organizers.length + f.tags.length +
                   (f.from ? 1 : 0) + (f.to ? 1 : 0);
    return { rows, active };
  }

  function filterPanel(state, { head = false } = {}) {
    const f = state.managerFilters;
    const all = D.managedEvents;
    const countBy = fn => all.reduce((m, e) => { const k = fn(e); m[k] = (m[k] || 0) + 1; return m; }, {});
    const statusCounts = countBy(e => e.status);
    const orgCounts = countBy(e => e.organizer);
    const allTags = [...new Set(all.flatMap(e => e.tags))];

    const checkRow = (action, value, label, count) => `
      <button class="checkbox filter-check ${f[action === 'mf-status' ? 'status' : 'organizers'].includes(value) ? 'is-checked' : ''}"
              type="button" data-action="${action}" data-value="${esc(value)}">
        <span class="checkbox__box">${icon('check', { width: 2.4 })}</span>
        <span class="filter-check__label">${label}</span>
        <span class="filter-check__count">${count}</span>
      </button>`;

    return `
      <div class="filter-panel">
        ${head ? `
          <div class="filter-panel__head">
            <span class="t-small-label">Filtros</span>
            ${managerFilterInfo(state).active
              ? '<button class="filter-panel__clear" type="button" data-action="mf-clear">Limpar</button>' : ''}
          </div>` : ''}

        <div class="filter-section">
          <span class="filter-section__label">Status</span>
          ${Object.keys(statusCounts).map(s =>
            checkRow('mf-status', s, `<span class="${statusClass(s)}">${esc(s)}</span>`, statusCounts[s])).join('')}
        </div>

        <div class="filter-section">
          <span class="filter-section__label">Organizador</span>
          ${Object.keys(orgCounts).map(o =>
            checkRow('mf-organizer', o, esc(o), orgCounts[o])).join('')}
        </div>

        <div class="filter-section">
          <span class="filter-section__label">Período</span>
          <div class="filter-dates">
            <label class="stacked-input">
              <span class="stacked-input__label">De</span>
              <input type="date" data-filter-date="from" value="${esc(f.from)}" aria-label="Data inicial">
            </label>
            <label class="stacked-input">
              <span class="stacked-input__label">Até</span>
              <input type="date" data-filter-date="to" value="${esc(f.to)}" aria-label="Data final">
            </label>
          </div>
        </div>

        <div class="filter-section">
          <span class="filter-section__label">Tags</span>
          <div class="tag-row">
            ${allTags.map(t => U.tag(t, { selectable: true, selected: f.tags.includes(t), action: 'mf-tag' })).join('')}
          </div>
        </div>
      </div>`;
  }

  const filtrosOverlay = (state) => {
    const info = managerFilterInfo(state);
    return `
      <div class="overlay" data-overlay="filtros">
        <div class="modal modal--filters" role="dialog" aria-label="Filtros">
          <div class="modal__head">
            <span class="modal__title">Filtros</span>
            <span class="spacer"></span>
            <button class="icon-btn" type="button" data-action="close-overlay" aria-label="Fechar">${icon('x')}</button>
          </div>
          <div class="modal__body">${filterPanel(state)}</div>
          <div class="modal__foot row">
            <button class="btn btn--secondary" type="button" data-action="mf-clear">Limpar</button>
            <button class="btn btn--primary" type="button" data-action="close-overlay" style="flex:1">
              Ver ${info.rows.length} evento${info.rows.length === 1 ? '' : 's'}
            </button>
          </div>
        </div>
      </div>`;
  };

  const gerenciador = (state) => {
    const info = managerFilterInfo(state);
    return U.shell(`
    <div class="container">
      <header style="margin-bottom:var(--space-6)">
        <h1 class="t-section">Eventos</h1>
        <p class="t-body manager__count">${
          info.active
            ? `${info.rows.length} de ${D.managedEvents.length} eventos`
            : `${D.managedEvents.length} eventos cadastrados`
        }</p>
      </header>

      <div class="manager__head">
        ${U.searchInput({ placeholder: 'Buscar evento', square: true })}
        <div class="filter-anchor">
          <button class="btn btn--secondary" type="button" data-action="toggle-filters">
            Filtros ${icon('filters')}
            ${info.active ? `<span class="filter-count">${info.active}</span>` : ''}
          </button>
          ${state.filterOpen ? `<div class="filter-pop">${filterPanel(state, { head: true })}</div>` : ''}
        </div>
        <a class="btn btn--primary" href="#/criar-evento" style="margin-left:auto">+ Criar evento</a>
      </div>

      <div class="manager__table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th style="width:44px"><span class="table__check ${state.allRowsChecked ? 'is-checked' : ''}"
                    data-action="toggle-all-rows">${icon('check', { width: 2.4 })}</span></th>
              <th>Evento</th><th>Organizador</th><th>Data</th><th>Status</th><th>Tags</th><th></th>
            </tr>
          </thead>
          <tbody>
            ${info.rows.map((e, i) => `
              <tr>
                <td><span class="table__check ${state.checkedRows.includes(i) || state.allRowsChecked ? 'is-checked' : ''}"
                          data-action="toggle-row" data-row="${i}">${icon('check', { width: 2.4 })}</span></td>
                <td class="table__event">${esc(e.title)}</td>
                <td>${esc(e.organizer)}</td>
                <td>${esc(e.date)}</td>
                <td><span class="${statusClass(e.status)}">${esc(e.status)}</span></td>
                <td>${U.tagRow(e.tags)}</td>
                <td><a class="btn btn--ghost btn--sm" href="#/criar-evento">Editar</a></td>
              </tr>`).join('')}
          </tbody>
        </table>
        ${info.rows.length ? '' : `
          <div class="empty" style="min-height:160px">
            <div>
              <p class="t-subsection text-secondary">Nenhum evento com esses filtros</p>
              <p style="margin-top:var(--space-3)">
                <button class="link" type="button" data-action="mf-clear">Limpar filtros</button>
              </p>
            </div>
          </div>`}
      </div>
    </div>`, { active: 'manager', title: 'Gerenciador', organizer: true });
  };

  /* ============================ OVERLAYS ================================ */

  function criarPostOverlay(state) {
    const step = state.createPostStep;
    return `
      <div class="overlay" data-overlay="criar-post">
        <div class="modal ${step === 2 ? 'modal--wide' : ''}" role="dialog" aria-label="Criar Post">
          <div class="modal__head">
            <button class="icon-btn" type="button" data-action="${step === 2 ? 'post-step-1' : 'close-overlay'}"
                    aria-label="Voltar">${icon('arrowLeft')}</button>
            <span class="spacer"></span>
            <span class="modal__title">Criar Post</span>
          </div>

          ${step === 1 ? `
            <div class="modal__body">
              <div class="picker" style="min-height:260px">
                <span class="picker__glyph">${icon('image', { width: 1.5 })}</span>
                <button class="btn btn--primary" type="button" data-action="post-step-2">
                  Escolher foto ${icon('upload')}
                </button>
              </div>
            </div>` : `
            <div class="modal__body modal__body--flush" style="display:grid;grid-template-columns:minmax(0,1fr) 240px">
              <div>${U.media({ art: 'party', label: 'Serta Mix', shape: 'free', className: 'media--square' })}</div>
              <div class="stack stack-3" style="padding:var(--space-4);border-left:1px solid var(--border-subtle)">
                <input class="input" type="text" placeholder="Evento" aria-label="Evento"
                       style="border:0;padding:0;height:auto">
                <hr class="divider">
                <div class="row row--between">
                  ${U.rating(state.newPostRating, 5, { input: true })}
                  <span class="t-meta text-secondary">Avaliar</span>
                </div>
                <hr class="divider">
                <div class="counted" style="flex:1">
                  <textarea class="textarea" maxlength="500" placeholder="escreva algo..."
                            style="border:0;padding:0;min-height:120px" data-counter="post-count"
                            aria-label="Legenda"></textarea>
                  <span class="counted__count" style="right:0;bottom:0"><span id="post-count">0</span>/500</span>
                </div>
                <hr class="divider">
                <input class="input" type="text" placeholder="Marcar pessoas..." aria-label="Marcar pessoas"
                       style="border:0;padding:0;height:auto">
                <button class="btn btn--block ${state.newPostRating ? 'btn--primary' : ''}"
                        type="button" ${state.newPostRating ? '' : 'aria-disabled="true"'}
                        data-action="share-post">Compartilhar</button>
              </div>
            </div>`}
        </div>
      </div>`;
  }

  const sendOverlay = (state) => `
    <div class="overlay" data-overlay="send">
      <div class="modal modal--sheet" role="dialog" aria-label="Enviar para">
        <div class="modal__head">
          <span class="modal__title">Enviar para</span>
          <span class="spacer"></span>
          <button class="icon-btn" type="button" data-action="close-overlay" aria-label="Fechar">${icon('x')}</button>
        </div>
        <div class="modal__body stack stack-4">
          ${U.searchInput({ placeholder: 'Pesquisar' })}
          ${D.people.slice(0, 4).map((p, i) => `
            <button class="list-row" type="button" data-action="toggle-recipient" data-recipient="${i}"
                    style="width:100%;text-align:left">
              ${U.avatar({ name: p.name, size: 'lg' })}
              <span class="list-row__body t-subsection">${esc(p.name)}</span>
              <span class="radio ${state.recipients.includes(i) ? 'is-checked' : ''}"></span>
            </button>`).join('')}
        </div>
        <div class="modal__foot">
          <button class="btn btn--block btn--lg ${state.recipients.length ? 'btn--primary' : ''}"
                  type="button" ${state.recipients.length ? '' : 'aria-disabled="true"'}
                  data-action="send-post">Enviar separadamente</button>
        </div>
      </div>
    </div>`;

  const searchOverlay = () => `
    <div class="overlay" data-overlay="search">
      <div class="modal modal--sheet" role="dialog" aria-label="Pesquisar">
        <div class="modal__head">
          <span class="t-subsection">Pesquisar</span>
          <span class="spacer"></span>
          <button class="icon-btn" type="button" data-action="close-overlay" aria-label="Fechar">${icon('x')}</button>
        </div>
        <div class="modal__body stack stack-4">
          ${U.searchInput({ placeholder: 'Pesquisar' })}
          <p class="t-item">Recentes</p>
          ${D.people.slice(0, 3).map((p, i) => `
            <div class="list-row">
              ${U.avatar({ name: p.name, art: ['portrait', 'party', 'gallery'][i], size: 'lg' })}
              <div class="list-row__body">
                <p class="t-subsection">${esc(p.name)}</p>
                <p class="t-body text-secondary">${esc(p.handle)}</p>
              </div>
              <button class="icon-btn" type="button" data-action="dismiss-recent" aria-label="Remover">${icon('x')}</button>
            </div>`).join('')}
        </div>
      </div>
    </div>`;

  /* Comments modal — no Figma frame exists (the action is disabled in the
     file), so this is derived from the Criar Post modal (524:506) plus the
     standard social pattern: media left / caption + comments + composer
     right on desktop, bottom sheet with comments only on mobile. */
  function comentariosOverlay(state) {
    const p = D.posts.find(x => x.id === state.commentPostId) || D.posts[0];
    const comments = p.comments || [];

    const row = c => `
      <div class="comment">
        ${U.avatar({ name: c.username, size: 'sm' })}
        <div class="comment__body">
          <p class="comment__text"><strong>${esc(c.username)}</strong> ${esc(c.text)}</p>
          <div class="comment__meta">
            <span>${esc(c.timestamp)}</span>
            ${c.likes ? `<span>${c.likes} curtida${c.likes > 1 ? 's' : ''}</span>` : ''}
            <button type="button" data-action="reply-comment" data-user="${esc(c.username)}">Responder</button>
          </div>
        </div>
        <button class="icon-btn comment__like" type="button" data-action="like-comment"
                aria-label="Curtir comentário">${icon('heart')}</button>
      </div>`;

    return `
      <div class="overlay" data-overlay="comentarios">
        <div class="modal modal--comments" role="dialog" aria-label="Comentários">
          <div class="modal__head">
            <span class="modal__title">Comentários</span>
            <span class="spacer"></span>
            <button class="icon-btn" type="button" data-action="close-overlay" aria-label="Fechar">${icon('x')}</button>
          </div>
          <div class="modal__body modal__body--flush comments-grid">
            <div class="comments-media">${U.media({ art: p.art, label: p.eventName, shape: 'free' })}</div>
            <div class="comments-pane">
              <div class="comments-list">
                <div class="comment">
                  ${U.avatar({ name: p.username, art: p.art, size: 'sm' })}
                  <div class="comment__body">
                    <p class="comment__text"><strong>${esc(p.username)}</strong> ${esc(p.description)}</p>
                    <div class="comment__meta"><span>${esc(p.eventDate)}</span></div>
                  </div>
                </div>
                <hr class="divider">
                ${comments.map(row).join('')}
              </div>
              <form class="comments-composer" data-action="add-comment">
                ${U.avatar({ name: D.currentUser.name, art: 'portrait', size: 'xs' })}
                <textarea rows="1" placeholder="Adicione um comentário..."
                          aria-label="Adicione um comentário" enterkeyhint="send"></textarea>
                <button type="submit">Publicar</button>
              </form>
            </div>
          </div>
        </div>
      </div>`;
  }

  /* Interests search modal — opened by "ver mais" on Eventos. No Figma
     frame; follows the standard topic-picker pattern (search on top,
     suggested chips before any query). Suggestions are a random sample per
     open, standing in for personalization. */
  const normalize = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  function interestResults(state) {
    const selected = state.activeFilters;
    const chip = t => U.tag(t, { selectable: true, selected: selected.includes(t), action: 'toggle-filter' });
    const q = state.interestQuery.trim();

    if (q) {
      const matches = allInterests().filter(t => normalize(t).includes(normalize(q)));
      return matches.length ? `
        <div class="interest-group">
          <span class="interest-group__label">Resultados</span>
          <div class="tag-row">${matches.map(chip).join('')}</div>
        </div>` : `
        <p class="interests-empty">Nenhum interesse encontrado para "${esc(q)}"</p>`;
    }

    const suggestions = state.interestSuggestions.filter(t => !selected.includes(t));
    return `
      ${selected.length ? `
        <div class="interest-group">
          <span class="interest-group__label">Selecionados</span>
          <div class="tag-row">${selected.map(chip).join('')}</div>
        </div>` : ''}
      <div class="interest-group">
        <span class="interest-group__label">Sugeridos</span>
        <div class="tag-row">${suggestions.map(chip).join('')}</div>
      </div>`;
  }

  function interessesOverlay(state) {
    // Lazy init covers the ?overlay=interesses deep link, which bypasses
    // the open-interests action. Stored in state so re-renders (each chip
    // toggle) never reshuffle under the user.
    if (!state.interestSuggestions.length) {
      state.interestSuggestions = [...allInterests()].sort(() => Math.random() - 0.5).slice(0, 10);
    }
    return `
      <div class="overlay" data-overlay="interesses">
        <div class="modal modal--interests" role="dialog" aria-label="Interesses">
          <div class="modal__head">
            <span class="modal__title">Interesses</span>
            <span class="spacer"></span>
            <button class="icon-btn" type="button" data-action="close-overlay" aria-label="Fechar">${icon('x')}</button>
          </div>
          <div class="modal__body">
            <div class="search interests-search">
              ${icon('search')}
              <input type="search" placeholder="Pesquisar interesses"
                     aria-label="Pesquisar interesses" value="${esc(state.interestQuery)}">
            </div>
            <div id="interest-results" class="interests-results">${interestResults(state)}</div>
          </div>
        </div>
      </div>`;
  }

  const postOverlay = () => `
    <div class="overlay" data-overlay="post">
      <div class="modal" style="max-width:420px" role="dialog" aria-label="Post">
        <div class="modal__body">${U.post(D.posts[0])}</div>
      </div>
    </div>`;

  /* ========================== SCREEN INDEX ==============================
     Not a Figma frame — a prototype aid so reviewers can reach every screen
     without hunting through the nav. */
  const INDEX = [
    { name: 'Onboarding 1 — Cadastre-se',   route: '#/onboarding/cadastro',        node: '67:884',  ref: 'figma' },
    { name: 'Onboarding 2 — preenchido',    route: '#/onboarding/cadastro-valido', node: '204:180', ref: 'figma' },
    { name: 'Onboarding 3 — carregando',    route: '#/onboarding/carregando',      node: '204:330', ref: 'figma' },
    { name: 'Onboarding 4 — interesses',    route: '#/onboarding/interesses',      node: '67:1110', ref: 'figma' },
    { name: 'Onboarding 5 — personalizando',route: '#/onboarding/personalizando',  node: '67:1265', ref: 'figma' },
    { name: 'Home (feed)',                  route: '#/home',                       node: '17:2 / 504:318 / 450:269', ref: 'figma' },
    { name: 'Eventos',                      route: '#/eventos',                    node: '63:147',  ref: 'figma' },
    { name: 'Evento — detalhe',             route: '#/evento/e4',                  node: '622:565', ref: 'figma' },
    { name: 'Ingresso',                     route: '#/ingresso/e4',                node: '660:841', ref: 'figma' },
    { name: 'Checkout',                     route: '#/checkout/e4',                node: '660:1185',ref: 'figma' },
    { name: 'Pesquisa',                     route: '#/pesquisa',                   node: '560:399 / 564:692', ref: 'figma' },
    { name: 'Notificações',                 route: '#/notificacoes',               node: '319:167', ref: 'figma' },
    { name: 'Chat — lista',                 route: '#/chat',                       node: '258:290', ref: 'figma' },
    { name: 'Chat — conversa',              route: '#/chat/c2',                    node: '265:128', ref: 'figma' },
    { name: 'Perfil',                       route: '#/perfil',                     node: '213:620', ref: 'figma' },
    { name: 'Perfil — Marcado',             route: '#/perfil-marcado',             node: '225:283 / 414:312', ref: 'figma' },
    { name: 'Perfil — Meus Eventos',        route: '#/perfil-meus-eventos',        node: '384:477', ref: 'figma' },
    { name: 'Perfil — organizador',         route: '#/perfil-organizador/masp_sp', node: '384:477', ref: 'figma' },
    { name: 'Perfil — outro usuário',       route: '#/perfil/eduardo_mautner',     node: '225:447', ref: 'derived' },
    { name: 'Editar Perfil',                route: '#/editar-perfil',              node: '738:639', ref: 'figma' },
    { name: 'Registrar Eventos',            route: '#/criar-evento',               node: '740:662', ref: 'figma' },
    { name: 'Gerenciador de Eventos',       route: '#/gerenciador',                node: '783:802', ref: 'figma' },
    { name: 'Criar Post (overlay)',         route: '#/home?overlay=criar-post',    node: '524:506 / 533:362', ref: 'figma' },
    { name: 'SendOverlay',                  route: '#/home?overlay=enviar',        node: '265:524, 268:154, 268:190', ref: 'figma' },
    { name: 'searchOverlay',                route: '#/home?overlay=pesquisar',     node: '416:263', ref: 'figma' },
    { name: 'PostOverlay',                  route: '#/home?overlay=post',          node: '632:683', ref: 'figma' },
    { name: 'Comentários (overlay)',        route: '#/home?overlay=comentarios',   node: '—',       ref: 'derived' },
    { name: 'Interesses (overlay)',         route: '#/eventos?overlay=interesses', node: '—',       ref: 'derived' }
  ];

  const telas = () => U.shell(`
    <div class="container">
      <header class="stack stack-2" style="margin-bottom:var(--space-8)">
        <h1 class="t-section">Todas as telas</h1>
        <p class="t-body text-secondary">
          ${INDEX.filter(i => i.ref === 'figma').length} com referência direta no Figma,
          ${INDEX.filter(i => i.ref !== 'figma').length} extrapolada do sistema de design.
        </p>
      </header>
      <div class="index-grid">
        ${INDEX.map(i => `
          <a class="index-card" href="${i.route}">
            <span class="index-card__badge ${i.ref === 'figma' ? '' : 'index-card__badge--derived'}">
              ${i.ref === 'figma' ? 'Figma' : 'Extrapolada'}
            </span>
            <span class="index-card__name">${esc(i.name)}</span>
            <span class="index-card__node">${esc(i.node)}</span>
          </a>`).join('')}
      </div>
    </div>`, { active: '', title: 'Telas' });

  return {
    onboardingSignup, onboardingSignupValid, onboardingLoading,
    onboardingInterests, onboardingPersonalizing,
    home, eventos, eventoDetalhe, ingresso, checkout,
    pesquisa, notificacoes, chat,
    perfil, perfilMarcado, perfilMeusEventos, perfilPessoa, perfilOrganizador,
    editarPerfil, criarEvento, gerenciador, telas,
    criarPostOverlay, sendOverlay, searchOverlay, postOverlay, comentariosOverlay,
    filtrosOverlay, interessesOverlay, interestResults,
    INDEX
  };
})();
