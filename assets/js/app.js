/* ==========================================================================
   Way2 — router, state and interaction layer

   No framework, no build step. Hash routing so the prototype works from
   file:// as well as from a static server.
   ========================================================================== */

(() => {
  const root = document.getElementById('app');
  const overlayHost = document.getElementById('overlay-host');
  const toastHost = document.getElementById('toast-host');
  const S = W2Screens;

  /* ------------------------------------------------------------- state */
  const state = {
    selectedInterests: ['Festas', 'Arte'],
    activeFilters: [],
    profileInterests: ['Filmes', 'Networking', 'Futebol'],
    eventTags: ['Filmes', 'Networking', 'Futebol'],
    eventDay: 20,
    ticketQty: 1,
    payMethod: 'card',
    recipients: [],
    createPostStep: 1,
    newPostRating: 0,
    commentPostId: null,
    checkedRows: [],
    allRowsChecked: false,
    overlay: null,
    liked: new Set()
  };

  /* ------------------------------------------------------------- theme */
  const store = {
    get(k, fallback) { try { return localStorage.getItem(k) ?? fallback; } catch { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* file:// with storage disabled */ } }
  };

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    store.set('w2-theme', theme);
    renderDevbar();
  }

  function initTheme() {
    const saved = store.get('w2-theme', null);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  }

  /* ------------------------------------------------------------ routing */
  function parseHash() {
    const raw = location.hash.replace(/^#/, '') || '/home';
    const [path, query] = raw.split('?');
    const params = new URLSearchParams(query || '');
    return { path, segments: path.split('/').filter(Boolean), params };
  }

  const ROUTES = [
    [/^\/?$/,                        () => S.home()],
    [/^\/home$/,                     () => S.home()],
    [/^\/onboarding\/cadastro$/,     () => S.onboardingSignup()],
    [/^\/onboarding\/cadastro-valido$/, () => S.onboardingSignupValid()],
    [/^\/onboarding\/carregando$/,   () => S.onboardingLoading()],
    [/^\/onboarding\/interesses$/,   () => S.onboardingInterests(state)],
    [/^\/onboarding\/personalizando$/, () => S.onboardingPersonalizing()],
    [/^\/eventos$/,                  () => S.eventos(state)],
    [/^\/evento\/([\w-]+)$/,         m  => S.eventoDetalhe(m[1])],
    [/^\/ingresso\/([\w-]+)$/,       m  => S.ingresso(m[1], state)],
    [/^\/checkout\/([\w-]+)$/,       m  => S.checkout(m[1], state)],
    [/^\/pesquisa$/,                 () => S.pesquisa()],
    [/^\/notificacoes$/,             () => S.notificacoes()],
    [/^\/chat$/,                     () => S.chat(null)],
    [/^\/chat\/([\w-]+)$/,           m  => S.chat(m[1])],
    [/^\/perfil$/,                   () => S.perfil()],
    [/^\/perfil-marcado$/,           () => S.perfilMarcado()],
    [/^\/perfil-meus-eventos$/,      () => S.perfilMeusEventos()],
    [/^\/perfil-organizador\/([\w-]+)$/, m => S.perfilOrganizador(m[1])],
    [/^\/perfil\/([\w-]+)$/,         m  => S.perfilPessoa(m[1])],
    [/^\/editar-perfil$/,            () => S.editarPerfil(state)],
    [/^\/criar-evento$/,             () => S.criarEvento(state)],
    [/^\/gerenciador$/,              () => S.gerenciador(state)],
    [/^\/telas$/,                    () => S.telas()]
  ];

  const OVERLAYS = {
    'criar-post':  () => S.criarPostOverlay(state),
    'enviar':      () => S.sendOverlay(state),
    'pesquisar':   () => S.searchOverlay(),
    'post':        () => S.postOverlay(),
    'comentarios': () => S.comentariosOverlay(state)
  };

  function render() {
    const { path, params } = parseHash();

    let html = null;
    for (const [pattern, view] of ROUTES) {
      const match = path.match(pattern);
      if (match) { html = view(match); break; }
    }
    if (html === null) {
      html = W2UI.shell(`
        <div class="container">
          <div class="empty">
            <div>
              <p class="empty__title">Tela não encontrada</p>
              <p style="margin-top:var(--space-4)"><a class="link" href="#/telas">Ver todas as telas</a></p>
            </div>
          </div>
        </div>`, { active: '' });
    }

    root.innerHTML = `<div class="screen">${html}</div>`;

    // Overlay can be driven by the URL (?overlay=…) or by in-page state.
    const urlOverlay = params.get('overlay');
    if (urlOverlay && OVERLAYS[urlOverlay]) state.overlay = urlOverlay;
    renderOverlay();
    renderDevbar();

    window.scrollTo(0, 0);
  }

  function renderOverlay() {
    overlayHost.innerHTML = state.overlay && OVERLAYS[state.overlay]
      ? OVERLAYS[state.overlay]()
      : '';
    document.body.style.overflow = state.overlay ? 'hidden' : '';
    // The review devbar shouldn't float over modal content.
    document.body.classList.toggle('has-overlay', !!state.overlay);
  }

  function openOverlay(name) {
    state.overlay = name;
    if (name === 'criar-post') state.createPostStep = 1;
    renderOverlay();
  }

  function closeOverlay() {
    state.overlay = null;
    // Drop ?overlay= from the URL so a refresh doesn't reopen it.
    const { path } = parseHash();
    if (location.hash.includes('overlay=')) {
      history.replaceState(null, '', `#${path}`);
    }
    renderOverlay();
  }

  /* -------------------------------------------------------------- toasts */
  function toast(message) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    toastHost.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  }

  /* -------------------------------------------------------------- devbar */
  function renderDevbar() {
    const theme = document.documentElement.getAttribute('data-theme');
    const bar = document.getElementById('devbar');
    bar.innerHTML = `
      <button class="devbar__btn" type="button" data-action="toggle-theme"
              title="Alternar tema" aria-label="Alternar tema">
        ${W2Icons.icon(theme === 'dark' ? 'sun' : 'moon')}
      </button>
      <a class="devbar__btn" href="#/telas" title="Todas as telas" aria-label="Todas as telas">
        ${W2Icons.icon('grid')}
      </a>`;
  }

  /* --------------------------------------------------------- interactions
     One delegated listener. Every interactive element declares its intent
     with data-action, which keeps the render functions pure strings. */
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-action]');

    // Clicking the scrim closes the overlay.
    if (!trigger && event.target.classList.contains('overlay')) { closeOverlay(); return; }
    if (!trigger) return;

    const action = trigger.dataset.action;
    const tag = trigger.dataset.tag;

    switch (action) {
      case 'toggle-theme':
        applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        return;

      case 'back':
        event.preventDefault();
        if (trigger.getAttribute('href') && trigger.getAttribute('href') !== '#back') {
          location.hash = trigger.getAttribute('href').replace(/^#/, '');
        } else {
          history.back();
        }
        return;

      /* --- onboarding --- */
      case 'toggle-terms':
        trigger.classList.toggle('is-checked');
        location.hash = trigger.classList.contains('is-checked')
          ? '/onboarding/cadastro-valido'
          : '/onboarding/cadastro';
        return;

      case 'need-terms':
        toast('Aceite os termos para continuar');
        return;

      case 'toggle-interest':
        toggle(state.selectedInterests, tag);
        render();
        return;

      /* --- eventos --- */
      case 'toggle-filter':
        toggle(state.activeFilters, tag);
        render();
        return;

      case 'save-event': {
        event.preventDefault();
        const ev = W2Data.findEvent(trigger.dataset.event);
        if (ev) {
          ev.saved = !ev.saved;
          toast(ev.saved ? 'Evento salvo' : 'Evento removido dos salvos');
          render();
        }
        return;
      }

      /* --- feed --- */
      case 'like': {
        trigger.classList.toggle('is-on');
        const on = trigger.classList.contains('is-on');
        trigger.innerHTML = W2Icons.icon('heart', { fill: on });
        return;
      }

      case 'comment': {
        // Remember which post was tapped so the overlay can render it.
        const host = trigger.closest('[data-post]');
        state.commentPostId = host ? host.dataset.post : null;
        openOverlay('comentarios');
        return;
      }

      case 'like-comment': {
        trigger.classList.toggle('is-on');
        trigger.innerHTML = W2Icons.icon('heart', { fill: trigger.classList.contains('is-on') });
        return;
      }

      case 'reply-comment': {
        const ta = overlayHost.querySelector('.comments-composer textarea');
        if (ta) {
          ta.value = `@${trigger.dataset.user} `;
          ta.focus();
          ta.dispatchEvent(new Event('input', { bubbles: true }));
        }
        return;
      }

      case 'share':
        openOverlay('enviar');
        return;

      case 'follow-organizer':
        event.preventDefault();
        trigger.classList.toggle('is-following');
        toast(trigger.classList.contains('is-following') ? 'Seguindo organizador' : 'Deixou de seguir');
        return;

      case 'toggle-follow':
        trigger.textContent = trigger.textContent.trim() === 'seguindo' ? 'seguir' : 'seguindo';
        return;

      case 'allow-follow':
        trigger.outerHTML = '<span class="t-meta text-secondary">permitido</span>';
        return;

      case 'dismiss-recent':
        event.preventDefault();
        trigger.closest('.recent-row, .list-row')?.remove();
        return;

      /* --- ticket + checkout --- */
      case 'qty-up':   state.ticketQty = Math.min(10, state.ticketQty + 1); render(); return;
      case 'qty-down': state.ticketQty = Math.max(1, state.ticketQty - 1);  render(); return;
      case 'pay-method': state.payMethod = trigger.dataset.method; render(); return;
      case 'pay': toast('Pagamento simulado — protótipo estático'); return;

      /* --- profile / forms --- */
      case 'remove-interest':
        state.profileInterests = state.profileInterests.filter(i => i !== tag);
        render();
        return;

      case 'add-interest':
        if (state.profileInterests.length >= 5) { toast('Máximo de 5 interesses'); return; }
        if (!state.profileInterests.includes(tag)) state.profileInterests.push(tag);
        render();
        return;

      case 'remove-event-tag':
        state.eventTags = state.eventTags.filter(t => t !== tag);
        render();
        return;

      case 'save-profile':  toast('Perfil atualizado'); return;
      case 'create-event':  toast('Evento criado'); return;
      case 'pick-day':      state.eventDay = Number(trigger.dataset.day); render(); return;

      /* --- manager table --- */
      case 'toggle-all-rows':
        state.allRowsChecked = !state.allRowsChecked;
        state.checkedRows = [];
        render();
        return;

      case 'toggle-row': {
        const i = Number(trigger.dataset.row);
        state.allRowsChecked = false;
        toggle(state.checkedRows, i);
        render();
        return;
      }

      /* --- overlays --- */
      case 'close-overlay': closeOverlay(); return;
      case 'post-step-2':   state.createPostStep = 2; renderOverlay(); return;
      case 'post-step-1':   state.createPostStep = 1; renderOverlay(); return;

      case 'share-post':
        if (!state.newPostRating) { toast('Avalie o evento antes de publicar'); return; }
        closeOverlay();
        toast('Post publicado');
        return;

      case 'toggle-recipient':
        toggle(state.recipients, Number(trigger.dataset.recipient));
        renderOverlay();
        return;

      case 'send-post':
        if (!state.recipients.length) return;
        state.recipients = [];
        closeOverlay();
        toast('Enviado');
        return;
    }
  });

  /* Rating widget inside the create-post modal. */
  document.addEventListener('click', (event) => {
    const star = event.target.closest('.rating--input svg');
    if (!star) return;
    const stars = [...star.parentElement.children];
    state.newPostRating = stars.indexOf(star) + 1;
    renderOverlay();
  });

  /* The "+" nav item opens the create-post modal rather than routing. */
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href="#criar-post"]');
    if (!link) return;
    event.preventDefault();
    openOverlay('criar-post');
  });

  /* Live character counters. */
  document.addEventListener('input', (event) => {
    const el = event.target.closest('[data-counter]');
    if (!el) return;
    const out = document.getElementById(el.dataset.counter);
    if (out) out.textContent = el.value.length;
  });

  /* Comment composer: auto-grow the textarea with its content (capped by
     CSS max-height), and light "Publicar" up only when there's text. */
  document.addEventListener('input', (event) => {
    if (!event.target.matches('.comments-composer textarea')) return;
    const ta = event.target;
    ta.style.height = 'auto';
    ta.style.height = `${ta.scrollHeight}px`;
    const btn = ta.form?.querySelector('[type="submit"]');
    if (btn) btn.classList.toggle('is-ready', ta.value.trim().length > 0);
  });

  /* Enter publishes, Shift+Enter makes a newline — the familiar contract. */
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    if (!event.target.matches('.comments-composer textarea')) return;
    event.preventDefault();
    event.target.form?.requestSubmit();
  });

  /* Publish a comment — appends to the post for the session. */
  document.addEventListener('submit', (event) => {
    if (!event.target.matches('[data-action="add-comment"]')) return;
    event.preventDefault();
    const text = event.target.querySelector('textarea').value.trim();
    if (!text) return;
    const p = W2Data.posts.find(x => x.id === state.commentPostId) || W2Data.posts[0];
    (p.comments ||= []).push({
      username: W2Data.currentUser.username,
      text,
      timestamp: 'agora',
      likes: 0
    });
    renderOverlay();
    // Show the new comment and keep the composer ready for another.
    const list = overlayHost.querySelector('.comments-list');
    if (list) list.scrollTop = list.scrollHeight;
    overlayHost.querySelector('.comments-composer textarea')?.focus();
  });

  /* Composer is a stub — acknowledge and clear. */
  document.addEventListener('submit', (event) => {
    if (!event.target.matches('[data-action="send-message"]')) return;
    event.preventDefault();
    const input = event.target.querySelector('input');
    if (input && input.value.trim()) { toast('Mensagem enviada'); input.value = ''; }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && state.overlay) closeOverlay();
  });

  function toggle(list, value) {
    const i = list.indexOf(value);
    if (i === -1) list.push(value); else list.splice(i, 1);
  }

  /* ---------------------------------------------------------------- boot */
  window.addEventListener('hashchange', () => {
    if (state.overlay && !location.hash.includes('overlay=')) state.overlay = null;
    render();
  });

  initTheme();
  if (!location.hash) location.hash = '/home';
  render();
})();
