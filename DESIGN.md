---
name: Nutralech
description: Spanish-first nutrition brand site for Marialy Alonso: warm marketing surfaces, shadcn-style UI primitives, and a committed rose accent.
colors:
  brand-rose: "#DA5F6F"
  brand-rose-hover: "#C54B5B"
  logo-coral: "#FF756D"
  ui-primary: "#171717"
  ui-primary-foreground: "#FAFAFA"
  surface: "#FFFFFF"
  surface-blush: "#FDF2F8"
  text-primary: "#0A0A0A"
  text-muted: "#737373"
  border-subtle: "#E5E5E5"
  destructive: "#EF4444"
typography:
  display:
    fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
    fontSize: "clamp(2rem, 4vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
    fontSize: "1.875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  pill: "9999px"
  nav: "24px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "96px"
components:
  button-brand-solid:
    backgroundColor: "{colors.brand-rose}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-brand-solid-hover:
    backgroundColor: "{colors.brand-rose-hover}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-ui-default:
    backgroundColor: "{colors.ui-primary}"
    textColor: "{colors.ui-primary-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-ui-default-hover:
    backgroundColor: "{colors.ui-primary}"
    textColor: "{colors.ui-primary-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  card-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
---

# Design System: Nutralech

## Overview

**Creative North Star: "The Calibrated Table"**

Nutralech pairs a **human**, approachable presence with **rigorous** clarity: food, body, and habits discussed like at a trusted table, not in a sales funnel. The interface stacks a **committed** rose accent (`#DA5F6F`) on warm white and whisper-pink atmospheres (`pink-50` tints, soft gradients) so marketing pages feel inviting without abandoning structure. Under that layer, **shadcn-style primitives** (`app/globals.css`) keep forms, dialogs, and Stripe flows legible: near-black semantic primary, crisp borders, and restrained shadows.

The system **rejects** interchangeable SaaS hero patterns, decorative glass without intent, and category-reflex "wellness teal" unless explicitly reintroduced with a named reference. Depth is mostly **lift-on-hover** cards and **diffuse rose-tinted** shadows on white shells, not heavy skeuomorphism.

**Key Characteristics:**

- Marketing accent is **brand rose**, not the semantic `primary` token used by default shadcn buttons.
- **Serif display** for section heroes and H1 energy; **Inter** for UI chrome and long reading.
- **Pill navigation** and **pill CTAs** on landing; **md radius** on system inputs and default buttons.
- Atmosphere uses **vertical washes** (`bg-linear-to-b from-white to-pink-50/50`) and **large soft blurs** behind photography, used sparingly so tools stay calm.

## Colors: The Rose Paper Palette

The story is **paper, skin, and ripe fruit**: white fields, a flush of pink, and coral in the logomark. Semantic neutrals come from Tailwind HSL tokens on `:root`; marketing pulls the rose family from repeated hex usage in sections.

### Primary

- **Brand Rose** (`#DA5F6F`): Headlines kicker text, icons, primary marketing CTAs, navbar wordmark, reading progress, pricing emphasis. This is the public voice of the brand in the current codebase.
- **Brand Rose Deep** (`#C54B5B`): Hover for links and actions that start on Brand Rose (see MDX and interactive states).

### Secondary

- **Logo Coral** (`#FF756D`): SVG logomark fills in the navbar. Sits beside Brand Rose; keep both intentional, not mixed accidentally in new icons.

### Tertiary

- **Semantic UI Primary** (`#171717`): Default `Button` variant `default`, shadcn `bg-primary` usage. Use for dense UI where the marketing rose would overwhelm tables or Stripe-heavy layouts.

### Neutral

- **Surface** (`#FFFFFF`): Cards, sheets, hero stats panels, default page field.
- **Surface Blush** (`#FDF2F8`): Approximation of `pink-50` wash endpoints for section gradients; pair with `white` for vertical blends.
- **Text Primary** (`#0A0A0A`): Body and headings that do not use rose (maps to foreground feel).
- **Text Muted** (`#737373`): Supporting copy, `text-muted-foreground` role.
- **Border Subtle** (`#E5E5E5`): Inputs, cards, dividers (`border` token family).

### Named Rules

**The Two-Primary Rule.** Marketing surfaces may lead with Brand Rose. App-style components should respect semantic `primary` unless the design task explicitly overrides for a campaign. Never bind both to the same control without a documented reason.

**The Wash Pair Rule.** Section backgrounds that use atmosphere gradients should move between `white` and a **single** blush tint (`pink-50/50` style). Do not stack unrelated gradient stops for novelty.

## Typography

**Display Font:** `font-serif` stack (browser serif, effectively Georgia-forward)  
**Body Font:** Inter (Next `next/font/google`, `app/layout.tsx`)  
**Label Font:** Inter, medium weight for UI labels

**Character:** Display reads editorial and calm; Inter keeps tools and forms neutral and scannable. The split matches PRODUCT.md: warmth in marketing, restraint in transactional UI.

### Hierarchy

