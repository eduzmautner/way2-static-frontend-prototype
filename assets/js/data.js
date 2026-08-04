/* ==========================================================================
   Way2 — mock data

   Shapes extend the "JSON post" contract from Figma node 520:325. Every
   collection below follows the same convention: flat objects, camelCase
   keys, Portuguese display strings, dates as DD/MM/YYYY.

   This file is the only place with content in it. Phase 2 swaps it for an
   API client without touching the render layer.
   ========================================================================== */

const W2Data = (() => {

  /* ------------------------------------------------------------- taxonomy */
  const interests = [
    'Festas', 'Esporte', 'Comida', 'Arte', 'Networking', 'Ciclismo',
    'Ar livre', 'Futebol', 'Literatura', 'Filmes', 'Moda', 'Tecnologia',
    'Ciências', 'Natureza', 'Fotografia', 'Diversidade'
  ];

  const suggestedInterests = ['Festas', 'Tecnologia', 'Xadrez', 'Filmes'];

  /* --------------------------------------------------------------- people */
  const currentUser = {
    username: 'matheus_braga',
    name: 'Matheus Braga',
    bio: 'CEO da Way2. FGV ✌️\nPaulistano, vai Corinthians!',
    followers: 78,
    following: 64,
    interests: ['Filmes', 'Networking', 'Futebol', 'Ar livre', 'Cultura'],
    isOrganizer: true,
    art: 'portrait'
  };

  const people = [
    { username: 'eduardo_mautner', name: 'Eduardo Mautner', handle: '@eduardozmautner' },
    { username: 'daniel_carvalho', name: 'Daniel Carvalho', handle: '@danielj' },
    { username: 'fulano_silva',    name: 'Fulano Silva',    handle: '@fulanosilva' },
    { username: 'maria_s',         name: 'Maria Salgado',   handle: '@maria_s' },
    { username: 'leo_rocha',       name: 'Leonardo Rocha',  handle: '@leo_rocha' },
    { username: 'camila_999',      name: 'Camila Duarte',   handle: '@camila_999' }
  ];

  /* --------------------------------------------------- organizer profiles */
  const organizers = [
    {
      handle: 'masp_sp',
      name: 'MASP',
      description: 'Museu de Arte de São Paulo',
      followers: 78,
      following: 64,
      interests: ['Arte', 'Urbano', 'Cultura'],
      art: 'masp'
    },
    {
      handle: 'cj_parties',
      name: 'CJ Parties',
      description: 'Festas na zona oeste desde 2019',
      followers: 1240,
      following: 12,
      interests: ['Festas', 'Música'],
      art: 'party'
    },
    {
      handle: 'ralle_movements',
      name: 'Ralle Movements',
      description: 'Encontros ao ar livre e cultura de rio',
      followers: 3410,
      following: 87,
      interests: ['Natureza', 'Ar livre'],
      art: 'river'
    }
  ];

  /* ---------------------------------------------------------------- posts
     Contract source: Figma node 520:325 ("JSON post"). */
  const posts = [
    {
      id: 'p1',
      username: 'fulano_silva',
      isFollowingPostAuthor: true,
      isFollowingOrganizer: false,
      organizer: 'Serta_SP',
      content: 'media.jpg',
      art: 'party',
      eventName: 'Serta Mix',
      eventDate: '27/02',
      likedBy: ['fulano2001', 'maria_s', 'danielJ'],
      rating: 3,
      description: 'Melhor line-up do semestre. Chegamos cedo, pegamos a varanda inteira e ficou aquele clima de reencontro — recomendo demais para quem gosta de house sem exagero.',
      tags: ['Festas', 'Música', 'Networking'],
      comments: [
        { username: 'fulano2001', text: 'A varanda foi a melhor decisão da noite 😂', timestamp: '2 h', likes: 4 },
        { username: 'maria_s', text: 'O set das 23h valeu o ingresso sozinho', timestamp: '1 h', likes: 2 },
        { username: 'danielJ', text: 'Na próxima edição me marca que eu vou junto', timestamp: '40 min', likes: 0 }
      ]
    },
    {
      id: 'p2',
      username: 'maria_s',
      isFollowingPostAuthor: true,
      isFollowingOrganizer: true,
      organizer: 'masp_sp',
      content: 'media.jpg',
      art: 'gallery',
      eventName: 'Arte e IA',
      eventDate: '02/08',
      likedBy: ['leo_rocha', 'matheus_braga'],
      rating: 4,
      description: 'A curadoria juntou obra física e generativa na mesma sala e funcionou muito melhor do que eu esperava. Vale reservar uma hora só para o segundo andar.',
      tags: ['Arte', 'Tecnologia', 'Cultura'],
      comments: [
        { username: 'leo_rocha', text: 'Fui no sábado e concordo, o segundo andar é outro nível', timestamp: '5 h', likes: 3 },
        { username: 'camila_999', text: 'Precisa reservar ou dá pra chegar e entrar?', timestamp: '3 h', likes: 1 }
      ]
    },
    {
      id: 'p3',
      username: 'leo_rocha',
      isFollowingPostAuthor: false,
      isFollowingOrganizer: true,
      organizer: 'meu_timao',
      content: 'media.jpg',
      art: 'stadium',
      eventName: 'Pré-jogo no posto',
      eventDate: '15/02',
      likedBy: ['danielJ', 'camila_999', 'fulano2001'],
      rating: 5,
      description: 'Organização impecável, telão gigante e o churrasco não parou. Se o time jogasse metade do que a torcida cantou, tinha sido goleada.',
      tags: ['Futebol', 'Comida', 'Festas'],
      comments: [
        { username: 'danielJ', text: 'daora demais essa resenha, o telão fez toda diferença', timestamp: '1 d', likes: 5 },
        { username: 'fulano2001', text: '"Se o time jogasse metade do que a torcida cantou" 💀💀', timestamp: '20 h', likes: 8 },
        { username: 'camila_999', text: 'Vão repetir no próximo clássico?', timestamp: '18 h', likes: 1 }
      ]
    },
    {
      id: 'p4',
      username: 'eduardo_mautner',
      isFollowingPostAuthor: true,
      isFollowingOrganizer: false,
      organizer: 'ralle_movements',
      content: 'media.jpg',
      art: 'river',
      eventName: 'Into the Current',
      eventDate: '24/08',
      likedBy: ['maria_s', 'matheus_braga'],
      rating: 4,
      description: 'Saímos às 6h da manhã e valeu cada minuto. A parte de fly-fishing guiada é bem acessível para quem nunca pegou uma vara na vida.',
      tags: ['Natureza', 'Ar livre', 'Esporte'],
      comments: [
        { username: 'maria_s', text: 'As fotos ficaram lindas! Onde fica exatamente?', timestamp: '6 h', likes: 2 },
        { username: 'leo_rocha', text: '6h da manhã é pesado mas pelo visto compensou', timestamp: '4 h', likes: 0 }
      ]
    }
  ];

  /* --------------------------------------------------------------- events
     Fields inferred from what the Eventos cards and the detail frame render. */
  const events = [
    {
      id: 'e1',
      title: 'Festa Mix',
      organizer: 'cj_parties',
      date: '27/04',
      fullDate: '27 de Abril, 19:00',
      time: '19:00-21:00',
      location: 'Rua Exemplo de Fulano, 123',
      city: 'São Paulo',
      venue: 'Casa Mix',
      tags: ['Festas', 'Ar livre'],
      price: 'R$ 45,00',
      saved: false,
      art: 'party',
      about: 'Uma noite com três pistas, line-up local e a varanda aberta até o último. Traga documento com foto — a entrada fecha às 23h.'
    },
    {
      id: 'e2',
      title: 'Arte e IA',
      organizer: 'masp_sp',
      date: '02/05',
      fullDate: '02 de Maio, 10:00',
      time: '10:00-18:00',
      location: 'Av. Paulista, 1578',
      city: 'São Paulo',
      venue: 'MASP',
      tags: ['Arte', 'Tecnologia'],
      price: 'R$ 30,00',
      saved: true,
      art: 'gallery',
      about: 'Exposição temporária reunindo obras físicas e peças generativas, com visitas guiadas de hora em hora.'
    },
    {
      id: 'e3',
      title: 'Pré-jogo no Ibirapuera',
      organizer: 'meu_timao',
      date: '15/05',
      fullDate: '15 de Maio, 14:00',
      time: '14:00-17:00',
      location: 'Portão 3, Parque Ibirapuera',
      city: 'São Paulo',
      venue: 'Parque Ibirapuera',
      tags: ['Futebol', 'Churrasco'],
      price: 'Gratuito',
      saved: false,
      art: 'stadium',
      about: 'Encontro da torcida antes do clássico. Leve sua cadeira, o churrasco é coletivo.'
    },
    {
      id: 'e4',
      title: 'ORVIS x RALLE Into the Current',
      organizer: 'ralle_movements',
      date: '24/08',
      fullDate: '24 de Agosto, 10:30',
      time: '10:30-14:30',
      location: 'Rua Exemplo de Fulano, 123',
      city: 'São Paulo',
      venue: 'Exemplo Rooftop',
      tags: ['Natureza', 'Ar livre', 'Música', 'Networking'],
      price: 'R$ 79,90',
      saved: false,
      art: 'river',
      featured: true,
      about: 'Um encontro descontraído para apaixonados pela indústria de recreação ao ar livre. Venha expandir sua rede, trocar ideias e conhecer pessoas que compartilham o mesmo entusiasmo pela natureza. A noite inclui drinks, petiscos e música para criar o clima perfeito para conversas inspiradoras e novas conexões.',
      savedByLabel: 'fulano_2001 e outros salvaram este evento',
      tickets: [
        { id: 't1', name: 'Entrada Geral',   price: 79.90,  note: 'Os ingressos serão enviados por e-mail' },
        { id: 't2', name: 'Entrada VIP',     price: 99.90,  note: 'Acesso à área coberta e welcome drink' },
        { id: 't3', name: 'Entrada Premium', price: 169.90, note: 'Área VIP, open bar e kit ORVIS' }
      ]
    },
    {
      id: 'e5',
      title: 'Feira da Vila',
      organizer: 'cj_parties',
      date: '03/06',
      fullDate: '03 de Junho, 11:00',
      time: '11:00-20:00',
      location: 'Praça Benedito Calixto',
      city: 'São Paulo',
      venue: 'Praça Benedito Calixto',
      tags: ['Comida', 'Ar livre'],
      price: 'Gratuito',
      saved: true,
      art: 'market',
      about: 'Trinta expositores, cozinha ao vivo e roda de samba a partir das 16h.'
    },
    {
      id: 'e6',
      title: 'Corrida 10K no Ibirapuera',
      organizer: 'track_field',
      date: '20/06',
      fullDate: '20 de Junho, 07:00',
      time: '07:00-11:00',
      location: 'Portão 2, Parque Ibirapuera',
      city: 'São Paulo',
      venue: 'Parque Ibirapuera',
      tags: ['Esporte', 'Ar livre'],
      price: 'R$ 120,00',
      saved: false,
      art: 'run',
      about: 'Percurso de 10 km com pace group, hidratação a cada 2,5 km e kit atleta na retirada.'
    }
  ];

  /* -------------------------------------------------------- notifications
     actionType drives the trailing control on each row. */
  const notifications = [
    { grouping: 'Hoje', actor: 'fulano123',    action: 'curtiu o seu post.', timestamp: '10m', actionType: 'thumb',  art: 'party' },
    { grouping: 'Hoje', actor: 'mano_da_silva', action: 'te marcou em um comentário: @matheus_braga parabéns muito pica esse evento!! 😍😍😍', timestamp: '3h', actionType: 'thumb', art: 'stadium' },
    { grouping: 'Hoje', actor: 'usuario4356',  action: 'começou a te seguir', timestamp: '7h', actionType: 'following' },

    { grouping: 'Ontem', actor: 'maria2001',   action: 'começou a se interessar por', timestamp: '1d', actionType: 'tag', tag: 'Futebol' },
    { grouping: 'Ontem', actor: 'fulano_g',    action: 'salvou um evento que você salvou', timestamp: '1d', actionType: 'thumb', art: 'market' },
    { grouping: 'Ontem', actor: 'felip3_neto', action: 'quer te seguir', timestamp: '1d', actionType: 'allow' },
    { grouping: 'Ontem', actor: 'iguatemi_jk', action: 'publicou um evento', timestamp: '1d', actionType: 'thumb', art: 'gallery' },

    { grouping: 'Esta semana', actor: 'leo_rocha', action: 'comentou em seu post: daora demais essa corrida!', timestamp: '2d', actionType: 'thumb', art: 'run' },
    { grouping: 'Esta semana', actor: 'pedro_z',   action: 'salvou um evento que você salvou', timestamp: '3d', actionType: 'thumb', art: 'river' },
    { grouping: 'Esta semana', actor: 'camila_999', action: 'quer te seguir', timestamp: '3d', actionType: 'allow' }
  ];

  /* ---------------------------------------------------------------- chats */
  const chats = [
    {
      id: 'c1', name: 'Eduardo Mautner', preview: 'Eduardo enviou um evento',
      timestamp: '15m', unread: true,
      messages: [
        { from: 'them', kind: 'text', body: 'Fala mano! Bora la?' },
        { from: 'them', kind: 'event', eventId: 'e1' }
      ]
    },
    {
      id: 'c2', name: 'Daniel Carvalho', preview: 'Daniel enviou um evento',
      timestamp: '46m', unread: true,
      messages: [
        { from: 'them', kind: 'text', body: 'Fala mano! Bora la?' },
        { from: 'them', kind: 'event', eventId: 'e1' },
        { from: 'me',   kind: 'text', body: 'Bora! Fecho pro sábado, chamo o pessoal.' }
      ]
    },
    {
      id: 'c3', name: 'Maria Salgado', preview: 'Curtiu uma mensagem', timestamp: '5h', unread: false,
      messages: [
        { from: 'me',   kind: 'text', body: 'Viu a expo nova do MASP?' },
        { from: 'them', kind: 'event', eventId: 'e2' },
        { from: 'them', kind: 'text', body: 'Já salvei. Domingo de manhã tá tranquilo?' }
      ]
    },
    {
      id: 'c4', name: 'Leonardo Rocha', preview: 'Curtiu uma mensagem', timestamp: '5h', unread: false,
      messages: [
        { from: 'them', kind: 'text', body: 'Corrida de sábado ainda de pé?' },
        { from: 'me',   kind: 'text', body: 'De pé. 7h no portão 2.' }
      ]
    },
    {
      id: 'c5', name: 'Camila Duarte', preview: 'Curtiu uma mensagem', timestamp: '5h', unread: false,
      messages: [{ from: 'them', kind: 'text', body: 'Obrigada pelo convite!' }]
    },
    {
      id: 'c6', name: 'Fulano Silva', preview: 'Curtiu uma mensagem', timestamp: '5h', unread: false,
      messages: [{ from: 'me', kind: 'text', body: 'Te mandei o link do ingresso.' }]
    },
    {
      id: 'c7', name: 'Pedro Zaragoza', preview: 'Curtiu uma mensagem', timestamp: '5h', unread: false,
      messages: [{ from: 'them', kind: 'text', body: 'Boa! Vou de metrô.' }]
    }
  ];

  /* ------------------------------------------------------ recent searches */
  const recentSearches = [
    { handle: '@matheus_braga', kind: 'Perfil', following: true },
    { handle: '@masp',          kind: 'Perfil', following: true },
    { handle: '@cj_parties',    kind: 'Organizador', following: false }
  ];

  /* ---------------------------------------------- organizer events table */
  const managedEvents = [
    { title: 'Maratona de Coritiba', organizer: 'governo_paranaense', date: '10/03/2026', status: 'Em breve', tags: ['Corrida', 'Ar livre'] },
    { title: 'Festa do Joao',        organizer: 'o_joao_festeiro',    date: '12/03/2026', status: 'Em breve', tags: ['Festa', 'Comida'] },
    { title: 'Pre jogo Corinthians', organizer: 'itaquera_12048',     date: '23/03/2026', status: 'Em breve', tags: ['Futebol', 'Churrasco'] },
    { title: 'Festa do Joao',        organizer: 'o_joao_festeiro',    date: '12/03/2026', status: 'Em breve', tags: ['Festa', 'Comida'] },
    { title: 'Sarau da Vila',        organizer: 'coletivo_vila',      date: '02/04/2026', status: 'Em breve', tags: ['Literatura', 'Arte'] },
    { title: 'Bike Night SP',        organizer: 'pedal_noturno',      date: '11/04/2026', status: 'Rascunho', tags: ['Ciclismo'] },
    { title: 'Feira da Vila',        organizer: 'coletivo_vila',      date: '18/01/2026', status: 'Encerrado', tags: ['Comida', 'Ar livre'] }
  ];

  /* ------------------------------------------------------ profile content */
  const profilePosts = posts.map(p => ({ art: p.art, title: p.eventName, date: p.eventDate }));
  const taggedPosts = [
    { art: 'stadium', title: 'Pré-jogo no posto', date: '15/02' },
    { art: 'market',  title: 'Feira da Vila',     date: '03/06' },
    { art: 'gallery', title: 'Arte e IA',         date: '02/08' },
    { art: 'party',   title: 'Serta Mix',         date: '27/02' },
    { art: 'run',     title: 'Corrida 10K',       date: '20/06' },
    { art: 'river',   title: 'Into the Current',  date: '24/08' }
  ];

  const findEvent = id => events.find(e => e.id === id);
  const findChat  = id => chats.find(c => c.id === id);
  const findOrganizer = handle => organizers.find(o => o.handle === handle);

  return {
    interests, suggestedInterests, currentUser, people, organizers,
    posts, events, notifications, chats, recentSearches, managedEvents,
    profilePosts, taggedPosts,
    findEvent, findChat, findOrganizer
  };
})();
