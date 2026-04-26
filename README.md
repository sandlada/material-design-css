# @sandlada/material-design-css

![Preview Image](https://raw.githubusercontent.com/sandlada/material-design-css/refs/heads/main/images/cover.png)

![NPM Downloads](https://img.shields.io/npm/d18m/@sandlada/material-design-css?label=NPM%20Downloads&labelColor=%2300531f&color=%23a3f5aa)
![NPM Version](https://img.shields.io/npm/v/%40sandlada%2Fmaterial-design-css?label=NPM%20Version&labelColor=%2300531f&color=%23a3f5aa)
![GitHub License](https://img.shields.io/github/license/sandlada/material-design-css?label=License&labelColor=%2300531f&color=%23a3f5aa)

`@sandlada/material-design-css` is a CSS npm package for Material Design Tokens, styles include:

- Color
- Palette
- Prebuilt Color
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
// In CSS file, use @import instead. (You may need to adjust the path depending on your setup, e.g., `@import "../node_modules/@sandlada/material-design-css/preset.css";`)

// Load preset before color or prebuilt-color utilities.
import '@sandlada/material-design-css/preset.css'

// text-on-surface
import '@sandlada/material-design-css/color/text-utilities.css'

// bg-surface
import '@sandlada/material-design-css/color/bg-utilities.css'

// text-primary-0
import '@sandlada/material-design-css/palette/text-utilities.css'

// bg-primary-100
import '@sandlada/material-design-css/palette/bg-utilities.css'

// display-large
import '@sandlada/material-design-css/typography/typography-utilities.css'

// rounded-medium
import '@sandlada/material-design-css/shape/shape-utilities.css'

// animation-easing-expressive-fast-spatial
import '@sandlada/material-design-css/motion/animation-utilities.css'

// transition-easing-expressive-fast-spatial
import '@sandlada/material-design-css/motion/transition-utilities.css'
```

#### Prebuilt Color

Use one file from `prebuild-color/` when you want a ready-made palette instead of generating one yourself.

```typescript
import '@sandlada/material-design-css/preset.css'

import '@sandlada/material-design-css/prebuild-color/orange.css'
import '@sandlada/material-design-css/color/text-utilities.css'
import '@sandlada/material-design-css/color/bg-utilities.css'
```

Available presets:

- `blue`
- `cold-blue`
- `cold-purple`
- `green`
- `light-green`
- `monochrome`
- `monochrome-high-contrast`
- `monochrome-low-contrast`
- `orange`
- `pink`
- `viridian`
- `yellow`

##### Tonal Spot (2025)

Algorithmically-generated palettes in `prebuild-color/tonal-spot/`. Each color comes in three contrast variants: default, `-low-contrast`, and `-high-contrast`.

```typescript
import '@sandlada/material-design-css/preset.css'

import '@sandlada/material-design-css/prebuild-color/tonal-spot/red-2025.css'
import '@sandlada/material-design-css/color/text-utilities.css'
import '@sandlada/material-design-css/color/bg-utilities.css'
```

Available tonal spot presets:

- `blue-2025`
- `brown-2025`
- `cyan-2025`
- `green-2025`
- `navy-2025`
- `orange-2025`
- `pink-2025`
- `purple-2025`
- `red-2025`
- `yellow-2025`

`preset.css` also defines the light and dark color-scheme contract used by the color utilities. Toggle the `dark` attribute on `:root` to switch themes.

### For TailwindCSS v4

```css
@import "tailwindcss";

/**
 * Optional ready-made palette.
 * Replace `orange` with any file under `prebuild-color/`.
 */
@import "@sandlada/material-design-css/prebuild-color/orange.css";

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

/* rounded-medium */
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

## Naming Conventions

- Color utilities use `bg-*` and `text-*`.
- Prebuilt color files use the filenames from `prebuild-color/`.
- Shape utilities use `rounded-*` plus directional suffixes like `-t`, `-r`, `-b`, and `-l`.
- Motion utilities use `animation-*` and `transition-*` with `duration-*` and `easing-*` tokens.
- Typography utilities use `emphasized-*` for emphasized variants and the base type scale names for standard variants.

## Usage

Copy this code into your configured project and you will see a button with color and rounded corners.

```html
<button class="rounded-medium bg-primary text-on-primary px-4 py-2">
    A rounded button
</button>
```

## Documentation

For more information on how to use, please visit [the project's official website](https://material-design-css.sandlada.com)
