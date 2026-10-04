import fs, { writeFile } from 'fs/promises'
import path from 'path'
import { createTheme, toCSS, DEFAULT_PALETTE_TONES } from '@sandlada/mcu-helper'
import { Hct, Variant } from '@material/material-color-utilities'

type SpecVersion = '2021' | '2025'

/** Material contrast levels: Reduced (-1), Default (0), High (+1). */
const CONTRAST_REDUCED = -1
const CONTRAST_DEFAULT = 0
const CONTRAST_HIGH = 1

interface IFileOutput {
    content   : string
    fileName  : string
    outputPath: string
}

interface IVariantDescriptor {
    /** Directory name under prebuilt-colors/ and prebuilt-palettes/. */
    name: string
    /** Material variant number consumed by @sandlada/mcu-helper. */
    variant: Variant
    /**
     * Whether source colors iterate the full hue/chroma/tone range.
     * When false, source colors are fixed at chroma 60 / tone 50 and only hue iterates.
     */
    fullHct?: boolean
}

/**
 * Source color ranges.
 * - hue:    0 ~ 360, step 30
 * - chroma: 20 ~ 80, step 20 (20, 40, 60, 80)
 * - tone:   20 ~ 80, step 20 (20, 40, 60, 80)
 */
const HUES: number[] = Array.from({ length: 13 }, (_, index) => index * 30)
const CHROMAS: number[] = [20, 40, 60, 80]
const TONES: number[] = [20, 40, 60, 80]

const SPEC_VERSIONS: SpecVersion[] = ['2021', '2025']

/**
 * Reference tones of the "-minimal" palettes.
 * The non-minimal palettes use all 101 tones (0 ~ 100).
 */
const MINIMAL_TONES: number[] = [0, 1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 96, 97, 98, 99, 100]

const VariantDescriptors: IVariantDescriptor[] = [
    { name: 'monochrome', variant: Variant.MONOCHROME },
    { name: 'neutral', variant: Variant.NEUTRAL },
    { name: 'tonal-spot', variant: Variant.TONAL_SPOT },
    { name: 'vibrant', variant: Variant.VIBRANT },
    { name: 'expressive', variant: Variant.EXPRESSIVE },
    { name: 'fidelity', variant: Variant.FIDELITY, fullHct: true },
    { name: 'content', variant: Variant.CONTENT, fullHct: true },
    { name: 'rainbow', variant: Variant.RAINBOW },
    { name: 'fruit-salad', variant: Variant.FRUIT_SALAD },
]

const projectDir = process.cwd()
const prebuiltColorsDir = path.join(projectDir, 'prebuilt-colors')
const prebuiltPalettesDir = path.join(projectDir, 'prebuilt-palettes')

function indentBlock(css: string, pad = '    '): string {
    return css.split('\n').map(line => line.length > 0 ? pad + line : line).join('\n')
}

/** Source color file name base of one prebuilt color/palette unit. */
function iterateSourceColors(descriptor: IVariantDescriptor): Array<{ name: string, sourceColor: Hct }> {
    if (descriptor.name === 'monochrome') {
        return [{ name: 'black', sourceColor: Hct.from(0, 60, 50) }]
    }
    if (descriptor.fullHct) {
        return HUES.flatMap(hue => CHROMAS.flatMap(chroma => TONES.map(tone => ({
            name: `h${hue}c${chroma}t${tone}`,
            sourceColor: Hct.from(hue, chroma, tone),
        }))))
    }
    return HUES.map(hue => ({ name: `h${hue}`, sourceColor: Hct.from(hue, 60, 50) }))
}

/**
 * Prebuilt colors:
 * - `{name}-2021.css` / `{name}-2021-oled.css` / `{name}-2025.css` / `{name}-2025-oled.css`
 * - Each file contains `:root` (default contrast) plus
 *   `@media (prefers-contrast: less)` (contrast -1) and
 *   `@media (prefers-contrast: more)` (contrast +1) blocks.
 */
