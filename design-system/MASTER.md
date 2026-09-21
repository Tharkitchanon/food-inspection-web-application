# Design System: Food Safety Inspector (MASTER)

**Status:** Professional Healthcare / Audit Tool
**Style:** Accessible & Ethical

## 1. Foundation

### Typography
- **Headings:** Figtree (weights: 600, 700)
- **Body:** Noto Sans (weights: 400, 500)
- **Mood:** Medical, clean, accessible, trustworthy

### Color Palette
- **Primary:** `#0891B2` (Cyan) - Used for primary branding and highlights.
- **Secondary:** `#22D3EE` (Light Cyan) - Used for accents.
- **CTA:** `#059669` (Health Green) - Used for primary actions (e.g., Save, Submit).
- **Background:** `#ECFEFF` (Ultra-light Cyan) - Page background.
- **Text:** `#164E63` (Deep Cyan) - Main body text for high contrast.
- **Fail/Critical:** `#BE123C` (Ruby Red) - High contrast alert color.

### Key Effects
- **Focus Rings:** `0 0 0 4px rgba(8, 145, 178, 0.3)`
- **Radius:** `8px` for standard elements.
- **Transitions:** `150-300ms` for interactive elements.

## 2. UX Guidelines

### Accessibility (WCAG AAA Focus)
- **Contrast:** Maintain 4.5:1 minimum for body text.
- **Touch Targets:** Minimum 44x44px for buttons.
- **Keyboard:** Visible focus states on all interactive elements.
- **Labels:** Every input must have an associated `<label>`.

### Common Rules
- **No Emojis:** Use SVG icons (Heroicons/Lucide) only.
- **Cursor Pointer:** Mandatory for all clickable elements.
- **Stable Hovers:** Avoid scale transforms that shift layout.

## 3. Anti-Patterns to Avoid
- Bright neon colors.
- Motion-heavy animations.
- AI purple/pink gradients.
- Placeholder-only inputs.
