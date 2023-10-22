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
        this.options.resize = true
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
        console.log(imagePath, outputImagePath, options)
        if (!fs.existsSync(path.dirname(outputImagePath))) {
            fs.mkdirSync(path.dirname(outputImagePath), { recursive: true });
        }
        if (this.getExtractOption(options)) {
            const extractOptions = await this.getExtractOptions(image, options)
            console.log('options', extractOptions)
            image.extract(extractOptions)
        }
        if (options.resize) {
            image.resize(options)
        }
        image.webp()
            .toFile(outputImagePath, (error, info) => { 
                if (error) {
                    console.error(error)
                }
                else {
                    //console.log(info)
                }
            })
    }

    getExtractOption(options) {
        return options.extract || 'top' in options || 'bottom' in options || 'left' in options || 'right' in options
    }
    
    async getExtractOptions(image, options) {
        let extractOptions = {}
        const metadata = await image.metadata()
        let hasPosition = options.position
        if ('left' in options) {
            extractOptions.left = options.left
            extractOptions.width = this.getExtractSize(options, metadata.width, options.width, extractOptions.left)
            if (!hasPosition) {
                options.position = 'left'
            }
        }
        else if ('right' in options) {
            extractOptions.left = 0
            extractOptions.width = this.getExtractSize(options, metadata.width, options.width, extractOptions.right)
            if (!hasPosition) {
                options.position = 'right'
            }
        }
        else {
            if (options.resize) {
                extractOptions.left = 0
            }
            else {
                extractOptions.left = parseInt((metadata.width - options.width) / 2)
            }
            extractOptions.width = this.getExtractSize(options, metadata.width, options.width, 0)
            if (!hasPosition) {
                options.position = ''
            }
        }
        if (options.width > extractOptions.width) {
            options.width = extractOptions.width
        }
        if ('top' in options) {
            extractOptions.top = options.top
            extractOptions.height = this.getExtractSize(options, metadata.height, options.height, extractOptions.top)
            if (!hasPosition) {
                options.position += ' top'
            }
        }
        else if ('bottom' in options) {
            extractOptions.top = 0
            extractOptions.height = this.getExtractSize(options, metadata.height, options.height, extractOptions.bottom)
            if (!hasPosition) {
                options.position += ' bottom'
            }
        }
        else {
            if (options.resize) {
                extractOptions.top = 0
            }
            else {
                extractOptions.top = parseInt((metadata.height - options.height) / 2)
            }
            extractOptions.height = this.getExtractSize(options, metadata.height, options.height, 0)
        }
        if (options.height > extractOptions.height) {
            options.height = extractOptions.height
        }
        return extractOptions
    }

    getExtractSize(options, imageSize, optionSize, optionPosition) {
        if (options.resize) {
            return imageSize - optionPosition
        }
        else {
            return optionSize
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
                if (!(key in imageOption)) {
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

module.exports = ResponsiveImageCreator