function createColorOutputs(descriptor: IVariantDescriptor): IFileOutput[] {
    const outputPath = path.join(prebuiltColorsDir, descriptor.name)
    const serialize = toCSS({ includePalettes: false, includeRoot: true, selector: ':root' })
    const outputs: IFileOutput[] = []

    for (const { name, sourceColor } of iterateSourceColors(descriptor)) {
        for (const specVersion of SPEC_VERSIONS) {
            for (const oled of [false, true]) {
                const makeTheme = (contrastLevel: number) => createTheme({
                    variant: descriptor.variant,
                    contrastLevel,
                    specVersion,
                    oled,
                    platform: 'phone',
                })(sourceColor)

                const defaultBlock = serialize(makeTheme(CONTRAST_DEFAULT))
                const lowContrastBlock = serialize(makeTheme(CONTRAST_REDUCED))
                const highContrastBlock = serialize(makeTheme(CONTRAST_HIGH))

                const content = defaultBlock
                    + `@media (prefers-contrast: less) {\n${indentBlock(lowContrastBlock)}\n}\n`
                    + `@media (prefers-contrast: more) {\n${indentBlock(highContrastBlock)}\n}\n`

                outputs.push({
                    content,
                    fileName: `${name}-${specVersion}${oled ? '-oled' : ''}.css`,
                    outputPath,
                })
            }
        }
    }

    return outputs
}

/**
 * Prebuilt palettes (palettes are affected by the variant):
 * - `{name}-2021.css` / `{name}-2021-minimal.css` / `{name}-2025.css` / `{name}-2025-minimal.css`
 * - Each file contains the six reference palettes (`--md-ref-palette-*`).
 */
function createPaletteOutputs(descriptor: IVariantDescriptor): IFileOutput[] {
    const outputPath = path.join(prebuiltPalettesDir, descriptor.name)
    const outputs: IFileOutput[] = []

    for (const { name, sourceColor } of iterateSourceColors(descriptor)) {
        for (const specVersion of SPEC_VERSIONS) {
            const theme = createTheme({
                variant: descriptor.variant,
                contrastLevel: CONTRAST_DEFAULT,
                specVersion,
                platform: 'phone',
            })(sourceColor)

            for (const minimal of [false, true]) {
                const serialize = toCSS({
                    includeTheme: false,
                    includePalettes: true,
                    includeRoot: true,
                    selector: ':root',
                    paletteTones: minimal ? MINIMAL_TONES : [...DEFAULT_PALETTE_TONES],
                })

                outputs.push({
                    content: serialize(theme),
                    fileName: `${name}-${specVersion}${minimal ? '-minimal' : ''}.css`,
                    outputPath,
                })
            }
        }
    }

    return outputs
}

function buildColors(): IFileOutput[] {
    return VariantDescriptors.flatMap(descriptor => createColorOutputs(descriptor))
}

function buildPalettes(): IFileOutput[] {
    return VariantDescriptors.flatMap(descriptor => createPaletteOutputs(descriptor))
}

async function writeOutputsToFileAsync(outputs: IFileOutput[]) {
    // Remove stale outputs of the previous naming scheme before regenerating.
    await Promise.all([
        fs.rm(prebuiltColorsDir, { recursive: true, force: true }),
        fs.rm(prebuiltPalettesDir, { recursive: true, force: true }),
    ])

    const directories = new Set(outputs.map(output => output.outputPath))
    await Promise.all([...directories].map(directory => fs.mkdir(directory, { recursive: true })))

    const batchSize = 512
    for (let index = 0; index < outputs.length; index += batchSize) {
        await Promise.all(outputs.slice(index, index + batchSize).map(output => writeFile(
            path.join(output.outputPath, output.fileName),
            output.content,
            { encoding: 'utf-8', flag: 'w' },
        )))
    }
}

console.log('== Start to make prebuild colors.')

const outputs: IFileOutput[] = [...buildColors(), ...buildPalettes()]

await writeOutputsToFileAsync(outputs)
    .then(() => { console.log('All prebuilt colors and palettes have been written.') })
    .catch((err) => { console.error('Error writing prebuilt outputs:', err) })

console.log(`File Count: ${outputs.length}`)
