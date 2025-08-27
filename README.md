# @sandlada/material-design-css

![Preview Image](https://raw.githubusercontent.com/sandlada/material-design-css/refs/heads/main/images/cover.png)

![NPM Downloads](https://img.shields.io/npm/d18m/@sandlada/material-design-css?label=NPM%20Downloads&labelColor=%2300531f&color=%23a3f5aa)
![NPM Version](https://img.shields.io/npm/v/%40sandlada%2Fmaterial-design-css?label=NPM%20Version&labelColor=%2300531f&color=%23a3f5aa)
![GitHub License](https://img.shields.io/github/license/sandlada/material-design-css?label=License&labelColor=%2300531f&color=%23a3f5aa)


`@sandlada/material-design-css` is a CSS npm package for Material Design, styles include:

- Color
- Palette
- Motion
- Shape
- Typography

It also **supports TailwindCSS**.

## Installation

```plaintext
npm i @sandlada/material-design-css
```

## Import

### For CSS

```typescript
// TypeScript File
// If you are using Vite or Webpack.

/**
 * This will import all styles.
 * Loading all styles will cause the style file to be too large, please load as needed. 
 */ 
import '@sandlada/material-design-css'

// Load preset, if using color
import '@sandlada/material-design-css/preset'

// text-on-surface
import '@sandlada/material-design-css/color/text-utilities.css'

// bg-surface
import '@sandlada/material-design-css/color/bg-utilities.css'

// text-primary-0 (black)
import '@sandlada/material-design-css/palette/text-utilities.css'

// bg-primary-100 (white)
import '@sandlada/material-design-css/palette/bg-utilities.css'

// display-large
import '@sandlada/material-design-css/typography.css'

// shape-medium
import '@sandlada/material-design-css/shape.css'

// animation-easing-expressive-fast-spatial
import '@sandlada/material-design-css/animation-utilities.css'

// transition-easing-expressive-fast-spatial
import '@sandlada/material-design-css/transition-utilities.css'
```

### For TailwindCSS v4

```css
@layer theme, base, components, utilities;

/* bg-primary */
@import "@sandlada/material-design-css/tailwind-color/bg-utilities.css";

/* text-on-primary */
@import "@sandlada/material-design-css/tailwind-color/text-utilities.css";

/* bg-primary-90 */
@import "@sandlada/material-design-css/tailwind-palette/bg-utilities.css";

/* text-on-primary-0 */
@import "@sandlada/material-design-css/tailwind-palette/text-utilities.css";

/* shape-medium */
@import "@sandlada/material-design-css/tailwind-shape/shape-utilities.css";

/* display-large */
@import "@sandlada/material-design-css/tailwind-typography/typography-utilities.css";

/* transition-duration-short1 */
@import "@sandlada/material-design-css/tailwind-motion/animation-utilities.css";

/* animation-duration-short1 */
@import "@sandlada/material-design-css/tailwind-motion/transition-utilities.css";

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);

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
<button class="shape-medium bg-primary text-on-primary">
    A rounded button
</button>
```

## Documentation

For more information on how to use, please visit [the project's official website](https://material-design-css.sandlada.com)