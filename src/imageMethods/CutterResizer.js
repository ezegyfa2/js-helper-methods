const sharp = require('sharp')
const ResponsiveImageCreator = require('./ResponsiveImageCreator')

class CutterResizer extends ResponsiveImageCreator {
    constructor(options) {
        super(options)
        if (!this.options.fit) {
            this.options.fit = sharp.fit.cover
        }
    }

    async getHeight(imagePath, currentOptions) {
        const image = await sharp(imagePath)
        const metadata = await image.metadata()
        return metadata.height
    }
}

module.exports = CutterResizer;
