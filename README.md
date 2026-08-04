# Way2 — protótipo estático (fase 1)

Protótipo navegável do app Way2, construído a partir do arquivo Figma
[`BPBNMl6CtEDK7ch4kpZQAP`](https://www.figma.com/design/BPBNMl6CtEDK7ch4kpZQAP/Way2).

Sem dependências, sem build. Abra `index.html` direto no navegador (`file://`
funciona) ou sirva a pasta com qualquer servidor estático.

```bash
open index.html
```

Se preferir servir por HTTP:

```bash
python3 -m http.server 8080
```

**Escopo:** esta é a fase 1 — validar fidelidade de design e comportamento
responsivo. A extração para uma biblioteca React + Tailwind (fase 2) **não** foi
iniciada, conforme o brief.

---

## Como navegar

- A rail lateral (desktop) e a tab bar inferior (mobile) levam a telas reais —
  nada é link morto.
- **`#/telas`** lista todas as telas com o node ID de origem no Figma. É o
  caminho mais rápido para revisar tudo. Também acessível pelo botão de grade
  no canto inferior.
- O botão de lua/sol ao lado dele alterna claro/escuro. A preferência inicial
  segue o sistema e é guardada em `localStorage`.
- `Esc` fecha qualquer overlay.

Os dois controles flutuantes existem só para revisão — não fazem parte do
design e saem na fase 2.

---

## Estrutura

```
index.html                 shell + <script> tags, nada mais
assets/css/tokens.css      paleta bruta → aliases semânticos → escalas
assets/css/base.css        reset, tipografia, rail / top bar / tab bar
assets/css/components.css  botões, tags, inputs, cards, post, modal, tabela
assets/css/screens.css     layout específico de cada tela
assets/img/way2-logo.svg   vetor original do wordmark (fonte da verdade)
assets/js/icons.js         ícones inline (substitutos Lucide) + wordmark
assets/js/data.js          todo o conteúdo mock, em um único lugar
assets/js/components.js    primitivas de render (≈ componentes da fase 2)
assets/js/screens.js       uma função por frame do Figma
assets/js/app.js           router por hash, estado e delegação de eventos
```

`WAY2_Logo_Vector.svg` foi movido da raiz para `assets/img/way2-logo.svg` — é
a fonte da verdade do wordmark, mesmo o protótipo consumindo o path inline.

Cada função em `components.js` recebe um objeto simples e devolve uma string
HTML. Isso é intencional: na fase 2 cada uma vira um componente React e as
props já são as props.

---

## Inventário de telas

`Figma` = existe um frame de referência direto. `Extrapolada` = derivada do
sistema de design porque o frame não existe (ou existe só em um modo/viewport).

| Tela | Rota | Node ID | Referência |
|---|---|---|---|
| Onboarding 1 — Cadastre-se | `#/onboarding/cadastro` | `67:884` | Figma |
| Onboarding 2 — form preenchido | `#/onboarding/cadastro-valido` | `204:180` | Figma |
| Onboarding 3 — carregando | `#/onboarding/carregando` | `204:330` | Figma |
| Onboarding 4 — interesses | `#/onboarding/interesses` | `67:1110` | Figma |
| Onboarding 5 — personalizando | `#/onboarding/personalizando` | `67:1265` | Figma |
| Home (feed) | `#/home` | `17:2`, `504:318` (dark), `450:269` (mobile) | Figma |
| Eventos | `#/eventos` | `63:147` | Figma |
| Evento — detalhe | `#/evento/e4` | `622:565` | Figma |
| Ingresso | `#/ingresso/e4` | `660:841` | Figma |
| Checkout | `#/checkout/e4` | `660:1185` | Figma |
| Pesquisa | `#/pesquisa` | `560:399`, `564:692` (dark) | Figma |
| Notificações | `#/notificacoes` | `319:167` | Figma |
| Chat — lista + vazio | `#/chat` | `258:290` | Figma |
| Chat — conversa | `#/chat/c2` | `265:128` | Figma |
| Perfil | `#/perfil` | `213:620` | Figma |
| Perfil — Marcado | `#/perfil-marcado` | `225:283`, `414:312` | Figma |
| Perfil — Meus Eventos | `#/perfil-meus-eventos` | `384:477` | Figma |
| Perfil — organizador | `#/perfil-organizador/masp_sp` | `384:477` | Figma |
| Perfil — outro usuário | `#/perfil/eduardo_mautner` | `225:447` | **Extrapolada** |
| Editar Perfil | `#/editar-perfil` | `738:639` | Figma |
| Registrar Eventos | `#/criar-evento` | `740:662` | Figma |
| Gerenciador de Eventos | `#/gerenciador` | `783:802` | Figma |
| Criar Post (overlay) | `#/home?overlay=criar-post` | `524:506`, `533:362` | Figma |
| SendOverlay | `#/home?overlay=enviar` | `265:524`, `268:154`, `268:190` | Figma |
| searchOverlay | `#/home?overlay=pesquisar` | `416:263` | Figma |
| PostOverlay | `#/home?overlay=post` | `632:683` | Figma |
| Comentários (overlay) | `#/home?overlay=comentarios` | — | **Extrapolada** |
| Índice de telas | `#/telas` | — | **Auxiliar do protótipo** |

### O que foi extrapolado, e a partir de quê

**Mobile de todas as telas exceto Home.** O Figma tem só dois artboards móveis
(`450:269` Home claro e `504:538` Home escuro). Todas as outras telas foram
adaptadas seguindo o padrão que esses dois estabelecem — top bar fixa com
wordmark/título + atalhos de notificações e chat, coluna única, tab bar
inferior de 5 itens (início, pesquisa, criar, eventos, perfil) — em vez de
inventar um padrão novo por tela. As adaptações que exigiram uma decisão real:

- **Chat** vira master/detail: a lista *é* a tela; abrir uma conversa a
  substitui, com a seta de voltar na top bar. No desktop as duas colunas
  convivem, como no frame.
- **Gerenciador** mantém a tabela e ganha rolagem horizontal, em vez de virar
  lista de cards — a densidade é o ponto da tela.
- **Perfil**: cabeçalho empilha (avatar centralizado acima dos dados) e a grade
  de posts passa a colar (gap de 4px), como é convenção do padrão de feed que a
  tela segue.
- **Evento / Checkout**: as duas colunas viram uma, na ordem em que aparecem no
  desktop.

**Dark mode de todas as telas exceto Home e Pesquisa.** Não há styling escuro
escrito à mão em lugar nenhum: todo componente consome os aliases semânticos, e
o tema é uma troca de `data-theme` no `<html>`. As telas sem variante escura no
Figma são o resultado direto dessa reatribuição de tokens — valem como proposta,
não como design aprovado.

**Perfil de outro usuário** (`225:447`, "Perfil 2"): renderizado como a variante
de terceiros do cabeçalho de perfil — mesmo layout, botão **Seguir** no lugar de
**Editar**, sem as abas de Marcado/Meus Eventos. É a leitura mais provável do
frame; vale conferir contra o original.

**Modal de comentários** — não existe frame no Figma (a ação está desabilitada
no arquivo). Derivado do modal Criar Post (`524:506`) mais o padrão consagrado
de redes sociais: no desktop, mídia à esquerda e coluna de comentários à
direita (legenda do autor no topo, lista rolável, composer fixo embaixo); no
mobile, bottom sheet só com os comentários, como o Instagram. Linha de
comentário: avatar, **usuário** + texto, meta (tempo · curtidas · Responder),
coração à direita. Tudo sobre os tokens — o dark mode sai de graça.

No mobile, enquanto qualquer modal está aberto, o app por baixo fica oculto
(`visibility: hidden`): quando o teclado do iOS abre, o Safari faz *pan* na
página para manter o campo focado visível e arrasta conteúdo de fora da
viewport para a tela — com o app oculto, essa área exposta é fundo liso em vez
do feed. O desktop mantém o visual de scrim sobre o app. O viewport meta também
declara `interactive-widget=resizes-content`, que nos navegadores com suporte
redimensiona a folha acima do teclado e elimina o pan na origem.

**Chrome de navegador macOS.** Os artboards desktop trazem barra de abas,
semáforo e bookmarks ("Blogs / Memes / LOL Guides") embutidos. Isso é cenografia
de apresentação e **não** foi construído, conforme o brief.

---

## Ícones

Os SVGs originais não puderam ser exportados (o CDN de assets do Figma não
respondeu). Todos os ícones são inline em `assets/js/icons.js`, desenhados como
equivalentes [Lucide](https://lucide.dev) no mesmo peso de traço (1.75, grid
24×24, `currentColor`). Para trocar por um export real, substitua só o `path`
da chave correspondente — nenhum outro arquivo muda.

| Chave em `icons.js` | Lucide equivalente | Onde aparece no Figma |
|---|---|---|
| `home` | `house` | Rail item 1, tab bar item 1 |
| `search` | `search` | Rail item 2, tab bar item 2, campos de busca |
| `ticket` | `ticket` | Rail item 3, tab bar item 4 (Eventos) |
| `sparkle` | `sparkle` | Rail item 4 (Notificações), avaliação de post, loaders de onboarding, selo ao lado do @ no perfil |
| `message` | `message-square-more` | Rail item 5, atalho de chat na top bar mobile |
| `plusCircle` | `circle-plus` | Rail item 6 (Criar post), tab bar item 3, seguir organizador inline |
| `user` | `circle-user-round` (traço aberto) | Rail item 7, tab bar item 5 |
| `panelLeft` | `panel-left` | 8º item da rail — modo organizador (`783:802`) |
| `heart` | `heart` | Curtir, no post |
| `comment` | `message-square` | Comentar, no post |
| `send` | `send` | Compartilhar, no post → abre SendOverlay |
| `bookmark` | `bookmark` | Salvar evento, aba "Meus Eventos" |
| `x` | `x` | Fechar overlay, remover tag/recente |
| `check` | `check` | Checkbox de termos, seleção de linha na tabela |
| `arrowLeft` / `arrowRight` | `arrow-left` / `arrow-right` | Voltar, navegação do calendário, passos do checkout |
| `chevronLeft` / `chevronRight` / `chevronDown` | idem | Opções de ingresso, selects |
| `image` | `image` | Placeholder de upload (Criar Post, cartaz do evento) |
| `upload` | `upload` | Botão "Escolher foto" |
| `filters` | `sliders-horizontal` | Botão "Filtros" do gerenciador |
| `moon` / `sun` / `grid` | idem | Só na barra de revisão — não são do design |

O **wordmark W2** agora usa o vetor real (`assets/img/way2-logo.svg`). O path é
inlinado em `W2Icons.logo()` — não referenciado como `<img>` — por dois motivos:
funciona a partir de `file://` sem uma segunda requisição, e permite pintar o
traço com um gradiente que lê os tokens da paleta.

Uma alteração em relação ao arquivo entregue: o original tem `stroke="white"`,
pensado para fundo escuro. O protótipo troca por `url(#gradiente)` com o Orange
Grad (`#FF5C00 → #FF9900`), que é como o wordmark aparece nos artboards claros.
Assim um único vetor serve os dois temas — verificado sobre `#FFFFFF` e sobre
`#1A1A1A`. Se a marca deveria mesmo ficar branca no escuro, é uma linha em
`logo()`.

Proporção intrínseca 71:41; a altura é livre no CSS para não distorcer.

---

## Tokens

`assets/css/tokens.css` tem três camadas:

1. **Paleta bruta** (`--w2-*`) — transcrita de `design-guidelines` (`811:728`) e
   conferida contra o frame. Nenhum componente usa essas variáveis direto.
2. **Aliases semânticos** (`--bg-app`, `--text-primary`, `--border-default`,
   `--icon-active`, `--action-bg`, …) — é o que os componentes consomem.
   `[data-theme="dark"]` reatribui só essa camada.
3. **Escalas** — tipografia, radii, sombras, espaçamento, layout.

A tipografia é aplicada por classe (`.t-hero`, `.t-item`, `.t-body`, …), uma por
combinação permitida. Se um estilo não está lá, não está no sistema — de
propósito. Space Grotesk aparece só em `.t-accent-hero` (títulos de onboarding) e
`.t-accent-tag` (tags de categoria).

Fontes vêm do Google Fonts. Sem rede, o protótipo cai na stack de sistema e o
layout continua correto — só a tipografia muda.

---

## Radii

O guia de design (`811:728`) definia três raios — 6 / 12 / 24px — mas os frames
desenhavam tags e chips como stadium, o que não cabia em nenhum dos três. Em vez
de acrescentar um quarto valor, a escala foi reduzida para **dois raios mais uma
exceção de forma**:

| Token | Valor | Onde |
|---|---|---|
| `--radius-control` | `6px` | Coisas que você aperta ou marca: botões (todos os tamanhos), chip de voltar, botões de ícone, itens da rail, checkbox, seleção de linha, thumbs pequenos |
| `--radius-surface` | `12px` | Coisas que contêm conteúdo: cards, inputs, textareas, mídia, painéis, modais, segmentos estruturais |
| `--radius-pill` | `999px` | Só chips: tags de categoria, chips de interesse, status, campo de busca |

**O que mudou em relação ao guia:**

- **O tier de 24px foi aposentado.** Ele só alcançava quatro elementos (modal,
  painel de notificações, card de perfil, `.card--structural`) e fazia com que
  eles lessem como uma linguagem diferente do resto da tela. Todos passaram para
  12px. O card de perfil agora tem o mesmo raio das tiles de post logo abaixo
  dele, e o resultado é mais limpo do que o original.
- **Tamanho não altera mais o raio.** `.btn--lg` mudava o raio junto com a
  altura; agora só a altura muda. É o que mantém uma fileira de botões de
  tamanhos diferentes lendo como uma família só.
- **Pill não é um degrau da escala, é uma forma.** Por isso não vira um terceiro
  valor: `999px` significa "totalmente arredondado", independente da altura.
  Aplicado a chips (e ao campo de busca, que os frames desenham stadium).
  O status "Em breve" do gerenciador entrou nessa categoria — é um chip.
- **Círculos** (avatares, radio, dots) usam `50%` e não fazem parte da escala.

Uma auditoria do CSS computado nas 18 telas retorna exatamente três valores de
raio — `6px`, `12px`, `999px` — mais o `50%` dos círculos. Nada fora disso.

Os nomes são semânticos de propósito: `control` / `surface` / `pill` codificam a
regra de uso, então a fase 2 não tem como aplicar o raio errado por engano
(coisa fácil de fazer com `sm` / `md` / `lg`).

---

## Desvios conhecidos

Pontos onde o protótipo não segue o brief ao pé da letra. Todos isolados para
facilitar o acerto.

1. **Raios.** Resolvido — ver a seção **Radii** acima. O protótipo usa dois
   raios mais a exceção de pill, e não mais o 6/12/24 do guia. O
   `design-guidelines` no Figma precisa ser atualizado para refletir isso.

2. **Placeholders de imagem.** O Figma renderiza todo slot de foto como um bloco
   `#D9D9D9` chapado. Aqui eles são gradientes determinísticos e dessaturados,
   com o nome do evento por cima, para a tela ser legível numa revisão. Ficam
   todos na constante `ART` no topo de `components.js` — trocar por `#D9D9D9`
   chapado é uma linha.

3. **Avaliação por estrelas.** No feed, o Figma mostra só as sparkles
   conquistadas (3 de 3, sem trilha vazia). Reproduzi isso. A trilha de 5 com
   slots vazios aparece só no controle de avaliação do Criar Post, que é onde o
   frame `533:362` a mostra.

4. **Segundo item de "COMPONENTS" (`109:134`).** Tratado como material de
   referência para estados de variante, como o brief instrui — não houve
   extração 1:1 dele.

5. **Campos de formulário a 16px no mobile.** O iOS Safari dá zoom automático
   em qualquer campo focado com fonte menor que 16px — o que quebrava os
   modais (o app aparecia por trás da folha de comentários). Todos os
   `input`/`textarea`/`select` usam 16px abaixo de 768px. É um desvio do corpo
   de 14px, mas 16px já pertence à escala tipográfica, e é a correção
   canônica.

6. **Ordem da tab bar mobile.** Os frames iPhone mostram início / pesquisa /
   criar / eventos / perfil, que é uma ordem diferente da rail desktop
   (início / pesquisa / eventos / notificações / chat / criar / perfil).
   Respeitei cada uma no seu viewport; no mobile, notificações e chat ficam nos
   atalhos da top bar, como no frame.

---

## Dados mock

Tudo em `assets/js/data.js`. O contrato de post vem de `520:325` sem alteração:

```js
{
  username, isFollowingPostAuthor, isFollowingOrganizer, organizer,
  content, eventName, eventDate, likedBy[], rating, description, tags[]
}
```

Extensão ao contrato: cada post agora carrega também
`comments[] { username, text, timestamp, likes }` — campo novo (o Figma não
modela comentários), seguindo a mesma convenção.

As demais coleções seguem a mesma convenção, com campos inferidos do que cada
tela efetivamente renderiza:

- **events** — `title`, `organizer`, `date`, `fullDate`, `time`, `location`,
  `city`, `venue`, `tags[]`, `price`, `saved`, `about`, `tickets[]`
- **notifications** — `actor`, `action`, `timestamp`, `grouping`
  (`Hoje` / `Ontem` / `Esta semana`), `actionType` (`thumb` | `following` |
  `allow` | `tag`), que decide o controle à direita da linha
- **chats** — `name`, `preview`, `timestamp`, `unread`, `messages[]` com
  `kind: 'text' | 'event'`
- **managedEvents** — `title`, `organizer`, `date`, `status`, `tags[]`
- **organizers / people** — perfis com `followers`, `following`, `interests[]`

O conteúdo é realista em português, não lorem ipsum. Uma exceção deliberada: a
descrição do evento em destaque (`e4`) reproduz o texto real do frame `622:565`,
para conferência 1:1.

---

## Interações implementadas

Não é só layout — o que dá para clicar, funciona:

- Curtir, salvar evento (persiste na sessão, reflete em todas as telas),
  seguir/deixar de seguir organizador
- Comentários: modal com legenda + comentários de exemplo por post; publicar
  adiciona o comentário na sessão, "Responder" pré-preenche `@usuário` no
  composer, coração curte o comentário, "Publicar" só acende com texto
- Filtros de interesse em Eventos filtram a grade de verdade (com estado vazio)
- Seleção de interesses no onboarding habilita "Continuar"; aceitar os termos
  alterna entre os dois frames de cadastro
- Criar Post em dois passos, com avaliação obrigatória antes de compartilhar
- SendOverlay com seleção múltipla habilitando o envio
- Quantidade de ingressos recalcula o total no checkout; PIX/cartão troca o
  formulário
- Contadores de caracteres ao vivo (bio 0/100, descrição 0/500)
- Adicionar/remover interesses e tags, com limite de 5
- Seleção de linhas e "selecionar tudo" na tabela do gerenciador
- Calendário selecionável em Criar Evento

Ações sem backend (pagar, publicar, enviar mensagem) mostram um toast e não
fingem persistir.

---

## Fase 2 — ainda não iniciada

A extração para React + Tailwind está fora do escopo deste entregável, como o
brief pede. O que já está preparado para ela:

- `components.js` tem a fronteira de props já desenhada
- `data.js` é o único ponto de acoplamento com conteúdo
- os aliases semânticos mapeiam direto para um `theme.extend` do Tailwind
- as classes `.t-*` mapeiam direto para um plugin de tipografia
