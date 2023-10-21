const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

class ResponsiveImageCreator {
    constructor(options) {
        if (options) {
            this.options = options;
        }
        else {
            this.options = {};
        }
    }

    async createResponsiveVersions(imagePath, imageOptions, outputFolderPath) {
        for (let imageOption of imageOptions) {
            let currentOptions = this.getOptions(imageOption)
            if (typeof(imageOption) == 'object') {
                if (imageOption.width) {
                    currentOptions.width = imageOption.width
                    if (!imageOption.height) {
                        currentOptions.height = await this.getHeight(imagePath, currentOptions)
                    }
                }
                else {
                    throw new Error('Invalid image options: ' + JSON.stringify(imageOption))
                }
            }
            else {
                currentOptions.width = imageOption
                currentOptions.height = await this.getHeight(imagePath, currentOptions)
            }
            if (!currentOptions.fit) {
                currentOptions.fit = sharp.fit.fill
            }
            
            this.resizeImage(imagePath, this.getOutputFolderPath(imagePath, currentOptions.width, outputFolderPath), currentOptions)
        }
    }

    async getHeight(imagePath, currentOptions) {
        const image = await sharp(imagePath)
        const metadata = await image.metadata()
        return parseInt(metadata.height * currentOptions.width / metadata.width)
    }
    
    async resizeImage(imagePath, outputImagePath, options) {
        let image = sharp(imagePath)
        const extractOptions = await this.getExtractOptions(image, options)
        if (extractOptions) {
            console.log('extra', extractOptions)
            image.extract(extractOptions)
        }
        console.log(imagePath, outputImagePath, options)
        if (!fs.existsSync(path.dirname(outputImagePath))){
            fs.mkdirSync(path.dirname(outputImagePath), { recursive: true });
        }
        image.resize(options)
            .webp()
            .toFile(outputImagePath, (error, info) => { 
                if (error) {
                    console.error(error) 
                }
                else {
                    //console.log(info)
                }
            })
    }
    
    async getExtractOptions(image, options) {
        if (options.top || options.bottom || options.left || options.right) {
            let extractOptions = {}
            const metadata = await image.metadata()
            let hasPosition = options.position
            if (options.left) {
                extractOptions.left = options.left
                extractOptions.width = metadata.width - extractOptions.left
                if (!hasPosition) {
                    options.position = 'left'
                }
            }
            else if (options.right) {
                extractOptions.left = 0
                extractOptions.width = metadata.width - extractOptions.right
                if (!hasPosition) {
                    options.position = 'right'
                }
            }
            else {
                extractOptions.left = 0
                extractOptions.width = metadata.width
                if (!hasPosition) {
                    options.position = ''
                }
            }
            if (options.width > extractOptions.width) {
                options.width = extractOptions.width
            }
            if (options.top) {
                extractOptions.top = options.top
                extractOptions.height = metadata.height - extractOptions.top
                if (!hasPosition) {
                    options.position += ' top'
                }
            }
            else if (options.bottom) {
                extractOptions.top = 0
                extractOptions.height = metadata.height - extractOptions.bottom
                if (!hasPosition) {
                    options.position += ' bottom'
                }
            }
            else {
                extractOptions.top = 0
                extractOptions.height = metadata.height
            }
            if (options.height > extractOptions.height) {
                options.height = extractOptions.height
            }
            console.log(extractOptions)
            return extractOptions
        }
        else {
            return null
        }
    }

    getOutputFolderPath(imagePath, width, outputFolderPath) {
        if (outputFolderPath) {
            return path.join(outputFolderPath, width + '.webp')
        }
        else {
            return path.join(path.dirname(imagePath), width + '.webp')
        }
    }
    
    getOptions(imageOption) {
        if (typeof(imageOption) == 'object' && this.options) {
            for (let [key, value] of Object.entries(this.options)) {
                console.log('value2', key, value, imageOption)
                if (!(key in imageOption)) {
                    console.log('value', key, value)
                    imageOption[key] = value
                }
            }
            return imageOption
        }
        else if (this.options) {
            return JSON.parse(JSON.stringify(this.options))
        }
        else {
            return {}
        }
    }
}

module.exports = ResponsiveImageCreator;
