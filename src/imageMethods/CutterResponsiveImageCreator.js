const sharp = require('sharp')
const ResponsiveImageCreator = require('./ResponsiveImageCreator')

class CutterResponsiveImageCreator extends ResponsiveImageCreator {
    constructor(options) {
        super(options)
        if (!this.options.fit) {
            this.options.fit = sharp.fit.cover
        }
        console.log('itt', this.options)
    }

    async getHeight(imagePath, currentOptions) {
        const image = await sharp(imagePath)
        const metadata = await image.metadata()
        return metadata.height
    }
}

module.exports = CutterResponsiveImageCreator;
