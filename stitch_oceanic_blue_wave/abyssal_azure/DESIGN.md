---
name: Abyssal & Azure
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#43474e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#476083'
  primary: '#000613'
  on-primary: '#ffffff'
  primary-container: '#001f3f'
  on-primary-container: '#6f88ad'
  inverse-primary: '#afc8f0'
  secondary: '#005eb2'
  on-secondary: '#ffffff'
  secondary-container: '#4597fe'
  on-secondary-container: '#002e5d'
  tertiary: '#00070b'
  on-tertiary: '#ffffff'
  tertiary-container: '#00222d'
  on-tertiary-container: '#2891b2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#afc8f0'
  on-primary-fixed: '#001c3a'
  on-primary-fixed-variant: '#2f486a'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#a7c8ff'
  on-secondary-fixed: '#001b3b'
  on-secondary-fixed-variant: '#004788'
  tertiary-fixed: '#baeaff'
  tertiary-fixed-dim: '#76d2f6'
  on-tertiary-fixed: '#001f29'
  on-tertiary-fixed-variant: '#004d62'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is anchored in a sophisticated "Oceanic Professional" aesthetic. It balances the authoritative weight of deep-sea tones with the refreshing clarity of coastal shallows. The target audience is discerning diners and culinary explorers seeking a reliable, high-end guide to seafood.

The style is **High-Contrast & Modern**, utilizing expansive white space to evoke the feeling of a clean, salt-aired horizon. To differentiate from standard hospitality apps, this design system integrates subtle organic influences—specifically rhythmic wave patterns and fluid transitions—while maintaining a rigid, professional structure. The emotional response should be one of trust, freshness, and culinary excellence.

## Colors

The palette is a vertical slice of the ocean. **Deep Navy (#001F3F)** serves as the primary anchor, used for headers, primary navigation, and high-level branding to establish authority. **Ocean Blue (#0074D9)** provides the functional energy for interactive elements and primary buttons. 

**Aqua (#7FDBFF)** is reserved for highlights, background washes, and soft dividers to prevent the UI from feeling overly heavy. A crisp **Seafoam Green (#2ECC40)** is utilized sparingly as an accent for "Open Now" status indicators, fresh ratings, or seasonal tags. The background remains a pristine, cool-tinted neutral to maximize readability and maintain a "fresh" culinary feel.

## Typography

This design system employs a classic "Serif-Display, Sans-Body" pairing. **Playfair Display** provides the editorial elegance required for a premium restaurant guide, used exclusively for headlines and restaurant names to evoke a sense of tradition and quality. 

**Noto Sans** handles all functional information. It is chosen for its exceptional legibility at small sizes, crucial for menu details, addresses, and nutritional facts. Use high weight contrast (Bold for headers, Regular for body) to ensure a clear information hierarchy. All labels utilize a slight letter-spacing increase and uppercase styling to provide a modern, "metered" professional look.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop to maintain an editorial, magazine-like feel, centering the content within a 1280px container. On mobile, it transitions to a fluid 4-column system with generous 16px side margins to ensure the interface feels "airy."

Spacing follows a strict 8px base unit. Vertical rhythm is critical: use `stack-lg` (32px) between major sections like "Featured Restaurants" and "Cuisine Types," and `stack-sm` (8px) for internal component spacing. This generous padding mimics the openness of the sea and prevents the data-rich restaurant listings from feeling cluttered.

## Elevation & Depth

To maintain a crisp and professional look, this design system avoids heavy, muddy shadows. Instead, it uses **Tonal Layering** and **Low-Contrast Outlines**.

1.  **Primary Level:** The main background is a flat, cool neutral.
2.  **Surface Level:** Cards and containers use a pure white background with a very thin (1px) border in a light Aqua or soft Grey.
3.  **Elevated Level:** Only active states or "Featured" cards receive a shadow. This shadow should be highly diffused (20px-30px blur), low-opacity (8-10%), and tinted with a hint of Navy (#001F3F) rather than pure black, suggesting a subtle "floating" effect on water.

## Shapes

The shape language is **Soft (0.25rem base)**. While the brand is professional, purely sharp corners feel too aggressive for a hospitality context. A subtle radius on buttons, input fields, and image containers softens the "professional" edge, making the UI feel more approachable. 

Images of seafood and restaurant interiors should always utilize the `rounded-lg` (0.5rem) setting to create a framed, gallery-like appearance. Interactive "Pills" for cuisine filters are the only exception, using a fully rounded (3rem) radius to distinguish them as tappable, dynamic elements.

## Components

**Buttons:** Primary buttons are solid Deep Navy with white text. Secondary buttons use an Ocean Blue outline with a 1px stroke. Hover states should subtly shift the background color to a slightly lighter tint.

**Cards:** Restaurant cards are the hero component. They feature a full-bleed image at the top, a 0.5rem corner radius, and a 1px "Aqua" border. The restaurant name (Playfair Display) should be prominent, followed by Noto Sans metadata.

**Chips/Tags:** Used for "Freshness" or "Cuisine Type." These should have a light Seafoam Green or Aqua background with a darker version of the same color for the text to ensure high legibility and a "fresh" aesthetic.

**Input Fields:** Search bars should be large and prominent, featuring a 1px Ocean Blue border when focused. Use the Aqua tint for the search icon to maintain the theme's refreshing color palette.

**Wave Divider:** A custom decorative component—a subtle, repeating CSS-drawn wave—should be used to separate major homepage sections, reinforcing the oceanic narrative without distracting from content.