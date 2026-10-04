// @ts-check
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
    site: `https://material-design-css.sandlada.com`,
    trailingSlash: "ignore",
    devToolbar: { enabled: false },
    integrations: [mdx(), sitemap()],
    vite: {
        plugins: [tailwindcss()]
    },
    output: "static",
    markdown: {
        shikiConfig: {
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
            defaultColor: false,
        },
    },
})
