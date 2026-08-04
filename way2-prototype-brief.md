# Way2 — Static Prototype Build Brief

## Context

I'm handing off a Figma prototype to developer friends. This is phase 1 of a two-phase deliverable: build a **thorough, working static web prototype** first so we can validate the design is accurate and responsive on desktop and mobile. Once we're happy with it, phase 2 will extract it into a proper React + Tailwind component library. **Do not start phase 2 yet — this prompt is for phase 1 only.**

Figma file: `https://www.figma.com/design/BPBNMl6CtEDK7ch4kpZQAP/Way2`
File key: `BPBNMl6CtEDK7ch4kpZQAP`

Use the Figma MCP connector (`get_design_context`, `get_metadata`, `get_screenshot`) to pull design context directly rather than working from this brief alone — this document is a map, not a substitute for looking at the file.

## What Way2 is

A Portuguese-language social app for events and nightlife — an Instagram-style feed crossed with event discovery/ticketing, plus an organizer-facing admin side.

## Screen inventory (node IDs from the Figma page "Page 1")

| Flow | Frame name | Node ID | Notes |
|---|---|---|---|
| Onboarding | Onboarding 1 (Cadastre-se / signup) | `67:884` | |
| Onboarding | Onboarding 2 | `204:180` | variant of signup |
| Onboarding | Onboarding 3 | `204:330` | |
| Onboarding | Onboarding 4 (interests picker) | `67:1110` | "Quais são os seus interesses?" |
| Onboarding | Onboarding 5 (personalizing) | `67:1265` | |
| Feed | Home | `17:2` | light |
| Feed | Home - Dark | `504:318` | dark mode reference |
| Discovery | Eventos | `63:147` | light, grid + filter |
| Discovery | Eventos 2 | `622:565` | |
| Discovery | Eventos 3 | `660:841` | |
| Discovery | Eventos 4 | `660:1185` | |
| Discovery | Pesquisa | `560:399` | search |
| Discovery | Pesquisa - Dark | `564:692` | |
| Social | Notificacoes | `319:167` | |
| Social | Chat | `258:290` | list + empty console |
| Social | Chat 2 | `265:128` | |
| Social | Criar Post | `524:506` | create-post modal |
| Social | Criar Post (2nd variant) | `533:362` | |
| Social | SendOverlay | `265:524`, `268:154`, `268:190` | share sheet, 3 instances |
| Social | searchOverlay | `416:263` | |
| Social | PostOverlay | `632:683` | |
| Profile | Perfil | `213:620` | |
| Profile | Perfil 2 | `225:447` | |
| Profile | PerfilMarcado | `225:283`, `414:312` | "tagged" tab |
| Profile | PerfilMeusEventos | `384:477` | "my events" tab |
| Profile | Editar Perfil | `738:639` | edit profile |
| Organizer | Registrar Eventos | `740:662` | create-event form, long |
| Organizer | Gerenciador de Eventos | `783:802` | events admin table |
| System | design-guidelines | `811:728` | **source of truth for tokens — read first** |
| System | COMPONENTS | `109:134` | loose component sheet, not fully organized |
| System | iPhone 16 - 1 | `450:269` | mobile reference: Home |
| System | iPhone 16 - 2 | `504:538` | mobile reference: second screen |
| System | JSON post | `520:325` | data contract reference, see below |

## Current state of the Figma file — important gaps to design around

- **Mobile only has 2 reference frames** ("iPhone 16 - 1" = Home, "iPhone 16 - 2" = one other screen). Every other screen only exists as a desktop artboard. For screens with no mobile reference, **you'll need to responsively adapt the desktop layout yourself** following the patterns established by the two mobile frames that do exist (sticky top bar, bottom tab bar, single-column stacking) rather than inventing a new mobile pattern per screen.
- **Most screens are light mode only.** Only Home and Pesquisa have an explicit dark variant in Figma. For all other screens, **use the semantic CSS variable layer** (see tokens below) so dark mode "just works" via token reassignment even though it hasn't been explicitly designed — don't hand-craft dark styles per screen beyond what the tokens already produce.
- **Desktop screens are wrapped in mock macOS browser chrome** (traffic lights, tab bar, bookmarks bar reading "Blogs / Memes / LOL Guides") baked into the Figma frames. This is presentation dressing only — **do not build it into the prototype.** Strip it out; only the actual app UI below the browser chrome is real.
- **Icon SVG assets could not be exported** (Figma's asset CDN wasn't reachable from the tool sandbox last session). Use clean inline SVGs that visually match (Lucide icon set is a good match for the outline style used — home, search, calendar/ticket, star, message-circle, bell, user, heart, send, plus, bookmark, x, arrow-left). Document which Lucide icon substitutes for which Figma node so real exports can drop in later without a redesign.
- **The COMPONENTS frame (`109:134`) is not fully organized** — it's a working sheet, not a clean component library. Treat it as reference material for variant states (button hover/active, tag pill styles, icon states) rather than a 1:1 extraction target.

