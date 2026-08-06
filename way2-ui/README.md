# @way2/ui — building blocks (fase 2)

Biblioteca de componentes React + Tailwind extraída do protótipo estático da
fase 1. **Só átomos, por decisão de escopo** — cards de evento, banners de
perfil e formulários compostos são montados pelo app a partir destas peças.

## Rodar a galeria

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173` — todos os componentes em todos os estados,
com toggle claro/escuro. `npm run build` roda o type-check e o build de
produção.

Stack: Vite 5 + React 18 + Tailwind 3.4 + TypeScript (Node 18 compatível —
Tailwind 4/Vite 7 exigem Node 20+).

## Arquitetura de tokens

`src/styles/tokens.css` porta o sistema da fase 1 sem alteração: paleta bruta
→ aliases semânticos → `[data-theme="dark"]` reatribui só os aliases.

O `tailwind.config.js` **aponta as cores para as variáveis CSS**, não para
valores fixos. Consequência: nenhum componente usa `dark:`; trocar o
`data-theme` no `<html>` retinge a biblioteca inteira, igual ao protótipo.

- Cores: `bg-surface-subtle`, `text-secondary`, `border-border-default`,
  `bg-action`, `text-action-text`…
- Raios: `rounded-control` (6px), `rounded-surface` (12px), `rounded-full`
  (pills/círculos) — a escala de dois raios da fase 1
- Tipografia: `text-hero` … `text-micro` + `font-accent text-accent-hero`/
  `text-accent-tag` — as 12 combinações permitidas, com peso e line-height
  embutidos no token
- Espaçamento: escala de 4px substitui a padrão do Tailwind
- Sombras: `shadow-subtle`, `shadow-prominent`

## Componentes

| Componente | Origem no protótipo | Notas |
|---|---|---|
| `Icon` | `assets/js/icons.js` | Registro completo (substitutos Lucide); `fill` para variantes preenchidas |
| `Logo` | wordmark vetorial | Gradiente Orange Grad; `useId` para múltiplas instâncias |
| `Button` | `.btn` | `primary/secondary/ghost/quiet`, `sm/md/lg`, `block`; vira `<a>` com `href` |
| `BackButton` | `.btn-back` | Chip "← VOLTAR" |
| `IconButton` | `.icon-btn` | `label` obrigatório (a11y); `active` usa o glifo preenchido |
| `FollowPlus` | `.follow-plus` | Disco 20px vs "+" 30px — compensação de peso óptico documentada no código |
| `Tag` | `.tag` | `selectable`, `selected`, `onRemove`; Space Grotesk uppercase, pill |
| `StatusPill` | `.status` | `upcoming/draft/past` |
| `Badge` | `.filter-count` / `.dot` | Pill de contagem, ou dot de não-lido sem `count` |
| `Field` | `.field` | Label + hint em volta de qualquer controle |
| `Input` | `.input` | Nota mobile: manter ≥16px abaixo de 768px (zoom do iOS) |
| `Textarea` | `.textarea` + `.counted` | `counter` (n/max) e `autoGrow` (composer) |
| `SearchInput` | `.search` | Pill por padrão; `square` para o Gerenciador |
| `Select` | `.select` | Nativo, com chevron do sistema |
| `Checkbox` | `.checkbox` / `.filter-check` | Controlado; `tone` strong/default; `trailing` para contagens |
| `Radio` | `.radio` | Controlado |
| `Avatar` | `.avatar` | `xs–xl`; iniciais, gradiente `art` ou `src` real |
| `Rating` | `.rating` | Exibição = só sparkles conquistadas; com `onChange` = trilha completa |
| `Divider` | `.divider` | |
| `SparkleLoader` | `.sparkle-loader` | Keyframes embutidos |
| `Toast` | `.toast` | Só o visual — posicionamento/tempo ficam no app |

## O que fica para o app (de propósito)

- Composições: EventCard, PostCard, ProfileBanner, modais, tabelas, tabs
- Gerenciamento de toasts, overlays e roteamento
- A regra global mobile de 16px em campos de formulário
- Carregamento das fontes (Inter + Space Grotesk)
