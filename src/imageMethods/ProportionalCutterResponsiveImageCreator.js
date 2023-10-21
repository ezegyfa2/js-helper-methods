const sharp = require('sharp')
const CutterResponsiveImageCreator = require('./CutterResponsiveImageCreator')

class ProportionalCutterResponsiveImageCreator extends CutterResponsiveImageCreator {
    constructor(options) {
        super(options)
    }

    async getHeight(imagePath, currentOptions) {
        const image = await sharp(imagePath)
        const metadata = await image.metadata()
        return parseInt(metadata.height * currentOptions.width / metadata.width)
    }
}

module.exports = ProportionalCutterResponsiveImageCreator;