## Design tokens (already transcribed from `design-guidelines`, node `811:728`)

Pull this frame yourself to confirm current values, but as of last session:

**Color — light:** Surface/White `#FFFFFF`, extraLightGrey `#FAFAFA`, lightGrey `#D9D9D9`, Divider Light `#CCCCCC`, Text/Primary `#000000`, Text/Secondary `#606060`, Placeholder `#808080`, Accent Green `#529A60`, Orange Grad `#FF5C00 → #FF9900`.

**Color — dark:** Surface/Dark `#1A1A1A`, DarkCardBkg `#212121`, DefaultIcon `#333333`, SelectedIcon `#E6E6E6`, Text/White `#FFFFFF`, Text/Sec Dark `#B3B3B3`, Placeholder `#808080`, Elevated Card `#252525`, Search Bar `#3A3A3A`.

**Typography:** Inter is the sole UI typeface, 10 permitted weight/size combos only (Bold 32 hero → Regular 10 micro). Space Grotesk is reserved exclusively for onboarding hero titles (Medium 40px) and category tags (Regular 12px, uppercase) — never for regular UI text.

**Radii:** exactly 3 values — 6px (tags/pills/small buttons), 12px (cards/inputs/standard), 24px (modals/structural only).

**Shadows:** dropShadow Subtle `0px 2px 10px rgba(0,0,0,0.12)` for default card elevation; dropShadow Prominent `0px 4px 16px rgba(22,22,22,0.12)` for flyouts/dropdowns/modals/tooltips.

**Spacing:** 4px base unit — 4/8/12/16/20/24/32/40/48px. Section gaps 24–32px, card padding 12–16px, list-item spacing 8–12px.

## Data contracts worth preserving

Node `520:325` ("JSON post") contains a reference shape for a feed post:
```json
{
  "username": "fulano_silva",
  "isFollowingPostAuthor": true,
  "isFollowingOrganizer": false,
  "organizer": "Serta_SP",
  "content": "media.jpg",
  "eventName": "Serta Mix",
  "eventDate": "27/02/2025",
  "likedBy": ["fulano2001", "maria_s", "danielJ"],
  "rating": 3,
  "description": "Lorem ipsum dolor...",
  "tags": ["festas", "festas", "festas"]
}
```
Extend this same shape convention to mock data for events, notifications, chats, and profiles — infer fields from what's visibly rendered on each screen (e.g. Eventos cards need `title`, `date`, `time`, `location`, `tags[]`, `organizer`; Notificacoes need `actor`, `action`, `timestamp`, `grouping` (Hoje/Ontem/Esta semana), `actionType` for the varying trailing control).

## Deliverable for this phase

A **dependency-free static prototype** (plain HTML/CSS/JS, no build step, opens directly from `index.html`) that is:

1. **Thorough and well-rounded** — cover every screen in the inventory above, not just the ones with clean references. Where a screen only exists in one mode (desktop-only, or light-only), extrapolate faithfully from the design system rather than skipping it.
2. **Responsive on both desktop and mobile** — desktop uses the icon rail pattern (from the browser-chrome-stripped desktop frames), mobile uses the sticky top bar + bottom tab bar pattern (from the two iPhone 16 reference frames). Every screen needs both, even where Figma only shows one.
3. **Built on the token system above** via CSS custom properties, with a semantic alias layer (`--bg-app`, `--text-primary`, etc.) that lets dark mode be a single `data-theme` attribute flip rather than parallel styling per screen.
4. **Navigable** — clicking through the rail/tab bar and in-screen links should move between the real screens, not dead-end. Use realistic mock data throughout, not lorem-ipsum placeholders, following the data contract patterns above.
5. **Self-documenting** — a short README noting which screens have a real Figma reference vs. which were extrapolated, and the icon substitution table, so it's easy to true-up later against real exports.

Once this is reviewed and approved, the next phase will be extracting it into a componentized React + Tailwind library (that part isn't part of this prompt — hold off).
