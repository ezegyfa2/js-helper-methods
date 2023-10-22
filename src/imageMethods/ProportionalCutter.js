const sharp = require('sharp')
const ProportionalCutterResizer = require('./ProportionalCutterResizer')

class ProportionalCutter extends ProportionalCutterResizer {
    constructor(options) {
        super(options)
        this.options.resize = false
        this.options.extract = true
    }
}

module.exports = ProportionalCutter;