- **Display** (500, `clamp(2.25rem, 5vw, 4.5rem)`, line-height ~1.1): Home hero H1 and large section titles (`text-4xl` through `lg:text-7xl` in hero).
- **Headline** (500, `clamp(2rem, 4vw, 3.75rem)`, line-height ~1.15): Section H2s (`text-4xl` to `text-6xl` patterns on landing blocks).
- **Title** (500, `1.875rem`, line-height ~1.2): Subsection H3 (`text-3xl` in offer and about blocks).
- **Body** (400, `1rem` to `1.125rem` on marketing paragraphs, line-height ~1.6): Descriptions, FAQ, blog body. Cap line length at **65–75ch** for long prose.
- **Label** (500, `0.875rem`, normal tracking): Eyebrow lines (`text-lg` kickers in rose are display-adjacent labels; default UI uses `text-sm`).

### Named Rules

**The Serif Containment Rule.** Serif display sizes are for **marketing headings and hero moments**. Do not set long body copy in all-caps serif tracking patterns used in the simplified contact form unless that surface is intentionally editorial.

## Elevation

The system is **light-first and mostly flat at rest**. Depth appears through **small shadows on primitives** (`shadow-sm` on cards and default buttons), **medium lift** on marketing cards (`hover:shadow-lg` with slight negative translate in service tiles), and **stronger lift** for the floating navbar (`shadow-lg` on a blurred, rounded shell). Hero stat tiles use **`shadow-xl` with a rose-tinted color** (`shadow-rose-200/10`) to separate from the background without harsh charcoal.

### Shadow Vocabulary

- **Primitive rest** (`shadow-sm`): Default card and button from shadcn tokens.
- **Navbar shell** (`shadow-lg`): Fixed pill nav, paired with `backdrop-blur-lg` and semi-transparent `bg-background/80`.
- **Hero emphasis** (`shadow-xl` + rose tint): Floating statistics panels on the hero; use rarely outside hero-adjacent metrics.

### Named Rules

**The Flat Forms Rule.** Calculators and checkout paths should stay **tonally flat**: rely on borders and focus rings, not marketing blurs, behind inputs.

## Components

### Buttons

- **Shape:** Marketing CTAs use **pill** (`rounded-full`, height ~56px in hero). Default shadcn buttons use **md** (`rounded-md`, `--radius` 0.5rem).
- **Primary (marketing):** Solid Brand Rose background, white label, hover to Brand Rose Deep (`#C54B5B` where used in codebase).
- **Primary (UI):** Semantic black `bg-primary` with `text-primary-foreground` per `components/ui/button.tsx`.
- **Outline / ghost:** Border `border-input` or ghost hover to `bg-accent`; navbar uses ghost with **custom hover** `hover:bg-[#DA5F6F]/20` and `hover:text-[#DA5F6F]`.
- **Hover / focus:** `transition-colors` default; `focus-visible:ring-1 focus-visible:ring-ring` on primitives. Marketing links use opacity or underline patterns as already in MDX.

### Chips

Not a dedicated chip component; badges exist (`components/ui/badge.tsx`) for compact labels. Prefer **Badge** for status, not for primary actions.

### Cards / Containers

- **Corner style:** `rounded-xl` (`12px`) on `Card` primitive; hero imagery may use `rounded-2xl`.
- **Background:** `bg-card` (white in light theme).
- **Shadow strategy:** `shadow-sm` at rest; marketing grids may add hover lift.
- **Border:** `border` using `border-subtle` feel from token.
- **Internal padding:** `p-6` on headers and content regions per `CardHeader` / `CardContent`.

### Inputs / Fields

- **Style:** `rounded-md`, `border-input`, transparent background, `h-9`, `text-sm`, `shadow-xs` from `components/ui/input.tsx`.
- **Focus:** `focus-visible:ring-1 focus-visible:ring-ring`.
- **Special:** `simplified-contact-form` uses **bottom-border** inputs on `#F0F0F0` with serif tracking for a distinct contact look; treat as a **signature pattern**, not the default calculator field.

### Navigation

- **Desktop:** Centered ghost buttons with icon plus condensed label on large breakpoints; pill container, blur, translucent background.
- **Mobile:** Sheet or menu pattern with full-width ghost rows (see `navbar.tsx`).

### Signature: Animated gradient pill (hero kicker)

`AnimatedGradientText` wraps eyebrow content with **animated gradient border treatment** and **light backdrop blur**. Treat as **optional jewelry**, not the default label style. Prefer solid Brand Rose text for new kickers unless motion is justified.

## Do's and Don'ts

### Do:

- **Do** lead marketing CTAs with **Brand Rose** on white or blush wash, with **pill** shape when the action is consult booking or equivalent primary conversion.
- **Do** keep **Inter** for form labels, calculator copy, and Stripe-adjacent UI.
- **Do** use **`focus-visible:ring-1`** and visible borders so keyboard paths meet PRODUCT.md accessibility targets.
- **Do** respect **`prefers-reduced-motion`** for decorative pulses and ambient blurs when adding new motion.

### Don't:

- **Don't** use **twin stat cards with huge numbers and tiny labels** as the only hero story; PRODUCT.md rejects generic SaaS landing patterns that read as interchangeable AI output.
- **Don't** stack **decorative glass and gradient chrome without intent**; glass is for rare emphasis, not every kicker.
- **Don't** default to **stock "healthcare teal" clichés** unless deliberately chosen with a named reference (PRODUCT.md).
- **Don't** use **`border-left` greater than 1px** as a colored accent stripe on prose callouts; impeccable bans intentional side-stripe accents (audit `mdx-components.tsx` blockquote pattern when tightening the system).
- **Don't** imply **medical diagnosis** through visual urgency (blood reds, alarm icons) outside the destructive token role for real errors.
