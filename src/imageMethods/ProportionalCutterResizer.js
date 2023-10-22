const sharp = require('sharp')
const CutterResizer = require('./CutterResizer')

class ProportionalCutterResizer extends CutterResizer {
    constructor(options) {
        super(options)
    }

    async getHeight(imagePath, currentOptions) {
        const image = await sharp(imagePath)
        const metadata = await image.metadata()
        return parseInt(metadata.height * currentOptions.width / metadata.width)
    }
}

module.exports = ProportionalCutterResizer;
