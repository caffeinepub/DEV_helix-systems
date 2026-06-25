# Design Brief

## Direction
Helix Systems — Clean, corporate productivity dashboard with professional blue accents and sidebar navigation. Light-mode first, trustworthy interface for 50-person software/robotics company.

## Tone
Intentionally restrained minimalism. No decorative gradients or patterns—every pixel serves function. Professional, approachable, clarity-focused (inspired by Notion, Linear).

## Differentiation
SVG double helix logo as brand anchor in header; sidebar navigation with active state styling; consistent gray-blue palette creates visual cohesion while blue accents guide interaction focus.

## Color Palette

| Token      | OKLCH             | Role                           |
| ---------- | ----------------- | ------------------------------ |
| background | 0.99 0.003 260    | Primary neutral background     |
| foreground | 0.16 0.01 260     | Text on background (AA+)       |
| card       | 1.0 0.0 0         | Elevated content surface       |
| primary    | 0.42 0.16 245     | Buttons, links, active states  |
| accent     | 0.42 0.16 245     | Secondary interaction highlight|
| muted      | 0.95 0.01 260     | Disabled, secondary states     |
| border     | 0.9 0.01 260      | UI dividers, light hierarchy   |
| sidebar    | 0.98 0.002 260    | Navigation background, subtle  |
| destructive| 0.55 0.22 25      | Delete, error warnings         |

## Typography
- Display: Space Grotesk — headings, hero text, emphasis (modern sans-serif with geometric character)
- Body: General Sans — paragraphs, UI labels, descriptions (clean, professional, highly legible)
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl font-bold tracking-tight`, label `text-sm font-semibold tracking-widest`, body `text-base`

## Elevation & Depth
Minimal shadow hierarchy: cards use subtle `shadow-sm` (0 1px 2px rgba), no elevatedglow or neon effects. Depth through layering (header > content > footer) with border-bottom/border-top dividers; background color shifts for section alternation (card: white, alt-sections: `bg-muted/30`).

## Structural Zones

| Zone    | Background              | Border              | Notes                                          |
| ------- | ----------------------- | ------------------- | ---------------------------------------------- |
| Header  | `bg-card border-b`      | `border-border`     | SVG helix logo left, navigation center, shadow |
| Sidebar | `bg-sidebar`            | `border-r border-sidebar-border` | Dashboard, Upload Data nav items, active blue state |
| Content | `bg-background`         | —                   | Primary work area, grid/card layout            |
| Sections| Alternating `bg-muted/30` | —                 | Every other card/section shifted for rhythm    |
| Footer  | `bg-muted/10 border-t`  | `border-border`     | Copyright, subtle background                   |

## Spacing & Rhythm
1400px max container; 2rem padding; 1rem gutters between cards. Section gaps: 2rem between major sections, 1rem micro-spacing within card groups. Sidebar width 280px, responsive collapse below `lg` breakpoint. Consistent breathing room prevents cognitive overload.

## Component Patterns
- Buttons: Rounded `rounded-md` (6px), primary blue (`bg-primary text-primary-foreground`), hover lightens/darkens via CSS variable modulation. Secondary: outlined `border border-border`.
- Cards: Minimal shadow `shadow-sm`, `rounded-md`, `bg-card`, subtle border `border border-border/30`. No glossy effects.
- Badges: Small pill-shaped `rounded-full`, `bg-primary/10 text-primary`, semantic green/red for success/destructive.
- Active states: Sidebar nav items highlight with `bg-sidebar-accent text-sidebar-accent-foreground` + left accent bar.

## Motion
Entrance: Smooth fade-in via CSS `--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` applied to interactive elements (buttons, links). Hover: Subtle color shift (opacity/lightness tweak) on primary buttons, no bounce. No decorative animations—motion serves usability (loading, state changes).

## Constraints
- No gradients. Flat color surfaces only.
- No shadows beyond `shadow-sm` and `shadow-xs`; elevate via borders and background colors.
- SVG logo always renders at constant aspect ratio with responsive sizing (24px–64px).
- Sidebar always visible on desktop (`lg` breakpoint), collapse to hamburger below.
- No custom animations—use Tailwind animate utilities only (accordion, fade).

## Signature Detail
SVG double helix logo as brand centerpiece in header—distinctive, recognizable, instantly conveys biotech/robotics identity. Paired with clean sans-serif typography for modern, trustworthy presence.
