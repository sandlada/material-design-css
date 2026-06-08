import fs, { writeFile } from 'fs/promises'
import path from 'path'
// @ts-ignore
import { MaterialColorService, SerializationService } from '@sandlada/material-theme-cli/dist/index.js'
import { Hct, TonalPalette, hexFromArgb } from '@material/material-color-utilities'

interface IColorOutput {
    content: string
    fileName: string
    outputPath: string
}
interface IPaletteOutput {
    content: string
    fileName: string
    outputPath: string
}

const Variants = [
    { variant: 0, name: 'monochrome' },
    { variant: 1, name: 'neutral' },
    { variant: 2, name: 'tonal-spot' },
    { variant: 3, name: 'vibrant' },
    { variant: 4, name: 'expressive' },
    { variant: 5, name: 'fidelity' },
    { variant: 6, name: 'content' },
    { variant: 7, name: 'rainbow' },
    { variant: 8, name: 'fruit-salad' },
]

const projectDir = process.cwd()
const prebuiltColorsDir = path.join(projectDir, 'prebuilt-colors')
const prebuiltPalettesDir = path.join(projectDir, 'prebuilt-palettes')

function createMonochromeColorOutput(): IColorOutput {
    const sourceColor = Hct.from(0, 60, 50)
    const outputPath = path.join(prebuiltColorsDir, 'monochrome').toString()

    const phone2025Default = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 0, variant: 0, specVersion: 2025, platform: 'phone', }), format: 'css', palettes:{} })
    const phone2025Reduced = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: -1, variant: 0, specVersion: 2025, platform: 'phone', }), format: 'css', palettes:{} })
    const phone2025High = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 1, variant: 0, specVersion: 2025, platform: 'phone', }), format: 'css', palettes:{} })

    return ({
        content: phone2025Default + phone2025Reduced.replace(':root', ':root[low-contrast]') + phone2025High.replace(':root', ':root[high-contrast]'),
        fileName: `black.css`,
        outputPath
    })
}
function createColorOutputsForVariant(variant: string): IColorOutput[] {
    const outputPath = path.join(projectDir, 'prebuilt-colors', variant).toString()
    const outputs: IColorOutput[] = []

    const targetVariantNumber = Variants.find(v => v.name === variant)?.variant
    if (targetVariantNumber === undefined) {
        throw new Error(`Variant ${variant} is not defined in Variants array.`)
    }

    if (['neutral', 'tonal-spot', 'vibrant', 'expressive', 'rainbow', 'fruit-salad'].includes(variant)) {
        for(let hue = 0; hue <= 360; hue += 30) {
            const sourceColor = Hct.from(hue, 60, 50)

            const phone2025Default = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 0, variant: targetVariantNumber, specVersion: 2025, platform: 'phone' }), format: 'css', palettes:{} })
            const phone2025Reduced = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: -1, variant: targetVariantNumber, specVersion: 2025, platform: 'phone' }), format: 'css', palettes:{} })
            const phone2025High = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 1, variant: targetVariantNumber, specVersion: 2025, platform: 'phone' }), format: 'css', palettes:{} })

            const phone2021Default = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 0, variant: targetVariantNumber, specVersion: 2021, platform: 'phone' }), format: 'css', palettes:{} })
            const phone2021Reduced = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: -1, variant: targetVariantNumber, specVersion: 2021, platform: 'phone' }), format: 'css', palettes:{} })
            const phone2021High = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 1, variant: targetVariantNumber, specVersion: 2021, platform: 'phone' }), format: 'css', palettes:{} })

            outputs.push({ content: phone2025Default + phone2025Reduced.replace(':root', ':root[low-contrast]') + phone2025High.replace(':root', ':root[high-contrast]'), fileName: `h${hue}-2025.css`, outputPath })
            outputs.push({ content: phone2021Default + phone2021Reduced.replace(':root', ':root[low-contrast]') + phone2021High.replace(':root', ':root[high-contrast]'), fileName: `h${hue}-2021.css`, outputPath })
        }
    }
    else if(['content', 'fidelity'].includes(variant)) {
        for(let hue = 0; hue <= 360; hue += 30) {
            //chroma: 0~150 but only 30, 60, 90 are meaningful in HCT color system. So we only generate prebuild colors for these chroma values.
            for(let chroma = 30; chroma <= 90; chroma += 30) {
                // Tone: 0~100 but only 20, 50, 80 are meaningful in HCT color system. So we only generate prebuild colors for these tones.
                for(let tone = 20; tone <= 80; tone += 30) {
                    const sourceColor = Hct.from(hue, chroma, tone)

                    const phone2025Default = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 0, variant: targetVariantNumber, specVersion: 2025, platform: 'phone' }), format: 'css', palettes:{} })
                    const phone2025Reduced = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: -1, variant: targetVariantNumber, specVersion: 2025, platform: 'phone' }), format: 'css', palettes:{} })
                    const phone2025High = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 1, variant: targetVariantNumber, specVersion: 2025, platform: 'phone' }), format: 'css', palettes:{} })

                    const phone2021Default = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 0, variant: targetVariantNumber, specVersion: 2021, platform: 'phone' }), format: 'css', palettes:{} })
                    const phone2021Reduced = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: -1, variant: targetVariantNumber, specVersion: 2021, platform: 'phone' }), format: 'css', palettes:{} })
                    const phone2021High = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 1, variant: targetVariantNumber, specVersion: 2021, platform: 'phone' }), format: 'css', palettes:{} })

                    outputs.push({ content: phone2025Default + phone2025Reduced.replace(':root', ':root[low-contrast]') + phone2025High.replace(':root', ':root[high-contrast]'), fileName: `h${hue}c${chroma}t${tone}-2025.css`, outputPath })
                    outputs.push({ content: phone2021Default + phone2021Reduced.replace(':root', ':root[low-contrast]') + phone2021High.replace(':root', ':root[high-contrast]'), fileName: `h${hue}c${chroma}t${tone}-2021.css`, outputPath })
                }
            }
        }
    }

    return outputs
}
function createPaletteOutput(options?: { minimal: boolean }): Array<IPaletteOutput> {
    const paletteToneNumbers =
        options?.minimal ?? false
        ? [0, 1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 96, 97, 98, 99, 100]
        : Array.from({ length: 101 }, (_, tone) => tone)
    const outputPath = path.join(prebuiltPalettesDir).toString()

    const outputs: Array<IPaletteOutput> = []

    for(let hue = 0; hue <= 360; hue += 10) {
        for(let chroma = 10; chroma <= 100; chroma += 10) {
            const palette = TonalPalette.fromHueAndChroma(hue, chroma)

            const serialized: IPaletteOutput = ({
                content: ':root {\n' + paletteToneNumbers.map(tone => `    --md-ref-palette-h${hue}-c${chroma}-${tone}: ${hexFromArgb(palette.tone(tone))};`).join('\n') + '\n}',
                fileName: `h${hue}-c${chroma}${options?.minimal ?? false ? '-minimal' : ''}.css`,
                outputPath,
            })

            outputs.push(serialized)
        }
    }

    return outputs
}

function buildColors() {
    const outputs: Array<IColorOutput> = [
        createMonochromeColorOutput(),
        ...Variants.filter(variant => variant.name !== 'monochrome').flatMap(variant => createColorOutputsForVariant(variant.name))
    ]
    return outputs
}
function buildPalettes() {
    const outputs = [
        ...createPaletteOutput(),
        ...createPaletteOutput({ minimal: true }),
    ]
    return outputs
}

async function writeOutputsToFileAsync(outputs: Array<IColorOutput | IPaletteOutput>) {
    const mkdirTasks = outputs.map(output => fs.mkdir(output.outputPath, { recursive: true }))
    await Promise.all(mkdirTasks)

    const writeFileTasks = outputs.map(output => fs.writeFile(
        path.join(output.outputPath, output.fileName),
        output.content,
        {
            encoding: 'utf-8',
            flag: 'w'
        }
    ))

    return Promise.all(writeFileTasks)
}

console.log('== Start to make prebuild colors.');

const OutputReady: Array<IColorOutput> = buildPalettes()

await writeOutputsToFileAsync(OutputReady)
    .then(() => {console.log('All directories have been created successfully.')})
    .catch((err) => {console.error('Error creating directories:', err)})

console.log(`File Count: ${OutputReady.length}`);
