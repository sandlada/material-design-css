import fs from 'fs/promises'
import path from 'path'
import { MaterialColorService, SerializationService } from '@sandlada/material-theme-cli/dist/index.js'
import { Hct } from '@material/material-color-utilities'

/**
 * @typedef {Object} VariantNameMap
 * @property {number} variant - The variant number (0-8).
 * @property {string} name - The name of the variant.
 */
/**
 * @typedef {Object} PrebuildColorData
 * @property {string} fileName - The name of the prebuilt color file.
 * @property {string} outputPath - The file path where the prebuilt color data is stored.
 * @property {string} content - The content of the prebuilt color data.
 */

/**
 * @type {VariantNameMap[]}
 */
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

/**
 * @type {PrebuildColorData[]}
 */
const OutputReady = []

/**
 * Build Colors
 */

console.log('== Start to make prebuild colors.');

for(const variant of Variants) {

    console.log(`Current ${variant.name}`);


    for (let hue = 0; hue <= 360; hue += 30) {

        const outputPath = path.join(projectDir, 'prebuilt-colors', variant.name).toString()

        if(variant.name === 'monochrome') {
            const sourceColor = Hct.from(0, 60, 50)

            /** @type {string} */
            const phone2025Default = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 0, variant: 0, specVersion: 2025, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
            /** @type {string} */
            const phone2025Reduced = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: -1, variant: 0, specVersion: 2025, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
            /** @type {string} */
            const phone2025High = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 1, variant: 0, specVersion: 2025, platform: 'phone', palette: [] }), format: 'css', palettes:{} })

            OutputReady.push({ content: phone2025Default + phone2025Reduced.replace(':root', ':root[low-contrast]') + phone2025High.replace(':root', ':root[high-contrast]'), fileName: `black.css`, outputPath })

            break
        }
        else if (['neutral', 'tonal-spot', 'vibrant', 'expressive', 'rainbow', 'fruit-salad'].includes(variant.name)) {
            const sourceColor = Hct.from(hue, 60, 50)

            const phone2025Default = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 0, variant: variant.variant, specVersion: 2025, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
            const phone2025Reduced = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: -1, variant: variant.variant, specVersion: 2025, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
            const phone2025High = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 1, variant: variant.variant, specVersion: 2025, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
            OutputReady.push({ content: phone2025Default + phone2025Reduced.replace(':root', ':root[low-contrast]') + phone2025High.replace(':root', ':root[high-contrast]'), fileName: `h${hue}-2025.css`, outputPath })

            const phone2021Default = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 0, variant: variant.variant, specVersion: 2021, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
            const phone2021Reduced = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: -1, variant: variant.variant, specVersion: 2021, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
            const phone2021High = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 1, variant: variant.variant, specVersion: 2021, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
            OutputReady.push({ content: phone2021Default + phone2021Reduced.replace(':root', ':root[low-contrast]') + phone2021High.replace(':root', ':root[high-contrast]'), fileName: `h${hue}-2021.css`, outputPath })
        }
        else if(['content', 'fidelity'].includes(variant.name)) {
            //chroma: 0~150 but only 30, 60, 90 are meaningful in HCT color system. So we only generate prebuild colors for these chroma values.
            for(let chroma = 30; chroma <= 90; chroma += 30) {
                // Tone: 0~100 but only 20, 50, 80 are meaningful in HCT color system. So we only generate prebuild colors for these tones.
                for(let tone = 20; tone <= 80; tone += 30) {
                    const sourceColor = Hct.from(hue, chroma, tone)

                    const phone2025Default = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 0, variant: variant.variant, specVersion: 2025, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
                    const phone2025Reduced = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: -1, variant: variant.variant, specVersion: 2025, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
                    const phone2025High = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 1, variant: variant.variant, specVersion: 2025, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
                    OutputReady.push({ content: phone2025Default + phone2025Reduced.replace(':root', ':root[low-contrast]') + phone2025High.replace(':root', ':root[high-contrast]'), fileName: `h${hue}c${chroma}t${tone}-2025.css`, outputPath })

                    const phone2021Default = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 0, variant: variant.variant, specVersion: 2021, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
                    const phone2021Reduced = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: -1, variant: variant.variant, specVersion: 2021, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
                    const phone2021High = SerializationService.serialize({...MaterialColorService.create({ sourceColor, contrast: 1, variant: variant.variant, specVersion: 2021, platform: 'phone', palette: [] }), format: 'css', palettes:{} })
                    OutputReady.push({ content: phone2021Default + phone2021Reduced.replace(':root', ':root[low-contrast]') + phone2021High.replace(':root', ':root[high-contrast]'), fileName: `h${hue}c${chroma}t${tone}-2021.css`, outputPath })
                }
            }
        }

    }
}

console.log(`File Count: ${OutputReady.length}`);

/**
 * Write the generated prebuilt color data to files.
 */

const mkdirTasks = OutputReady.map(output => fs.mkdir(output.outputPath, { recursive: true }))
await Promise.all(mkdirTasks)

const writeTasks = OutputReady.map(output => fs.writeFile(
    path.join(output.outputPath, output.fileName),
    output.content,
    { encoding: 'utf-8', flag: 'w' }
))
await Promise
    .all(writeTasks)
    .then(() => {console.log('All files have been written successfully.')})
    .catch((err) => {console.error('Error writing files:', err)})
