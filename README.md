# @sandlada/material-design-css

![Preview Image](https://raw.githubusercontent.com/sandlada/material-design-css/refs/heads/main/images/cover.png)

![NPM Downloads](https://img.shields.io/npm/d18m/@sandlada/material-design-css?label=NPM%20Downloads&labelColor=%2300531f&color=%23a3f5aa)
![NPM Version](https://img.shields.io/npm/v/%40sandlada%2Fmaterial-design-css?label=NPM%20Version&labelColor=%2300531f&color=%23a3f5aa)
![GitHub License](https://img.shields.io/github/license/sandlada/material-design-css?label=License&labelColor=%2300531f&color=%23a3f5aa)

`@sandlada/material-design-css` is a CSS npm package for Material Design Tokens, styles include:

- Color
- Palette
- Motion
- Shape
- Typography

It also **supports TailwindCSS v4**.

## Installation

```plaintext
npm i @sandlada/material-design-css
```

## Import

### For CSS

```typescript
// TypeScript File
// If you are using Vite or Webpack.

// Load preset, if using color
import '@sandlada/material-design-css/preset.css'

// text-on-surface
import '@sandlada/material-design-css/color/text-utilities.css'

// bg-surface
import '@sandlada/material-design-css/color/bg-utilities.css'

// text-primary-0 (black)
import '@sandlada/material-design-css/palette/text-utilities.css'

// bg-primary-100 (white)
import '@sandlada/material-design-css/palette/bg-utilities.css'

// display-large
import '@sandlada/material-design-css/typography/typography.css'

// shape-medium
import '@sandlada/material-design-css/shape/shape.css'

// animation-easing-expressive-fast-spatial
import '@sandlada/material-design-css/motion/animation-utilities.css'

// transition-easing-expressive-fast-spatial
import '@sandlada/material-design-css/motion/transition-utilities.css'
```

### For TailwindCSS v4

```css
@layer theme, base, components, utilities;

@import "tailwindcss";

/** 
 * bg-primary
 * text-on-primary
 */ 
@import "@sandlada/material-design-css/color/tailwind-theme.css";

/**
 * bg-primary-90
 * text-primary-10
 */
@import "@sandlada/material-design-css/palette/tailwind-theme.css";

/* shape-medium */
@import "@sandlada/material-design-css/shape/tailwind-theme.css";

/* 
 * font-display-large
 * text-display-large
 * tracking-display-large
 * leading-display-large
 * font-weight-display-large
 */
@import "@sandlada/material-design-css/typography/tailwind-theme.css";

/* display-large */
@import "@sandlada/material-design-css/typography/tailwind-utilities.css";

/**
 * ease-emphasized
 * duration-[var(--duration-medium1)]
 */
@import "@sandlada/material-design-css/motion/tailwind-theme.css";

@layer base {
    :root:not([dark]) {
        color-scheme: light;
    }
    :root[dark] {
        color-scheme: dark;
    }
}
```

## Usage

Copy this code into your configured project and you will see a button with color and rounded corners.

```html
<button class="rounded-medium bg-primary text-on-primary px-4 py-2">
    A rounded button
</button>
```

## Documentation

For more information on how to use, please visit [the project's official website](https://material-design-css.sandlada.com)