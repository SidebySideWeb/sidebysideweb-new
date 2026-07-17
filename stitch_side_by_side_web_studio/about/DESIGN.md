---
name: Consultancy Core
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#45464e'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#75777e'
  outline-variant: '#c5c6cf'
  surface-tint: '#505e80'
  primary: '#041332'
  on-primary: '#ffffff'
  primary-container: '#1a2847'
  on-primary-container: '#828fb4'
  inverse-primary: '#b8c6ed'
  secondary: '#ab3500'
  on-secondary: '#ffffff'
  secondary-container: '#fe6a34'
  on-secondary-container: '#5d1900'
  tertiary: '#1f1200'
  on-tertiary: '#ffffff'
  tertiary-container: '#3a2500'
  on-tertiary-container: '#ac8b5b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b8c6ed'
  on-primary-fixed: '#0b1a39'
  on-primary-fixed-variant: '#394667'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#ffb59d'
  on-secondary-fixed: '#390c00'
  on-secondary-fixed-variant: '#832600'
  tertiary-fixed: '#ffddaf'
  tertiary-fixed-dim: '#e6c18c'
  on-tertiary-fixed: '#281800'
  on-tertiary-fixed-variant: '#5b4219'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  surface-white: '#FFFFFF'
  text-muted: '#64748B'
  accent-teal: '#2DD4BF'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 44px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  section-desktop: 80px
  section-mobile: 40px
  gutter: 24px
  margin-container: 32px
---

## Brand & Style

This design system is engineered for a technical consultancy that bridges the gap between high-level strategy and complex execution. The brand personality is **authoritative, precise, and sophisticated**, designed to instill immediate confidence in enterprise-level stakeholders.

The design style utilizes **Modern Minimalism** with a focus on high-contrast technical precision. It prioritizes clarity through generous whitespace and a rigid structural grid, punctuated by a singular, vibrant accent color to guide the eye to key actions. The aesthetic is "expensive" but functional—avoiding unnecessary decorative flourishes in favor of impeccable typography and subtle, high-end micro-interactions that signal quality and attention to detail.

## Colors

The palette is anchored by **Dark Navy Blue (#1A2847)**, providing a deep, intellectual foundation for the UI. **Vivid Orange (#FF6B35)** serves as the high-energy accent, reserved strictly for primary calls to action and critical status indicators. 

**Off-White (#F9F9F9)** is the primary background color to reduce eye strain and provide a premium canvas, while pure **White (#FFFFFF)** is reserved for elevated surfaces (cards, modals) to create a distinct layering effect. The secondary accent from the reference, **Teal (#2DD4BF)**, may be used sparingly for success states or technical data visualization to maintain a professional, tech-forward feel without diluting the primary brand orange.

## Typography

The system uses **Inter** exclusively to maintain a clean, utilitarian, and modern appearance across all touchpoints. 

**Headlines** are the centerpiece of the visual hierarchy. They utilize heavy weights (700+) and tight negative letter-spacing to create a "dense" and commanding look. **Body copy** is set with generous line heights to ensure maximum readability for long-form technical insights. **Labels** and overlines use uppercase styling with increased letter-spacing to provide a clear distinction from narrative text, functioning as navigational signposts.

## Layout & Spacing

The layout follows an **8px base unit** for all internal component spacing and a **fixed-grid** container for desktop content (max-width 1280px). 

- **Desktop:** 12-column grid with 24px gutters. Use 80px vertical padding between sections to create a sense of breathing room and premium quality.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 16px gutters and 40px vertical section padding.

Content should follow a "Z-pattern" for marketing sections, alternating between text and imagery. Data-heavy tables or technical specifications should utilize the full width of the grid to maintain legibility.

## Elevation & Depth

Depth is communicated through **Tonal Layers** rather than heavy shadows, keeping the UI modern and flat.

1.  **Level 0 (Background):** Off-White (#F9F9F9).
2.  **Level 1 (Cards/Surfaces):** White (#FFFFFF) with a very subtle, large-radius shadow (15% opacity Navy) to indicate interactivity.
3.  **Hover State (Interaction):** When a card or element is focused, the shadow deepens and the element translates -4px on the Y-axis.

For navigation bars, use a **Backdrop Blur** (Glassmorphism) with 90% opacity white to maintain context of the page while scrolling.

## Shapes

The shape language is **Soft but Geometric**. A 0.25rem (4px) base border radius is applied to buttons and inputs, providing a modern touch without appearing overly consumer-focused or "playful." This slight rounding maintains the consultancy's professional edge while differentiating it from the harshness of full brutalism.

Larger containers (Cards) use a `rounded-lg` (8px) radius to feel more approachable and established.

## Components

### Buttons
- **Primary:** Navy (#1A2847) background, White text. Hover effect: Fill scales from center or shifts to Orange (#FF6B35) with a slight scale-up (1.02x).
- **Secondary:** Transparent background, Navy border (2px). Hover effect: Background fills with Navy, text flips to White.

### Cards
- White background, 1px light gray border (#E2E8F0).
- Hover: Border changes to Navy, shadow deepens, and element slides up 4px.

### Form Inputs
- Subdued Off-White backgrounds with 1px borders. Focus state: Border becomes Navy with a 2px Orange "glow" (outer shadow).

### Links
- In-text links use a bold Navy color.
- **Microanimation:** A 1px underline that slides in from left-to-right on hover and exits to the right.

### Scroll-Reveal
- As users scroll, sections should animate in using a **Fade + Slide Up** (20px) motion with a duration of 600ms and a "cubic-bezier(0.16, 1, 0.3, 1)" easing for a smooth, high-end feel.