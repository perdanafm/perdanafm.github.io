---
trigger: always_on
---

# Design Rules

## Core Design Direction

The design should always feel like a **simple, modern newspaper**.

Think:

* Editorial
* Minimal
* Clean
* Timeless
* Information-focused
* Strong typography
* Generous whitespace
* Structured layouts
* Black-and-white first

The interface should feel closer to a **well-designed newspaper or editorial publication** than a typical modern SaaS dashboard.

Avoid trendy UI patterns that add visual noise without improving usability.

---

# 1. Simplicity First

Always choose the simplest design that communicates the intended information clearly.

Prioritize:

1. Content
2. Typography
3. Layout
4. Whitespace
5. Subtle visual details
6. Animation

Do not add visual elements simply to make the interface look "fancy."

Avoid:

* Excessive cards
* Excessive rounded corners
* Large gradients
* Glassmorphism
* Neon colors
* Decorative blobs
* Excessive shadows
* Unnecessary borders
* Excessive icons
* Overly complex navigation
* Visual clutter

When in doubt, **remove rather than add**.

---

# 2. Newspaper / Editorial Aesthetic

Use traditional editorial principles as the foundation.

Prefer:

* Strong headlines
* Clear article hierarchy
* Editorial-style layouts
* Horizontal rules
* Columns and grids
* Serif headlines when appropriate
* Sans-serif supporting text
* Small metadata
* Section labels
* Pull quotes
* Captions
* Structured content blocks

The design should resemble a **modern digital newspaper**, not a literal reproduction of a vintage newspaper.

Use modern spacing, responsive layouts, and accessibility while preserving the editorial character.

---

# 3. Color System

## Maximum 5 Colors

Never use more than **5 colors in the entire visual system**.

The preferred palette is primarily monochromatic:

* Black
* White
* Light gray
* Medium gray
* Dark gray

Accent colors should be extremely rare.

If an accent color is required, replace one of the gray values rather than introducing additional colors.

### Preferred Default

```text
Black
White
Light Gray
Medium Gray
Dark Gray
```

Do not introduce random colors for individual components.

Avoid:

```text
Red button
Blue link
Green success
Purple badge
Orange notification
```

unless there is a strong functional reason.

---

# 4. Black / White Theme Toggle

The interface must support two visual themes:

### Light Theme

Newspaper-like:

```text
Background → White
Primary text → Black
Secondary text → Dark/Medium Gray
Borders → Light Gray
```

### Dark Theme

Inverted newspaper:

```text
Background → Black
Primary text → White
Secondary text → Light/Medium Gray
Borders → Dark Gray
```

The theme should feel like the **same publication in two modes**, not two completely different designs.

Do not redesign the layout when switching themes.

Only colors, contrast, and subtle visual treatments should change.

---

# 5. Theme Tokens

Use design tokens / CSS variables instead of hardcoded colors.

Example:

```css
:root {
  --background: #ffffff;
  --foreground: #111111;
  --muted: #666666;
  --border: #d9d9d9;
  --surface: #f5f5f5;
}

.dark {
  --background: #111111;
  --foreground: #ffffff;
  --muted: #aaaaaa;
  --border: #333333;
  --surface: #1a1a1a;
}
```

Components should reference the tokens:

```css
color: var(--foreground);
background: var(--background);
border-color: var(--border);
```

Do not scatter hardcoded colors throughout components.

---

# 6. Typography

Typography is one of the most important parts of the design.

Use typography to create hierarchy instead of relying on colors, cards, shadows, or decorative elements.

Recommended hierarchy:

```text
Publication / Brand
↓
Section
↓
Headline
↓
Subheadline
↓
Body
↓
Metadata / Caption
```

Use strong contrast between:

* Headline
* Supporting text
* Metadata

A serif typeface can be used for major editorial headlines, while a clean sans-serif can be used for UI elements and supporting information.

Do not use many font families.

Prefer **1–2 font families maximum**.

---

# 7. Headlines

Headlines should feel editorial.

Prefer:

* Large typography
* Strong weight contrast
* Tight but readable line-height
* Clear hierarchy
* Minimal decoration

Avoid excessive:

* Text shadows
* Outlines
* Gradient text
* Animated text effects
* Decorative typography

The headline itself should provide the visual impact.

---

# 8. Layout

Prefer structured editorial layouts.

Use:

* CSS Grid
* Flexbox
* Columns
* Asymmetric editorial layouts when appropriate
* Strong alignment
* Consistent margins
* Generous whitespace

Example conceptual structure:

```text
┌─────────────────────────────────────┐
│              MASTHEAD               │
├─────────────────────────────────────┤
│ SECTION                             │
│                                     │
│ LARGE HEADLINE                      │
│ Supporting description              │
├───────────────────┬─────────────────┤
│ Main Story        │ Secondary Story │
│                   │                 │
├───────────────────┴─────────────────┤
│ More Stories / Editorial Content    │
└─────────────────────────────────────┘
```

