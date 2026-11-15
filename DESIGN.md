---
name: JSQUEL
description: A lightweight file-based SQL database engine implemented in JavaScript
colors:
  primary: "#3b82f6"
  accent-amber: "#fbbb0b"
  accent-lavender: "#8ba9ef"
  neutral-bg: "#1e1e20"
  neutral-surface: "#252529"
  neutral-border: "#2e2e32"
  text-primary: "#ffffff"
  text-muted: "#a1a1aa"
typography:
  display:
    fontFamily: "Google Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Google Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: "Google Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Google Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: "Ioskeley Mono, ui-monospace, Menlo, Monaco, Consolas, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Google Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-secondary:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  card-feature:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: JSQUEL

## Overview

**Creative North Star: "The Transparent Engine"**

JSQUEL’s design language pairs the precision of an embedded database engine with the accessibility of modern JavaScript developer tooling. It avoids corporate database clutter in favor of crisp typography, transparent JSON artifacts, and direct input-to-output clarity.

The visual tone is calm, focused, and dark-mode native. Surfaces recede into dark charcoal canvases (`#1e1e20`) to elevate syntax-highlighted code blocks, 3D product metaphors, and interactive technical documentation.

**Key Characteristics:**
- **Dark-First Technical Focus:** Deep charcoal foundations with high-contrast typography and syntax highlighting.
- **Engine Transparency:** Prioritizes human-readable JSON payloads, parameter tables, and explicit schema definitions over opaque abstractions.
- **Restrained Motion & Accents:** Reserved lighting accents (amber and lavender glows) frame key conceptual assets without distracting from reading flow.

---

## Colors

The palette is anchored in technical dark neutrals, accented by Google Sans-inspired amber and lavender glows, with royal blue reserved for primary calls to action.

### Primary
- **Royal Blue Accent** (`#3b82f6`): Reserved exclusively for primary interaction points, active navigation links, and primary action buttons.

### Secondary
- **Amber Glow** (`#fbbb0b`): Used in hero backlighting and the JavaScript emblem badge, signifying Node.js runtime synergy.
- **Lavender Wash** (`#8ba9ef`): Used for secondary hero gradients and subtle category badges.

### Neutral
- **Deep Void Canvas** (`#1e1e20`): Root page background for dark mode.
- **Surface Elevation** (`#252529`): Card backgrounds, code block containers, and sidebar surfaces.
- **Subtle Divider** (`#2e2e32`): Hairline table borders, horizontal rules, and card borders.
- **Pure White Text** (`#ffffff`): Headings, active labels, and emphasized code tokens.
- **Muted Zinc Text** (`#a1a1aa`): Body copy, parameter descriptions, and secondary metadata.

### Named Rules
**The Single-Action Rule.** Exactly one high-contrast primary blue pill button appears above the fold. All secondary actions remain subtle dark surface pills.

---

## Typography

**Display & Body Font:** Google Sans (with system sans-serif fallback)  
**Code & Monospace Font:** Ioskeley Mono (with monospace fallback)  

**Character:** Clean geometric sans-serif headings provide approachable modern readability, paired with crisp fixed-width monospace fonts for unambiguous SQL statements and JSON payloads.

### Hierarchy
- **Display** (600, 40px, 1.2): Hero titles and major landmark headers.
- **Headline** (600, 28px, 1.3): Page titles and primary documentation section headers (`h1`, `h2`).
- **Title** (600, 20px, 1.4): Card titles, subsection headers (`h3`), and method names.
- **Body** (400, 16px, 1.6): Documentation prose, parameter descriptions, and list items.
- **Code** (400, 14px, 1.5): SQL query strings, JSON payloads, and TypeScript method signatures.

### Named Rules
**The Multiline Query Rule.** SQL queries exceeding 60 characters must be broken across multiple lines in documentation code blocks to eliminate horizontal scrollbars on desktop viewports.

---

## Layout

The documentation utilizes a responsive three-column grid:
- **Left Navigation Sidebar** (280px fixed width on desktop): Sticky categorized navigation tree.
- **Central Content Well** (max-width 768px): Optimized reading column for technical prose and code blocks.
- **Right On-Page Outline** (220px fixed width on wide screens): Interactive table-of-contents jump links.

Spacing follows an 8px base rhythm (`8px`, `16px`, `24px`, `32px`, `48px`).

---

## Elevation & Depth

JSQUEL rejects heavy drop shadows in favor of subtle tonal surface elevation and ambient backdrop lighting:
- **At Rest:** Cards and code blocks sit flat on `#252529` surfaces with a 1px border (`#2e2e32`).
- **Ambient Hero Glow:** Diffuse radial/conic gradient glow (`blur(56px)`) positioned strictly behind key 3D metaphors.

### Named Rules
**The No-Float Rule.** Content cards and tables remain flush with the background grid; depth is conveyed through surface tonal layering rather than drop shadows.

---

## Shapes

- **Interactive Pills:** Buttons use fully rounded pill geometry (`rounded: 9999px`) for a tactile, friendly touch.
- **Content Cards:** Feature cards and callouts use smooth 12px rounded corners (`rounded: 12px`).
- **Code Blocks:** Syntax containers use crisp 8px rounded corners (`rounded: 8px`).

---

## Components

### Buttons
- **Shape:** Pill (`border-radius: 9999px`).
- **Primary:** Royal blue background (`#3b82f6`), white text, 10px 24px padding.
- **Secondary:** Dark surface background (`#252529`), white text, 1px subtle border (`#2e2e32`).
- **External Links:** Must feature the external arrow glyph (`↗`) to differentiate from internal documentation routes.

### Cards / Feature Containers
- **Corner Style:** 12px rounded corner.
- **Background:** `#252529`.
- **Border:** 1px solid `#2e2e32`.
- **Iconography:** Cohesive SVG vector glyphs centered in 40x40px rounded containers.

### Code Blocks
- **Corner Style:** 8px rounded corner.
- **Background:** Deep dark `#18181b`.
- **Language Badge:** Displayed in top-right corner (`js`, `sql`, `json`, `bash`).
- **Line Wrapping:** Enabled on narrow viewports to preserve scanability.

---

## Do's and Don'ts

### Do:
- **Do** provide explicit TypeScript signatures and parameter tables for every exported function.
- **Do** show expected JSON output arrays immediately alongside SQL queries.
- **Do** use `Ioskeley Mono` for all SQL keywords and inline code chips.
- **Do** break long query strings into indented multiline blocks.

### Don't:
- **Don't** mix system emojis with vector SVGs in feature card grids.
- **Don't** leave undocumented or placeholder APIs in reference documentation.
- **Don't** use decorative gradient text inside technical documentation body copy.
- **Don't** leave large empty vertical dead zones on the landing page layout.