Avoid excessive floating cards.

Content should feel connected through **layout and typography**, not dozens of containers.

---

# 9. Borders & Dividers

Use borders and horizontal rules to create newspaper-like structure.

Prefer:

```css
border-top: 1px solid var(--border);
```

or:

```css
border-bottom: 1px solid var(--border);
```

Use borders intentionally to separate editorial sections.

Avoid putting borders around every element.

---

# 10. Cards

Cards should be used sparingly.

Prefer content blocks without heavy containers.

Instead of:

```text
┌─────────────────────┐
│     ARTICLE         │
│                     │
│     CONTENT         │
└─────────────────────┘
```

Prefer editorial separation:

```text
ARTICLE
─────────────────────
CONTENT
```

Use cards only when they genuinely improve grouping, scanning, or interaction.

---

# 11. Border Radius

Keep corners restrained.

Preferred:

```text
0px
2px
4px
```

Avoid excessive:

```text
12px
16px
24px
32px
```

Large rounded cards should generally not be used.

The visual language should feel **editorial and structured rather than playful**.

---

# 12. Shadows

Use shadows minimally.

Prefer:

* No shadow
* Very subtle shadow when necessary

Do not rely on shadows to create hierarchy.

Use:

* Typography
* Spacing
* Borders
* Contrast
* Layout

to establish hierarchy instead.

---

# 13. Whitespace

Whitespace is a major design element.

Do not fill empty space just because it exists.

Use whitespace to:

* Separate stories
* Emphasize headlines
* Improve readability
* Create hierarchy
* Give the design a premium editorial feel

A simple layout with good whitespace is preferable to a dense layout with decorative elements.

---

# 14. Icons

Use icons only when they improve comprehension or interaction.

Prefer simple line icons.

Avoid:

* Decorative icon collections
* Large colorful icons
* Emoji as UI elements
* Icons that duplicate obvious text

Icons should support the typography, not compete with it.

---

# 15. Buttons

Buttons should be simple and editorial.

Preferred:

```text
READ MORE →
```

or:

```text
VIEW ALL
```

Use typography, borders, and subtle contrast rather than large colorful buttons.

Avoid excessive:

* Gradients
* Pills
* Shadows
* Rounded containers
* Decorative icons

---

# 16. Images

Images should support editorial storytelling.

Prefer:

* Large photography
* Black-and-white photography when appropriate
* Strong cropping
* Consistent aspect ratios
* Clear captions

Do not use images purely as decoration.

When imagery is not necessary, allow typography and whitespace to carry the design.

---

# 17. Responsive Design

The newspaper aesthetic must work across:

* Desktop
* Tablet
* Mobile

Desktop may use multi-column editorial layouts.

Mobile should simplify into a clear vertical reading experience.

Do not force desktop newspaper columns onto mobile.

Prioritize:

1. Readability
2. Content hierarchy
3. Navigation
4. Touch usability

---

# 18. Theme Toggle

Provide a simple and obvious **Light / Dark theme toggle**.

The toggle should be visually minimal.

Do not create a large colorful theme switcher.

The transition between themes can use a subtle animation, but it should remain fast and unobtrusive.

Persist the user's selected theme when appropriate.

Respect the user's system preference when no explicit preference has been selected.

---

# 19. Animation

Follow the project's GSAP animation rules.

Animation should remain subtle and editorial.

Good:

* Fade
* Small vertical movement
* Subtle reveal
* Gentle image movement
* Page transitions
* Small hover feedback

Avoid:

* Excessive bouncing
* Large rotations
* Flashing
* Aggressive parallax
* Constant decorative movement

The **newspaper aesthetic should remain calm and focused**.

---

# 20. Component Design

Components should feel like parts of the same publication.

Maintain consistency in:

* Typography
* Spacing
* Borders
* Colors
* Theme behavior
* Interaction patterns

Do not create a completely different visual language for each page.

---

# 21. Design Decision Rule

Whenever there are multiple valid design options, prefer the option that is:

1. Simpler
2. More readable
3. More editorial
4. More monochromatic
5. More spacious
6. More timeless
7. Easier to maintain

---

# 22. Anti-Patterns

Do NOT default to:

* Gradient backgrounds
* Glassmorphism
* Neumorphism
* Excessive rounded cards
* Excessive shadows
* Colorful dashboards
* Neon accents
* Huge decorative illustrations
* Excessive badges
* Excessive pills
* Excessive animations
* Excessive icons
* More than 5 colors
* Multiple competing visual styles

These should only be used when explicitly requested.

---

# Core Rule

**Design like a modern newspaper: let typography, layout, contrast, borders, and whitespace do most of the work.**

The default visual language should be:

> **Simple + Editorial + Black/White + Typographic + Spacious + Timeless**

When something can be made simpler without reducing usability or clarity, **make it simpler**.
